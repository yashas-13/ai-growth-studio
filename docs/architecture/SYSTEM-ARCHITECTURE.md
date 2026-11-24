# AI Growth Studio — Production Architecture

**Status:** Target architecture / implementation baseline  
**Application style:** Modular monolith  
**Runtime:** Next.js App Router, Node.js, TypeScript  
**Database:** PostgreSQL + Prisma ORM 7 driver adapter

## 1. Architecture decision

Start as a modular monolith. One deployable web application owns the user experience, API boundary and synchronous business use cases. Feature modules have explicit ownership and may not import another module's repository or Prisma models directly. Cross-module operations go through exported application services or domain events. Extract workers and services only when throughput, isolation, compliance or team ownership justifies the operational cost.

## 2. System context

- Browser: server-rendered route shell and client components for interactive forms, filters and charts.
- Next.js application: pages, layouts, route handlers, session resolution and API composition.
- Application/domain layer: use cases, validation, policies, domain types and business invariants.
- Infrastructure: Prisma repositories, PostgreSQL, queue adapter, object storage, AI provider adapters and external CRM/ad platform adapters.
- External systems: model providers, HubSpot/Salesforce/Zoho, Google/Meta Ads, analytics and email providers. All external calls are server-side and tenant-scoped.

## 3. Request flow

1. Request reaches an App Router page or /api/v1 route handler.
2. Middleware/proxy may perform coarse routing only; it is not the authorization boundary.
3. Route handler validates path, query, headers and body with Zod and applies size limits.
4. Server session resolver validates the signed session and resolves the user identity.
5. Workspace policy loads membership from the database and checks the required permission.
6. Application service executes a use case; it accepts a trusted workspaceId from the access context, never from a body field.
7. Repository accesses data through Prisma with explicit workspace predicates. Mutations and audit/outbox records share a database transaction.
8. Route returns a stable response envelope, request ID and appropriate HTTP status. Sensitive internals never reach clients.

## 4. Frontend boundaries

- src/app: URL routing, route groups, layouts, loading/error/not-found boundaries and thin page entrypoints.
- src/features: user-facing feature modules. Each owns components, hooks, view models, client API functions and local schemas. Feature UI must not import Prisma or src/server.
- src/components: design-system primitives and application shell shared by features.
- Prefer React Server Components for data reads and static composition. Add 'use client' only to the smallest interactive boundary. Do not make the entire route tree client-rendered.
- Forms use shared Zod contracts where safe, server validation remains authoritative. Mutations invalidate/revalidate the relevant route or query cache.
- UI states required on every data page: loading, empty, error, permission denied, stale/offline and success.

## 5. Backend module contract

Every business module follows the same dependency direction:

route handler -> application service/use case -> domain policy/types -> repository interface -> infrastructure adapter (Prisma)

- Route handlers are transport adapters; no SQL or business rules in them.
- Services own orchestration, authorization preconditions and transaction boundaries.
- Repositories own persistence and tenant-scoped query construction.
- Domain policies own deterministic rules (for example lead score); model output is never treated as authorization or policy.
- Adapters implement provider-specific APIs behind internal interfaces.
- No circular imports and no cross-module repository access.

## 6. Multi-tenancy and authorization

Initial SaaS model: shared PostgreSQL database with workspaceId on every tenant-owned row, composite unique constraints/indexes that include workspace scope, and workspace membership authorization on every request. All reads, updates, deletes, exports, background jobs and webhook processing must carry a trusted tenant context.

Use role-based permissions (OWNER, ADMIN, MEMBER, VIEWER) plus explicit resource/action policies. A hidden UI control is not access control. Never trust workspace IDs, user IDs or roles supplied by the browser. Add PostgreSQL Row-Level Security as defense in depth after connection/session context propagation is tested. RLS context must be set transaction-locally, not on a pooled connection globally. Enterprise dedicated-database tenancy can be added behind a tenant database resolver without changing domain services.

## 7. Data and consistency

- PostgreSQL is the system of record. Prisma schema changes ship as reviewed, versioned migrations; production uses prisma migrate deploy, never db push.
- UUID primary keys; UTC timestamps; explicit enum lifecycle states; indexes based on observed access patterns.
- Use transactions for business record + audit event + outbox event writes.
- Use an outbox table to reliably publish asynchronous work after commit. Workers are idempotent and retry with bounded exponential backoff and jitter; exhausted jobs enter a dead-letter queue.
- Add idempotency keys for externally triggered writes and provider callbacks.
- Store large assets in private object storage, not PostgreSQL byte columns. Store object metadata, ownership, checksum and retention policy in the DB.

## 8. AI gateway

All AI features call a single internal AI gateway, never provider SDKs from UI components. The gateway provides provider/model routing, per-workspace policy, prompt versioning, structured output validation, timeout/cancellation, retry policy, token/cost/latency telemetry, redaction and audit metadata. Provider credentials remain server-only. AI output is an untrusted proposal: validate it, show provenance/uncertainty where relevant, and require explicit human approval for publishing, sending, spend changes or other consequential actions.

## 9. External integrations

Each integration implements a stable internal contract and owns OAuth state/PKCE, encrypted refresh/access tokens, least-privilege scopes, token refresh locking, webhook signature validation, provider rate-limit handling, sync cursors, idempotency and reconciliation. Connector failure must not corrupt canonical CRM data. Never log access tokens, authorization headers, raw secrets or unnecessary customer payloads.

## 10. Security baseline

- Auth.js (database-backed sessions) is the recommended identity integration; require secure, HttpOnly, SameSite cookies, CSRF/origin protections for cookie-authenticated mutations, session rotation and revocation.
- Passwords, if credentials auth is enabled, use a modern password hashing scheme (Argon2id) with MFA-ready account model. Prefer enterprise SSO where required.
- Apply input validation, output encoding, CSP, secure headers, request/body limits, rate limits, SSRF-safe outbound URL validation, webhook signature verification and upload scanning.
- Encrypt provider tokens and sensitive fields at rest with managed keys; support key rotation. Secrets are environment/secret-manager only.
- Append-only audit records for membership, permission, export, integration, AI approval and data mutation events.
- Threat model tenant escape, IDOR, prompt injection, SSRF, OAuth CSRF, replay, webhook spoofing, mass assignment and abuse of expensive AI endpoints.

## 11. Reliability and operations

- /api/health: process liveness; no dependency checks.
- /api/ready: database and required infrastructure readiness; fail closed.
- Structured logs with request/correlation ID, actor/workspace IDs only when authorized, route, latency and error code. Avoid secrets and PII.
- OpenTelemetry traces and metrics for HTTP, DB, queue and provider calls. Define SLOs and alert on error budget burn.
- Automated backups, point-in-time recovery, restore drills, retention controls and incident runbooks.
- CI: format/lint, typecheck, unit tests, integration tests against ephemeral PostgreSQL, migration validation, build, dependency/secret scanning and artifact provenance.
- Deployment: immutable build artifact, environment validation, migration job, health-gated rollout, rollback plan and backward-compatible expand/contract migrations.

## 12. Scale path

Keep the API and web application as one modular monolith initially. Introduce a separate worker process for queue consumers when jobs become long-running. Add Redis only when queue/cache/rate-limit use cases require it. Add search infrastructure only when PostgreSQL full-text/trigram search no longer meets measured requirements. Extract a service only with a clear scaling/security/team boundary and a versioned contract.
