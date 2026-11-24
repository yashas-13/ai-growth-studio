# Audit module

Owns append-only security and business audit events, audit export requests and retention policy.

Audit events are written in the same transaction as the mutation they describe. Application roles cannot update or delete historical events; production database grants and retention/archival procedures enforce immutability. Capture actor, workspace, action, entity, timestamp, request ID and minimized metadata. Do not place secrets or full sensitive payloads in metadata.
