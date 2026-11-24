# Infrastructure adapters

This layer implements ports defined by application modules. Keep Prisma, Redis, object storage, AI SDKs, email SDKs and vendor CRM SDKs out of domain/application code.

- database: Prisma client lifecycle, migrations and transaction helpers.
- queue: outbox dispatcher, worker adapters, retries, dead-letter and idempotency.
- ai: provider router, policy, prompt registry, structured output and usage metering.
- storage: private object storage, scanning, retention and signed access.
- integrations: OAuth/token vault, provider clients, webhooks and sync adapters.
- observability: structured logs, metrics, traces and request correlation.
