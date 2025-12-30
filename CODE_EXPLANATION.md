# Complete Code Explanation: Visa Slot Monitoring Application

This document provides a comprehensive explanation of your Next.js project structure and functionality.

---

## 📁 **1. `/app` Directory - Next.js App Router**

### **Purpose:**
The `/app` directory uses Next.js 14's App Router, which provides:
- **File-based routing** - Each folder becomes a route
- **Server Components by default** - Better performance and SEO
- **API Routes** - Backend endpoints in the same codebase
- **Layouts** - Shared UI components across routes

### **How It Works Step-by-Step:**

#### **`app/layout.tsx`** - Root Layout
```typescript
// This wraps ALL pages in your app
```
1. **Server Component** - Runs on the server, fetches user data before rendering
2. Creates Supabase client using `createClient()` from server utilities
3. Checks if user is authenticated via `supabase.auth.getUser()`
4. Renders navigation bar with conditional links based on auth status
5. Shows "Admin" link only if user is admin (checked via `AdminNavLink` component)
6. Wraps all page content in `<main>` tag

**Flow:**
```
Request → Layout loads → Check auth → Render nav → Render page content
```

#### **`app/page.tsx`** - Home Page
1. Checks if user is logged in
2. If logged in → redirects to `/dashboard`
3. If not logged in → shows landing page with:
   - Compliance disclaimer (not affiliated with US government)
   - Call-to-action buttons
   - Feature cards explaining the service

#### **`app/dashboard/page.tsx`** - User Dashboard
1. **Server Component** - Fetches data on server before rendering
2. Checks authentication, redirects if not logged in
3. Fetches two data sets:
   - Recent verified slot reports (public data)
   - User's alert history (private data)
4. Displays both in a grid layout

#### **`app/auth/login/page.tsx`** - Login Page
1. **Client Component** (`'use client'`) - Needs interactivity
2. Uses React hooks (`useState`) for form state
3. Creates browser Supabase client (different from server client)
4. Sends magic link email via `signInWithOtp()`
5. User clicks link in email → redirected to `/auth/callback`

#### **`app/auth/callback/route.ts`** - OAuth Callback Handler
1. Receives `code` parameter from Supabase email link
2. Exchanges code for session using `exchangeCodeForSession()`
3. Sets authentication cookies
4. Redirects to `/dashboard`

#### **`app/api/` Directory - API Routes**
These are **Route Handlers** (Next.js 13+ API routes):

- **`/api/auth/signout`** - POST endpoint to sign out
  - Clears Supabase session
  - Deletes cookies
  - Redirects to home

- **`/api/preferences`** - CRUD for user preferences
  - GET: Fetch user's alert preferences
  - POST: Create/update preference (with rate limiting)
  - DELETE: Remove preference

- **`/api/alerts/run`** - Background worker endpoint
  - Protected by `WORKER_SECRET` header
  - Finds verified reports from last 15 minutes
  - Matches reports to user preferences
  - Sends email alerts
  - Respects quiet hours
  - Deduplicates alerts

### **Potential Issues & Limitations:**

1. **Server Components vs Client Components:**
   - ❌ Can't use hooks (`useState`, `useEffect`) in Server Components
   - ✅ Use `'use client'` directive when needed
   - ⚠️ Mixing them can cause hydration errors

2. **Authentication Flow:**
   - ⚠️ Magic link emails can go to spam
   - ⚠️ No password-based auth (only email links)
   - ✅ More secure, but less convenient

3. **API Route Limitations:**
   - ⚠️ Rate limiting is in-memory (resets on server restart)
   - ⚠️ No request body size limits configured
   - ⚠️ Error handling could be more detailed

---

## 📁 **2. `/components` Directory**

### **Purpose:**
Reusable React components shared across the application.

### **How It Works:**

#### **`components/AdminNavLink.tsx`**
1. **Server Component** (async function)
2. Fetches current user from Supabase
3. Queries `profiles` table for user's email
4. Checks if email is in `ADMIN_EMAILS` env variable
5. Returns `null` if not admin (component doesn't render)
6. Returns `<Link>` component if admin

**Why Server Component?**
- No client-side JavaScript needed
- Auth check happens on server (more secure)
- Better performance (no hydration)

### **Potential Issues & Limitations:**

1. **Admin Check:**
   - ⚠️ Admin list is in environment variable (comma-separated)
   - ⚠️ Changes require server restart
   - ✅ Simple but not scalable for many admins

2. **Error Handling:**
   - ✅ Silently fails (returns `null`) - good UX
   - ⚠️ Errors are swallowed (could hide bugs)

---

## 📁 **3. `/lib` Directory - Utility Functions**

### **Purpose:**
Shared utility functions, helpers, and business logic used throughout the app.

### **How It Works Step-by-Step:**

#### **`lib/supabase/` - Supabase Client Configuration**

**Three different clients for different contexts:**

1. **`client.ts`** - Browser Client
   ```typescript
   // Used in Client Components (e.g., login page)
   // Uses NEXT_PUBLIC_SUPABASE_URL and ANON_KEY
   // Handles cookies automatically via @supabase/ssr
   ```

2. **`server.ts`** - Server Client
   ```typescript
   // Used in Server Components and API routes
   // Accesses cookies via Next.js cookies() API
   // Handles session refresh automatically
   ```

3. **`admin.ts`** - Admin Client (Service Role)
   ```typescript
   // Uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS)
   // Only for server-side operations
   // Used in background workers (e.g., alert processing)
   ```

**Why Three Clients?**
- Browser: Needs to work in browser environment
- Server: Needs to access server-side cookies
- Admin: Needs to bypass Row Level Security (RLS) for system operations

#### **`lib/auth.ts`** - Authentication Helpers
- `getCurrentUser()` - Gets authenticated user
- `isAdmin(email)` - Checks if email is in admin list
- `getUserProfile(userId)` - Fetches user profile data

#### **`lib/validators.ts`** - Input Validation
- Uses **Zod** library for schema validation
- Defines valid visa types and consulates
- Validates date ranges, preferences, slot reports
- Type-safe validation with TypeScript

**Example Flow:**
```
User submits form → API route receives data → Zod validates → 
If valid: Save to DB → If invalid: Return 400 error
```

#### **`lib/rateLimit.ts`** - Rate Limiting
**Two modes:**

1. **In-Memory (Development):**
   - Uses `Map` to store request counts
   - Resets on server restart
   - Single server instance only

2. **Upstash Redis (Production):**
   - Uses Redis for distributed rate limiting
   - Works across multiple server instances
   - Falls back to "allow" if Redis fails (fail-open)

**How It Works:**
```
Request → Check rate limit key → Increment counter → 
Check if over limit → Return success/failure
```

#### **`lib/scoring.ts`** - Confidence Scoring
Calculates confidence score for slot reports:
- Base score: 0.50
- +0.30 if screenshot present
- +0.20 if reporter has 3+ verified reports
- +0.25 per cross-confirmation (max 2)
- Auto-verify if score >= 0.75

**Purpose:** Automatically verify high-confidence reports without admin review.

#### **`lib/email.ts`** - Email Sending
- Uses **Resend** service for sending emails
- Falls back to console.log if not configured (dev mode)
- Sends HTML and plain text versions
- Includes compliance disclaimers

### **Potential Issues & Limitations:**

1. **Rate Limiting:**
   - ⚠️ In-memory mode doesn't work with multiple servers
   - ⚠️ Fail-open behavior could allow abuse if Redis fails
   - ✅ Good for MVP, needs improvement for scale

2. **Scoring System:**
   - ⚠️ Rules-based (not ML-based) - simple but limited
   - ⚠️ No learning from false positives/negatives
   - ✅ Transparent and explainable

3. **Email:**
   - ⚠️ No retry logic for failed sends
   - ⚠️ No email templates (hardcoded HTML)
   - ⚠️ No unsubscribe mechanism

4. **Type Safety:**
   - ✅ Good use of TypeScript and Zod
   - ⚠️ Database types are manually defined (should be auto-generated)

---

## 📁 **4. `/supabase` Directory - Database Schema**

### **Purpose:**
Contains database migrations and setup instructions for Supabase (PostgreSQL).

### **How It Works:**

#### **`supabase/migrations/001_initial_schema.sql`**

**Database Tables:**

1. **`profiles`** - User profile data
   - Linked to Supabase Auth users
   - Stores email, full name
   - Auto-created via trigger when user signs up

2. **`preferences`** - User alert preferences
   - Visa type, consulate, date range
   - Alert channels (email, SMS, push)
   - Quiet hours (when not to send alerts)
   - Unique constraint: one preference per user/visa/consulate combo

3. **`slot_reports`** - User-submitted slot reports
   - Reporter ID, consulate, visa type
   - Date range, screenshot path
   - Confidence score, status (pending/verified/rejected)
   - Source tracking

4. **`report_verification`** - Admin review decisions
   - Links to slot_reports
   - Decision (verified/rejected)
   - Reason codes for rejection

5. **`alerts`** - Sent alert records
   - User ID, report ID, channel
   - Status (pending/sent/failed)
   - Dedupe key (prevents duplicate alerts)

6. **`audit_events`** - System audit log
   - Tracks all important actions
   - Actor ID, action type, metadata

**Row Level Security (RLS):**
- Users can only see their own data
- Verified reports are public
- Admin operations use service role (bypasses RLS)

**Triggers:**
- `update_updated_at_column()` - Auto-updates `updated_at` timestamp
- `handle_new_user()` - Creates profile when user signs up

### **Potential Issues & Limitations:**

1. **Database Design:**
   - ✅ Good use of foreign keys and constraints
   - ⚠️ No soft deletes (data is permanently deleted)
   - ⚠️ No database-level rate limiting
   - ⚠️ Screenshot storage path only (no actual storage setup)

2. **RLS Policies:**
   - ✅ Good security model
   - ⚠️ Service role policies are too permissive (`USING (true)`)
   - ⚠️ No time-based access controls

3. **Indexes:**
   - ✅ Good indexes on frequently queried columns
   - ⚠️ May need more indexes as data grows
   - ⚠️ No composite indexes for complex queries

4. **Scalability:**
   - ⚠️ No partitioning for large tables
   - ⚠️ No archiving strategy for old data

---

## 📁 **5. `/.next` Directory - Build Output**

### **Purpose:**
This is the **build output** directory created by Next.js when you run `next build` or `next dev`.

### **What's Inside:**
- Compiled JavaScript bundles
- Optimized images
- Static assets
- Server-side code
- Type definitions
- Build manifests

### **How It Works:**
1. You write code in `/app`, `/components`, `/lib`
2. Run `next build` or `next dev`
3. Next.js compiles and optimizes your code
4. Output goes to `/.next`
5. This is what actually runs in production

### **Important Notes:**
- ⚠️ **Never commit this to git** (should be in `.gitignore`)
- ⚠️ **Don't edit files here** - changes will be overwritten
- ✅ This is auto-generated - you don't need to understand it

### **Potential Issues:**
- ⚠️ Large directory (can be hundreds of MB)
- ⚠️ Cleared on each build
- ✅ Normal behavior for Next.js

---

## 🔄 **Complete Application Flow**

### **User Journey:**

1. **Landing Page** (`/`)
   - User sees homepage
   - Clicks "Get Started" or "Sign In"

2. **Login** (`/auth/login`)
   - User enters email
   - Receives magic link email
   - Clicks link in email

3. **Callback** (`/auth/callback`)
   - Supabase exchanges code for session
   - User redirected to dashboard

4. **Dashboard** (`/dashboard`)
   - Shows verified reports
   - Shows user's alert history

5. **Set Preferences** (`/preferences`)
   - User configures alert preferences
   - Saves to database via API

6. **Submit Report** (`/reports`)
   - User submits slot report
   - Uploads screenshot (optional)
   - Report saved with "pending" status

7. **Background Processing:**
   - Admin reviews reports (or auto-verify if high confidence)
   - Worker cron job runs (`/api/alerts/run`)
   - Matches verified reports to preferences
   - Sends email alerts
   - Respects quiet hours

---

## 🚨 **Common Issues & Solutions**

### **1. Authentication Issues:**
- **Problem:** User not logged in after clicking email link
- **Solution:** Check `NEXT_PUBLIC_SUPABASE_URL` matches Supabase project URL

### **2. CORS Errors:**
- **Problem:** API calls blocked by browser
- **Solution:** Ensure Supabase CORS settings include your domain

### **3. Rate Limiting Not Working:**
- **Problem:** Rate limits reset on each request
- **Solution:** Set up Upstash Redis for production

### **4. Email Not Sending:**
- **Problem:** No emails received
- **Solution:** Check `RESEND_API_KEY` is set, verify email domain in Resend

### **5. Database Errors:**
- **Problem:** RLS policies blocking queries
- **Solution:** Check user is authenticated, verify RLS policies match your use case

---

## 📚 **Key Next.js Concepts Used**

1. **App Router** - File-based routing (Next.js 13+)
2. **Server Components** - Default, run on server
3. **Client Components** - Use `'use client'` for interactivity
4. **Route Handlers** - API endpoints in `/app/api`
5. **Middleware** - Runs on every request (auth refresh)
6. **Server Actions** - Form submissions (not used here, but could be)

---

## 🎯 **Best Practices Demonstrated**

✅ Type safety with TypeScript  
✅ Input validation with Zod  
✅ Row Level Security for data protection  
✅ Rate limiting for abuse prevention  
✅ Error handling in API routes  
✅ Server-side data fetching  
✅ Environment variable usage  
✅ Separation of concerns (lib, components, app)

---

## 🔧 **Areas for Improvement**

1. **Error Handling:**
   - Add error boundaries
   - Better error messages for users
   - Logging service (e.g., Sentry)

2. **Testing:**
   - Unit tests for utilities
   - Integration tests for API routes
   - E2E tests for user flows

3. **Performance:**
   - Add caching for frequently accessed data
   - Optimize database queries
   - Add pagination for large lists

4. **Security:**
   - Add CSRF protection
   - Implement proper admin role management
   - Add request signing for worker endpoints

5. **Features:**
   - SMS and push notification support
   - Better admin dashboard
   - Report analytics
   - User reputation system

---

This is a well-structured Next.js application following modern best practices! The code is clean, type-safe, and uses appropriate patterns for a production application.

