import fs from "fs";
import path from "path";

const kbDir = path.resolve("kb");
const outDir = path.resolve("assets");
const outFile = path.join(outDir, "kb.json");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(kbDir).filter(f => f.endsWith(".md"));

const docs = files.map((file) => {
  const fullPath = path.join(kbDir, file);
  const raw = fs.readFileSync(fullPath, "utf8").trim();

  // First line may be an "# H1" title; everything after it is the body.
  const match = raw.match(/^#\s+(.+?)\s*\n+([\s\S]*)$/);
  const id = file.replace(/\.md$/, "");

  return {
    id,
    title: match ? match[1] : id,
    content: (match ? match[2] : raw).trim()
  };
});

fs.writeFileSync(outFile, JSON.stringify({ docs }, null, 2), "utf8");
console.log(`OK: ${outFile} (${docs.length} docs)`);