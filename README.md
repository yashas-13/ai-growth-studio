# AI Growth Studio

Multi-tenant AI growth operations platform built as a Next.js modular monolith with Supabase Auth, PostgreSQL, Row Level Security and private Storage.

## Current status

**Backend foundation connected; feature UI remains partly demo/scaffold.** Supabase project and schema are provisioned. Email/password auth, PKCE callback, cookie-backed SSR session refresh, workspace bootstrap, membership authorization, RLS and the first persistent Leads API are implemented. Campaign, BrandPilot, CRM and MarketPulse tables exist, but their complete workflows and provider integrations are not finished.

## Stack

- Next.js App Router 16, React 19, TypeScript, Tailwind CSS 4
- Supabase Auth with @supabase/ssr (PKCE and cookie-backed sessions)
- Supabase PostgreSQL 17, typed Supabase client, RLS and private Storage
- Zod validation; modular-monolith server modules

## Supabase project

- Name: AI Growth Studio
- Region: South Asia (Mumbai), ap-south-1
- Project ref: qqlhtdxcwnwqrzemkvhc
- URL: https://qqlhtdxcwnwqrzemkvhc.supabase.co

Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and NEXT_PUBLIC_APP_URL in your local environment. Use only the publishable key in browser-capable configuration. Never expose a Supabase secret/service-role key. See docs/SUPABASE-SETUP.md.

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

## Product areas

- AdGenius AI: campaign strategy and advertising operations
- BrandPilot AI: brand profile, assets and content calendar
- LeadHunter AI: lead intake, qualification and outreach
- MarketPulse AI: competitor, keyword, SEO and AEO research
- CRM Hub: companies, contacts, deals, activities and connectors
- Settings: workspace, team, AI providers, integrations, security and billing

Routes exist for these product areas. Treat scaffold/placeholder screens as incomplete until their persistence, validation, authorization and workflows are implemented.

## Architecture

A modular monolith: App Router pages and thin API handlers -> feature-owned use cases -> server-side Supabase clients -> PostgreSQL with RLS. Workspace membership and role checks are enforced in server code and again by RLS. Storage objects are private and tenant-prefixed. AI/provider jobs, outbox processing, OAuth connectors, billing and external integrations are planned but not implemented.

## Production gate

Do not onboard production customers until production hostname/redirect allowlists, email delivery/templates, cross-tenant negative tests, end-to-end tests, observability, backup/restore, rate limiting, retention and deployment secrets are verified. Core module workflows must be completed before release.
