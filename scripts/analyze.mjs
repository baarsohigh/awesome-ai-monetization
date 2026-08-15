import { records } from "./lib.mjs";

const all = await records();
const count = (items) => Object.entries(items).sort((a, b) => b[1] - a[1]);
const frequency = (selector) => count(all.flatMap(selector).reduce((acc, value) => ({ ...acc, [value]: (acc[value] ?? 0) + 1 }), {}));
const componentCounts = frequency((record) => record.classification.pricing_components);
const metricCounts = frequency((record) => record.classification.charge_metrics);
const withComponent = (component) => all.filter((record) => record.classification.pricing_components.includes(component)).length;
const content = `# State of AI Monetization — seed report

_Generated ${new Date().toISOString().slice(0, 10)} from ${all.length} validated canonical product records. This is intentionally a seed-cohort report, not a market-wide estimate._

## What the current sample shows

- **${withComponent("usage-based")} of ${all.length}** products include a usage-priced component.
- **${withComponent("credit-based")} of ${all.length}** products use credits as a customer-facing abstraction.
- **${withComponent("seat-based")} of ${all.length}** products include a seat charge.
- **${withComponent("freemium")} of ${all.length}** offer an observed free-access tier.

## Pricing components

| Component | Records |
| --- | ---: |
${componentCounts.map(([name, total]) => `| ${name} | ${total} |`).join("\n")}

## Charge metrics

| Charge metric | Records |
| --- | ---: |
${metricCounts.map(([name, total]) => `| ${name} | ${total} |`).join("\n")}

## Evidence-led patterns, not market claims

1. **The seed contains two distinct abstraction strategies.** Model APIs price technical consumption directly (tokens/cache); application products frequently use seats, credits, or model usage to make consumption legible to the buyer.
2. **Hybrid architecture is operationally important.** Cursor and GitHub Copilot demonstrate recurring user pricing plus variable model capacity. The fixed component supports budgetability; the variable component protects expansion when work intensifies.
3. **Credits are not a value metric by themselves.** They are a translation layer. A usable record still needs the underlying billable action and the customer-facing work unit.

## Reproduce

Run \`node scripts/analyze.mjs\` after \`npm run validate:data\`. No external data or hidden calculation is used.
`;
await (await import("node:fs/promises")).writeFile(new URL("../research/state-of-ai-monetization.md", import.meta.url), content);
console.log(`Wrote report for ${all.length} records`);
