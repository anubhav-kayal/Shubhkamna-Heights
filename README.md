# Shubh Kamna Heights — Premium Real Estate Website

A cinematic, conversion-focused real estate showcase website for **Shubh Kamna Heights**, built with modern web technologies and Supabase backend integration.

---

## 🎯 Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + custom CSS variables
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (images, videos)
- **Authentication:** Supabase Auth (admin CMS)
- **Forms:** Supabase (enquiry writes)
- **Hosting:** Vercel
- **Icons:** Lucide React
- **Fonts:** Cormorant Garamond (display) + Inter (body)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd shubhkamna-heights
npm install --legacy-peer-deps
```

### 2. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` (Dashboard → SQL Editor)
3. Create a public Storage bucket named `media`
4. Apply the storage policies from the comments at the bottom of `supabase/schema.sql`
5. Enable **Email** auth provider (Authentication → Providers)
6. Create an admin user (Authentication → Users)
7. Grant CMS access:

```sql
INSERT INTO admin_users (user_id) VALUES ('YOUR-AUTH-USER-UUID');
```

8. Copy **Project URL** and **anon public key** from Project Settings → API

### 3. Environment Variables

Create a `.env.local` file (copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Then add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Database Tables

Created by `supabase/schema.sql`:

```
site_settings           → hero, landing, pricing (JSON documents)
banks                   → partner bank loan data
gallery_images          → project gallery
amenities               → amenity cards
floor_plans             → 2BHK / 3BHK plans
blog_posts              → blog CMS
testimonials            → resident quotes
specifications          → construction specs
enquiries               → inbound leads
admin_users             → CMS admin access list
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
/app
  /layout.tsx              ← Root layout with Navbar, FABs, providers
  /page.tsx                ← Homepage (all 15 sections)
  /blog
    /page.tsx              ← Blog listing
    /[slug]/page.tsx       ← Individual blog post
  /admin                   ← CMS (protected)
    /layout.tsx
    /page.tsx              ← Dashboard

/components
  /sections                ← 12 homepage sections
    Navbar.tsx
    HeroSection.tsx
    ProjectOverviewSection.tsx
    AmenitiesSection.tsx
    FloorPlansSection.tsx
    GallerySection.tsx
    SpecificationsSection.tsx
    TieUpBanksSection.tsx
    LocationSection.tsx
    AboutSection.tsx
    TestimonialsSection.tsx
    BlogSection.tsx
    EnquirySection.tsx
    Footer.tsx
  /ui
    CostCalculatorWidget.tsx     ← Floating EMI calculator
    WhatsAppFAB.tsx             ← WhatsApp button
    ExitIntentModal.tsx         ← Exit-intent enquiry form

/lib
  supabase/
    schema.sql             ← Postgres schema + RLS policies
  supabase/client.ts       ← Browser Supabase client (via lib/supabase/)
  firestore.ts             ← CMS read/write helpers (Supabase-backed)
  calculator.ts            ← EMI calculation logic
  constants.ts             ← Project data & settings

/context
  CalculatorContext.tsx    ← Calculator state management

/hooks
  useScrolled.ts           ← Scroll position tracking

/types
  index.ts                 ← TypeScript interfaces
```

---

## 🎨 Color Scheme — "Midnight Gold"

The website uses a luxury real estate color palette:

```css
/* Primary */
--gold: #C9A84C;           /* Brand gold */
--gold-light: #E8C97A;     /* Hover states */
--gold-dark: #9A7A2E;      /* Pressed states */

/* Backgrounds */
--bg-primary: #0A0A0F;     /* Main dark */
--bg-card: #111118;        /* Card backgrounds */
--bg-section: #16161F;     /* Section alternates */
--bg-light: #F7F5F0;       /* Light sections */

/* Text */
--text-primary: #F0EDE6;   /* Warm white */
--text-secondary: #A89F8C; /* Muted gray */
--text-dark: #1A1A24;      /* Dark text */
```

---

## 📊 Homepage Sections

1. **Navbar** — Sticky navigation with RERA banner
2. **Hero** — Full-screen video background with CTAs
3. **Project Overview** — Location highlights & key features
4. **Amenities** — 20 lifestyle amenities with icons
5. **Floor Plans** — 2BHK & 3BHK unit cards with pricing
6. **Gallery** — Masonry image gallery with filters
7. **Specifications** — Construction details (accordion)
8. **Tie-up Banks** — Home loan options & interest rates
9. **Location** — Map + connectivity landmarks
10. **About** — Trust badges & certifications
11. **Testimonials** — Carousel with buyer quotes
12. **Blog** — Latest articles with links
13. **Enquiry Form** — Contact form with WhatsApp CTA
14. **Footer** — Links, contact info, RERA details

---

## ⚡ Key Features

### Floating Widgets
- **EMI Calculator** (bottom-left): Live EMI calculations
- **WhatsApp FAB** (bottom-right): Direct WhatsApp link
- **Exit-Intent Modal** (desktop): Capture leads before bounce

### Animations
- Section entrance animations (Framer Motion)
- Smooth scroll behavior
- Staggered grid animations
- Counter animations (stats)
- Hover effects on interactive elements

### Mobile Responsive
- Mobile-optimized menu (hamburger drawer)
- Bottom sheet calculator (mobile)
- Touch-friendly CTAs
- Responsive images with WebP support

### Performance
- `next/image` with blur placeholders
- Video optimization (see below)
- CSS variables for dynamic theming
- Optimized bundle size

---

## 🎬 Video Optimization

The hero video should be compressed before uploading to Supabase Storage (`media` bucket):

```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -acodec aac -b:a 128k -movflags +faststart output.mp4
```

Target: **≤ 8 MB** for optimal delivery

---

## 🔐 Supabase Security

Row Level Security policies are defined in `supabase/schema.sql`:

- **Public read** on all CMS content tables
- **Public insert** on `enquiries` only
- **Admin-only write** on CMS tables (via `admin_users` + `is_admin()`)
- **Storage:** public read on `media` bucket; admin-only upload/update/delete

Grant admin access by inserting the user's UUID into `admin_users` after they sign up in Supabase Auth.

---

## 📋 SEO & Meta Tags

- Metadata configured in `app/layout.tsx`
- JSON-LD structured data for real estate listing
- All images have alt text
- Meta descriptions on dynamic pages
- Open Graph tags for social sharing
- Robots.txt and sitemap.ts configured

---

## 🧪 Build & Deploy

### Build

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Then connect your GitHub repo and let Vercel handle deployments.

### Environment Variables on Vercel

Add your `.env.local` variables to Vercel Project Settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

---

## 📝 Content Management

### Managing Content

1. **Primary:** use the built-in admin panel at `/admin` (blog, gallery, pricing, hero, etc.)
2. **Alternative:** Supabase Studio (Table Editor + Storage)
3. **Media uploads:** admin UI uploads to the `media` Storage bucket, or upload manually in Supabase Storage and paste the public URL

---

## 🚀 Deployment Checklist

- [ ] Supabase project created & schema applied
- [ ] `.env.local` populated with Supabase credentials
- [ ] `media` Storage bucket created with policies
- [ ] Admin user created and added to `admin_users`
- [ ] Hero video uploaded to Supabase Storage
- [ ] Gallery images uploaded & linked in `gallery_images`
- [ ] Blog posts created with `published = true`
- [ ] Build passes with `npm run build`
- [ ] Lighthouse score ≥ 85 (Performance)
- [ ] All internal links tested
- [ ] Mobile menu tested on device
- [ ] EMI calculator tested with live rates
- [ ] Enquiry form submission tested
- [ ] RERA number & links verified
- [ ] Analytics configured (if needed)

---

## 📱 API Endpoints (if needed)

Currently, the app uses Supabase directly via the client SDK. To add server-side API routes:

```typescript
// app/api/[endpoint]/route.ts
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = getSupabaseServerClient();
  // Fetch from Supabase
}
```

---

## 🆘 Troubleshooting

### Supabase not connecting?
- Check `.env.local` variables are correct
- Ensure the Supabase project is active
- Verify RLS policies allow public reads

### Images not loading?
- Verify image URLs in Supabase are accessible
- Check the `media` bucket is public
- Use absolute URLs, not relative paths

### Mobile menu not working?
- Check Tailwind breakpoints in globals.css
- Ensure `setMobileMenuOpen(false)` is called on link click

### EMI Calculator not calculating?
- Verify pricing in `site_settings` key `pricing`
- Check interest rates in the `banks` table

---

## 📞 Support & Contact

**Project:** Shubh Kamna Heights
**Location:** Chandauli, Uttar Pradesh
**Contact:** +91 70841 65214
**Email:** subh.0263@gmail.com
**WhatsApp:** https://wa.me/917084165214

---

## 📄 License

All rights reserved © 2025 Shubh Kamna Heights

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
