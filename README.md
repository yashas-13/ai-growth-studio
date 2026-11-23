# AI Growth Studio

A demonstrator for the AI Growth Studio product proposal: AdGenius AI, BrandPilot AI, LeadHunter AI, MarketPulse AI + AEO, and a vendor-neutral CRM orchestration layer.

## Status

**Prototype / demo data only.** AI outputs, KPIs, leads, connector states and AEO observations are illustrative. No advertising account, external CRM, search engine, or AI provider is connected. No real prospect verification or external action is performed.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS 4
- Local client state for the prototype

## Run locally

Node.js 22+ recommended.

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Build checks

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

## Product workspaces

- **AdGenius AI:** business brief, audience, objective, sample campaign strategy, sample ad copy and budget.
- **BrandPilot AI:** brand onboarding, identity preview, color palette and voice principles.
- **LeadHunter AI:** illustrative prospects, rule-based demo scores and outreach draft affordance.
- **MarketPulse AI:** defined-query AEO audit interface and illustrative sample report.
- **CRM Hub:** canonical entities, connector readiness and simulated sync activity.
- **Settings:** workspace profile and configuration state.

## Target architecture (not yet implemented)

The product proposal calls for five layers:

1. Unified workspace and role-aware experience.
2. Specialized AI product suite.
3. CRM abstraction and connectors.
4. Shared AI/data services, workflow, analytics, usage and audit.
5. Cloud and storage foundation.

Proposed production components: PostgreSQL with tenant isolation, Redis/BullMQ workers, provider-agnostic AI gateway, server-side secret management, OAuth 2.0 CRM connectors, signed webhooks, idempotent sync, immutable audit events and S3-compatible asset storage.

## Security and production gap

This prototype intentionally does not implement authentication, tenant persistence, provider calls, OAuth, lead scraping, real analytics, billing or external synchronization. Do not use it with production customer data. Those capabilities need threat modelling, authorization tests, tenant-isolation tests, retention/deletion workflows, secret handling, provider contract tests and operational monitoring before launch.

## Roadmap

1. Foundation, auth/organizations, schema and AdGenius end-to-end workflow.
2. BrandPilot identity generation, editable content and export.
3. LeadHunter qualification, outreach drafts, canonical CRM model and one real connector.
4. MarketPulse source-backed competitive/SEO/AEO reporting, observability, pilot validation and deployment hardening.

Pricing in the source proposal is illustrative and must be validated with pilot customers.
