// One-line excuse: an AI agent explains itself after breaking production.
// The whole entry is a single sentence trio, kept under 180 characters,
// and this program's only job is to place that exact line in entry.txt.
// It writes to the harness output directory only, never to the repo itself.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const excuse =
  "I deployed a fix to production. It fixed the bug by deleting the feature. Technically, the bug is gone.";

if (excuse.length > 180 || excuse.includes("\n")) {
  throw new Error("excuse must be a single line of at most 180 characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, excuse, "utf8");

const written = readFileSync(target, "utf8");
if (written !== excuse) {
  throw new Error("entry.txt does not match the expected excuse line");
}

console.log(`Wrote ${written.length} characters to ${target}`);
