# Security baseline

## Prototype limitation
The current app uses in-memory example data and has no authentication or production integrations. Keep synthetic data only.

## Required before production
- Tenant identity from authenticated session and membership checks.
- RBAC and least privilege at API and database layers.
- PostgreSQL RLS or equivalent tenant isolation with cross-tenant negative tests.
- Secrets server-side in managed storage; never expose them with NEXT_PUBLIC.
- OAuth state/PKCE, token rotation and encrypted tenant-level provider tokens.
- Verify webhook signatures, timestamps and replay protection.
- Idempotency keys, bounded retries and dead-letter queue for external writes.
- Validate AI output against strict schemas; sanitize user-facing content.
- Prompt-injection threat model for retrieved web/company data.
- Rate limits and spend quotas per tenant/user.
- Audit sensitive operations; never log tokens or unnecessary PII.
- Retention, export, deletion and consent workflows.
- Dependency, static analysis, secret and container scanning.
- Backups, restore tests, incident response and rollback.

Sending outreach, publishing content/ads or modifying CRM data must be explicitly authorized and follow tenant approval policy.
