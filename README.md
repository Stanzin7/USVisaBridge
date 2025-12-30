# Visa Slot Monitoring MVP

A compliance-first visa slot monitoring application built with Next.js and Supabase.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see `.env.example`):
```bash
cp .env.example .env
```

3. Run Supabase migration:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the contents of `supabase/migrations/001_initial_schema.sql`

4. Set up Supabase Storage:
   - See `supabase/STORAGE_SETUP.md` for instructions on creating the screenshots bucket

5. Run the development server:
```bash
npm run dev
```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)
- `RESEND_API_KEY` - Resend API key for emails (optional, logs emails in dev if missing)
- `ALERT_FROM_EMAIL` - Email address to send alerts from (e.g., noreply@yourdomain.com)
- `NEXT_PUBLIC_APP_URL` - Your app URL (e.g., https://yourdomain.com or http://localhost:3000 for dev)
- `WORKER_SECRET` - Secret to protect the worker endpoint (used by cron jobs)
- `ADMIN_EMAILS` - Comma-separated list of admin email addresses
- `UPSTASH_REDIS_REST_URL` (optional) - Upstash Redis URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` (optional) - Upstash Redis token

## Important Compliance Notice

**This application is NOT affiliated with the US government. We do not book appointments.**

All slot reports are crowdsourced from users. We do not scrape or automate any government portals.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set all environment variables in Vercel dashboard
4. Set up Vercel Cron (see `vercel.json`) to call `/api/alerts/run` every 5 minutes with `Authorization: Bearer <WORKER_SECRET>` header

### Manual Cron Setup

If not using Vercel Cron, set up a cron job to call:
```bash
curl -X POST https://yourdomain.com/api/alerts/run \
  -H "Authorization: Bearer <WORKER_SECRET>"
```

Recommended frequency: Every 5 minutes

