# Architecture blueprint

## Context
AI Growth Studio groups four specialist workflows behind a single tenant-aware workspace. Product workflows consume shared platform services rather than embedding vendor-specific integrations in each module.

## Five logical layers
1. Workspace: navigation, organizations, memberships, RBAC, sessions.
2. Products: AdGenius, BrandPilot, LeadHunter, MarketPulse.
3. CRM abstraction: canonical schema, provider adapters, webhooks, mapping, reconciliation.
4. Shared platform: AI gateway, prompt registry, schema validation, queues, analytics, usage metering, audit events.
5. Foundation: PostgreSQL, Redis, object storage, container runtime, backups, monitoring.

## Canonical CRM entities
Lead, Contact, Account/Company, Campaign, Opportunity, Activity, Engagement, Attribution.

Connector adapters translate native provider shapes to/from canonical contracts. Adapter operations must be idempotent and preserve provider IDs, tenant ownership, sync checkpoints and provenance.

## Critical invariants
- Derive organization context from authenticated membership, never from an untrusted body field alone.
- Every query/mutation is tenant-scoped.
- AI output is untrusted input: validate before persistence or rendering.
- External writes require explicit consent/approval policy.
- CRM retries must be idempotent; webhook signatures and replay windows must be checked.
- AEO metrics must declare platform, prompt set, date/window, collection method and coverage limitations.
- Demo records and illustrative scores are never represented as customer outcomes or verified data.

## Deployment topology
Reverse proxy (TLS) -> Next.js web/API -> PostgreSQL + Redis -> workers. Object storage is private. Secrets are injected by deployment environment/secret manager. Separate dev/staging/production environments and databases. Backups and restore drills are mandatory.

## Current implementation
The first prototype is a client-side interactive demonstrator with in-memory sample state. It does not yet implement the production boundaries above.
