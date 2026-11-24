# ADR-002: Modular monolith and application boundaries

- Status: Accepted as target architecture
- Decision: Keep one Next.js deployment with strict feature/module boundaries and separately runnable background workers when required.
- Why: The product is early-stage. Microservices add network, deployment, tracing, contract and data-consistency costs before independent scaling is demonstrated.
- Boundaries: app is transport/UI routing; features owns client-facing feature code; server/modules owns domain/application use cases; server/infrastructure owns persistence and provider adapters.
- Tenant model: Shared PostgreSQL with mandatory workspace scoping, application-level RBAC and later PostgreSQL RLS defense-in-depth. Every background job carries tenant ID and initiating actor/system identity.
- API: /api/v1 stable envelopes, Zod validation, request IDs and documented errors.
- Data writes: Transactional domain write + audit event + outbox event. External side effects happen asynchronously and are idempotent.
- AI: Provider-agnostic gateway, versioned prompts, schema-validated outputs, cost/latency budgets and explicit approval for consequential actions.
- Consequences: Feature ownership and import rules need CI enforcement; schema migrations and module contracts require review. Future service extraction remains possible without making it the default.
