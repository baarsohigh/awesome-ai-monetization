# Data model

`data/companies/*.json` is the current canonical record collection. Each record identifies a company and product, normalized classifications, `observed` source-backed facts, `analysis` interpretations, source provenance, and verification metadata.

The JSON Schema at `data/schema/company.schema.json` establishes the required first-release fields. Records use `pricing_components` to preserve combined subscription, seat, usage, credit, and contract mechanics. `charge_metrics` describe billable units; `customer_value_metrics` describe the customer result or work unit the analysis believes the charge relates to.

`data/generated/catalog.json` is a nested programmatic export; `data/generated/catalog.csv` is a flat analytical export. Generated files are reproducible from `npm run generate:data`.

The next migration introduces immutable dated snapshots and normalized pricing events under `data/snapshots/` and `data/events/`; the schema already leaves room for `pricing_events` without treating the current record as an overwriteable history source.
