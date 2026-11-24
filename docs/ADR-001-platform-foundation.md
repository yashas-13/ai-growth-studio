# ADR-001: Platform foundation

- Status: Accepted for implementation
- Date: 2026-11-24

## Decisions

1. Next.js App Router remains the web and API runtime.
2. PostgreSQL is the system of record.
3. Prisma ORM 7 is used with the PostgreSQL driver adapter.
4. Zod validates external request payloads before service execution.
5. Workspace ownership is represented by explicit memberships and roles.
6. Customer records carry a workspace identifier. Every service query must scope by an authenticated workspace membership.
7. Audit events are append-only at the application layer. Apply database permissions preventing UPDATE/DELETE in production before customer data is written.

## Security boundaries

Authentication is not configured. Workspace IDs supplied in request bodies are untrusted and must never be treated as authorization. No customer-facing write API is enabled until identity and membership resolution are implemented.

## Deferred decisions

- Authentication provider and SSO policy.
- PostgreSQL row-level security and connection strategy.
- Redis/worker platform.
- AI providers and tenant-level secret vault.
- CRM OAuth integrations and consent/approval model.
