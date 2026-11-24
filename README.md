# AI Growth Studio

Multi-tenant AI growth operations platform built as a Next.js modular monolith with Supabase Auth, PostgreSQL, Row Level Security and private Storage.

## Current implementation status

**Authenticated persistent workspace foundation and CRUD workflows are implemented. External AI execution, provider OAuth, campaign publishing, email delivery and billing are not yet connected.** The UI no longer uses the old seeded lead/campaign records or session-only mutations.

## Stack

- Next.js App Router 16, React 19, TypeScript, Tailwind CSS 4
- Supabase Auth with `@supabase/ssr` (PKCE and cookie-backed sessions)
- Supabase PostgreSQL 17, generated TypeScript database types, RLS and private Storage
- Zod validation and server actions; modular-monolith server modules

## Supabase project

- Name: AI Growth Studio
- Region: South Asia (Mumbai), `ap-south-1`
- Project ref: `qqlhtdxcwnwqrzemkvhc`
- URL: `https://qqlhtdxcwnwqrzemkvhc.supabase.co`

Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_APP_URL` in the local environment. Never expose a Supabase secret/service-role key.

## Persistent workflows

- **AdGenius AI:** create, list, update and delete campaign records; manage channel, budget, dates and lifecycle status.
- **BrandPilot AI:** persist brand profiles; upload/download private brand assets; manage content drafts, approval states and planned publish times.
- **LeadHunter AI:** lead CRUD, fit-score/status maintenance, CSV import (500 rows/import, duplicate email filtering), saved JSON filter segments, outreach draft creation and owner/admin approval/rejection.
- **MarketPulse AI:** persistent competitor records, keyword tracking and timestamped research/audit reports with JSON evidence payloads.
- **CRM Hub:** persistent companies, contacts, deals and activities. Relationship writes are validated against the current workspace and enforced again with composite foreign keys.
- **Settings:** workspace name/timezone/locale, membership role changes, provider/integration metadata, notification preferences, security overview and audit history.

All workspace mutations run server-side using the authenticated Supabase session. Tenant identity is derived from the current membership; clients cannot choose a workspace ID for writes. RLS is enabled on every public application table. Resource mutations are recorded transactionally by database audit triggers.

## Deliberate integration boundaries

The following are **not** represented as connected or operational:

- AI generation: provider metadata can be saved, but API credentials/model execution and usage metering are not connected.
- Ads and social: campaign plans are stored; no external ad account is authorized and no campaign is published.
- Email/outreach: drafts can be reviewed and approved; approval does not send email.
- CRM connectors: provider metadata can be saved; OAuth authorization, field mapping and sync workers are pending.
- Market intelligence: reports/evidence can be recorded; no crawler, SEO provider or live AEO observation engine is connected.
- Billing: no payment processor, subscriptions or usage metering is configured.
- Notifications: workspace preferences persist; no delivery worker is active.
- Team invitations: existing membership roles can be managed by the workspace owner; invite email delivery is not configured.

## Run locally

Node.js 22+ recommended.

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Checks

```powershell
npm run lint
npm run typecheck
npm run build
npm audit
```

## Production release gates

Configure Supabase Auth callback URLs and SMTP; configure server-side AI/provider secrets through a managed secret store; implement OAuth connectors, queue workers, idempotent sync, provider rate limits and quotas; add automated integration/RLS cross-tenant tests and browser E2E tests; configure CI/CD, observability, backup/restore and incident response. Do not enable outbound sends, ad spend or publishing until approval and consent controls are tested.
