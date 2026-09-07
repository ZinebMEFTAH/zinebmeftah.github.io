# Zineb Meftah — Portfolio

Live site: **https://zinebmeftah.github.io**

A single-page portfolio in French, English and Arabic, plus an AI assistant that
answers questions about my background from the content of the page itself.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | The whole page. Text nodes carry `data-translate` keys. |
| `script.js` | Translations (fr / en / ar), theme, and all interactions. |
| `styles.css` | Every style. Dark by default; `body.light-theme` is the light palette. |
| `assets/` | CV and cover letter (FR + EN), certificates, images, generated `kb.json`. |
| `kb/` | Knowledge-base sources. `npm run build:kb` compiles them to `assets/kb.json`. |
| `worker/` | Cloudflare Worker behind the chat widget. |
| `alternance/` | Focused landing page for apprenticeship applications. |

## Editing the text

`index.html` holds the text shown before JavaScript runs; `translations` in
`script.js` holds what is shown afterwards. **Change both**, or the dictionary
will silently overwrite the markup on load.

## Chat worker

```bash
cd worker
npm run test                     # logic tests, no network
npx wrangler secret put GROQ_API_KEY
npx wrangler deploy
```

The worker tries `GROQ_MODEL` first and falls back through a list of known-good
models, so a retired model cannot take the assistant down. Provider errors are
logged, never shown to visitors — the page displays its own message instead.
