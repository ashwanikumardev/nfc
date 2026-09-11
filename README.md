# NPC Google Reviews

## Deployment
- **Hosted on**: [Vercel](https://vercel.com)
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (connect via env vars)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deploying to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Add environment variables (see `.env.example`)
5. Deploy!

## Environment Variables

Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## Admin Dashboard

Visit `/admin` and enter the admin password.

**Default password**: `npcadmin2026`

> ⚠️ Change this before going live! Update in `src/app/admin/page.tsx` or move to env var.

## Tech Stack

- **Next.js 14** (App Router + TypeScript)
- **Tailwind CSS** (v4)
- **Supabase** (database + storage)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Vercel** (hosting)

## Structure

```
src/
  app/
    page.tsx          # Main landing page
    layout.tsx        # Root layout + SEO
    globals.css       # Global styles
    admin/
      page.tsx        # Admin dashboard
  components/
    Navbar.tsx
    HeroSection.tsx
    MarqueeStrip.tsx
    StatsSection.tsx
    HowItWorksSection.tsx
    ExamplesSection.tsx
    BeforeAfterSection.tsx
    OfferSection.tsx
    PricingSection.tsx
    OrderForm.tsx
    TestimonialsSection.tsx
    FAQSection.tsx
    FinalCTA.tsx
    Footer.tsx
    MobileStickyCTA.tsx
    ReelCard.tsx
    VideoModal.tsx
  lib/
    utils.ts
```
