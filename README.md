# boreneoux-site

Personal portfolio site for Ichlasul Fikri (Boreneoux).

Built with Next.js 16, Tailwind CSS v4, Prisma 7, and PostgreSQL on Neon.tech. Admin dashboard protected by Google OAuth.

## Stack

- **Framework** - Next.js 16 (App Router, Turbopack)
- **Styling** - Tailwind CSS v4
- **Database** - PostgreSQL via Neon.tech
- **ORM** - Prisma 7 with `@prisma/adapter-pg`
- **Auth** - NextAuth v5 (Google OAuth, single-admin guard)
- **Storage** - Vercel Blob (project images)
- **Runtime** - Bun

## Getting Started

```bash
bun install
bun run dev
```

Requires a `.env.local` file with:

```
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
BLOB_READ_WRITE_TOKEN=
ADMIN_EMAIL=
```

## Database

```bash
bun run db:migrate   # run migrations
bun run db:seed      # seed initial data
bun run db:studio    # open Prisma Studio
```

## Dashboard

Visit `/dashboard` - requires sign in with the configured `ADMIN_EMAIL` Google account.
