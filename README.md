# Next.js App Template

A full-stack starter template with authentication, a polished UI, and a connected Postgres database — ready to clone and build on top of.

## What's included

- **[Next.js 16](https://nextjs.org)** — App Router, server components, and server actions
- **[Better Auth](https://better-auth.com)** — Email/password authentication with session management, wired directly to your database
- **[shadcn/ui](https://ui.shadcn.com)** — Accessible, composable UI components built on Radix UI
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first styling with the new v4 engine
- **[Neon](https://neon.tech) / PostgreSQL** — Serverless Postgres via the `pg` driver with connection pooling
- **[Recharts](https://recharts.org)** — Chart components for data visualization
- **[TanStack Table](https://tanstack.com/table)** — Headless, type-safe data tables
- **[Zod](https://zod.dev)** — Schema validation
- **[Sonner](https://sonner.emilkowal.ski)** — Toast notifications

### Pages

| Route | Description |
|---|---|
| `/` | Public landing/hero page |
| `/login` | Login form |
| `/signup` | Signup form |
| `/dashboard` | Protected dashboard with sidebar, charts, and data table |

Unauthenticated users attempting to access `/dashboard` are redirected to `/`.

---

## Setup

### Prerequisites

- Node.js 18+
- A PostgreSQL database — [Neon](https://neon.tech) is recommended (free tier available) but any Postgres instance works

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/template-app.git
cd template-app
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create your database

If you're using Neon:

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the **connection string** from the Neon dashboard — it looks like:
   ```
   postgresql://neondb_owner:<password>@<host>.neon.tech/neondb?sslmode=require
   ```

If you're using a local or hosted Postgres instance, grab your connection string from there instead.

---

### 4. Configure environment variables

Copy the example env file:

```bash
cp .env.example .env
```

Then fill in your values:

```env
# Your Postgres connection string (Neon or any Postgres)
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST.neon.tech/neondb?sslmode=require"

# A random secret used to sign auth sessions
# Generate one with: openssl rand -base64 32
BETTER_AUTH_SECRET=your_secret_here

# The base URL of your app (use localhost for local dev)
BETTER_AUTH_URL=http://localhost:3000
```

---

### 5. Run the database migration

Better Auth manages its own schema (users, sessions, accounts, etc.). Run its migration to create those tables in your database:

```bash
npx better-auth migrate
```

This will connect to `DATABASE_URL` and create the required tables. You only need to do this once (and again after upgrading Better Auth).

---

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the landing page. Create an account via `/signup` and you'll be redirected to the dashboard.

---

## Project structure

```
app/
  page.tsx              # Landing page
  layout.tsx            # Root layout
  login/page.tsx        # Login page
  signup/page.tsx       # Signup page
  dashboard/page.tsx    # Protected dashboard (requires auth)
components/
  ui/                   # shadcn/ui base components
  app-sidebar.tsx       # Dashboard sidebar
  login-form.tsx
  signup-form.tsx
  hero-section.tsx
  ...
lib/
  auth.ts               # Better Auth server config
  auth-client.ts        # Better Auth browser client
  db.ts                 # Postgres connection pool
  utils.ts              # Utility helpers (cn, etc.)
```

---

## Deployment

This template is ready to deploy on [Vercel](https://vercel.com). When deploying:

1. Add your environment variables (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`) in the Vercel project settings
2. Set `BETTER_AUTH_URL` to your production domain (e.g. `https://your-app.vercel.app`)
3. Make sure your Neon database allows connections from Vercel's IP ranges (Neon does this by default)

```bash
vercel deploy
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
