# Supabase setup and operations

## Project

- Name: AI Growth Studio
- Ref: qqlhtdxcwnwqrzemkvhc
- Region: ap-south-1 (Mumbai)
- URL: https://qqlhtdxcwnwqrzemkvhc.supabase.co
- Database: PostgreSQL 17

## Environment

Set these values in .env.local and in the deployment secret manager:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

The publishable key is intended for public clients; RLS is the authorization boundary. Never put a Supabase secret key or legacy service_role key in NEXT_PUBLIC variables, browser bundles, source control or chat.

## Auth configuration

In Supabase Dashboard -> Authentication -> URL Configuration:

- Local Site URL: http://localhost:3000
- Redirect URL allowlist: http://localhost:3000/auth/callback
- Add the exact production origin and /auth/callback after deployment.
- Configure email confirmation, SMTP sender/domain and password recovery templates before external onboarding.

The app uses email/password and the Supabase SSR PKCE callback. If email confirmation is enabled, users must confirm their email before the workspace is provisioned.

## Database and security

Application tables include profiles, workspaces, memberships, leads, campaigns, brand_profiles, brand_assets, content_items, companies, contacts, deals, activities, competitors, keywords, market_reports and audit_events. RLS is enabled for every application table in public.

A non-exposed private schema contains narrowly granted SECURITY DEFINER membership helpers with fixed search paths. The private brand-assets Storage bucket uses workspace UUID prefixes and role-aware object policies. Its maximum object size is 20 MiB.

The anonymous readiness probe has SELECT privilege on workspaces but no anon RLS policy, so it can test PostgREST/database availability without reading workspace rows.

## Hosted migrations

The DDL is applied and recorded in Supabase migration history. Export the hosted schema into version-controlled supabase/migrations files with the Supabase CLI before the next schema change or production release. Do not make undocumented ad hoc schema changes in production.

## Verification

- Supabase Dashboard -> Database -> Tables: confirm tables and RLS flags.
- Supabase Dashboard -> Storage: confirm brand-assets is private.
- Supabase Dashboard -> Advisors: security lints should remain clean. Unused-index INFO notices are expected before real workload.
- Run npm run lint, npm run typecheck, npm run build and npm audit.
