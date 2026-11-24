# Brand module

Owns brand profile, positioning, voice rules, visual tokens, content pillars, approved assets and version history.

Application use cases: createBrandProfile, updateBrandGuidelines, generateBrandVoice, approveBrandVersion, uploadAsset, listAssets and exportBrandKit.

Store binary assets in private object storage. Persist object key, workspace, content type, size, checksum, scan state, retention and access policy in PostgreSQL. Enforce tenant-scoped signed upload/download URLs.
