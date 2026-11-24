# Campaigns module

Owns campaign briefs, audience definitions, channels, budget plans, creative variants, approval states and campaign performance snapshots.

Application use cases: createCampaign, updateCampaignBrief, generateCampaignPlan, approveCampaign, archiveCampaign, listCampaigns, getCampaignDetail.

Persistence: Campaign, CampaignVersion, CampaignAudience, CreativeAsset, Approval and CampaignMetric tables. Every row is workspace-scoped. Generation jobs use an outbox event and are idempotent.

External publishing is a separate adapter and requires an explicit permission, approval record, spend guardrail and provider-side idempotency key. Draft generation must never publish.
