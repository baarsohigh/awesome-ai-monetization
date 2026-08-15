---
name: monetization-classifier
description: Classifies observed AI product pricing into the repository's monetization taxonomy. Use after source-backed pricing facts are extracted to identify product models, pricing components, charge and value metrics, expansion vectors, and analyst confidence.
---

# Monetization classifier

1. Classify components independently; never collapse a hybrid model into one label.
2. Put source-backed observations in `observed`; put reasoned interpretation in `analysis` with confidence.
3. Use `unknown` in prose when public evidence cannot support a conclusion.
4. Name expansion only when a source or explicit pricing architecture supports how customer value can increase vendor revenue.
5. Link classifications to the definitions in `docs/taxonomy.md` and validate taxonomy strings before committing.
