# AI monetization taxonomy

This document is the controlled vocabulary for `awesome-ai-monetization`. It
describes an AI product's monetization system, not merely the text currently
shown on its pricing page. A record may carry more than one value wherever a
company sells more than one product or combines mechanisms.

## Design principles

1. **Separate the mechanism from the unit.** `subscription` says *how* money is
   collected; `resolved_support_case` says *what* causes a charge. They are not
   interchangeable.
2. **Separate observed facts from analysis.** A published price or quota is
   `observed`; an inferred expansion motion is `analysis` and must name its
   evidence and confidence.
3. **Model product-level records.** A company can have an API and an end-user
   product with different buyers and monetization. The primary entity is a
   `product`, nested under a company identifier.
4. **Preserve time.** A current record is a dated snapshot. Corrections append
   a new snapshot or event; they do not rewrite history.
5. **Keep unknown distinct from absent.** Omit a field when it was not
   researched; use `null` only when researched but not publicly disclosed; use
   `false` only for a confirmed negative.

This structure reflects the practical distinction in current AI pricing
guidance: a charge metric should match both customer value and variable cost,
while hybrid plans can combine predictable spend with scalable revenue
([Stripe](https://stripe.com/resources/more/ai-pricing-models),
[Bessemer](https://www.bvp.com/atlas/the-ai-pricing-and-monetization-playbook)).

## Entity model

```text
company
  └─ product (one or more)
       └─ pricing_snapshot (as_of date; one current, many historical)
            ├─ pricing_components (one or more charge rules)
            ├─ plans and add-ons
            ├─ sources / field evidence
            └─ analysis (value, cost, expansion, archetypes, confidence)
```

`company.slug` and `product.slug` are stable, lowercase kebab-case IDs.
`snapshot_id` is `company/product/YYYY-MM-DD`. Source access dates use ISO 8601
UTC dates. Monetary amounts are decimal strings plus ISO 4217 currency, never
floating-point values.

## Product and business-model tags

Tags explain the delivery and operating model; they are not pricing models.
Use one or more of the following, with a short analyst rationale for any
non-obvious tag.

| Tag | Definition |
| --- | --- |
| `foundation-model-api` | General-purpose model or model API sold for inference, fine-tuning, or related model access. |
| `ai-infrastructure` | Compute, serving, observability, evaluation, data, safety, or orchestration infrastructure principally for AI workloads. |
| `developer-tool` | Tool used primarily to build, test, deploy, or operate software or AI systems. |
| `copilot` | Assistive product where a human normally initiates, reviews, or completes the work. |
| `agent` | Product that can plan or execute multi-step work with a material degree of delegated autonomy. |
| `ai-enabled-saas` | Existing or new software application whose paid proposition materially includes AI, without claiming a more specific archetype. |
| `vertical-ai` | AI product designed around an industry-specific workflow, data model, or buyer. Pair with its delivery tag (for example `agent`). |
| `horizontal-application` | Cross-industry end-user application. |
| `ai-enabled-service` | Combination of software and a meaningful human-operated or managed service. |
| `data-intelligence-product` | Product chiefly monetizing AI-powered data, research, signals, or decision support. |
| `consumer-ai` | Primarily sold to individuals rather than organizations. |
| `marketplace` | Multi-sided marketplace where AI is material to supply, demand, matching, or delivery. |

Do not use `agent` just because a product has a chat interface. The observed
description should support delegation or execution. These tags deliberately
allow a vertical support agent to be both `vertical-ai` and `agent`, avoiding a
false single-category choice. Bessemer similarly distinguishes copilots,
agents, and AI-enabled services as different AI business models with different
monetization trade-offs ([source](https://www.bvp.com/atlas/the-ai-pricing-and-monetization-playbook)).

## Pricing architecture

### Pricing components (normalized)

A **pricing component** is an independently priced rule within a plan, add-on,
or contract. A plan may have several components. `component_type` is one of:

| Component type | Use when |
| --- | --- |
| `recurring_subscription` | Fixed recurring access fee, including a flat plan price. |
| `seat` | Charge changes with licensed users, editors, agents, or named seats. |
| `metered_usage` | Charge is calculated from a measured quantity. |
| `prepaid_credit` | Customer buys or receives a redeemable abstract balance. Include its conversion rules. |
| `commitment` | Minimum-spend, prepaid, drawdown, or committed-use agreement. |
| `transaction_fee` | Charge per payment, booking, sale, or marketplace transaction. |
| `take_rate` | Charge is a percentage of transaction value. |
| `outcome_fee` | Charge contingent on a defined, attributable business result. |
| `professional_service` | One-time or recurring implementation, managed service, or human-delivery charge. |
| `add_on` | Separately purchased capability, capacity, product, or model access. |
| `custom_contract` | Negotiated terms are known to exist but public rule details are unavailable. |
| `one_time_purchase` | Non-recurring purchase not better represented above. |

**Pricing model labels are generated**, not hand-entered as a loose string:

- `freemium`: a confirmed zero-price, ongoing plan exists.
- `subscription`: at least one `recurring_subscription` component.
- `seat-based`: at least one `seat` component.
- `usage-based`: at least one `metered_usage` component.
- `credit-based`: at least one `prepaid_credit` component.
- `outcome-based`, `transaction/take-rate`, `service-based`, and
  `enterprise/negotiated`: derived from their corresponding component types.
- `hybrid`: two or more billable component types are active in the same
  purchasable offer (for example base subscription plus metered usage). Store
  the components rather than only this label.

This prevents ambiguous values such as “hybrid subscription + usage” from
becoming an unqueryable taxonomy of strings. Metered billing commonly tracks
units such as API calls, storage, or processing time; a seat charge is a
separate billing model ([Metronome glossary](https://metronome.com/glossary)).

### Charge, value, and cost metrics

Each metric is an object, not a label:

```yaml
metric:
  family: workflow
  unit: resolved_support_case
  display_name: "Fin resolution"
  aggregation: count             # count | sum | duration | percentage | tiered
  direction: increasing          # increasing | decreasing | fixed
  definition: "A support case meeting the vendor's published resolution rule."
```

`charge_metric` is the measure that directly determines a component's price.
`customer_value_metric` is the unit in which the customer receives value.
`cost_metric` is the vendor's disclosed or credibly reported variable cost
driver. The latter two may differ from the charge metric and usually belong in
analysis unless explicitly stated by the vendor.

Allowed `family` values and canonical `unit` examples:

| Family | Canonical units |
| --- | --- |
| `access` | `account`, `organization`, `workspace`, `seat`, `role_seat` |
| `model_consumption` | `input_token`, `output_token`, `token`, `api_request`, `inference`, `model_call` |
| `compute` | `gpu_hour`, `compute_second`, `cpu_hour`, `training_hour` |
| `content_generation` | `image_generated`, `video_second_generated`, `audio_minute_generated`, `generation` |
| `media_processing` | `audio_minute_transcribed`, `video_minute_processed`, `character_processed` |
| `data` | `document`, `page`, `record`, `query`, `dataset_row`, `gb_stored`, `gb_transferred` |
| `communication` | `message`, `email_sent`, `call_minute`, `conversation` |
| `workflow` | `task`, `workflow_run`, `agent_action`, `automation_run`, `resolved_support_case`, `meeting_booked`, `lead`, `application_processed` |
| `output` | `report`, `code_change`, `draft`, `qualified_lead`, `completed_document` |
| `business_outcome` | `revenue_generated`, `cost_saved`, `successful_resolution`, `successful_hire`, `payment_collected` |
| `commerce` | `transaction`, `gross_merchandise_value`, `order` |
| `abstract` | `credit`, `bundle`, `tier` |
| `other` | Only with `display_name` and `definition`; propose a new canonical unit in review. |

“Output” is a deliverable; “outcome” requires a defined real-world success
condition. Do not classify a completed generation as an outcome merely because
it is useful. This distinction matches Bessemer's progression from consumption
to workflow to outcome pricing and the associated transfer of cost risk to the
vendor ([source](https://www.bvp.com/atlas/the-ai-pricing-and-monetization-playbook)).

For credits, also record `credit_rules`: what one credit can buy, whether rates
vary by model/action, whether balances expire, roll over, or auto-recharge, and
whether the mapping is public. `credit` alone is never sufficient to explain
the charge metric.

### Packaging facts

For every public plan, capture only normalized monetization-relevant facts:

```yaml
plans:
  - id: pro
    name: Pro
    availability: public          # public | sales_led | retired
    prices:
      - amount: "20.00"
        currency: USD
        cadence: month            # month | year | one_time | usage | custom
        billing_basis: per_seat   # per_account | per_seat | per_workspace | other
    included_allowances:
      - metric: { family: model_consumption, unit: api_request }
        quantity: 1000
        reset: monthly            # monthly | annual | never | unknown
    limits: []
    monetization_feature_gates: ["premium models"]
    trial: { available: false }
```

Also capture: annual price/discount where explicitly stated, included seats,
overage rules, volume tiers, caps and fair-use terms, add-ons, commitments,
free-plan/trial facts, contact-sales status, and `pricing_url`. Do not copy
marketing prose or entire feature matrices.

## Expansion vectors

Expansion is a **potential recurring revenue growth path for an existing
customer**; it is neither a proven company KPI nor a claim that every customer
will expand. Record one object per path:

```yaml
analysis:
  expansion_vectors:
    - type: usage_volume
      description: "Metered API requests increase spend above the included allowance."
      basis: observed_packaging   # observed_packaging | analyst_inference
      evidence_refs: [src-pricing-2026-08-14]
      confidence: verified
```

Allowed `type` values: `seats`, `usage_volume`, `credit_purchase`,
`higher_usage_tier`, `capability_upgrade`, `premium_model`, `agent_capacity`,
`workflow_capacity`, `data_storage`, `additional_product`, `business_unit`,
`enterprise_upgrade`, `transaction_volume`, `outcome_volume`, `api_volume`,
`committed_spend`, `professional_services`, `cross_sell`, and `other`.

`basis: observed_packaging` is allowed only where a public plan, add-on, or
overage makes the path explicit. `analyst_inference` must say why it is likely;
never call it observed. A sound value metric should scale with customer value,
which is why usage metrics can create a natural expansion path
([OpenView](https://openviewpartners.com/usage-based-pricing)).

## AI economics and monetization controls

`economics.public_data` contains only disclosed or credibly reported facts,
with a source per assertion: gross margin, model/provider dependence,
inference/compute cost commentary, pricing changes attributed to cost, and
public unit economics. Do not calculate or publish an “estimated margin” from
a model price and an assumed token cost.

Use `economics.cost_controls` for observed operational controls such as
`rate_limit`, `fair_use_limit`, `included_allowance`, `model_routing`,
`model_access_gate`, `spend_cap`, `prepaid_commitment`, and `human_review`.
Describe the mechanism and cite the source; do not infer its financial effect.
AI has material per-query compute and sometimes human-in-the-loop costs, a key
reason the dataset keeps economics separate from list pricing
([Bessemer](https://www.bvp.com/atlas/the-ai-pricing-and-monetization-playbook)).

## Fact, analysis, and confidence

### Evidence levels

| Level | Meaning | Permitted use |
| --- | --- | --- |
| `verified` | Direct, current primary-source support for the exact fact. | Observed data and analysis grounded directly in packaging. |
| `high` | Two or more strong sources, or a primary source plus a reliable corroborating source, support the claim. | Analysis and reported economics. |
| `medium` | Plausible interpretation from incomplete but relevant public evidence. | Clearly labeled analysis only. |
| `low` | Tentative interpretation with limited evidence. | Usually withhold from public index; never present as fact. |

Every source records `id`, `url`, `title`, `publisher`, `source_type`,
`accessed_at`, `supports`, and a confidence level. Preferred source order:
official pricing page; official billing/docs; official announcement; filings;
executive interview; high-quality reporting; investor research; other. A source
may support an existence claim but not a number—attach it only to the fields it
actually supports.

### Required separation

```yaml
observed:
  pricing_components: []
  plans: []
  sources: []
analysis:
  customer_value_metrics: []
  cost_metrics: []
  expansion_vectors: []
  monetization_summary: null
  confidence: medium
```

UI and generated exports must label these sections **Observed / sourced** and
**Analysis / interpretation**. A missing source is a validation error for
material observed fields.

## Archetypes

Archetypes are comparative lenses, not mutually exclusive company categories.
They are assigned in `analysis.archetypes` with a rationale and confidence.

| Archetype | Typical observed pattern |
| --- | --- |
| `access_copilot` | Seat or flat subscription for assistive use; may gate premium models or capacity. |
| `consumption_api` | API/inference/token/request charges, often with commitments or volume rates. |
| `credit_wallet` | Prepaid abstract credits redeemable across actions or model tiers. |
| `workflow_agent` | Charges per task, workflow, action, or completed work unit. |
| `outcome_partner` | Charge tied to a defined result, saving, collection, resolution, or revenue. |
| `ai_enabled_service` | Software plus managed/human delivery, typically service fee, project fee, or custom contract. |
| `platform_with_ai_addon` | Existing subscription product monetizes AI separately as add-on, allowance, or premium tier. |
| `capacity_infrastructure` | Compute, GPU, storage, throughput, or reserved-capacity monetization. |
| `transaction_marketplace` | Fee or take rate on a completed commercial transaction. |
| `open_core` | Open-source base plus paid cloud, enterprise, support, capacity, or managed offering. |

Multiple archetypes are expected: an API can be both `consumption_api` and
`credit_wallet`; a vertical agent can be `workflow_agent` and
`outcome_partner`. The assignment must describe the product and current
snapshot, not speculate on a company's intent.

## History and change events

Snapshots are immutable records at `data/snapshots/<company>/<product>/<date>.yaml`.
The current record points to the latest approved snapshot. A material normalized
change yields a reviewed `pricing_event`:

```yaml
date: 2026-08-14
event_type: metric_changed
previous: { component_type: seat, metric: { unit: seat } }
new: { component_type: metered_usage, metric: { unit: workflow_run } }
source_refs: [src-announcement]
significance: "Moves the primary charge from access to completed workflow volume."
confidence: verified
```

Allowed event types: `price_increased`, `price_decreased`, `tier_added`,
`tier_removed`, `free_plan_changed`, `allowance_changed`, `credit_policy_changed`,
`metric_changed`, `architecture_changed`, `overage_changed`, `enterprise_packaging_changed`,
`annual_discount_changed`, and `other`. Candidate diffs are not published as
events until a human verifies the normalized record and source.

## Validation rules

- Canonical units, component types, tags, vectors, archetypes, and confidence
  levels must come from this document's enums.
- Every public numeric price includes currency, cadence, scope, source ref, and
  snapshot date.
- A metered component has at least one `charge_metric`; a credit component has
  `credit_rules`; an outcome fee defines its qualifying outcome.
- Derived labels must agree with components. For example, `hybrid` requires two
  component types in one offer; it is not a synonym for “has several plans.”
- `cost_metric`, expansion vector, and archetype entries have an evidence ref,
  rationale where analytical, and confidence.
- A historic snapshot is never edited to silently match a current pricing page.

