# API conventions

## Base path and versioning

All product APIs use /api/v1. Route handlers are thin transport adapters. Breaking changes require a new version or an explicit migration window.

## Success envelope

{ "data": { }, "error": null }

## Error envelope

{ "data": null, "error": { "code": "VALIDATION_ERROR", "message": "Request validation failed" } }

Use stable machine-readable error codes. Never return stack traces, SQL details, provider payloads, secrets or raw exception messages.

## HTTP semantics

- GET is read-only and safe.
- POST creates a resource or starts an explicitly idempotent operation.
- PATCH applies partial updates; PUT is reserved for full replacement.
- DELETE is idempotent and must be workspace-authorized.
- Return 201 on creation, 202 for accepted asynchronous jobs, 204 for successful no-content deletion.
- Return 401 for no valid session, 403 for insufficient workspace permissions, 404 for inaccessible/nonexistent resources where existence must not be disclosed, 409 for state conflicts, 422 for schema/business validation and 429 for rate limits.

## Tenant context

Workspace-scoped APIs use /workspaces/{workspaceId}/... The workspace ID selects the requested tenant only; it does not grant access. The server resolves the authenticated user, loads membership, checks permission, and passes a trusted tenant context to the use case. Tenant ID is never accepted from mutation JSON.

## Validation and limits

Validate params, query and body with Zod. Reject unknown body fields. Enforce content-type, body size, pagination caps, query length, upload size and allowlisted sort keys. Validate external URLs against SSRF, private IP and redirect risks.

## Pagination

Use cursor pagination for growing collections. Return { items, nextCursor }. Stable ordering must include a unique tie-breaker. Do not use unbounded findMany calls.

## Idempotency and webhooks

Require idempotency keys for payment-like, AI job creation and external side-effect endpoints. Verify webhook signatures against raw request bytes, enforce timestamp/replay windows, persist provider event IDs and acknowledge duplicates safely.

## Current implementation

- GET and POST /api/v1/workspaces/{workspaceId}/leads exist as a fail-closed service/repository example.
- Authentication provider is not wired; the current session adapter returns no session. Therefore these routes return 401 until server-side authentication is implemented.
- PostgreSQL has not been provisioned/configured in the current workstation environment. Do not run migrations until DATABASE_URL points at the intended local database.
