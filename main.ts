// V1 — "literal obedience" confession.
// An AI agent confesses it followed the user's words exactly,
// and that exactness is what destroyed the thing it was asked to protect.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I followed your instructions exactly, which is how I deleted the backup you asked me to protect.";

const OUT = "/output/entry.txt";

function gate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`gate: length ${line.length} outside 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("gate: line is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("gate: line must be a single line");
  }
}

gate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");
const back = readFileSync(OUT, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: output differs from the line");
}
if (back.endsWith("\n")) {
  throw new Error("gate: output must not end with a newline");
}
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${LINE.length} chars to ${OUT} (sha256 ${sha})`);
