---
name: ai-pricing-extractor
description: Extracts source-backed AI product pricing architectures from public official pages. Use when adding or verifying an AI company pricing record, especially token APIs, credits, hybrid seat-plus-usage plans, outputs, or outcome pricing.
---

# AI pricing extractor

1. Prefer official pricing, billing docs, product docs, and announcements; never infer a factual price from a search snippet.
2. Capture only normalized facts: plan, price, frequency, charge unit, included allowance, overage, free access, contract/custom status, and source URL.
3. Record the access date and which fields each source supports. Flag ambiguity instead of filling it.
4. Keep cost unit, product usage unit, customer-facing charge metric, and customer value metric distinct.
5. Run `npm run validate:data` and `npm run generate:data` after editing a record.
