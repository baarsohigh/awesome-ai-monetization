import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { companiesDir, records } from "./lib.mjs";

const taxonomy = new Set([
  "ai-copilot", "ai-agent", "ai-enabled-saas", "ai-enabled-service", "ai-infrastructure", "foundation-model-api", "developer-tool", "vertical-ai", "horizontal-ai-application", "consumer-ai", "marketplace", "data-intelligence-product",
  "subscription", "seat-based", "usage-based", "credit-based", "hybrid-subscription-usage", "hybrid-seat-usage", "platform-fee-usage", "capability-based", "outcome-based", "output-based", "workflow-based", "transaction-take-rate", "performance-revenue-share", "project-based", "service-based", "enterprise-contract", "negotiated-custom", "freemium", "included-usage", "included-credits", "model-specific", "tiered", "batch-discount",
  "user-seat", "input-token", "output-token", "cached-input-token", "cache-read", "cache-write", "model-usage", "ai-credit", "credit", "audio-minute", "character", "model-inference", "developer-productivity", "coding-workflow", "generated-audio", "voice-workflow"
]);
const schema = JSON.parse(await readFile(resolve(import.meta.dirname, "../data/schema/company.schema.json"), "utf8"));
const required = new Set(schema.required);
const errors = [];
const idSeen = new Set();
for (const record of await records()) {
  for (const field of required) if (!(field in record)) errors.push(`${record.id ?? "unknown"}: missing ${field}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id ?? "")) errors.push(`${record.id}: invalid id`);
  if (idSeen.has(record.id)) errors.push(`${record.id}: duplicate id`); idSeen.add(record.id);
  for (const [key, values] of Object.entries(record.classification ?? {})) {
    for (const value of values) if (!taxonomy.has(value)) errors.push(`${record.id}: unknown taxonomy value ${value} in ${key}`);
  }
  if (!/^https:\/\//.test(record.pricing_url ?? "")) errors.push(`${record.id}: pricing_url must be https`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.last_verified_at ?? "")) errors.push(`${record.id}: invalid last_verified_at`);
  for (const source of record.sources ?? []) {
    if (!/^https:\/\//.test(source.url ?? "")) errors.push(`${record.id}: source URL must be https`);
    if (!(source.supports?.length)) errors.push(`${record.id}: source has no supported claims`);
  }
}
if (errors.length) { console.error(`Validation failed (${errors.length}):\n${errors.map((item) => `- ${item}`).join("\n")}`); process.exit(1); }
console.log(`Validated ${idSeen.size} monetization records in ${companiesDir}`);
