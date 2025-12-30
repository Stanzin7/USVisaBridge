# File Structure

Complete file tree for the Visa Slot Monitoring MVP:

```
VisaSlot/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   └── reports/
│   │   │       ├── [id]/
│   │   │       │   └── route.ts          # Approve/reject reports
│   │   │       └── route.ts              # List pending reports
│   │   ├── alerts/
│   │   │   └── run/
│   │   │       └── route.ts              # Cron worker endpoint
│   │   ├── auth/
│   │   │   └── signout/
│   │   │       └── route.ts              # Sign out handler
│   │   ├── preferences/
│   │   │   └── route.ts                  # User preferences CRUD
│   │   ├── screenshots/
│   │   │   └── [path]/
│   │   │       └── route.ts              # Screenshot proxy endpoint
│   │   └── slot-reports/
│   │       └── route.ts                  # Submit/list reports
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts                  # Auth callback handler
│   │   └── login/
│   │       └── page.tsx                  # Login page
│   ├── admin/
│   │   └── reports/
│   │       └── page.tsx                  # Admin review queue
│   ├── dashboard/
│   │   └── page.tsx                      # User dashboard
│   ├── preferences/
│   │   └── page.tsx                      # Preferences management
│   ├── reports/
│   │   └── page.tsx                      # Submit report page
│   ├── globals.css                       # Global styles
│   ├── layout.tsx                        # Root layout
│   └── page.tsx                          # Landing page
├── components/
│   └── AdminNavLink.tsx                  # Admin nav link component
├── lib/
│   ├── supabase/
│   │   ├── admin.ts                      # Admin Supabase client
│   │   ├── client.ts                     # Browser Supabase client
│   │   ├── server.ts                     # Server Supabase client
│   │   └── types.ts                      # Database types
│   ├── auth.ts                           # Auth utilities
│   ├── email.ts                          # Email sending (Resend)
│   ├── rateLimit.ts                      # Rate limiting
│   ├── scoring.ts                        # Confidence scoring
│   └── validators.ts                     # Input validation
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql        # Database schema + RLS
│   └── STORAGE_SETUP.md                  # Storage bucket setup guide
├── middleware.ts                         # Next.js middleware
├── next.config.js                        # Next.js config
├── package.json                          # Dependencies
├── postcss.config.js                     # PostCSS config
├── tailwind.config.ts                    # Tailwind config
├── tsconfig.json                         # TypeScript config
├── vercel.json                           # Vercel cron config
├── .gitignore                            # Git ignore rules
├── README.md                             # Main documentation
└── FILE_STRUCTURE.md                     # This file
```

