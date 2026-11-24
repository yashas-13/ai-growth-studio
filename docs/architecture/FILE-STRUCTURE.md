# Recommended repository structure

ai-growth-studio/
├── docs/
│   ├── architecture/          # ADRs, diagrams, tenancy and security decisions
│   ├── api/                   # OpenAPI contracts and API conventions
│   ├── runbooks/              # deploy, rollback, backup, incident response
│   └── ROADMAP.md
├── prisma/
│   ├── schema.prisma
│   ├── migrations/            # checked-in SQL migrations
│   └── seed.ts                # development-only deterministic fixtures
├── public/                    # static assets only
├── src/
│   ├── app/
│   │   ├── (auth)/            # login, registration, recovery, MFA
│   │   ├── (marketing)/       # landing, pricing and legal pages
│   │   ├── (workspace)/       # authenticated workspace routes and layouts
│   │   └── api/v1/            # versioned HTTP transport adapters
│   ├── components/
│   │   ├── ui/                # buttons, inputs, dialogs, tables, badges
│   │   └── layout/            # sidebar, topbar, breadcrumbs, shell
│   ├── features/
│   │   ├── dashboard/
│   │   ├── campaigns/         # AdGenius
│   │   ├── brand/             # BrandPilot
│   │   ├── leads/             # LeadHunter
│   │   ├── market/            # MarketPulse SEO/AEO
│   │   ├── crm/               # canonical CRM and connector UX
│   │   ├── settings/
│   │   └── auth/
│   ├── server/
│   │   ├── auth/              # session, permissions, tenant context
│   │   ├── http/              # errors, envelopes, request IDs, limits
│   │   ├── modules/           # application services, domain, repositories
│   │   ├── infrastructure/    # Prisma, queue, storage, AI and provider adapters
│   │   └── observability/     # structured logs, metrics and tracing
│   ├── shared/
│   │   ├── schemas/           # safe shared Zod contracts
│   │   ├── types/
│   │   └── utils/
│   └── generated/prisma/      # generated; never hand-edit
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── contract/
│   └── e2e/
├── .github/workflows/         # CI, dependency and secret scanning
├── .env.example               # names/placeholders only
├── prisma.config.ts
└── package.json

## Feature module internal convention

features/campaigns/
├── components/                # feature widgets and page sections
├── hooks/                     # client-only interaction hooks
├── api/                       # typed client calls to /api/v1
├── schemas/                   # safe form schemas
├── types/                     # UI view models
└── index.ts                   # public feature exports

server/modules/campaigns/
├── domain/                    # entities, value objects and policies
├── application/               # use cases and orchestration
├── ports/                     # repository/provider interfaces
└── infrastructure/            # Prisma repository implementations

## Import rules

1. app may import features, components and server-side page loaders.
2. features may import components and shared; never import server or Prisma.
3. server/modules/<module> may import shared and server/infrastructure; one module must not import another module's repository.
4. server/infrastructure implements ports; it must not depend on feature UI.
5. Generated Prisma code is imported only by server infrastructure/repositories.
6. Use explicit server-only markers for database, sessions, secrets and provider modules.
