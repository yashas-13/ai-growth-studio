# Leads module

Owns prospect lifecycle, source provenance, deduplication, ICP membership, explainable scoring, assignment, consent and outreach draft state.

Current baseline: tenant-scoped list and create use cases, Prisma repository, Zod input contract, RBAC check and transactional audit event. Session provider is deliberately fail-closed and not wired yet.

Planned use cases: updateLead, mergeLeads, scoreLead, importLeads, assignLead, createSegment and draftOutreach. Scoring is deterministic and explainable; model output is advisory only. Outreach sending remains gated by consent, approval and provider configuration.
