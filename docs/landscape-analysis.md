# Landscape analysis

_Research snapshot: 2026-08-14. This is an orientation document, not a substitute for verifying every company record against its primary pricing source._

## What exists

| Reference | What it offers / audience | Useful data or feature | Gap relative to this project | Emulate / avoid |
| --- | --- | --- | --- | --- |
| [PriceOps](https://github.com/api-evangelist/priceops) | Price-operations concepts and API-oriented pricing infrastructure for people operating pricing systems. | Treating prices, customer data, and usage as operational objects rather than marketing copy. | It is infrastructure-oriented, not a source-backed research corpus of AI companies. | Emulate the API/data mindset; avoid presenting a vendor-specific operating model as a universal taxonomy. |
| [Awesome OSS Monetization](https://github.com/PayDevs/awesome-oss-monetization) | Curated field guide for OSS maintainers; classifies approaches by what the payer buys. | Clear navigation of funding, paid access, services, licences, and risks; contribution-friendly list. | OSS maintainer monetization is a different question from how AI product vendors price products; it is not normalized company/plan history. | Emulate the approachable taxonomy and links; avoid an unstructured link list or subjective labels without evidence. |
| [ComparEdge open data](https://github.com/comparedge/awesome-saas-comparison-data) and its [pricing API](https://github.com/comparedge/pricing-api) | Open, machine-consumable SaaS/AI/security comparison and pricing data for buyers and agents. | Vendor-price verification dates, open API/MCP access, broad category coverage, and a public dataset. | Primarily current SaaS comparison data: it does not model AI cost/value metrics, expansion mechanics, observed-vs-analysis, or a full pricing-strategy timeline. | Emulate dated verification, public formats, and programmatic access; avoid implying a checked headline price describes the entire commercial model. |
| [xpay Agent-Ready SaaS Index](https://www.xpay.sh/agent-ready-index/) | Large index that scores whether agents can discover and buy SaaS. | Machine-buyability dimensions, scoring, and category browsing. | Its unit of analysis is agent purchase readiness, not a vendor's AI monetization architecture. It is complementary metadata, not a pricing benchmark. | Consider an optional `agent_buyability` field later; do not conflate discoverability scores with pricing quality or value alignment. |
| [Firecrawl monitor/change tracking](https://github.com/firecrawl/cli/blob/main/skills/firecrawl-cli/SKILL.md?plain=1) | Crawl/scrape and monitor pages; structured JSON change tracking can produce field-level diffs. | A practical acquisition primitive for watching plan/price changes and retaining before/after snapshots. | Extraction is fallible and page availability varies; it does not establish source truth, normalize concepts, or supply analysis. | Emulate snapshot + structured-diff workflow and keep raw evidence; avoid automatic publication without review/confidence labels. |
| [SaaS Pricing Scraper](https://apify.com/labrat011/saas-pricing-scraper) and similar scrapers | Automated plan-card extraction for a pricing URL. | Demonstrates a useful intake path for standard plan grids. | Its own limitations include bot protection, catalogue pages, nonstandard layouts, SPAs, and ambiguous currencies—common among AI vendors. | Use scrapers as candidate-data collection only; avoid treating an LLM/DOM extraction as authoritative evidence. |
| [Pricing4SaaS research](https://arxiv.org/abs/2404.00311) | Academic work on a pricing model for SaaS operation and feature toggles. | Reinforces that pricing/feature access is a structured domain, not merely page text. | It is about implementing configurable SaaS pricing, not an open evidence database of AI-company monetization. | Emulate normalized entities and separation of configuration; avoid coupling this project to one vendor/runtime implementation. |

## Adjacent guidance and infrastructure

These are not direct database competitors, but they validate the problem shape and help define the taxonomy.

| Reference | Why it matters | Implication for the dataset |
| --- | --- | --- |
| [Stripe: Pricing AI products](https://stripe.com/guides/pricing-ai-products-lessons-from-leading-ai-companies) and [Stripe Billing](https://stripe.com/billing/usage-based-billing) | Stripe describes usage and hybrid models as ways to align incremental AI value and delivery cost; its billing product explicitly supports tokens, outcomes, credits, subscriptions, and overages. | Separate pricing architecture from charge metric; represent combinations rather than one mutually exclusive `pricing_model`. |
| [Bessemer AI pricing & monetization playbook](https://www.bvp.com/atlas/the-ai-pricing-and-monetization-playbook) | Frames AI pricing as a tradeoff between customer-value alignment and variable inference/human-in-the-loop cost; discusses consumption, workflow, and outcome models. | Record `cost_metric` separately from `customer_value_metric`, plus public economics and an evidence-backed confidence level. |
| [a16z: AI shift toward outcome pricing](https://a16z.com/newsletter/december-2024-enterprise-newsletter-ai-is-driving-a-shift-towards-outcome-based-pricing/) | Connects AI's variable model costs to usage, outcome, and hybrid monetization. | Make outcome definitions explicit: what counts as a billable completed result, exclusions, and who bears variance. |
| [Orb for AI](https://www.withorb.com/solutions/ai) | Billing platform emphasizes dimensional metrics, credits/tokens, threshold controls, and real-time reporting. | Capture credits, threshold/overage rules, caps, and customer-spend controls—not only plan prices. |
| [Metronome pricing/packaging guides](https://docs.metronome.com/guides/pricing-packaging/overview) | Documents pay-as-you-go, enterprise commits, subscription + usage, and prepaid credits; its model separates usage, prices/rate cards, and commercial contracts. | Model plans/rate cards, commitments, and customer-specific contracts distinctly; preserve version/date history. |
| [Lago](https://github.com/getlago/lago) | Open-source metering and usage-billing API (AGPLv3) covering consumption tracking, subscriptions, pricing iterations, and revenue analytics. | Shows the importance of usage events and pricing versioning; it is billing software, not a benchmark dataset. |

## The defensible wedge

The project should be a **version-controlled, source-backed AI monetization intelligence dataset**, not another pricing-page directory. A useful record answers four separately sourced questions:

1. **Observed commercial design:** plans, prices, billing cadence, included usage, commitments, credits, limits, sales motion, and change history.
2. **What is billed and why:** pricing architecture; charge metric; customer value metric; cost metric; and the AI product/business-model tags. These cannot be collapsed into a single label.
3. **How revenue can expand:** evidence-backed vectors such as seats, usage, credits, premium models, workflows, business units, and enterprise terms.
4. **Economics and interpretation:** public cost/margin signals and clearly labelled analyst interpretation, each with confidence and provenance.

This enables questions that a price table cannot: which support agents bill per resolved case; which coding products combine seats and usage; which metrics track customer value rather than provider compute; and which companies moved from access to consumption.

## Product principles derived from the landscape

- **Source-first and time-aware.** Store the primary URL, accessed date, exact supported fields, and a snapshot/diff reference. `Verified` means direct authoritative evidence; analysis is never silently upgraded into fact.
- **Normalized but loss-aware.** Use controlled vocabularies for product type, pricing architecture, charge metric, expansion vector, and confidence, while preserving the vendor's own wording in notes/evidence.
- **Fact/analysis separation.** Render observed pricing and analyst interpretation in visibly different sections. This is a credibility feature, especially for inferred value metrics and expansion vectors.
- **Git-friendly canonical data, generated access layers.** Canonical YAML/JSON records with generated JSON/CSV (and later SQLite/DuckDB) offers the openness of ComparEdge plus reproducible history.
- **Human review over scraper theatre.** Automated collection proposes changes; maintainers validate material fields against primary sources before release.

## Explicit non-goals / anti-patterns

- Do not claim to be comprehensive because more pages were scraped.
- Do not copy full proprietary comparison matrices, feature tables, or vendor editorial analysis.
- Do not treat tokens as synonymous with customer value, nor outcome pricing as automatically superior.
- Do not force a company into one model: a product can be seat-based, subscription, and usage/credit-based at once.
- Do not infer private unit economics. Keep public disclosures and labelled interpretation separate.
- Do not hide custom/enterprise pricing simply because a headline price is unavailable; `contact_sales` and unknowns are meaningful observations.

## Initial launch scope

Prioritize 25–50 well-sourced companies across foundation-model APIs, coding copilots, support agents, voice, creative generation, vertical agents, and AI infrastructure. For each, ship fewer but complete records: plans, metric definitions, source dates, expansion vectors, and at least one evidence-backed monetization note. Coverage breadth can follow once validation and change-history workflows are reliable.
