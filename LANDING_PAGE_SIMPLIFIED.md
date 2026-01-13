# USVisaBridge Landing Page - Simplified & Rewritten

## 1) LANDING PAGE FINAL ORDER (8 sections)

1. **Hero** — Primary CTA "Install Extension", secondary CTA "Get Started (Email Alerts)", microtrust line
2. **Watch How It Works** — Video placeholder (60 seconds)
3. **How It Works** — 3-step flow (Install Extension / Choose Preferences / Get Alerts)
4. **Is This Safe?** — 3 simple promises (no passwords, no screenshots, only what you see)
5. **Why We Use an Extension** — Shortened explanation (1 paragraph + 3 bullets + CTA)
6. **How We'll Alert You** — Email available now, others coming soon (not vaporware)
7. **Supported Visa Types** — Compact pills with optional "view all"
8. **Final CTA** — Install Extension + Create Account + Security reminder

---

## 2) MOVE OFF LANDING

**Move to `/extension`:**
- Detailed extension workflow (6-step legal process)
- Permissions deep-dive explanation
- Technical architecture details
- How consent dialogs work (detailed)

**Move to `/safety`:**
- Legal vs Illegal extension comparison table
- Warning about unsafe extensions (detailed list)
- Compliance details and privacy design principles

**Reason:** These are valuable but create information overload on landing. Users need quick trust + conversion, not legal education.

---

## 3) REPLACEMENT COPY

### A) HERO — Subheadline + Microtrust

**Current:**
```
Install our browser extension to join a community-powered alert system. 
You book appointments yourself. No passwords. No fees. Fully open source.
```

**Replacement:**
```
Get instant email alerts when visa appointments open up. 
Install our free browser extension, choose your preferences, and we'll notify you immediately. 
You book appointments yourself—we never ask for passwords or access your account.
```

**Microtrust (below buttons):**
```
No passwords. No screenshots. You book it yourself.
```

---

### B) HOW IT WORKS — 3 Steps (Rewritten)

**Step 1: Install Extension**
- **Icon:** Download
- **Heading:** Install Extension
- **Body:** Install our free browser extension from Chrome Web Store. We show you exactly what permissions we need and why.
- **No CTA needed** (already in hero)

**Step 2: Choose Visa Type + Location**
- **Icon:** Settings/Slider
- **Heading:** Choose Your Preferences
- **Body:** Tell us your visa type, which embassy or consulate you need, and your preferred dates. That's all we need to send you alerts.
- **No CTA needed**

**Step 3: Get Alerts**
- **Icon:** Bell
- **Heading:** Get Instant Alerts
- **Body:** When slots become available, you get an email alert immediately. You book the appointment yourself through the official visa portal.
- **No CTA needed**

---

### C) IS THIS SAFE? — 3 Items (Rewritten in Plain English)

**Heading:**
```
Is This Safe?
```

**Subheading:**
```
Yes. Here's what we do—and what we never ask for.
```

**Item 1: We never ask for passwords**
- **Icon:** CheckCircle2 (green)
- **Heading:** We never ask for passwords
- **Body:** We don't need your visa portal login. You log in yourself through the official portal. We only see the appointment calendar that's already visible to you.

**Item 2: We never take screenshots**
- **Icon:** CheckCircle2 (green)
- **Heading:** We never take screenshots of your screen
- **Body:** Some extensions secretly capture images of your browser window. We don't do that. If you choose to share slot information, you see exactly what will be shared before anything is sent.

**Item 3: We only see what you see**
- **Icon:** CheckCircle2 (green)
- **Heading:** We only see what you see
- **Body:** When you're logged into the visa portal viewing appointment calendars, our extension only reads that same information. We don't access your account details, personal information, or anything hidden behind the page.

**Footer link:**
```
Learn more about safety & privacy →
```
(Link to `/safety`)

---

### D) WHY WE USE AN EXTENSION — Shortened (1 Paragraph + 3 Bullets + CTA)

**Heading:**
```
Why Do We Need a Browser Extension?
```

**Paragraph (2 sentences max):**
```
Visa slots appear and disappear in minutes. To catch them instantly, we need to detect availability right when you visit the appointment calendar. Our extension only reads what you can already see on your screen—nothing hidden or private.
```

**3 Bullets:**
- **Real-time detection** — Catches slots the moment they appear
- **Opt-in sharing only** — You choose whether to share slot data to help others
- **No account access** — You log in yourself; we never touch your credentials

**CTA:**
```
See exactly what permissions we need →
```
(Link to `/extension`)

---

### E) 100% OPEN SOURCE — Compressed to Trust Strip

**Format:** Small horizontal strip (not big section)

**Design:** Two bullets + one button, inline/centered

**Copy:**
```
✅ 100% open source — Review our code on GitHub
✅ No hidden functionality — Everything is transparent
```

**Button:**
```
View Code on GitHub
```
(Link to GitHub repo)

**Microcopy below button (optional, small):**
```
See permissions & data use →
```
(Link to `/extension`)

**Total height:** Should be ~60-80px, not full section.

---

### F) HOW WE'LL ALERT YOU — Make "Coming Soon" Not Feel Like Vaporware

**Heading:**
```
How We'll Alert You
```

**Subheading:**
```
Choose how you want to receive notifications
```

**Email (Available):**
- **Badge:** "Available Now" (green)
- **Heading:** Email
- **Body:** Instant email notifications sent directly to your inbox
- **No CTA needed** (covered in hero/final CTA)

**SMS (Coming Soon):**
- **Badge:** "In Development" (not "Coming Soon" — feels more real)
- **Heading:** SMS
- **Body:** Text message alerts sent directly to your phone. We're building this now.

**WhatsApp (Coming Soon):**
- **Badge:** "In Development"
- **Heading:** WhatsApp
- **Body:** WhatsApp notifications for instant updates. Coming next.

**Design note:** Make "In Development" feel active, not vague. Maybe add small text: "Email us if you want early access" (optional).

**Footer text (small):**
```
Email alerts work now. SMS and WhatsApp coming soon—we'll notify all users when they're ready.
```

---

### G) SUPPORTED VISA TYPES — Compact Pills

**Heading:**
```
Supported Visa Types
```

**1-Line Intro:**
```
We monitor appointments for all major U.S. visa categories
```

**Pills (horizontal, flex wrap):**
```
B1/B2 | F1 | H1B | O1 | L1 | J1 | K1 | E2
```

**Optional "View All" Link (small, right-aligned or below pills):**
```
View complete list →
```
(If you have a longer list somewhere, link to `/visa-types` or just keep it as is)

---

### H) FINAL CTA — Simplified

**Heading:**
```
Ready to Get Started?
```

**Subheading:**
```
Join thousands who get visa appointment alerts faster
```

**Primary CTA Button:**
```
Install Extension
```
(Link to Chrome Web Store)

**Secondary CTA Button:**
```
Create Account
```
(Link to `/auth/login`)

**Microcopy below buttons:**
```
No credit card. No passwords. You book it yourself.
```

**Security Reminder (below, smaller):**
```
Important: Never share your visa portal password, passport number, or personal documents with any service. We will never ask for these.
```

---

## 4) STYLE NOTES

**Tone:**
- Calm, trustworthy, helpful
- Use "we" language
- No hype or buzzwords
- Short sentences (max 15-20 words)

**Jargon to Avoid:**
- ❌ "API interception"
- ❌ "GDPR/CCPA compliant"
- ❌ "Data minimization"
- ❌ "Anonymized data"
- ❌ "Community-powered monitoring"

**Replacements:**
- ✅ "We only see what you see"
- ✅ "Designed around consent"
- ✅ "Optional sharing to help others"
- ✅ "You choose what's shared"

**Length:**
- Paragraphs: Max 2 sentences
- Bullets: Max 3-4 items per section
- Body text: Max 50 words per card
- Headings: Max 6 words

---

## 5) FINAL CHECKLIST

✅ Extension is primary CTA in hero
✅ 3-step flow starts with "Install Extension"
✅ "Is This Safe?" explains screenshots in plain English
✅ "Why Extension" is 1 paragraph + 3 bullets + CTA
✅ Open Source is trust strip, not big section
✅ "Coming Soon" feels active ("In Development")
✅ No competitor names
✅ No hard legal claims
✅ No technical jargon
✅ Total: 8 sections max

---

END OF DOCUMENT

