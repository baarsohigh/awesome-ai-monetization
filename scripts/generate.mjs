import { records, emit, freshness } from "./lib.mjs";
const all = await records();
const summary = all.map((record) => ({
  id: record.id, company: record.company, product: record.product, domain: record.domain, pricing_url: record.pricing_url,
  product_models: record.classification.product_models, pricing_components: record.classification.pricing_components,
  charge_metrics: record.classification.charge_metrics, customer_value_metrics: record.classification.customer_value_metrics,
  free_access: record.observed.free_access.available, enterprise: record.observed.enterprise?.offered ?? false,
  last_verified_at: record.last_verified_at, freshness: freshness(record.last_verified_at), review_status: record.review_status,
  summary: record.analysis.monetization_summary
}));
const headers = ["id", "company", "product", "product_models", "pricing_components", "charge_metrics", "customer_value_metrics", "free_access", "enterprise", "last_verified_at", "freshness", "review_status"];
const csv = [headers.join(","), ...summary.map((row) => headers.map((key) => JSON.stringify(Array.isArray(row[key]) ? row[key].join(" | ") : row[key] ?? "")).join(","))].join("\n") + "\n";
await emit("catalog.json", `${JSON.stringify({ generated_at: new Date().toISOString(), records: all, summary }, null, 2)}\n`);
await emit("catalog.csv", csv);
console.log(`Generated JSON and CSV for ${all.length} records`);
