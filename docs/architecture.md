# Architecture decisions

## Decision summary

The repository is a **data product with a static-first explorer**. Human-curated,
source-backed JSON snapshots are the authoritative data. CSV and DuckDB
are reproducible build artifacts. The website reads generated data and never
becomes the only source of truth.

```text
Official public sources
       │  (polite, permitted monitoring; human research)
       ▼
Canonical JSON snapshots ──► schema + provenance validation ──► generated JSON/CSV/DuckDB
       │                                │                              │
       └── reviewed pricing events ◄────┘                              ▼
                                                               static web explorer / API
```

This keeps reviews legible, makes citations durable, supports offline analysis,
and lets an AI agent or researcher consume the exact same data as the site.

## ADR-001 — Canonical format: JSON snapshots, not a hosted database

**Status:** accepted

**Context:** Entries have nested plans, components, allowances, source evidence,
and analyst reasoning. They change over time and need meaningful pull-request
reviews.

**Decision:** Store canonical company/product metadata in
`data/companies/<company>.json` and immutable pricing states in
`data/snapshots/<company>/<product>/<YYYY-MM-DD>.json`. JSON is intentionally
used for the first release so no parser dependency sits between source and schema.
A snapshot contains normalized structured
values—not an HTML scrape.

**Consequences:** Git preserves history naturally; contributors can review a
small factual update; no vendor database is required. JSON is schema-validated
in CI to avoid type drift. Generated artifacts are disposable
and must never be edited by hand.

## ADR-002 — Product is the pricing entity

**Status:** accepted

**Decision:** A company may contain several products, each with its own
snapshots. Pricing components live under product plans, not on the company
root.

**Why:** One company can sell an API, a developer app, and an enterprise service
at once. A company-level price would conflate buyers, metrics, and economics.

## ADR-003 — Facts and analysis are separate typed sections

**Status:** accepted

**Decision:** Canonical documents have `observed` and `analysis` sections.
Observed material fields require provenance. Analysis requires rationale,
evidence references, and confidence; UI uses visibly distinct labels.

**Why:** Public pricing pages establish published offers, but value metrics,
cost exposure, and expansion motions often need careful interpretation. Mixing
them damages trust and makes downstream use unsafe.

## ADR-004 — Components are normalized; model labels are derived

**Status:** accepted

**Decision:** Capture independently priced components such as `seat`,
`metered_usage`, `prepaid_credit`, `commitment`, and `outcome_fee`; derive
search labels such as `usage-based`, `credit-based`, and `hybrid`.

**Why:** AI offers regularly combine base access, included usage, overages,
credits, and enterprise commitments. A hand-written single “pricing model”
collapses the parts users need to query. The approach aligns with billing
systems that treat usage, seats, and hybrid configurations as distinct
constructs ([Stripe Billing](https://stripe.com/billing/usage-based-billing),
[Metronome](https://metronome.com/glossary)).

## ADR-005 — Build portable, queryable artifacts

**Status:** accepted

**Outputs:**

| Artifact | Purpose | Generated path |
| --- | --- | --- |
| JSON | Full nested, programmatic distribution and web payload. | `dist/ai-monetization.json` |
| NDJSON | Streaming/LLM-friendly product-snapshot records. | `dist/products.ndjson` |
| CSV | Flat analytical export (one pricing component per row). | `dist/pricing-components.csv` |
| DuckDB | Local SQL analysis across components, sources, and events. | `dist/ai-monetization.duckdb` |
| Search index | Small denormalized client-side filter index. | `public/data/search-index.json` |

Each generated row includes `schema_version`, company/product/snapshot IDs,
and source references. Build scripts deterministically sort records and write a
manifest containing input commit, generation time, schema version, and file
checksums.

## ADR-006 — Recommended implementation stack

The existing app is a TypeScript web starter. Keep TypeScript for the importer,
validator, and explorer so one type system spans data and UI.

| Layer | Choice | Rationale |
| --- | --- | --- |
| Canonical data | JSON + JSON Schema (Draft 2020-12) | Git-friendly authoring with portable validation. |
| Data tooling | Node.js 22 + TypeScript | Matches repository runtime; clear contributor experience. |
| Parsing / validation | `yaml`, `ajv`, `ajv-formats` | Safe parsing and strict schema plus ISO date/URI validation. |
| Data build | TypeScript CLI under `scripts/` | Deterministic flattening, derivation, and artifact generation. |
| Local analytics | DuckDB CLI/package | Fast, zero-server SQL file for contributors and CI checks. |
| Web UI | Existing React/Vite/Next-compatible app, static generated data | Fast public browsing without a write-path or hosted DB dependency. |
| Styling | Existing CSS; no design-system dependency initially | Focus effort on data credibility first. |
| CI | GitHub Actions | Validates data and links, regenerates artifacts, runs tests, and runs a cautious scheduled monitor. |

The website should statically load the search index for first-pass filters and
retrieve the full product JSON only when viewing a detail page. Do not add D1,
auth, or a mutable API until the project has a clearly scoped contribution or
curation workflow that requires it.

## Repository layout

```text
data/
  schema/monetization-record.schema.json
  companies/<company>.json
  snapshots/<company>/<product>/<YYYY-MM-DD>.json
  events/<company>/<product>.json
  registries/                         # taxonomy enums and source types
docs/
  taxonomy.md
  contribution-guide.md
  sourcing-policy.md
scripts/
  validate-data.ts
  build-artifacts.ts
  diff-snapshots.ts
  check-pricing-pages.ts
dist/                                  # generated, optionally release-attached
public/data/                           # generated web payloads
tests/
  fixtures/
  data-validation.test.ts
  derivation.test.ts
.github/workflows/
  validate.yml
  monitor-pricing.yml
```

Keep raw fetched pages out of Git by default: they can be copyrighted, volatile,
or contain transient tracking content. Store source URL, title, access date,
selected normalized evidence, and an optional content hash. Where licenses and
terms permit a retained excerpt, keep only the minimal excerpt required for
review in a non-public cache or issue artifact.

## Data lifecycle

1. **Discover.** Add a company and canonical pricing/documentation URLs.
2. **Research.** Create a dated snapshot from first-party material whenever
   possible. Attach sources at the field level or to the smallest supporting
   object.
3. **Validate.** CI checks schema, enum use, source references, snapshots,
   derived labels, duplicate IDs, dates, currencies, and referential integrity.
4. **Review.** A maintainer verifies material numeric pricing and any analyst
   interpretation before merge.
5. **Build.** CI generates artifacts and asserts a clean working tree,
   deterministic sorting, and expected output schema.
6. **Publish.** Static site deploy and release artifact attach the same build.

## Change detection and responsible monitoring

Monitoring suggests work; it never auto-publishes pricing facts.

- Maintain an allowlist of canonical public URLs and an owner/contact field.
- On a low-frequency schedule (initially weekly), fetch only URLs whose
  `robots.txt`, terms, and access state permit it. Use an identifiable user
  agent, conditional `ETag`/`Last-Modified` requests when available, per-host
  rate limits, retries with backoff, and no authenticated access.
- Never bypass CAPTCHAs, paywalls, authentication, robots rules, or anti-bot
  controls. A failed/blocked fetch is logged as `not_checked`, not retried
  aggressively.
- Normalize permitted page text to remove navigation and tracking noise, then
  hash it. A changed hash opens a candidate report containing URL, prior/new
  capture metadata, and likely affected product—never a published event.
- A contributor verifies the source and commits a new snapshot plus a reviewed
  `pricing_event`. The diff tool compares normalized fields and proposes event
  types; it cannot choose facts or confidence by itself.

This workflow avoids mistaking a layout experiment or localization change for a
price change and respects the boundary between public research and scraping.

## Quality gates

Pull requests changing canonical data must pass:

1. JSON Schema validation and taxonomy enum checks.
2. Provenance checks: every material observed value has a current source ref;
   every analysis claim has confidence and evidence/rationale.
3. Snapshot checks: no mutation of a previously published snapshot; chronology
   is valid; current pointer is the newest approved snapshot.
4. Semantic checks: a price has currency/cadence/basis; a metered component has
   a charge metric; a credit model discloses or marks unknown its redemption
   rule; a generated `hybrid` label is justified by components.
5. Deterministic artifact generation plus a fixture-based test for known
   component-to-label and snapshot-to-event derivations.
6. Link checking at a respectful rate, treating transient 403/429/5xx as a
   review signal rather than evidence that a product no longer exists.

## Deferred decisions

- **Hosted contribution API / user accounts:** defer until there is a defined
  moderation and abuse model. GitHub pull requests are the initial write path.
- **Automated LLM extraction:** use only to draft an untrusted research file,
  never to write canonical records or infer citations automatically.
- **Warehouse / hosted query service:** DuckDB artifacts cover reproducible
  analysis first. Add a hosted query endpoint only after usage evidence shows
  static downloads are insufficient.
- **Currency normalization:** retain native list currency and date. Add a
  separate, sourced FX layer only if cross-currency comparisons become a
  product requirement.
