

## Architecture baseline — November 2026
- [x] Move the main workspace UI out of the root route into a feature-owned component.
- [x] Add independent App Router entrypoints for dashboard, campaigns, brand, leads, market, CRM and settings.
- [x] Add route scaffolds for campaign/lead details, brand assets/calendar, lead import/segments/outreach, market audits/keywords/competitors/reports, CRM records/connectors/sync and settings subpages.
- [x] Add public identity page shells; authentication forms remain disabled until an identity provider is integrated.
- [x] Document modular-monolith architecture, repository structure, page inventory, API conventions and ADR-002.
- [x] Add fail-closed workspace authorization seam, standard API response/error envelope and tenant-scoped lead repository/service example.
- [x] Add versioned GET/POST leads endpoint with server-derived tenant context, Zod validation, pagination, body limit and transactional audit event.
- [ ] Wire Auth.js (database sessions), account lifecycle, CSRF protections and permission matrix.
- [ ] Complete feature UI decomposition; remove remaining demo state and replace it with typed server data loaders and feature API clients.
- [ ] Provision local PostgreSQL, create reviewed migrations, seed development fixtures and verify tenant isolation.
- [ ] Expand Prisma domain models for campaigns, brand assets, content calendar, ICP/segments, CRM canonical entities, connectors, sync jobs, AI usage, approvals, outbox and audit retention.
- [ ] Add PostgreSQL RLS policies after transaction-local tenant context is verified.
- [ ] Implement AI gateway, queue/outbox worker, storage adapter and first CRM connector.
- [ ] Add unit/integration/contract/e2e tests, request IDs, rate limiting, observability, backup/restore and security scanning.

See docs/architecture/SYSTEM-ARCHITECTURE.md, FILE-STRUCTURE.md, PAGE-INVENTORY.md, ADR-002-modular-monolith.md and docs/api/API-CONVENTIONS.md.
