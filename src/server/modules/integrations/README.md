# Integrations module

Owns connector registry, OAuth lifecycle, encrypted credentials, field mappings, sync cursors, webhook inbox, idempotency and reconciliation.

Provider-specific adapters implement internal contracts. Canonical CRM records never depend on vendor-specific payloads. OAuth state is one-time, short-lived and bound to the initiating user/workspace. Encrypt refresh tokens, redact logs, verify webhook signatures and process provider event IDs idempotently.
