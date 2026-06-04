# AGENT PROMPT — Shubhkamna Heights Website (Build from Scratch)

## YOUR MISSION
Build a world-class real estate product showcase website for **Shubh Kamna Heights** — a residential project in Chandauli, UP. The site must look like it was built by a premium agency — cinematic, trust-inspiring, conversion-focused. Every section must feel intentional. This is not a template job.

---

## TECH STACK (mandatory, no deviations)

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS + custom CSS variables
- **Animations:** Framer Motion
- **CMS/DB:** Firebase Firestore (images, blog, gallery, testimonials, pricing all come from Firestore)
- **Storage:** Firebase Storage (all media assets)
- **Auth:** Firebase Auth (admin CMS only)
- **Forms:** Firebase Firestore (enquiry writes)
- **Hosting:** Vercel (configure next.config.js accordingly)
- **Images:** next/image with WebP, blur placeholder, priority loading on hero
- **Fonts:** `next/font` — use `Cormorant Garamond` (display/headings) + `Inter` (body)
- **Icons:** Lucide React

---

## COLOR SCHEME — "Midnight Gold" (use exactly these)

This palette is derived from the brochure's existing gold logo + the deep twilight blues in the building renders. It must feel like a luxury real estate brand.

```css
:root {
  /* Primary */
  --gold:        #C9A84C;   /* primary brand gold — CTAs, highlights */
  --gold-light:  #E8C97A;   /* hover states, shimmer */
  --gold-dark:   #9A7A2E;   /* pressed, borders */

  /* Backgrounds */
  --bg-primary:  #0A0A0F;   /* near-black — hero, section bgs */
  --bg-card:     #111118;   /* cards, panels */
  --bg-section:  #16161F;   /* alternating sections */
  --bg-light:    #F7F5F0;   /* light sections (specs, banks) */

  /* Text */
  --text-primary:   #F0EDE6; /* warm white */
  --text-secondary: #A89F8C; /* muted warm gray */
  --text-dark:      #1A1A24; /* on light backgrounds */

  /* Accents */
  --green-accent: #4A7C59;  /* nature / amenities badges */
  --border:       rgba(201,168,76,0.2); /* subtle gold borders */
}
```

**Design rules:**
- Dark sections: `--bg-primary` or `--bg-section` background, `--text-primary` text, gold accents
- Light sections (specifications, banks): `--bg-light` background, `--text-dark` text
- All CTAs: gold gradient `linear-gradient(135deg, #C9A84C, #E8C97A)` with dark text
- Headings: Cormorant Garamond, weight 600, gold or warm white
- Body: Inter, weight 400, `--text-secondary`
- Hover: subtle gold glow `box-shadow: 0 0 20px rgba(201,168,76,0.3)`

---

## PROJECT DATA (hardcode all this — do NOT use placeholder text)

```
Project Name:     Shubh Kamna Heights
Tagline:          "Crafted for Comfort. Designed for Life."
Sub-tagline:      "Where spiritual grace meets natural beauty"
Location:         PDDU Nagar, Chandauli / Uttar Pradesh
                  (8 Lanes NH-2, Delhi–Kolkata Highway)
Full Address:     Arazi No. 538MI, 542MI, 546, 547, Mauja- Godhana,
                  Paragana-Dhoos, Tehsil- P.D.D.U. Nagar, Distt- Chandauli / UP
RERA Number:      UPRERAPRJ757815/04/2025
RERA URL:         https://www.up-rera.in
VDA Approved:     Yes
CREDAI Member:    Yes (CREDAI Purvanchal + PREA)
Structure:        Earthquake resistant RCC frame, vetted by IIT BHU
Total Families:   1000+
Open Space:       65%+
Contact Phone:    +91 70841 65214
Contact Email:    subh.0263@gmail.com
WhatsApp Number:  +917084165214
WhatsApp Message: "Hello! I'm interested in Shubh Kamna Heights. Please share details."

Unit Types:
  - 2BHK (Units 04, 07)
  - 3BHK (Units 01, 02, 03, 05, 06, 08, 09, 10)

Blocks:
  - Block A (active)
  - Block B (active)
  - Block C (Future Expansion)
  - Block D (Future Expansion)

Distance from key landmarks:
  0.0 KM  — 8 lanes NH-2 (Delhi - Kolkata)
  5.0 KM  — DDU Nagar Railway Station
  16.0 KM — BHU (Banaras Hindu University)
  13.0 KM — Ramnagar
  3.0 KM  — P.W. Gurukulam
  6.5 KM  — IP Mugalsarai
  41.0 KM — Airport

Key Features (ALL 24 must be shown):
  Integrated community of 2BHK & 3BHK Flats | Wide Range of Spacious and well ventilated flats
  Designer Gate & Boundary walled Complex | Designer External Lighting | Vastu compliance layout
  Automatic Elevator with decorative lobby | Brick batcoba treatment on terrace
  More than 65% open space | Ample parking space at stilt & open | Visitor's Car Parking
  Spacious apartments with modern finishing | Prime location with easy access to amenities
  Modern amenities for a luxurious lifestyle | 24/7 security and CCTV surveillance
  Sustainable design and energy-efficient systems | Gated Society | Antitermite treatment
  Rain Water Harvesting | Piped Gas Supply Arrangement | 24 hr Power Back-up in common areas
  24 hr Power Back-up in flats (condition apply) | Intercom Facility within the Complex
  Earthquake Resistant RCC Frame Structure | VDA approved & RERA registered project
```

---

## FIREBASE SETUP

Create `/lib/firebase.ts` with full config (leave placeholders for env vars):

```ts
// All env vars via .env.local
// NEXT_PUBLIC_FIREBASE_API_KEY
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
// NEXT_PUBLIC_FIREBASE_PROJECT_ID
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
// NEXT_PUBLIC_FIREBASE_APP_ID
```

**Firestore Collections:**
```
/settings/hero          → { videoUrl, posterUrl, headline, subheadline }
/settings/pricing       → { bhk2_base_price, bhk3_base_price, per_sqft_rate, gst_percent, stamp_duty_percent }
/settings/banks         → array of { name, logoUrl, interestRate, maxLoanAmount, processingFee }
/gallery                → { id, imageUrl, category, caption, order, active }
/amenities              → { id, title, description, iconName, imageUrl, order }
/floorplans             → { id, type (2BHK/3BHK), imageUrl, carpetArea, superArea, price, active }
/blog                   → { id, title, slug, content, excerpt, coverImage, author, publishedAt, category, published }
/testimonials           → { id, name, flatType, quote, rating, active }
/enquiries              → { name, phone, email, bhkPreference, visitDate, message, source, createdAt, contacted }
/specifications         → { id, category, items: [{label, value}] }
```

---

## WEBSITE SECTIONS — BUILD ALL OF THESE IN ORDER

### 1. `<Navbar>` — Sticky, Transparent-to-Solid

- Logo left (SVG text "SHUBH KAMNA" in Cormorant + "HEIGHTS" smaller, gold)
- Nav links: Overview · Amenities · Floor Plans · Gallery · Location · Blog
- Right: "Book a Visit" button (gold outline → gold fill on hover)
- Behavior: transparent with white text on hero scroll position, solid `--bg-card` with gold border-bottom when scrolled 80px+
- Mobile: hamburger → full-screen dark overlay menu with slide-in animation
- RERA number in a tiny top banner bar above navbar: `RERA: UPRERAPRJ757815/04/2025 | VDA Approved | CREDAI Purvanchal Member`

---

### 2. `<HeroSection>` — Full Screen Video

- Full viewport height (`100vh`)
- Background: `<video>` tag — autoplay, muted, loop, playsInline
  - `src` from Firestore `/settings/hero.videoUrl` (Firebase Storage URL)
  - `poster` from Firestore `/settings/hero.posterUrl`
  - Fallback: dark gradient if video fails
- Overlay: `linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.7) 60%, rgba(10,10,15,1) 100%)`
- Content (centered, z-10):
  ```
  [small gold pill badge] "Now Accepting Bookings — Chandauli, UP"
  [H1 serif] "Crafted for Comfort."
  [H1 serif gold] "Designed for Life."
  [body] "Experience luxurious living at 8 lanes NH-2, just minutes from Varanasi"
  [two buttons] "Explore Project ↓"  |  "Talk to Us on WhatsApp →"
  ```
- Bottom: animated scroll indicator (bouncing arrow)
- Stats bar fixed at bottom of hero (appears after 1s):
  ```
  1000+ Families | 2 & 3 BHK | 65%+ Open Space | RERA Registered | IIT BHU Vetted
  ```
  Each stat separated by a gold `|` divider, centered, `--bg-card` with gold top border

---

### 3. `<ProjectOverview>` — Dark section

- Section heading: "A Landmark in Chandauli" 
- Two-column layout:
  - Left: paragraph copy from brochure (the Varanasi & Chandauli spiritual+natural beauty text)
  - Right: stat cards grid (2×3):
    ```
    📍 PDDU Nagar, Chandauli   |  🏛️ RERA: UPRERAPRJ757815/04/2025
    🏠 2BHK & 3BHK Homes       |  ✅ VDA Approved
    👨‍👩‍👧 1000+ Families           |  🌿 65%+ Open Space
    ```
- Below: horizontal scrolling landmark distance strip
  ```
  NH-2 · 0 KM | DDU Railway · 5 KM | BHU · 16 KM | Airport · 41 KM | P.W. Gurukulam · 3 KM
  ```

---

### 4. `<AmenitiesSection>` — Dark with green accents

Images from Firestore `/amenities` collection.

**Amenities to show (20 total):**
```
Swimming Pool | Gymnasium | Clubhouse | Amphitheatre | Basketball Court
Badminton Court | Indoor Game Zone | Banquet Hall | Children Playing Zone
Yoga & Meditation Park | Temple Area | Nana Nani Park | Gazebo Seating
Jogging Track | Water Body with Bridge | Commercial Plaza | Kids Play Zone
Performance Stage | Activity Park | 24/7 Security
```

Layout:
- Heading: "Unmatched Lifestyle. Unparalleled Amenities."
- First row: 3 large featured amenity cards with image, title, short description (pulled from Firestore)
- Below: icon grid of remaining amenities (5 columns, icon + label)
- Each large card: image fills card, dark gradient overlay, title bottom-left, gold icon top-right

---

### 5. `<FloorPlansSection>` — Light section (`--bg-light`)

Data from Firestore `/floorplans`.

- Heading: "Choose Your Perfect Home"
- Tab switcher: "2 BHK" | "3 BHK" (gold underline active state)
- Each plan card:
  - Floor plan image (zoomable on click — use a lightbox modal)
  - Unit type label (pill badge)
  - Carpet Area, Super Area
  - Starting price (from Firestore pricing)
  - "Get Full Details" button → opens enquiry modal pre-filled with that unit type
- Site plan image displayed below with all 20 landmarks labeled (static image from storage, zoom enabled)

---

### 6. `<CostCalculator>` — ALWAYS VISIBLE FLOATING WIDGET

This is the most important interactive element. It must be on screen at all times.

**Implementation:**
- Floating button: bottom-left corner, gold gradient pill button with calculator icon + "EMI Calculator" text
- On click: slides up a panel (300px wide, full height right drawer on desktop; bottom sheet on mobile)
- Panel stays open until user closes it; persists across scroll

**Calculator logic:**
```
Inputs:
  - BHK Type (2BHK / 3BHK) — dropdown
  - Area preference (sq ft) — slider 800–2000
  - Down payment % — slider 10–40%
  - Loan tenure — dropdown (10/15/20/25 years)
  - Interest rate — pre-filled from Firestore /settings/banks (default 8.5%)

Outputs (calculate live on every input change):
  - Total Property Cost = area × per_sqft_rate (from Firestore /settings/pricing)
  - GST = Total × gst_percent (from Firestore)
  - Stamp Duty = Total × stamp_duty_percent (from Firestore)  
  - All-in Cost = Total + GST + Stamp Duty
  - Loan Amount = All-in Cost × (1 - down_payment%)
  - Monthly EMI = standard EMI formula: P×r×(1+r)^n / ((1+r)^n - 1)
    where r = annual_rate/12/100, n = tenure_years×12

Display:
  Total Cost: ₹XX.XX Lakhs
  Down Payment: ₹X.XX Lakhs  
  Loan Amount: ₹XX.XX Lakhs
  Monthly EMI: ₹XX,XXX/month
  
  Below EMI: "Talk to Our Home Loan Expert →" → WhatsApp redirect
```

---

### 7. `<GallerySection>` — Dark section

Images from Firestore `/gallery` collection, filtered by `category` field.

- Heading: "See It to Believe It"
- Filter tabs: All | Exterior | Interior | Amenities | Views
- Layout: Masonry grid (CSS columns: 3 on desktop, 2 on tablet, 1 on mobile)
- Each image: next/image, lazy loaded, hover shows caption overlay
- Click: opens full-screen lightbox with prev/next navigation
- Images sorted by `order` field from Firestore

---

### 8. `<SpecificationsSection>` — Light section

Data can be hardcoded (from brochure) OR loaded from Firestore `/specifications`.

**Categories and data:**
```
STRUCTURE:
  Steel: Tata, JSW & Jindal | Cement: Shree Cement
  R.C.C.: In-house RMC plant | Frame: Earthquake resistant, vetted by IIT BHU

WALL FINISHING:
  Living & Dining: Wall Putty/Primer | Bedroom: Wall Putty/Primer
  External Façade: Weather coat/Equivalent Paint | Kitchen: Designer ceramic tiles upto 2'0" ht.
  Toilet: Designer ceramic tiles full ht. | Lift & Lobby: Selected granite/Tiles

FLOORING:
  Living & Dining: 4×2 Glazed Vitrified Tiles | Master Bedroom: 4×2 Glazed Vitrified Tiles
  Other Bedroom: 4×2 Glazed Vitrified Tiles | Kitchen: Ceramic Tiles
  Balcony & Toilet: Anti Skid Ceramic Tiles | Stairs & Corridor: Granite/Stone
  Parking & Drive way: Paved/Concrete

DOORS & WINDOWS:
  External Door & Window: UPVC / Aluminum Sliding type (Powder Coated)
  Door Frame: Wooden frame painted to suite décor | Main Door: Skin panel door
  Internal Door: Both Sided laminated flush door

ELECTRICAL:
  Supply: 3-Phase with concealed wiring & modular switches
  Drawing/Dining: AC wiring with AC point | Bedroom: AC wiring with AC point
  Kitchen: Multiple power points + Geyser point | Utility: Balcony Washing Machine point

LIFT (per Block):
  Passenger Lift: 2 Nos — High quality Automatic 13 passenger lift
  Service Lift: High quality Automatic lift

CP FITTING / SANITARY WARE:
  Kitchen: Jaquar or Equivalent Stainless Steel Sink
  Toilet: Jaquar or Equivalent conventional fitting
  Toilet Sanitary ware: Jaquar or Equivalent sanitary ware
```

Layout:
- Accordion-style expandable categories
- Each item: label (gold, light weight) + value (dark, regular)
- Alternating row shading for readability

---

### 9. `<TieUpBanksSection>` — Dark section with light cards

**Data from Firestore `/settings/banks`.**

Seed data to pre-populate in Firestore (add this to a seed script):
```js
const banks = [
  { name: "State Bank of India", logoUrl: "/banks/sbi.png", interestRate: "8.50%", maxLoan: "Up to ₹75L", processingFee: "0.35%" },
  { name: "HDFC Bank", logoUrl: "/banks/hdfc.png", interestRate: "8.75%", maxLoan: "Up to ₹1Cr", processingFee: "0.50%" },
  { name: "ICICI Bank", logoUrl: "/banks/icici.png", interestRate: "8.75%", maxLoan: "Up to ₹1Cr", processingFee: "0.50%" },
  { name: "Punjab National Bank", logoUrl: "/banks/pnb.png", interestRate: "8.50%", maxLoan: "Up to ₹75L", processingFee: "0.35%" },
  { name: "Bank of Baroda", logoUrl: "/banks/bob.png", interestRate: "8.60%", maxLoan: "Up to ₹75L", processingFee: "0.25%" },
  { name: "LIC Housing Finance", logoUrl: "/banks/lic.png", interestRate: "8.65%", maxLoan: "Up to ₹1Cr", processingFee: "Nil" },
  { name: "Axis Bank", logoUrl: "/banks/axis.png", interestRate: "8.75%", maxLoan: "Up to ₹1Cr", processingFee: "1%" },
  { name: "Canara Bank", logoUrl: "/banks/canara.png", interestRate: "8.50%", maxLoan: "Up to ₹75L", processingFee: "0.50%" },
]
```

Layout:
- Heading: "Easy Home Loans Available" with subtext "Pre-approved tie-ups with 8 leading banks"
- Horizontal auto-scrolling marquee of bank logo cards (infinite loop, pausable on hover)
- Each card: white rounded card, bank logo, interest rate badge (gold), max loan amount, processing fee
- Below marquee: "Get Pre-Approved Today →" CTA → WhatsApp redirect

---

### 10. `<LocationSection>` — Dark section

- Heading: "Prime Location. Perfect Connectivity."
- Left: Google Maps embed (coordinates for PDDU Nagar, Chandauli area near NH-2)
  ```
  Embed URL: https://maps.google.com/maps?q=PDDU+Nagar+Chandauli+UP&output=embed
  ```
- Right: landmark distance cards — each as a styled row:
  ```
  [distance badge] [landmark name] [category icon]
  0 KM    · NH-2 Delhi-Kolkata Highway
  3 KM    · P.W. Gurukulam
  5 KM    · DDU Nagar Railway Station
  6.5 KM  · IP Mugalsarai
  13 KM   · Ramnagar
  16 KM   · BHU (Banaras Hindu University)
  41 KM   · Varanasi Airport
  ```
- Below map: "How to Reach" strip showing the route diagram image from brochure (static image from Storage)

---

### 11. `<AboutSection>` — Light section

- Heading: "Built on Trust. Standing on Excellence."
- Developer story paragraph (from brochure: spiritual heritage of Varanasi + natural beauty of Chandauli)
- CREDAI Purvanchal badge + PREA badge (logos displayed)
- 4 trust counters (animated count-up on scroll into view):
  ```
  1000+ Families | 2 Active Blocks | RERA Registered | IIT BHU Approved
  ```
- Associations row: CREDAI logo + PREA logo side by side

---

### 12. `<TestimonialsSection>` — Dark section

Data from Firestore `/testimonials`.

- Auto-scrolling horizontal carousel (Framer Motion drag)
- Each card: quote text, star rating (1–5 gold stars), buyer name, flat type
- Gold quote mark decoration top-left of each card
- Pause on hover

---

### 13. `<BlogSection>` — Dark section

Data from Firestore `/blog` (only `published: true`, ordered by `publishedAt` desc, limit 3).

- Heading: "Insights & Updates"
- 3-column card grid on desktop, 1-column on mobile
- Each card: cover image, category pill, title, excerpt (150 chars), "Read More →"
- "View All Posts →" link at bottom
- Individual blog post page: `/blog/[slug]` — full content, cover image, author, date, back button

---

### 14. `<EnquirySection>` — Full-width dark section with gold border

- Heading: "Your Dream Home is One Step Away"
- Split layout:
  - Left: large building image (from storage)
  - Right: enquiry form

**Form fields:**
```
Full Name*           — text input
Phone Number*        — tel input (Indian +91 format validation)
Email Address        — email input  
Preferred BHK*       — select: 2BHK / 3BHK / Not decided
Preferred Visit Date — date picker
Message              — textarea (optional)
```

**On submit:**
1. Validate all required fields
2. Write to Firestore `/enquiries` collection:
   ```js
   {
     name, phone, email, bhkPreference, visitDate, message,
     source: "website_enquiry_form",
     createdAt: serverTimestamp(),
     contacted: false
   }
   ```
3. Show success state: checkmark animation + message
4. Show two post-submit options:
   - "Call Us Now: +91 70841 65214"
   - "Continue on WhatsApp →" (opens wa.me link)

---

### 15. `<Footer>` — Dark, gold accents

```
Left column:
  SHUBH KAMNA HEIGHTS logo (text)
  "Crafted for Comfort. Designed for Life."
  Address: Arazi No. 538MI, 542MI, 546, 547, Mauja- Godhana...
  Phone: +91 70841 65214
  Email: subh.0263@gmail.com

Middle column:
  Quick Links: Overview | Amenities | Floor Plans | Gallery | Blog | Contact

Right column:
  RERA Registration: UPRERAPRJ757815/04/2025
  Link: www.up-rera.in
  VDA Approved badge
  CREDAI Purvanchal member badge

Bottom bar:
  "© 2025 Shubh Kamna Heights. All Rights Reserved."
  Disclaimer text (from brochure — the standard "artistic impressions" disclaimer)
```

---

## PERSISTENT FLOATING ELEMENTS (render in root layout, always visible)

### WhatsApp FAB
```tsx
// Bottom-right corner, z-50
// Green circle (#25D366), WhatsApp icon (Lucide or SVG)
// Pulse animation ring every 3s
// href: https://wa.me/917084165214?text=Hello%21+I%27m+interested+in+Shubh+Kamna+Heights.

<a href="https://wa.me/917084165214?text=..." 
   className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] 
              flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
   target="_blank" rel="noopener">
  <WhatsAppIcon />
  {/* Pulse ring */}
  <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
</a>
```

### Cost Calculator FAB
```tsx
// Bottom-left corner, z-50
// Gold gradient pill: "📊 EMI Calculator"
// Opens right drawer (desktop) or bottom sheet (mobile)
// State managed in a context provider: CalculatorContext
```

### Exit-Intent Enquiry Modal
```tsx
// Trigger: mouse leaves viewport top (desktop) OR 30s inactivity (mobile)
// Show once per session (localStorage flag)
// Dark modal overlay, enquiry form condensed (name + phone + BHK only)
// "Not now" link dismisses for session
```

---

## FILE STRUCTURE

```
/app
  /layout.tsx              ← root layout with Navbar, FABs, providers
  /page.tsx                ← homepage (all sections assembled)
  /blog
    /page.tsx              ← blog listing
    /[slug]/page.tsx       ← individual post
  /admin                   ← CMS (protected by Firebase Auth middleware)
    /layout.tsx
    /page.tsx              ← dashboard
    /enquiries/page.tsx
    /gallery/page.tsx
    /blog/page.tsx
    /pricing/page.tsx
    /banks/page.tsx
    /testimonials/page.tsx

/components
  /sections
    Navbar.tsx
    HeroSection.tsx
    ProjectOverview.tsx
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
    CostCalculatorWidget.tsx
    WhatsAppFAB.tsx
    ExitIntentModal.tsx
    ImageLightbox.tsx
    EnquiryModal.tsx
  /admin
    Sidebar.tsx
    DataTable.tsx
    ImageUploader.tsx
    RichTextEditor.tsx

/lib
  firebase.ts
  firestore.ts             ← all Firestore read/write helpers
  calculator.ts            ← EMI calculation logic
  seed.ts                  ← seed script for initial Firestore data

/hooks
  useFirestore.ts
  useCalculator.ts
  useScrolled.ts

/types
  index.ts                 ← all TypeScript interfaces
```

---

## SEO & PERFORMANCE REQUIREMENTS

```tsx
// app/layout.tsx metadata
export const metadata: Metadata = {
  title: 'Shubh Kamna Heights | 2BHK & 3BHK Flats in Chandauli, UP',
  description: 'Premium residential project near Varanasi. 2BHK & 3BHK homes at NH-2 Chandauli. RERA registered UPRERAPRJ757815/04/2025. VDA approved. 1000+ families.',
  keywords: ['Shubh Kamna Heights', 'flats in Chandauli', 'PDDU Nagar property', '2BHK 3BHK near Varanasi', 'NH-2 Chandauli housing'],
  openGraph: {
    title: 'Shubh Kamna Heights — Crafted for Comfort',
    description: 'Premium 2BHK & 3BHK homes near Varanasi | RERA Registered',
    images: ['/og-image.jpg'],
    type: 'website',
  },
}
```

Add JSON-LD structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Shubh Kamna Heights",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Arazi No. 538MI, 542MI, 546, 547, Mauja-Godhana",
    "addressLocality": "Chandauli",
    "addressRegion": "Uttar Pradesh",
    "addressCountry": "IN"
  },
  "telephone": "+917084165214",
  "url": "https://shubhkamnaheights.com"
}
```

- Add `sitemap.ts` (Next.js auto sitemap)
- Add `robots.ts`
- All images use `next/image` with `alt` text
- All pages have unique `<title>` and `<meta description>`
- Blog post pages use ISR: `revalidate: 3600`

---

## VIDEO OPTIMISATION (CRITICAL)

```tsx
// In HeroSection.tsx
<video
  autoPlay
  muted
  loop
  playsInline
  poster={heroData.posterUrl}           // static jpg from Firestore
  className="absolute inset-0 w-full h-full object-cover"
  preload="metadata"
>
  <source src={heroData.videoUrl} type="video/mp4" />
  <source src={heroData.videoWebmUrl} type="video/webm" />
</video>
```

In `next.config.js`, add headers for video caching:
```js
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  }]
}
```

Note in README: video should be compressed to ≤8MB using FFmpeg:
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -acodec aac -b:a 128k -movflags +faststart output.mp4
```

---

## ANIMATIONS (Framer Motion)

Use these patterns consistently:
```tsx
// Section entrance (every section)
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
}
// Wrap each section: <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} >

// Staggered children (stats, amenity grid, bank cards)
const containerVariants = {
  visible: { transition: { staggerChildren: 0.1 } }
}

// Counter animation (About section stats)
// Use useMotionValue + useSpring to animate numbers from 0 to target on scroll into view

// Gold shimmer on CTAs (CSS keyframe)
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

---

## MOBILE RESPONSIVENESS

All breakpoints must work:
- `sm: 640px` — single column, compact spacing
- `md: 768px` — tablet, 2-column grids
- `lg: 1024px` — desktop, full layout
- `xl: 1280px` — wide desktop

Hero video: On mobile, if video is slow, show poster image instead (use `@media (max-width: 640px)` to hide video, show poster as background-image)

Cost Calculator: On mobile, opens as a bottom sheet (slide up from bottom, `h-[85vh]`)

Navbar: On mobile, hide links, show hamburger, full-screen overlay menu

---

## WHAT NOT TO DO

- Do NOT use any free template or Bootstrap
- Do NOT use placeholder images (Unsplash etc.) — all images come from Firebase Storage (use a placeholder shimmer skeleton while loading)
- Do NOT hardcode prices — always read from Firestore `/settings/pricing`
- Do NOT use `<img>` tags — always use `next/image`
- Do NOT skip TypeScript types — every component must be fully typed
- Do NOT use inline styles except where Tailwind classes are genuinely insufficient
- Do NOT skip the WhatsApp FAB or Calculator FAB — these are non-negotiable

---

## DELIVERABLES CHECKLIST

When done, the following must all work:

- [ ] Homepage loads with video hero, all 15 sections present and scrollable
- [ ] Cost Calculator opens from floating button, calculates EMI live
- [ ] WhatsApp FAB opens correct wa.me link with pre-filled message
- [ ] Enquiry form submits to Firestore `/enquiries` collection
- [ ] Gallery loads from Firestore, lightbox works
- [ ] Blog listing loads from Firestore, individual post pages work
- [ ] Floor plans tab switcher works, lightbox on plan images works
- [ ] Tie-up banks marquee loads from Firestore
- [ ] All animations trigger correctly on scroll
- [ ] Mobile menu works on all screen sizes
- [ ] Admin login page (`/admin/login`) works with Firebase Auth
- [ ] All 6 CMS pages render and can read/write Firestore
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Lighthouse Performance score ≥ 85 on desktop

---

## START ORDER

Build in this exact order:
1. Next.js project init + Tailwind + Firebase setup + folder structure
2. Design tokens (CSS variables + Tailwind config extension)  
3. Navbar + Hero (video) — get this looking perfect first
4. Floating FABs (WhatsApp + Calculator) — wire up calculator logic
5. Remaining homepage sections top to bottom
6. Blog dynamic routes
7. Admin CMS panel
8. SEO metadata + JSON-LD + sitemap
9. Performance audit + fixes
10. README with setup instructions + env var list