# Proj.Help

[English](README.md) · [中文](README.zh.md) · [Deutsch](README.de.md)

> **Entwurf:** Deutsche Fassung zur Prüfung durch Mingli29.

Ein Community-Board zum Veröffentlichen von Projektideen, für Hilfe und Antworten sowie zum Lesen von Beiträgen auf Englisch oder Chinesisch.

Die Anmeldung ist **nur Microsoft**. Nur schulische Microsoft-Konten auf der erlaubten Domain können beitreten. Die Domain steht im Code und erscheint nicht in der Oberfläche.

Die App läuft mit Next.js auf Vercel und Supabase (Auth, Postgres und Row-Level Security).

## Funktionen

- Eine Projektidee mit Kategorie und benötigter Hilfe veröffentlichen
- Antworten sammeln, einschließlich „Ich kann helfen“
- Eine Idee oder Antwort zwischen Englisch und Chinesisch übersetzen
- Die Oberfläche zwischen English und 中文 wechseln

## Lokale Entwicklung

```bash
npm install
cp .env.example .env.local
```

### 1. Supabase starten

```bash
npx supabase start
```

API-URL und publishable/anon Key in `.env.local` eintragen:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Schema anwenden, wenn du keinen frischen lokalen Stack nutzt:

```bash
npx supabase db reset
```

### 2. Microsoft Entra ID (für Login nötig)

1. Im [Azure Portal](https://portal.azure.com) → Microsoft Entra ID → App registrations → New registration.
2. Unterstützte Kontotypen: **this organization only**, wenn du den Schul-Tenant hast, sonst Konten in einem beliebigen Organisationsverzeichnis.
3. Redirect URI (Web): `https://<project-ref>.supabase.co/auth/v1/callback`  
   Lokal: `http://localhost:54321/auth/v1/callback`
4. Ein Client Secret anlegen.
5. Optionale Claims `email` und `xms_edov` am ID-Token hinzufügen (siehe den [Supabase-Azure-Leitfaden](https://supabase.com/docs/guides/auth/social-login/auth-azure)).
6. In Supabase Auth → Providers → Azure Azure aktivieren und Client-ID, Secret sowie optional die Tenant-URL eintragen:
   `https://login.microsoftonline.com/<tenant-id>`
7. Für die lokale CLI dieselben Werte in `supabase/.env` legen:

```env
AZURE_CLIENT_ID=
AZURE_SECRET=
AZURE_TENANT_URL=https://login.microsoftonline.com/<tenant-id>
```

E-Mail/Passwort-Registrierung ist deaktiviert. Ein `before_user_created`-Hook lehnt jedes Konto ab, das nicht Microsoft plus erlaubte Schul-Domain ist. Der OAuth-Callback und die RLS-Policies setzen dieselbe Regel durch.

### 3. Die Site starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

## Vercel

Dieses Repo ist eine Next.js-App. `vercel.json` setzt Application / Framework Preset auf **Next.js**. Wenn ein bestehendes Vercel-Projekt noch Other oder leer zeigt:

1. Projekt öffnen → **Settings → General → Framework Preset**
2. **Next.js** wählen
3. Build Command auf `npm run build` lassen (oder Next.js-Standard)
4. Erneut deployen

Importiere das Git-Repository in Vercel (oder führe `npx vercel` aus). Root Directory bleibt leer / Repo-Root.

## Supabase (du musst das verbinden)

Ein gehostetes Supabase-Projekt wurde aus diesem Repo **nicht** angelegt oder verlinkt. Login, Ideen und Antworten funktionieren erst, wenn du das erledigst:

1. Ein Projekt auf [supabase.com](https://supabase.com) anlegen.
2. Das Schema ausführen: im Supabase-SQL-Editor `supabase/migrations/20260904112922_init_proj_help.sql` einfügen, **oder** die CLI verlinken (`npx supabase link`, dann `npx supabase db push`).
3. In Supabase **Authentication → Providers** **Azure** aktivieren und Microsoft-App-Client-ID, Secret sowie optionale Tenant-URL eintragen.
4. In Supabase **Authentication → URL configuration**:
   - Site URL: `https://<your-vercel-domain>`
   - Redirect allow list: `https://<your-vercel-domain>/auth/callback`
5. In Vercel → **Settings → Environment Variables** hinzufügen:
   - `NEXT_PUBLIC_SUPABASE_URL` — Project Settings → API → Project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — publishable / anon Key
6. Optional: Vercel Marketplace → **Supabase**-Integration statt die beiden Werte per Hand einzufügen.
7. Nach dem Speichern der Variablen auf Vercel erneut deployen.

Microsoft-Login braucht außerdem die Entra-ID-App aus den Schritten zur lokalen Entwicklung. Die Azure-Redirect-URI muss `https://<project-ref>.supabase.co/auth/v1/callback` sein.

Für Übersetzung einen [AI-Gateway](https://vercel.com/docs/ai-gateway)-Key als `AI_GATEWAY_API_KEY` setzen oder in Produktion auf Vercel OIDC setzen.

## Umgebung

| Name | Zweck |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase-Projekt-URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable Key für Browser/Server |
| `AI_GATEWAY_API_KEY` | Optional. Aktiviert Übersetzung von Ideen/Antworten |
| `AZURE_CLIENT_ID` / `AZURE_SECRET` | Microsoft-App (lokales Supabase) |
| `AZURE_TENANT_URL` | Optionale Einschränkung auf den Schul-Tenant |

## Sicherheit

- Nur der Azure-Provider ist aktiv
- `public.hook_restrict_signup_to_school` blockiert Nicht-Microsoft- und Nicht-Schul-Domain-Signups
- Die Route `/auth/callback` meldet die Person ab, wenn E-Mail oder Provider falsch sind
- Jede öffentliche Tabelle hat RLS und verlangt eine Schul-Domain-JWT-E-Mail
- Autorisierung liest niemals `user_metadata`
