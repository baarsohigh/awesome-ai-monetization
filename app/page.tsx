import type { Metadata } from "next";
import catalog from "../data/generated/catalog.json";

export const metadata: Metadata = { title: "Awesome AI Monetization", description: "The open-source database of how AI products make money." };

type Summary = (typeof catalog.summary)[number];
const tags = ["hybrid-seat-usage", "credit-based", "usage-based", "freemium", "enterprise-contract"];

function label(value: string) { return value.replaceAll("-", " "); }

export default function Home() {
  const records = catalog.summary as Summary[];
  const stats = {
    companies: records.length,
    models: new Set(records.flatMap((record) => record.pricing_components)).size,
    metrics: new Set(records.flatMap((record) => record.charge_metrics)).size
  };
  return <main>
    <nav className="nav"><a className="brand" href="#top">AAM<span>●</span></a><div><a href="#explore">Explore</a><a href="#method">Method</a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub ↗</a></div></nav>
    <section id="top" className="hero">
      <p className="eyebrow">OPEN DATASET · RESEARCH IN PROGRESS</p>
      <h1>How AI products<br /><em>make money.</em></h1>
      <p className="lede">A source-backed field guide to pricing architecture, charge metrics, value metrics, and expansion mechanics across AI companies.</p>
      <div className="hero-actions"><a className="button primary" href="#explore">Browse the database</a><a className="button" href="#method">Read methodology</a></div>
    </section>
    <section className="stats" aria-label="Dataset statistics"><div><strong>{stats.companies}</strong><span>verified product records</span></div><div><strong>{stats.models}</strong><span>pricing components</span></div><div><strong>{stats.metrics}</strong><span>charge metrics</span></div><div><strong>100%</strong><span>records with sources</span></div></section>
    <section className="principle"><p className="eyebrow">THE CORE QUESTION</p><h2>Not just what a company charges—<br />what it charges <em>for.</em></h2><p>Every record separates the observed commercial design from analyst interpretation. This makes it possible to study the translation from model costs to product usage, customer value, and revenue.</p></section>
    <section id="explore" className="explore"><div className="section-head"><div><p className="eyebrow">EXPLORE</p><h2>Monetization architectures</h2></div><p>Filterable, version-controlled records—built for founders, operators, researchers, and agents.</p></div><div className="filters">{tags.map((tag) => <button key={tag}>{label(tag)}</button>)}</div><div className="records">{records.map((record) => <article className="record" key={record.id}><div className="record-title"><p>{record.company}</p><h3>{record.product}</h3></div><div className="record-tags">{record.pricing_components.slice(0, 3).map((tag) => <span key={tag}>{label(tag)}</span>)}</div><p className="record-summary">{record.summary}</p><div className="record-meta"><span>{record.charge_metrics.map(label).join(" · ")}</span><a href={record.pricing_url} target="_blank" rel="noreferrer">Sources ↗</a></div></article>)}</div></section>
    <section className="chain"><p className="eyebrow">THE AI MONETIZATION CHAIN</p><div><span>AI cost unit</span><b>→</b><span>Product usage unit</span><b>→</b><span>Charge metric</span><b>→</b><span>Customer value</span><b>→</b><span>Revenue</span></div><p>The interesting work is often in the translations—not the list price.</p></section>
    <section id="method" className="method"><div><p className="eyebrow">METHODOLOGY</p><h2>Built for trust,<br />not scraper theatre.</h2></div><ol><li><b>Observe</b><span>Capture pricing facts from official pages and documentation.</span></li><li><b>Classify</b><span>Normalize components without flattening a hybrid model.</span></li><li><b>Interpret</b><span>Separate evidence-backed analysis and confidence from observed facts.</span></li><li><b>Track</b><span>Preserve dated records and verified pricing changes over time.</span></li></ol></section>
    <footer><span>Awesome AI Monetization</span><span>Open research for better pricing decisions.</span><a href="https://github.com">Contribute ↗</a></footer>
  </main>;
}
