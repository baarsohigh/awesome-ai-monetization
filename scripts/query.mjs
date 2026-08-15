import { records } from "./lib.mjs";
const [command, ...args] = process.argv.slice(2);
const all = await records();
const text = (record) => JSON.stringify(record).toLowerCase();
if (command === "company") {
  const record = all.find((item) => item.id === args[0]);
  if (!record) { console.error(`No record: ${args[0]}`); process.exit(1); }
  console.log(JSON.stringify(record, null, 2));
} else if (command === "compare") {
  const matches = args.map((id) => all.find((item) => item.id === id)).filter(Boolean);
  console.log(JSON.stringify(matches.map(({ id, company, product, classification, observed, analysis }) => ({ id, company, product, classification, pricing_architecture: observed.pricing_architecture, expansion_vectors: analysis.expansion_vectors })), null, 2));
} else if (command === "search") {
  const term = args.join(" ").toLowerCase();
  console.log(JSON.stringify(all.filter((record) => text(record).includes(term)), null, 2));
} else { console.error("Usage: ai-monetization <search|company|compare> [query|id ...]"); process.exit(1); }
