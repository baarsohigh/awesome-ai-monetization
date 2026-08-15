# Awesome AI Monetization

> The open-source database and field guide to how AI products make money.

This project maps AI monetization architecture—not merely pricing-page headlines. A record captures the product, packaging, charge metric, probable customer value metric, expansion mechanics, sourced facts, and clearly labelled analysis.

## Why this exists

AI products often combine variable inference costs with seats, credits, usage, outputs, commitments, or outcomes. A single monthly price cannot describe that design. This repository makes the commercial architecture queryable and version-controlled.

## What is included now

- 25 source-backed product records spanning model APIs, coding, customer support, voice, research, creative work, and AI infrastructure.
- A normalized taxonomy, JSON Schema, dataset validator, generated JSON/CSV exports, CLI, and a local JSON-lines agent adapter.
- Search, architecture filters, up-to-three-product comparison, and detailed source/analysis-separated research records.

## Use it

```bash
npm install
npm run validate:data
npm run generate:data
npm run analyze:data
npm run dev

# Query the canonical records
npm run ai-monetization -- search credit
npm run ai-monetization -- company cursor
npm run ai-monetization -- compare cursor github-copilot
```

Generated exports are written to `data/generated/`. `data/companies/` is the source of truth; do not edit generated files.

The local agent adapter accepts one JSON request per line:

```bash
printf '{"tool":"search_ai_monetization","arguments":{"query":"outcome"}}\n' | node mcp/server.mjs
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), the [taxonomy](docs/taxonomy.md), and [methodology](docs/methodology.md). Add only public, attributable pricing facts; the official vendor source always wins over this dataset.

## Project principles

- Facts and analysis are separate.
- Every material fact has dated source provenance.
- Hybrid models retain their components instead of being flattened into one label.
- Unknown is valid. Private enterprise terms are never estimated.
- Historical changes append events/snapshots; they do not overwrite evidence.

## License and disclaimer

Code is [MIT](LICENSE). Project-authored data and documentation are [CC BY 4.0](LICENSE-DATA). Pricing changes frequently; official vendor sites remain authoritative. The project provides research, not business, legal, or financial advice.

Maintained as an open research project. See [the licensing decision](docs/licensing-decision.md) for treatment of third-party source material.
