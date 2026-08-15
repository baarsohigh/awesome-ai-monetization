# Contributing

Thanks for improving the public record of AI monetization.

## Add or update a record

1. Copy a small, comparable JSON record in `data/companies/` and use a stable kebab-case product ID.
2. Record publicly available facts in `observed`, using official pricing or billing documentation wherever possible.
3. Add a dated source for every material claim. Do not paste copyrighted pricing tables or circumvent access controls.
4. Put interpretation in `analysis`, state confidence, and describe why the source supports it.
5. Run `npm run validate:data`, `npm run generate:data`, `npm run lint`, and `npm test`.

For a pricing change, create a dated record under `data/snapshots/` and a reviewed event rather than editing history. Until the snapshot system is introduced, open an issue with the previous and new official URLs/values.

## Editorial rules

- Prefer a primary source. Mark unsupported or inaccessible facts as unknown.
- Capture product-level data; do not merge an API and consumer plan into one record.
- Do not estimate private contract prices or economics.
- Keep descriptions analytical and concise. Marketing claims are not evidence.

## Classification disputes

Open an issue with the proposed taxonomy value, evidence, and why the current classification is misleading. Taxonomy changes are welcome when they improve queryability without erasing nuance.
