# Page inventory and route map

## Public and identity

| Route | Page | State |
|---|---|---|
| / | Redirect to dashboard | Implemented |
| /login | Sign in | UI scaffold; identity provider pending |
| /register | Create account/workspace | UI scaffold; identity provider pending |
| /forgot-password | Password recovery | UI scaffold; identity provider pending |
| /onboarding | Workspace setup and first-run checklist | Planned |
| /pricing | Plans and usage limits | Planned |
| /privacy and /terms | Legal disclosures | Planned; legal review required |

## Workspace modules

| Route | Page | Scope |
|---|---|---|
| /dashboard | Overview | KPIs, activity, tasks and workspace health |
| /campaigns | Campaign list | Filters, status, owner and performance |
| /campaigns/new | Campaign builder | Brief, audience, channel, budget, approval |
| /campaigns/[campaignId] | Campaign detail | Strategy, creatives, timeline, versions and approvals |
| /brand | Brand profile | Identity, voice, audience and guidelines |
| /brand/assets | Brand assets | Private asset library, metadata and versioning |
| /brand/content-calendar | Content calendar | Draft, review, scheduled and published states |
| /leads | Prospect pipeline | Search, filters, score, assignment and lifecycle |
| /leads/[leadId] | Prospect detail | Profile, provenance, activity and consent |
| /leads/import | Import prospects | CSV mapping, validation, dedupe and preview |
| /leads/segments | ICP and segments | Saved filters and explainable fit criteria |
| /leads/outreach | Outreach drafts | Review queue; sending gated by provider/policy approval |
| /market | MarketPulse overview | SEO/AEO coverage and observations |
| /market/audits | Site audits | Crawl scope, findings and remediation |
| /market/keywords | Keyword research | Clusters, intent and opportunity |
| /market/competitors | Competitor set | Tracked entities and comparison |
| /market/reports | Visibility reports | Timestamped evidence and historical trends |
| /crm | CRM overview | Canonical records and connector health |
| /crm/contacts | Contacts | Search, identity resolution and lifecycle |
| /crm/companies | Accounts | Company records and relationships |
| /crm/deals | Opportunities | Stages, value, owner and close date |
| /crm/activities | Activities | Timeline, tasks and engagements |
| /crm/connectors | Integrations | OAuth, scopes and field mapping |
| /crm/sync | Sync operations | Runs, cursors, failures and reconciliation |

## Administration

| Route | Page |
|---|---|
| /settings | Workspace profile and preferences |
| /settings/team | Members, invites and roles |
| /settings/ai | AI providers, models, budgets and policies |
| /settings/integrations | External app connections |
| /settings/security | Sessions, MFA, audit and retention |
| /settings/billing | Plans, usage and invoices |
| /settings/notifications | Notification preferences |
| /settings/audit-log | Immutable activity and export history |

A route existing does not mean its workflow, authentication or data integration is production-enabled. Planned pages must show explicit loading, empty, error and permission states as their workflows are implemented.
