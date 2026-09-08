/**
 * Portfolio chat worker.
 *
 * Answers questions about Zineb MEFTAH using the page content the browser sends
 * as `context`, so the assistant can only speak from what the portfolio says.
 *
 * Deploy:
 *   cd worker
 *   npx wrangler secret put GROQ_API_KEY   # never commit the key
 *   npx wrangler deploy
 */

const ALLOWED_ORIGINS = [
  "https://zinebmeftah.github.io",
  "http://localhost:8765",
  "http://127.0.0.1:8765",
];

// Groq retires models without notice - that is exactly what took this endpoint
// down before. Try the configured model first, then fall back down the list.
const FALLBACK_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
];

const MAX_MESSAGE_CHARS = 1000;
const MAX_CONTEXT_CHARS = 14000;

// Abuse limits. CORS headers only instruct browsers - curl and scripts ignore
// them entirely - so the endpoint needs its own guard or the Groq quota is
// free for anyone who finds the URL.
const RATE_LIMIT_MAX = 15;              // requests per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 32 * 1024;

// Per-isolate sliding window. Not global state, but it caps what any single
// client can pull through one isolate, which is what casual abuse looks like.
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const seen = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  seen.push(now);
  hits.set(ip, seen);

  // Keep the map from growing without bound across a long-lived isolate.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.length || now - times[times.length - 1] > RATE_LIMIT_WINDOW_MS) hits.delete(key);
    }
  }
  return seen.length > RATE_LIMIT_MAX;
}

const SYSTEM_PROMPT = `Tu es l'assistant du portfolio de Zineb MEFTAH (ingénieure IA, MLOps, deep learning).

Règles:
- Réponds UNIQUEMENT à partir du CONTEXTE fourni. Si l'information n'y est pas, dis-le simplement et invite à écrire à zineb.meftah36@gmail.com.
- N'invente jamais un employeur, un diplôme, une date, un chiffre ou un projet.
- Réponds dans la langue de la question (français, anglais ou arabe).
- Sois concret et bref: 3 à 5 phrases maximum, ton professionnel et chaleureux.
- Tu parles d'elle à la troisième personne.`;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

async function callGroq(env, model, messages) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      // Reasoning models spend part of this budget before emitting any text.
      max_tokens: 700,
    }),
  });

  const data = await res.json().catch(() => ({}));
  const answer = data?.choices?.[0]?.message?.content?.trim();
  const code = data?.error?.code || "";
  return {
    ok: res.ok && Boolean(answer),
    answer,
    // A retired or unavailable model is worth retrying with the next candidate;
    // an auth or quota failure is not.
    retryable: !res.ok && (res.status === 404 || code === "model_not_found" || code === "model_decommissioned"),
    status: res.status,
    error: data?.error?.message || `HTTP ${res.status}`,
  };
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "method_not_allowed" }, 405, origin);
    }

    // The page is served from a different origin than the worker, so a genuine
    // browser request always carries one of these.
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: "forbidden" }, 403, origin);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({ error: "rate_limited" }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "600", ...corsHeaders(origin) },
      });
    }

    const declared = Number(request.headers.get("Content-Length") || 0);
    if (declared > MAX_BODY_BYTES) {
      return json({ error: "payload_too_large" }, 413, origin);
    }
    if (!env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not configured");
      return json({ error: "unavailable" }, 503, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "bad_request" }, 400, origin);
    }

    const message = String(body?.message || "").trim().slice(0, MAX_MESSAGE_CHARS);
    const context = String(body?.context || "").trim().slice(0, MAX_CONTEXT_CHARS);
    if (!message) return json({ error: "bad_request" }, 400, origin);

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "system", content: `CONTEXTE (contenu du portfolio):\n${context}` },
      { role: "user", content: message },
    ];

    const models = [env.GROQ_MODEL, ...FALLBACK_MODELS].filter(Boolean);
    const tried = [];

    for (const model of models) {
      if (tried.includes(model)) continue;
      tried.push(model);
      try {
        const result = await callGroq(env, model, messages);
        if (result.ok) return json({ answer: result.answer }, 200, origin);
        // Log the provider's own words; never send them to the browser.
        console.error(`Groq call failed [${model}]: ${result.error}`);
        if (!result.retryable) break;
      } catch (err) {
        console.error(`Groq request threw [${model}]: ${err}`);
      }
    }

    // The page shows its own localized "temporarily unavailable" message.
    return json({ error: "unavailable" }, 503, origin);
  },
};
