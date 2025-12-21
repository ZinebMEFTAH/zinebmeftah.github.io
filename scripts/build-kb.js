import fs from "fs";
import path from "path";

const kbDir = path.resolve("kb");
const outDir = path.resolve("assets");
const outFile = path.join(outDir, "kb.json");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(kbDir).filter(f => f.endsWith(".md"));

const docs = files.map((file) => {
  const fullPath = path.join(kbDir, file);
  const content = fs.readFileSync(fullPath, "utf8");
  return {
    id: file.replace(/\.md$/, ""),
    title: file.replace(/\.md$/, ""),
    content
  };
});

fs.writeFileSync(outFile, JSON.stringify({ docs }, null, 2), "utf8");
console.log(`OK: ${outFile} (${docs.length} docs)`);