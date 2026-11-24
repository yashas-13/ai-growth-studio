# Roadmap — AI Growth Studio

## Authenticated persistent product workflows

- [x] Supabase Auth SSR and protected workspace shell.
- [x] Tenant context and role enforcement on server actions.
- [x] RLS on all exposed public tables and tenant-safe composite relationships.
- [x] Transactional audit events for resource mutations.
- [x] Campaign CRUD and detail.
- [x] Brand profiles, private assets and content calendar.
- [x] Leads CRUD, CSV import, saved segments and approval-gated outreach drafts.
- [x] Competitors, keywords and manual evidence reports.
- [x] CRM companies, contacts, deals and activities.
- [x] Workspace preferences, membership role management, provider metadata, notifications and audit history.

## External execution and automation

- [ ] Implement server-side AI provider adapters, credential vault, prompt/version management, quotas, metering and retry policy.
- [ ] Add AI-assisted campaign planning, brand content generation, lead enrichment/scoring and evidence-grounded market analysis.
- [ ] Connect ads/social providers with OAuth, scoped tokens, spend limits, approval and publishing reconciliation.
- [ ] Connect email provider with verified domain, consent checks, approval queue, idempotent delivery and bounce handling.
- [ ] Implement CRM OAuth connectors, mapping, incremental sync cursors, idempotency and dead-letter/reconciliation flows.
- [ ] Implement crawl/SEO/AEO collection with source provenance, robots/terms controls and scheduled refresh.
- [ ] Add billing/subscriptions, entitlement checks and AI usage metering.
- [ ] Add durable notification/outbox workers.

## Release readiness

- [ ] Verify Supabase Auth callback URLs, email templates and SMTP.
- [ ] Export hosted migrations into version-controlled local `supabase/migrations`.
- [ ] Add unit, integration, RLS cross-tenant negative, API contract and browser E2E tests.
- [ ] Add secure asset malware scanning and signed download lifecycle.
- [ ] Configure CI/CD, secrets, observability, backups, restore drills, alerts and incident runbooks.
- [ ] Complete threat model and independent security review before customer data onboarding.
