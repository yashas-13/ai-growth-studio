# Roadmap — AI Growth Studio

## Supabase foundation

- [x] Provision Supabase project in Mumbai.
- [x] Create multi-tenant schema for identity, workspaces, memberships, leads, campaigns, brand, CRM, market research and audit events.
- [x] Enable RLS and workspace membership policies.
- [x] Create private brand-assets Storage bucket with workspace-scoped object policies.
- [x] Integrate Supabase Auth SSR, cookie refresh, signup/login, callback and workspace bootstrap.
- [x] Connect the first tenant-scoped Leads API to Supabase.
- [x] Generate database TypeScript types and remove Prisma runtime dependencies.
- [ ] Export hosted migrations into version-controlled supabase/migrations files with Supabase CLI.

## Product completion

- [ ] Replace demo UI state with authenticated workspace data loaders and server actions/API clients.
- [ ] Complete Leads CRUD, detail view, import validation, segments, scoring and outreach approval.
- [ ] Complete Campaign CRUD, budgets, channel execution model and analytics.
- [ ] Complete Brand profile, asset upload/download, content calendar and publishing workflow.
- [ ] Complete CRM companies, contacts, deals, activities, connectors and idempotent sync.
- [ ] Complete MarketPulse audits, keywords, competitors, evidence-backed reports and scheduled refresh.
- [ ] Implement AI gateway with provider adapters, secret isolation, usage metering, quotas, prompt/version tracking and human approval.
- [ ] Add durable jobs/outbox, retries, idempotency, rate limits, observability and audit retention.

## Release readiness

- [ ] Configure Supabase Auth email templates, SMTP, callback URLs and production site URL.
- [ ] Add unit, integration, RLS cross-tenant negative, API contract and browser E2E tests.
- [ ] Add secure asset validation, malware scanning and signed download flows.
- [ ] Configure production secrets, CI/CD, backups, restore drills, alerts and incident runbooks.
- [ ] Perform threat model and independent security review before customer data onboarding.
