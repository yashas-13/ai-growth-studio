# Product roadmap and execution backlog

## Milestone 0 — Prototype foundation
- [x] Isolated Next.js App Router project and responsive app shell.
- [x] AdGenius campaign workflow, BrandPilot identity preview, LeadHunter pipeline, MarketPulse AEO demo and CRM Hub.
- [x] Explicit sample-data labels and no live external integrations.
- [ ] Dependency installation, lint, type and production build verification.
- [ ] Create GitHub repository and publish initial commit.
- [ ] CI, issue templates and security scanning.

## Milestone 1 — Secure platform foundation
- [ ] ADRs for auth, tenancy, AI provider policy and retention.
- [ ] PostgreSQL schema and versioned migrations.
- [ ] Authentication, organizations, memberships and RBAC.
- [ ] Tenant-scoped service layer and database policy tests.
- [ ] Audit event schema and append-only writes.
- [ ] Redis queue, worker lifecycle, retries and dead-letter handling.
- [ ] API contracts with Zod and generated client types.

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
