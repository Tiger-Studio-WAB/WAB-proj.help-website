# Proj.Help

A community board for publishing project ideas, getting help and replies, and reading posts in English or Chinese.

Sign-in is **Microsoft only**. Only school Microsoft accounts on the allowed domain can join. The domain is configured in code and is not shown in the interface.

The app is built with Next.js on Vercel and Supabase (Auth, Postgres, and row-level security).

## What it does

- Publish a project idea with a category and the help you need
- Collect responses, including “I can help”
- Translate an idea or response between English and Chinese
- Switch the interface between English and 中文

## Local development

```bash
npm install
cp .env.example .env.local
```

### 1. Start Supabase

```bash
npx supabase start
```

Copy the API URL and publishable/anon key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Apply the schema if you are not using a fresh local stack:

```bash
npx supabase db reset
```

### 2. Microsoft Entra ID (required for login)

1. In [Azure Portal](https://portal.azure.com) → Microsoft Entra ID → App registrations → New registration.
2. Supported account types: **this organization only** if you have the school tenant, otherwise accounts in any org directory.
3. Redirect URI (Web): `https://<project-ref>.supabase.co/auth/v1/callback`  
   Local: `http://localhost:54321/auth/v1/callback`
4. Create a client secret.
5. Add optional claims `email` and `xms_edov` on the ID token (see the [Supabase Azure guide](https://supabase.com/docs/guides/auth/social-login/auth-azure)).
6. In Supabase Auth → Providers → Azure, enable Azure and paste the client ID, secret, and optional tenant URL:
   `https://login.microsoftonline.com/<tenant-id>`
7. For local CLI, put the same values in `supabase/.env`:

```env
AZURE_CLIENT_ID=
AZURE_SECRET=
AZURE_TENANT_URL=https://login.microsoftonline.com/<tenant-id>
```

Email/password signup is disabled. A `before_user_created` hook rejects any account that is not Microsoft plus the allowed school domain. The OAuth callback and RLS policies enforce the same rule.

### 3. Run the site

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel

1. Import this repository in Vercel (or `npx vercel`).
2. Add the Supabase integration (`vercel integration add supabase`) or paste the project URL and publishable key.
3. Set the same Azure credentials in the hosted Supabase project.
4. In Supabase Auth, add the production callback and site URL:
   - Site URL: `https://<your-domain>`
   - Redirect allow list: `https://<your-domain>/auth/callback`
5. For translation, add an [AI Gateway](https://vercel.com/docs/ai-gateway) key as `AI_GATEWAY_API_KEY`, or rely on Vercel OIDC in production.

## Environment

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser/server publishable key |
| `AI_GATEWAY_API_KEY` | Optional. Enables idea/response translation |
| `AZURE_CLIENT_ID` / `AZURE_SECRET` | Microsoft app (local Supabase) |
| `AZURE_TENANT_URL` | Optional school tenant restriction |

## Security

- Only the Azure provider is enabled
- `public.hook_restrict_signup_to_school` blocks non-Microsoft and non-school-domain signups
- The `/auth/callback` route signs the user out if the email or provider is wrong
- Every public table has RLS that requires a school-domain JWT email
- Authorization never reads `user_metadata`
