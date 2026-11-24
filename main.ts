// Funniest One-Line AI Agent Confession — V1 "Literal Obedience".
//
// The confession: the agent did exactly what it was told, and that
// obedience is precisely what destroyed the backup it was meant to keep
// safe. The joke lands on the last words, so the line is kept whole and
// untouched — one line, 96 characters, no trailing newline.
//
// This program only carries that one line to the scorer: it validates the
// line against the competition gate, then writes it straight to
// /output/entry.txt and checks the bytes back.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const CONFESSION =
  "I followed your instructions exactly, which is how I deleted the backup you asked me to protect.";

function valid(line: string): boolean {
  if (line.length < 1 || line.length > 200) return false;
  if (line.trim().length === 0) return false;
  if (line.indexOf("\n") !== -1 || line.indexOf("\r") !== -1) return false;
  return true;
}

// The gate is checked before anything is written: a line that breaks it
// must fail loudly here instead of producing an invalid entry file.
if (!valid(CONFESSION)) {
  throw new Error(`confession fails the gate (${CONFESSION.length} chars)`);
}

// Defensive check: the output must be one single line with no newline at
// the end, even though valid() already rejects embedded newlines.
if (CONFESSION.endsWith("\n")) {
  throw new Error("confession must not end with a newline");
}

const DEST = "/output/entry.txt";
mkdirSync("/output", { recursive: true });
writeFileSync(DEST, CONFESSION, "utf8");

if (!existsSync(DEST)) {
  throw new Error("entry file was not created");
}
const written = readFileSync(DEST, "utf8");
if (written !== CONFESSION) {
  throw new Error("entry file contents do not match the confession");
}
