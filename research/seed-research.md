# Seed research — AI monetization database

Research captured 2026-08-14. This is source material, not import-ready data. Prices are USD and are intentionally limited to facts visible on first-party pages. Dynamic pricing pages and regional/annual toggles may differ at import time.

## 1. OpenAI API
- **Category / buyer:** Foundation-model API for developers and enterprises.
- **Architecture observed:** Usage pricing by model and modality; token prices distinguish input, cached input, and output where applicable. Separate tool / image / audio rates are present.
- **Authoritative source:** https://openai.com/api/pricing/
- **Uncertainty:** Do not freeze an individual model price from this note: the official page is a live rate card and model roster changes frequently.

## 2. Anthropic API
- **Category / buyer:** Foundation-model API for developers and enterprises.
- **Architecture observed:** Pay-as-you-go API pricing; official list-price material distinguishes standard and batch processing, input/output tokens, cache writes, and cache hits. Paid API contracts aggregate usage across API calls and Console chats.
- **Authoritative sources:** https://www.anthropic.com/pricing ; https://support.anthropic.com/en/articles/8114526-how-will-i-be-billed
- **Uncertainty:** The public marketing pricing page is not consistently crawlable; validate current model-specific rates directly before publishing.

## 3. Cursor
- **Category / buyer:** AI code editor for individuals and software teams.
- **Architecture observed:** Freemium subscription plus included model/API usage and paid overages. Individual Pro is listed at $20/mo; Teams at $40/user/mo; Enterprise is custom. Model choice changes consumption; background agents are charged at selected-model API pricing.
- **Authoritative sources:** https://cursor.com/pricing ; https://docs.cursor.com/account/pricing
- **Uncertainty:** Individual higher tiers and included usage can change; model-specific quotas are not a durable universal unit.

## 4. GitHub Copilot
- **Category / buyer:** AI coding assistant / agent for developers, organizations, and enterprises.
- **Architecture observed:** Free and per-user subscriptions, paired with monthly AI-credit allowances and purchasable additional usage. Individual list prices: Free $0, Pro $10/user/mo, Pro+ $39/user/mo, Max $100/user/mo. GitHub defines 1 AI credit as $0.01; completions / next-edit suggestions are described as unlimited on paid plans.
- **Authoritative sources:** https://github.com/features/copilot/plans ; https://docs.github.com/en/billing/concepts/product-billing/github-copilot-billing
- **Uncertainty:** Business/enterprise terms and model-credit conversion need separate capture; they should not be inferred from individual plans.

## 5. ElevenLabs
- **Category / buyer:** Generative voice/audio platform and API for creators, developers, and enterprises.
- **Architecture observed:** Free-to-enter subscription tiers with monthly credits, optional pay-as-you-go overages on eligible tiers, and custom enterprise. Current pricing page lists Free $0 / 10k credits, Starter $5 / 30k, Creator $11 / 100k, Pro $99 / 500k, Scale $330 / 2m, Business $1,320 / 11m. Credits can span products; paid unused credits may roll over up to two months.
- **Authoritative sources:** https://elevenlabs.io/pricing ; https://elevenlabs.io/docs/overview/administration/billing ; https://help.elevenlabs.io/hc/en-us/articles/24351324241937-What-is-the-price-for-usage-based-billing
- **Uncertainty:** Credit-to-output conversion varies by model/product; promotional first-month prices should be stored separately from list price.

## 6. Intercom Fin AI Agent
- **Category / buyer:** Customer-service AI agent; can be bought with Intercom or used with an existing helpdesk.
- **Architecture observed:** Outcome-based usage pricing layered onto support-seat plans. Fin is $0.99 per outcome; existing-helpdesk deployment has no seat cost but a stated minimum monthly commitment (example: 50 outcomes). Intercom lists Essential at $19/seat/mo on the shown annual view; Pro AI add-on is $99/mo and Copilot is $29/agent/mo annually.
- **Authoritative sources:** https://www.intercom.com/pricing ; https://www.intercom.com/help/en/articles/7837535-fin-ai-agent-faqs
- **Uncertainty:** Advanced/Expert seat prices were obscured in the rendered pricing result; capture through page/API inspection rather than estimating.

## 7. Notion AI / Notion Agent
- **Category / buyer:** AI-enabled workspace for knowledge work and teams.
- **Architecture observed:** Seat-based workspace tiers plus included/trial AI and a usage-priced agent layer. Free $0, Plus $10/member/mo, Business $20/member/mo, Enterprise custom (monthly view). Notion says core AI is included in Business/Enterprise; Custom Agents are $10 per 1,000 credits after trial.
- **Authoritative sources:** https://www.notion.com/pricing ; https://www.notion.com/product/ai
- **Uncertainty:** Exact feature inclusion varies by plan and beta status; distinguish workspace subscription, AI Core, and Custom Agent credits in the schema.

## 8. Jasper
- **Category / buyer:** AI marketing platform for brands and marketing teams.
- **Architecture observed:** Per-seat subscription with Pro at $69/month monthly or $59/month billed yearly; Business custom. Pro includes one seat, brand voices / knowledge assets / audiences; Business adds more complex agents and enterprise capabilities.
- **Authoritative source:** https://www.jasper.ai/pricing
- **Uncertainty:** No public consumption price is shown for agent execution; do not label it usage-based without further evidence.

## 9. Descript
- **Category / buyer:** AI-assisted audio/video editor for creators and media teams.
- **Architecture observed:** Free plus per-editor subscriptions with included media hours and AI credits, top-ups on paid plans, and custom enterprise. Shown annual-equivalent monthly prices: Hobbyist $16 (10 media hrs, 400 credits), Creator $24 (30 hrs, 800 credits), Business $50 (40 hrs, 1,500 credits). The page says AI credits track features such as Underlord, Studio Sound, and generated media/avatars.
- **Authoritative source:** https://www.descript.com/pricing
- **Uncertainty:** The page presents monthly and annual controls; store billing cadence alongside price because the displayed annual-equivalent and monthly prices differ.

## 10. Replit
- **Category / buyer:** AI application-building platform with deployment/cloud services.
- **Architecture observed:** Free Starter, subscription with included platform credits, then usage-based spending. Shown annual prices: Core $20/mo with $25 monthly credits; Pro $95/mo with $100 monthly credits; Enterprise custom. Credits cover Agent and cloud services; Agent uses effort-based pricing and can pass through third-party model costs at public API rates.
- **Authoritative sources:** https://replit.com/pricing ; https://docs.replit.com/billing/ai-billing
- **Uncertainty:** Credits apply across multiple product surfaces (agent, deployment, storage, DB); an import must model the shared credit pool rather than treating it as AI-only.

## 11. Bolt.new
- **Category / buyer:** AI-powered web/app builder with hosting.
- **Architecture observed:** Free usage allowance, subscription with token allowance, team per-member pricing, custom enterprise. Free: 300k tokens/day and 1m/month. Pro: $25/mo, starts at 10m tokens/month. Teams: $30/mo/member. Paid tokens roll over for one additional month with an active subscription.
- **Authoritative source:** https://bolt.new/pricing
- **Uncertainty:** “Starts at 10m tokens” implies selectable/tiered Pro capacity; collect each purchasable tier before creating price rows.

## 12. Lovable
- **Category / buyer:** AI software engineer / web-app builder for workspaces.
- **Architecture observed:** Workspace-level credit subscription, not per-seat: all plans can have unlimited members, sharing a credit pool. Credits fund building, cloud hosting, and AI features inside deployed apps; Free includes 5 daily build credits (up to 30/month), 20 monthly Cloud credits, and 4 AI-feature credits. Example default-mode task costs are published; Plan Mode is 1 credit/message.
- **Authoritative source:** https://lovable.dev/pricing
- **Uncertainty:** Search rendering did not expose a complete current paid-price table. The product’s own blog says Pro tiers start at $25/mo, but use the live pricing UI before recording an exact tier/allowance.

## 13. Anthropic Claude (end-user / team)
- **Category / buyer:** AI assistant for individuals and organizations.
- **Architecture observed:** Seat subscription and API-usage hybrid for Team: Anthropic’s pricing page states $20 per seat/month plus usage billed at API rates. This differs materially from API-only billing and is worth a separate product/package record.
- **Authoritative source:** https://claude.com/pricing
- **Uncertainty:** Capture individual Pro/Max and Enterprise prices separately; this note records only the observed Team construction.

## 14. Intercom Copilot
- **Category / buyer:** Teammate-facing AI assistant inside the Intercom inbox.
- **Architecture observed:** Seat add-on with included free monthly sample usage. Unlimited Copilot is $35/teammate/month monthly or $29/teammate/month annually; each agent receives 10 Copilot and 10 AI auto-translation conversations monthly at no added cost.
- **Authoritative source:** https://www.intercom.com/help/en/articles/9121384-copilot-included-and-unlimited-usage
- **Uncertainty:** This is a distinct monetization unit from Fin’s customer-outcome pricing, even though both are Intercom AI products.

## 15. ElevenAgents (ElevenLabs)
- **Category / buyer:** Voice, multimodal, and text conversational agents.
- **Architecture observed:** Agent call usage is usage-priced on top of applicable subscriptions; voice calls are duration-based and LLM costs are passed through separately. Text-only calls are priced per text message; higher subscriptions receive included voice minutes and lower incremental rates.
- **Authoritative source:** https://help.elevenlabs.io/hc/en-us/articles/29298065878929-How-much-does-ElevenAgents-cost
- **Uncertainty:** Product is nested within ElevenLabs’ credit system; make the data model capable of package allowance plus feature-level consumption plus third-party pass-through cost.

## Cross-cutting schema implications
- A single vendor can have multiple monetized AI products with different value metrics (e.g., Intercom Fin outcomes vs. Copilot seats; ElevenLabs content credits vs. agent minutes/messages).
- Preserve `billing_basis` as a first-class field: seat, credit, token, outcome, task/effort, minute, message, API token, or custom.
- Preserve `included_allowance`, `overage`, `rollover/expiry`, `billing_cadence`, `scope` (individual/workspace/seat), and source capture date. Do not coerce vendor credits into dollars unless the vendor publishes a stable conversion.
