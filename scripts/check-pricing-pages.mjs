import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { records, root } from "./lib.mjs";

// Responsible monitor: checks one canonical public URL per record sequentially.
// It publishes nothing; a changed hash is only a review candidate.
const manifestPath = resolve(root, "work/pricing-page-hashes.json");
const previous = JSON.parse(await readFile(manifestPath, "utf8").catch(() => "{}"));
const next = {};
const candidates = [];
for (const record of await records()) {
  try {
    const response = await fetch(record.pricing_url, { headers: { "User-Agent": "AwesomeAIMonetization/0.1 research monitor (+https://github.com)" }, signal: AbortSignal.timeout(15000) });
    if (!response.ok) { next[record.id] = { status: "not_checked", reason: `HTTP ${response.status}`, checked_at: new Date().toISOString() }; continue; }
    const html = await response.text();
    const hash = createHash("sha256").update(html.replace(/\s+/g, " ").trim()).digest("hex");
    next[record.id] = { status: "checked", url: record.pricing_url, hash, checked_at: new Date().toISOString() };
    if (previous[record.id]?.hash && previous[record.id].hash !== hash) candidates.push({ id: record.id, url: record.pricing_url, previous_hash: previous[record.id].hash, new_hash: hash });
  } catch (error) { next[record.id] = { status: "not_checked", reason: error instanceof Error ? error.message : "fetch failed", checked_at: new Date().toISOString() }; }
}
await mkdir(resolve(root, "work"), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(next, null, 2)}\n`);
console.log(JSON.stringify({ checked: Object.values(next).filter((x) => x.status === "checked").length, candidates }, null, 2));
