import worker from "../src/index.js";

const ORIGIN = "https://zinebmeftah.github.io";
let pass = 0, fail = 0;
const check = (name, cond, extra = "") => {
  if (cond) { pass++; console.log("  ok   " + name); }
  else { fail++; console.log("  FAIL " + name + " " + extra); }
};
const post = (body, env, origin = ORIGIN) =>
  worker.fetch(new Request("https://w.dev", {
    method: "POST", headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  }), env, {});

const groqOk = (text) => ({ ok: true, status: 200, json: async () => ({ choices: [{ message: { content: text } }] }) });
const groqRetired = () => ({ ok: false, status: 404, json: async () => ({ error: { code: "model_not_found", message: "The model `llama-3.3-70b-versatile` does not exist" } }) });
const groqAuthFail = () => ({ ok: false, status: 401, json: async () => ({ error: { code: "invalid_api_key", message: "Invalid API Key sk-SECRET" } }) });

console.log("\nCORS preflight");
{
  const res = await worker.fetch(new Request("https://w.dev", { method: "OPTIONS", headers: { Origin: ORIGIN } }), {}, {});
  check("204 with allow-origin", res.status === 204 && res.headers.get("Access-Control-Allow-Origin") === ORIGIN);
}

console.log("\nMethod + input validation");
{
  const res = await worker.fetch(new Request("https://w.dev", { method: "GET", headers: { Origin: ORIGIN } }), { GROQ_API_KEY: "k" }, {});
  check("GET rejected", res.status === 405);
  const empty = await post({ message: "   " }, { GROQ_API_KEY: "k" });
  check("empty message rejected", empty.status === 400);
  const noKey = await post({ message: "hi" }, {});
  check("missing key -> 503, no detail", noKey.status === 503 && (await noKey.json()).error === "unavailable");
}

console.log("\nHappy path");
{
  let seenModel = null, seenBody = null;
  globalThis.fetch = async (_u, init) => { seenBody = JSON.parse(init.body); seenModel = seenBody.model; return groqOk("Elle est ingénieure IA."); };
  const res = await post({ message: "Qui est-elle ?", context: "Zineb Meftah, ingénieure IA." }, { GROQ_API_KEY: "k", GROQ_MODEL: "openai/gpt-oss-120b" });
  const data = await res.json();
  check("200 with answer", res.status === 200 && data.answer === "Elle est ingénieure IA.", JSON.stringify(data));
  check("uses configured model", seenModel === "openai/gpt-oss-120b", seenModel);
  check("context reaches the model", JSON.stringify(seenBody.messages).includes("ingénieure IA"));
}

console.log("\nModel retirement (the bug that broke production)");
{
  const tried = [];
  globalThis.fetch = async (_u, init) => {
    const m = JSON.parse(init.body).model; tried.push(m);
    return m === "openai/gpt-oss-120b" ? groqRetired() : groqOk("Réponse de secours.");
  };
  const res = await post({ message: "test" }, { GROQ_API_KEY: "k", GROQ_MODEL: "openai/gpt-oss-120b" });
  const data = await res.json();
  check("falls back to a live model", res.status === 200 && data.answer === "Réponse de secours.", JSON.stringify(data));
  check("tried the retired model first", tried[0] === "openai/gpt-oss-120b" && tried.length === 2, tried.join(","));
}

console.log("\nProvider errors never leak to the browser");
{
  globalThis.fetch = async () => groqAuthFail();
  const res = await post({ message: "test" }, { GROQ_API_KEY: "bad" });
  const raw = JSON.stringify(await res.json());
  check("503, not 200", res.status === 503);
  check("no answer field", !raw.includes("answer"), raw);
  check("no provider text, no key", !raw.includes("Invalid API Key") && !raw.includes("SECRET") && !raw.includes("llama"), raw);
}

console.log("\nAll models down");
{
  globalThis.fetch = async () => groqRetired();
  const res = await post({ message: "test" }, { GROQ_API_KEY: "k" });
  check("503 unavailable", res.status === 503 && (await res.json()).error === "unavailable");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
