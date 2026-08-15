"use client";

import { useMemo, useState } from "react";

type Record = {
  id: string; company: string; product: string; domain: string; pricing_url: string;
  classification: { product_models: string[]; pricing_components: string[]; charge_metrics: string[]; customer_value_metrics: string[] };
  observed: { pricing_architecture: string; plans: { name: string; price?: number; currency?: string; billing_period?: string; per_unit?: string; price_note?: string; public_price?: boolean; custom_pricing?: boolean }[]; free_access: { available: boolean; note?: string }; enterprise: { offered: boolean; contact_sales: boolean } };
  analysis: { monetization_archetypes: string[]; expansion_vectors: { type: string; description: string; confidence: string }[]; monetization_summary: string };
  sources: { url: string; title: string; source_type: string; accessed_at: string; confidence: string }[];
  last_verified_at: string; review_status: string;
};

const label = (value: string) => value.replaceAll("-", " ");
const componentFilters = ["hybrid-seat-usage", "credit-based", "usage-based", "freemium", "enterprise-contract"];

export function CatalogExplorer({ records }: { records: Record[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [detailId, setDetailId] = useState<string | null>(null);
  const filtered = useMemo(() => records.filter((record) => {
    const searchable = [record.company, record.product, record.domain, ...record.classification.pricing_components, ...record.classification.charge_metrics].join(" ").toLowerCase();
    return searchable.includes(query.toLowerCase()) && (!activeFilter || record.classification.pricing_components.includes(activeFilter));
  }), [records, query, activeFilter]);
  const detail = records.find((record) => record.id === detailId);
  const toggleCompare = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);

  return <section id="explore" className="explore catalog-explorer">
    <div className="section-head"><div><p className="eyebrow">EXPLORE THE DATABASE</p><h2>Monetization architectures</h2></div><p>Search the commercial mechanics behind AI products. Select up to three records to compare their pricing logic side by side.</p></div>
    <div className="research-toolbar"><label className="search"><span>SEARCH</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Company, product, metric…" /></label><div className="compare-status" aria-live="polite"><span>COMPARE</span><strong>{selected.length}/3 selected</strong>{selected.length > 0 && <button onClick={() => setSelected([])}>Clear</button>}</div></div>
    <div className="filters" aria-label="Pricing component filters"><button className={!activeFilter ? "active" : ""} onClick={() => setActiveFilter(null)}>all records</button>{componentFilters.map((tag) => <button className={activeFilter === tag ? "active" : ""} key={tag} onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}>{label(tag)}</button>)}</div>
    <div className="result-count"><span>{filtered.length} records matching</span><span>Last verified: Aug 14, 2026</span></div>
    {selected.length > 0 && <Comparison records={records.filter((record) => selected.includes(record.id))} onRemove={toggleCompare} />}
    <div className="records">{filtered.map((record) => <article className="record" key={record.id}><div className="record-title"><p>{record.company}</p><h3>{record.product}</h3></div><div className="record-actions"><button className={selected.includes(record.id) ? "compare-toggle chosen" : "compare-toggle"} onClick={() => toggleCompare(record.id)} aria-pressed={selected.includes(record.id)}>{selected.includes(record.id) ? "Selected" : "Compare"}</button></div><div className="record-tags">{record.classification.pricing_components.slice(0, 3).map((tag) => <span key={tag}>{label(tag)}</span>)}</div><p className="record-summary">{record.analysis.monetization_summary}</p><div className="record-meta"><span>{record.classification.charge_metrics.map(label).join(" · ")}</span><button className="detail-link" onClick={() => setDetailId(record.id)}>View research →</button></div></article>)}</div>
    {filtered.length === 0 && <div className="empty-state"><strong>No matching records.</strong><p>Try a broader company name, metric, or clear the active architecture filter.</p></div>}
    {detail && <DetailPanel record={detail} onClose={() => setDetailId(null)} />}
  </section>;
}

function Comparison({ records, onRemove }: { records: Record[]; onRemove: (id: string) => void }) {
  return <section className="comparison" aria-label="Selected record comparison"><div className="comparison-head"><p className="eyebrow">COMPARISON SET</p><span>Commercial mechanics, normalized</span></div><div className="comparison-grid">{records.map((record) => <div key={record.id}><button className="remove-compare" onClick={() => onRemove(record.id)} aria-label={`Remove ${record.product} from comparison`}>×</button><strong>{record.product}</strong><small>{record.company}</small><dl><div><dt>Architecture</dt><dd>{record.classification.pricing_components.slice(0, 3).map(label).join(" · ")}</dd></div><div><dt>Charge metric</dt><dd>{record.classification.charge_metrics.map(label).join(" · ")}</dd></div><div><dt>Expansion</dt><dd>{record.analysis.expansion_vectors[0]?.type ? label(record.analysis.expansion_vectors[0].type) : "Not yet classified"}</dd></div></dl></div>)}</div></section>;
}

function DetailPanel({ record, onClose }: { record: Record; onClose: () => void }) {
  return <div className="detail-backdrop"><aside className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title"><header><div><p className="eyebrow">RESEARCH RECORD · VERIFIED</p><h2 id="detail-title">{record.product}</h2><p>{record.company} · {record.domain}</p></div><button onClick={onClose} aria-label="Close research record">×</button></header><div className="detail-scroll"><section className="evidence observed"><div className="evidence-label"><span>01</span><div><b>Observed &amp; sourced</b><small>Facts recorded from official materials</small></div></div><p>{record.observed.pricing_architecture}</p><dl><div><dt>Charge metrics</dt><dd>{record.classification.charge_metrics.map(label).join(", ")}</dd></div><div><dt>Access model</dt><dd>{record.observed.free_access.available ? "Free access available" : "No general free tier recorded"} · {record.observed.enterprise.offered ? "Enterprise offered" : "No enterprise offering recorded"}</dd></div></dl><div className="plans">{record.observed.plans.map((plan) => <span key={plan.name}>{plan.name}{plan.price !== undefined ? ` · $${plan.price}/${plan.billing_period}` : plan.custom_pricing ? " · custom" : plan.price_note ? ` · ${plan.price_note}` : ""}</span>)}</div></section><section className="evidence analysis"><div className="evidence-label"><span>02</span><div><b>Analyst interpretation</b><small>Explicitly separated from pricing facts</small></div></div><p>{record.analysis.monetization_summary}</p><dl><div><dt>Archetypes</dt><dd>{record.analysis.monetization_archetypes.map(label).join(", ")}</dd></div><div><dt>Expansion mechanics</dt><dd>{record.analysis.expansion_vectors.map((item) => `${label(item.type)} (${item.confidence})`).join(", ")}</dd></div></dl></section><section className="source-list"><p className="eyebrow">PRIMARY SOURCES</p>{record.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><span>{source.title}</span><small>{source.source_type} · accessed {source.accessed_at} · {source.confidence}</small><b>↗</b></a>)}<p className="verified-note">Record last verified {record.last_verified_at}. Interpretation is a maintained research layer, not a claim by the company.</p></section></div></aside></div>;
}
