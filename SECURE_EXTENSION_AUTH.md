# Secure Extension Authentication Flow

## Overview

The USVisaBridge extension uses a secure one-time code exchange system for authentication. This ensures tokens are never passed via `localStorage` or `window.postMessage`, providing enhanced security.

---

## Architecture

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│              Secure Extension Authentication Flow                   │
└─────────────────────────────────────────────────────────────────────┘

1. Extension Opens Login
   │
   └─> Opens: /auth/login?extensionId=<uuid>
       │
       └─> User authenticates (Magic Link or Google OAuth)

2. User Authenticates
   │
   ├─> Magic Link: User enters email → Receives link → Clicks link
   └─> Google OAuth: User clicks "Continue with Google" → Redirects

3. Supabase Callback
   │
   └─> /auth/callback/extension?extensionId=<uuid>&code=<auth-code>
       │
       └─> Server Route (route.ts)
           │
           ├─> Exchanges OAuth code for session
           ├─> Generates secure one-time connect code (64 hex chars)
           ├─> Stores code + tokens (temporarily, 5 min expiry)
           └─> Redirects to: /auth/extension/done?extensionId=<uuid>&code=<connect-code>

4. Done Page
   │
   └─> Client Page (page.tsx)
       │
       └─> Sends ONLY code to extension via postMessage:
           │
           └─> { type: 'USVISABRIDGE_EXTENSION_CONNECT', extensionId, code }

5. Extension Exchanges Code
   │
   └─> Extension receives code via postMessage
       │
       └─> POST /api/v1/extension/exchange
           Body: { extensionId, code }
           │
           └─> Server validates code:
               │
               ├─> Checks code exists, not expired, not used
               ├─> Marks code as used (atomic update)
               └─> Returns tokens:
                   {
                     access_token,
                     refresh_token,
                     expires_at,
                     user: { id, email }
                   }

6. Extension Stores Tokens
   │
   └─> Extension stores tokens in chrome.storage.local (NOT localStorage)
       │
       └─> User is now authenticated
```

---

## Security Features

### 1. One-Time Code Exchange
- Codes are single-use and expire after 5 minutes
- Codes are 64 hex characters (32 bytes of randomness)
- Atomic updates prevent race conditions

### 2. No Token Exposure
- Tokens are **never** passed via `localStorage` or `window.postMessage`
- Only the one-time code is passed to the extension
- Tokens are stored temporarily server-side (5 min expiry) and deleted after use

### 3. Token Storage
- Extension stores tokens in `chrome.storage.local` (not `localStorage`)
- Tokens are encrypted in transit (HTTPS)
- Tokens expire and must be refreshed

### 4. Rate Limiting
- Exchange endpoint is rate-limited (10 requests per minute per IP)
- Prevents brute force attacks

---

## Database Schema

### `extension_connect_codes` Table

```sql
CREATE TABLE extension_connect_codes (
  id UUID PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  extension_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,  -- Code expiry (5 minutes)
  token_expires_at BIGINT NOT NULL,  -- Token expiry
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Security:**
- Codes expire after 5 minutes
- Codes are single-use (`used` flag)
- Tokens are deleted after use (via cleanup function)
- Accessible only via service role (RLS)

---

## API Endpoints

### POST /api/v1/extension/exchange

**Purpose:** Exchange one-time code for session tokens

**Request:**
```json
{
  "extensionId": "chrome-extension-id",
  "code": "64-hex-character-code"
}
```

**Response (Success):**
```json
{
  "access_token": "jwt-access-token",
  "refresh_token": "refresh-token",
  "expires_at": 1234567890,
  "user": {
    "id": "user-uuid",
    "email": "user@example.com"
  }
}
```

**Response (Error):**
```json
{
  "error": "Invalid or expired code"
}
```

**Status Codes:**
- `200`: Success
- `400`: Missing/invalid fields
- `401`: Invalid/expired/used code
- `429`: Rate limit exceeded
- `500`: Internal server error

**Security:**
- Rate limited (10 requests/minute per IP)
- Validates code format (64 hex chars)
- Atomic updates prevent race conditions
- Codes are single-use

---

## Routes

### /auth/login

**Features:**
- Detects `extensionId` query parameter
- Supports Magic Link and Google OAuth
- Redirects to extension callback if `extensionId` present

**Query Parameters:**
- `extensionId` (optional): Extension ID for extension login

**OAuth Providers:**
- Email (Magic Link)
- Google

---

### /auth/callback/extension (Server Route)

**Purpose:** Handle OAuth callback and generate one-time code

**Query Parameters:**
- `code`: OAuth code from Supabase
- `extensionId`: Extension ID
- `error`: OAuth error (if any)

**Process:**
1. Exchange OAuth code for session
2. Generate secure one-time connect code
3. Store code + tokens in database
4. Redirect to `/auth/extension/done` with code

**Security:**
- One-time code generation (32 bytes random)
- 5-minute expiry
- Server-side only (no client exposure)

---

### /auth/extension/done (Client Page)

**Purpose:** Send one-time code to extension

**Query Parameters:**
- `extensionId`: Extension ID
- `code`: One-time connect code
- `error`: Error message (if any)

**Process:**
1. Validates code and extensionId
2. Sends code to extension via `postMessage`
3. Shows success message
4. Closes tab after 2 seconds

**Security:**
- Only sends code (NOT tokens)
- Validates origin before sending
- Code expires in 5 minutes

---

## Extension Integration

### 1. Login Flow

```javascript
// Extension opens login page
const extensionId = chrome.runtime.id;
window.open(`${APP_URL}/auth/login?extensionId=${extensionId}`);
```

### 2. Listen for Code

```javascript
// Listen for code from done page
window.addEventListener('message', (event) => {
  if (event.origin !== APP_URL_ORIGIN) return;
  
  if (event.data.type === 'USVISABRIDGE_EXTENSION_CONNECT') {
    const { extensionId, code } = event.data;
    
    // Exchange code for tokens
    exchangeCodeForTokens(extensionId, code);
  }
});
```

### 3. Exchange Code for Tokens

```javascript
async function exchangeCodeForTokens(extensionId, code) {
  const response = await fetch(`${APP_URL}/api/v1/extension/exchange`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ extensionId, code }),
  });
  
  if (!response.ok) {
    throw new Error('Code exchange failed');
  }
  
  const { access_token, refresh_token, expires_at, user } = await response.json();
  
  // Store tokens in chrome.storage.local (NOT localStorage)
  await chrome.storage.local.set({
    access_token,
    refresh_token,
    expires_at,
    user,
  });
}
```

### 4. Use Tokens for API Calls

```javascript
async function callAPI(endpoint) {
  const { access_token } = await chrome.storage.local.get('access_token');
  
  const response = await fetch(`${APP_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });
  
  return response.json();
}
```

---

## Setup Steps

### 1. Database Migration

Run the migration to create the `extension_connect_codes` table:

```bash
# In Supabase SQL Editor, run:
supabase/migrations/003_extension_connect_codes.sql
```

### 2. Environment Variables

**Required:**
```env
NEXT_PUBLIC_APP_URL=https://usvisabridge.com
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Supabase Configuration

**Redirect URLs:**
Add to Supabase Dashboard → Authentication → URL Configuration:
- `https://usvisabridge.com/auth/callback`
- `https://usvisabridge.com/auth/callback/extension`

**OAuth Providers:**
Enable Google OAuth in Supabase Dashboard:
1. Go to Authentication → Providers
2. Enable Google
3. Add Client ID and Client Secret
4. Add redirect URLs

### 4. Cleanup Function (Optional)

Set up a cron job to clean up expired codes:

```sql
-- Can be called periodically (e.g., every hour)
SELECT cleanup_expired_extension_codes();
```

---

## Security Best Practices

### ✅ Do's

- ✅ Use one-time codes (never pass tokens directly)
- ✅ Store tokens in `chrome.storage.local` (not `localStorage`)
- ✅ Validate origin before accepting `postMessage`
- ✅ Use HTTPS in production
- ✅ Implement token refresh logic
- ✅ Rate limit exchange endpoint
- ✅ Clean up expired codes regularly

### ❌ Don'ts

- ❌ Never pass tokens via `localStorage` or `window.postMessage`
- ❌ Never store tokens in plain text
- ❌ Never accept codes from untrusted origins
- ❌ Never skip code validation
- ❌ Never reuse codes

---

## Troubleshooting

### Issue: "Invalid or expired code"

**Solutions:**
1. Check code hasn't expired (5 minutes)
2. Verify code hasn't been used already
3. Ensure extensionId matches
4. Check code format (64 hex characters)

### Issue: "Rate limit exceeded"

**Solutions:**
1. Wait 1 minute before retrying
2. Check for duplicate requests
3. Verify rate limit configuration

### Issue: Code exchange fails

**Solutions:**
1. Check database connection
2. Verify service role key is set
3. Check server logs for errors
4. Verify code was stored correctly

---

## Next Steps

### Immediate (Required)

1. ✅ Run database migration
2. ✅ Set environment variables
3. ✅ Configure Supabase redirect URLs
4. ✅ Enable Google OAuth in Supabase
5. ✅ Update extension code to use new flow

### Short Term (Enhancement)

1. Implement token refresh logic in extension
2. Add error handling and retry logic
3. Set up cleanup cron job
4. Add monitoring/logging

### Long Term (Future)

1. Support additional OAuth providers
2. Add MFA support
3. Implement session management UI
4. Add analytics/metrics

