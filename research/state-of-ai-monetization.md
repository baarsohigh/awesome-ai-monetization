# State of AI Monetization — seed report

_Generated 2026-08-15 from 25 validated canonical product records. This is intentionally a seed-cohort report, not a market-wide estimate._

## What the current sample shows

- **21 of 25** products include a usage-priced component.
- **7 of 25** products use credits as a customer-facing abstraction.
- **9 of 25** products include a seat charge.
- **9 of 25** offer an observed free-access tier.

## Pricing components

| Component | Records |
| --- | ---: |
| usage-based | 21 |
| enterprise-contract | 21 |
| subscription | 14 |
| model-specific | 10 |
| freemium | 9 |
| seat-based | 9 |
| credit-based | 7 |
| included-usage | 6 |
| included-credits | 5 |
| tiered | 3 |
| batch-discount | 2 |
| capability-based | 2 |
| hybrid-seat-usage | 2 |
| outcome-based | 2 |
| platform-fee-usage | 1 |
| project-based | 1 |

## Charge metrics

| Charge metric | Records |
| --- | ---: |
| model-usage | 11 |
| input-token | 10 |
| output-token | 10 |
| user-seat | 8 |
| credit | 6 |
| audio-minute | 3 |
| character | 2 |
| cached-input-token | 2 |
| cache-read | 1 |
| cache-write | 1 |
| ai-credit | 1 |

## Evidence-led patterns, not market claims

1. **The seed contains two distinct abstraction strategies.** Model APIs price technical consumption directly (tokens/cache); application products frequently use seats, credits, or model usage to make consumption legible to the buyer.
2. **Hybrid architecture is operationally important.** Cursor and GitHub Copilot demonstrate recurring user pricing plus variable model capacity. The fixed component supports budgetability; the variable component protects expansion when work intensifies.
3. **Credits are not a value metric by themselves.** They are a translation layer. A usable record still needs the underlying billable action and the customer-facing work unit.

## Reproduce

Run `node scripts/analyze.mjs` after `npm run validate:data`. No external data or hidden calculation is used.
