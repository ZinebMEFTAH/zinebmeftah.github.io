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
