# Test strategy

- Unit: domain policies, schemas, scoring and service orchestration with isolated ports.
- Integration: repositories and transaction boundaries against a real ephemeral PostgreSQL instance; verify tenant isolation and audit atomicity.
- Contract: provider adapter and versioned API response contracts.
- E2E: authenticated workspace journeys, role/permission matrix, CSRF and cross-tenant IDOR negative cases.

Every tenant-owned resource test must include same-tenant allow cases and cross-tenant deny cases. Use synthetic fixtures only. No production customer data in test environments.
