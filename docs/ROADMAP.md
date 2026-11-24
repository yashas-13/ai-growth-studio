# Product roadmap and execution backlog

## Milestone 0 — Prototype foundation
- [x] Isolated Next.js App Router project and responsive app shell.
- [x] AdGenius campaign workflow, BrandPilot identity preview, LeadHunter pipeline, MarketPulse AEO demo and CRM Hub.
- [x] Explicit sample-data labels and no live external integrations.
- [x] Dependency installation, lint, type and production build verification.
- [x] Create GitHub repository and publish initial commit.
- [x] CI and issue templates.
- [ ] Dependency security remediation for Prisma CLI transitive advisory.

## Milestone 1 — Secure platform foundation
- [x] ADR for auth, tenancy, AI provider policy and retention boundaries.
- [x] Initial PostgreSQL schema: users, workspaces, memberships, leads and audit events.
- [x] Prisma 7 client generation and database adapter setup.
- [x] Liveness and database-readiness endpoints.
- [x] Zod create-lead payload contract.
- [ ] Provision PostgreSQL and configure secret DATABASE_URL.
- [ ] Generate and apply versioned migrations against the approved database.
- [ ] Authentication, organizations, memberships and RBAC enforcement.
- [ ] Tenant-scoped service layer and PostgreSQL RLS / cross-tenant negative tests.
- [ ] Append-only database audit permissions and immutable event pipeline.
- [ ] Redis queue, worker lifecycle, retries and dead-letter handling.
- [ ] API contracts and integration tests.

## Milestone 2 — AdGenius AI
- [ ] Campaign brief model and validation.
- [ ] Versioned prompt registry and golden test set.
- [ ] AI gateway with structured output and usage/cost/latency telemetry.
- [ ] Campaign, audience, channel, creative and budget workflow.
- [ ] Editable drafts and export.
- [ ] Approval gates; no ad publishing without explicit authorization.

## Milestone 3 — BrandPilot AI
- [ ] Brand profiles and asset metadata.
- [ ] Voice/personality and style-token generation.
- [ ] Brand kit editing, versioning and export.
- [ ] Content calendar generation and approvals.
- [ ] Tenant-scoped object storage.

## Milestone 4 — LeadHunter + CRM
- [ ] Configurable ICP and qualification criteria.
- [ ] Authorized company data sources with provenance.
- [ ] Deterministic and explainable lead scoring.
- [ ] Outreach drafting with consent/compliance constraints.
- [ ] Canonical lead/contact/account/activity schema.
- [ ] First connector (HubSpot), OAuth/token refresh and mappings.
- [ ] Idempotent sync, signed webhooks, backoff and reconciliation.
- [ ] Salesforce adapter after connector contract tests pass.

## Milestone 5 — MarketPulse + AEO
- [ ] Competitor onboarding and public page analysis.
- [ ] SEO keyword gap workflow.
- [ ] Curated prompt sets and authorized platform collection methodology.
- [ ] Citation observations with timestamps and provenance.
- [ ] Structured data/entity audit.
- [ ] Historical reporting with coverage disclosure.
- [ ] No universal ranking claims where the platform does not expose data.

## Milestone 6 — Pilot and production readiness
- [ ] Recruit 3–5 pilot businesses.
- [ ] Measure task completion, output quality, weekly return and willingness to pay.
- [ ] Threat model, SAST/dependency/secret scanning and penetration test.
- [ ] Backup/restore and incident response runbooks.
- [ ] Rate limiting, tenant quotas, usage metering and billing policy.
- [ ] Monitoring, alerts, SLOs, structured logs and tracing.
- [ ] Deployment, rollback and data migration runbooks.
