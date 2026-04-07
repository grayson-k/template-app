# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

**Database migration** (run once after setup or after upgrading Better Auth):
```bash
npx better-auth migrate
```

## Environment variables

Required in `.env`:
- `DATABASE_URL` — PostgreSQL connection string (Neon or any Postgres)
- `BETTER_AUTH_SECRET` — Random secret for signing sessions (`openssl rand -base64 32`)
- `BETTER_AUTH_URL` — Base URL of the app (e.g. `http://localhost:3000`)

## Architecture

**Auth flow:**
- Server-side: `lib/auth.ts` exports `auth` (Better Auth instance backed by the Postgres pool). Call `auth.api.getSession({ headers: await headers() })` in server components to get the session.
- Client-side: `lib/auth-client.ts` exports `authClient` (Better Auth React client). Used in client components for `signIn`, `signUp`, `signOut`.
- API route: `app/api/auth/[...all]/route.ts` wires Better Auth into Next.js via `toNextJsHandler`.
- Auth guard pattern: server components check session and `redirect()` if null (see `app/dashboard/page.tsx`).

**Database:**
- `lib/db.ts` exports a singleton `pool` (node-postgres `Pool`). The singleton pattern prevents connection exhaustion during hot reloads in development.

**UI components:**
- `components/ui/` — shadcn/ui primitives (Radix UI-based). Do not edit these directly; use the shadcn CLI to add/update components.
- `components/` — App-level composed components (sidebar, forms, charts, data table).
- `components/ui/field.tsx` — Custom `Field`/`FieldGroup`/`FieldLabel`/`FieldDescription` components used in forms instead of shadcn's default form primitives.

**Stack versions to be aware of:**
- Next.js 16 (App Router) — APIs may differ from training data; check `node_modules/next/dist/docs/` for current behavior.
- Tailwind CSS v4 — new engine with breaking changes from v3.
- Better Auth (not NextAuth/Auth.js) — different API surface entirely.
