# Licensing decision

## Recommendation

Use a **split license**:

- **Code:** [MIT License](https://spdx.org/licenses/MIT.html).
- **Canonical data and generated datasets:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Original documentation and taxonomy:** CC BY 4.0, unless a future contributor policy requires a different documentation license.

Add a root `LICENSE` (MIT), a `LICENSE-DATA` (CC BY 4.0), and a short `LICENSES.md` that maps each repository path to its license. Put the license field in every data export and API response.

## Rationale

MIT keeps the software easy to adopt, embed, and contribute to. CC BY 4.0 makes the data reusable in research, products, and AI tools while requiring attribution to the project—important for a maintained, source-backed corpus. This is a clearer fit than copyleft for a reference database and less permissive than CC0 for a project whose provenance and maintenance should remain visible. ComparEdge is a relevant precedent: its public comparison data is published under [CC BY 4.0](https://github.com/comparedge/awesome-saas-comparison-data).

## Guardrails

- Publish normalized facts, short quotations only when necessary, source URLs, and the project's own analysis—not copied vendor page layouts, full feature matrices, or third-party database exports.
- Cite the original source for each material datapoint. A source link is provenance; it does **not** transfer that source's copyright or database rights.
- Require contributors to attest that submissions are original normalization/analysis or permissibly used, and preserve source/access dates.
- Treat third-party imports as exceptions: record their license and terms in an import manifest; do not merge incompatible data into CC BY releases.
- Mark generated outputs as derivative dataset releases with a version/date and retain the canonical-record provenance.

## Revisit trigger

Revisit this choice before accepting substantial third-party dataset imports, paid-data contributions, or jurisdictions where database-rights treatment becomes material. The core principle should remain: broad reuse of project-authored structured data, transparent attribution, and no implied rights in underlying vendor content.
