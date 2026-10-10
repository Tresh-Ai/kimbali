# KÍMBÀLÌ — Production Readiness & Launch Checklist

This document outlines everything completed to make the KÍMBÀLÌ website production-ready, along with the step-by-step launch checklist for site deployment and operations.

---

## 1. Accomplished Site Updates

- **Brand Logo Integration (`Kimbali-logo-svg.svg`)**:
  - Integrated the cleaned vector SVG logo into the site navigation header, footer, homepage hero, and studio about hero.
  - Created reusable `KimbaliLogo` component (`src/components/kimbali-logo.tsx`) with scalable `currentColor` filling for light/dark adaptability.
  - Created `/favicon.svg` and linked `/Kimbali-logo-svg.svg` in `src/routes/__root.tsx`.

- **Refined Studio Contact Modal ("Talk to the studio")**:
  - Redesigned `StudioContactOptions` modal to remove all multi-colored icon backgrounds.
  - Aligned typography, borders, and hover states with KÍMBÀLÌ’s minimalist monochrome/clay luxury studio design.
  - Added studio logo mark header and copy feedback toast.

- **SEO & Metadata Enhancement**:
  - Configured OpenGraph (`og:title`, `og:description`, `og:site_name`, `og:type`) and Twitter card tags in root head.
  - Verified meta title templates and canonical page head definitions across all routes.

- **Type Safety & Build Verification**:
  - Clean TypeScript compilation with strict flags enabled (`bun x tsc --noEmit`).
  - Unit test suite passing (`bun run test`).
  - Nitro build compilation verified (`bun run build`).

---

## 2. Launch & Operational Checklist for the Studio Team

### A. Studio Contact Information (`src/data/data.json`)
Verify or update the following fields in `src/data/data.json`:
- **WhatsApp & Phone Number**: Ensure `08139335992` (or your preferred studio line) is active on WhatsApp Business. The app automatically converts `08...` to international format (`+2348139335992`).
- **Email Address**: Confirm `hello@kimbali.studio` (or your active inbox) is receiving emails.
- **Social Media**: If available, update `"pinterestUrl"` or add your Instagram link.

### B. Domain Name & DNS Configuration
1. **Custom Domain**: Point your primary domain (e.g. `kimbali.studio` or `kimbali.ng`) to your hosting platform.
2. **DNS Records**:
   - `A` / `CNAME` records pointing to your host (Vercel, Cloudflare, Netlify, or server IP).
   - Ensure `https` SSL certificate is issued and auto-renewing.

### C. Deployment & Hosting Options
- **Vercel / Netlify / Cloudflare Pages**:
  - Build Command: `bun run build`
  - Output Directory: `.output/public` or default server runner.
- **Self-Hosted / Node / Bun Server**:
  - Run `bun run build` followed by `bun run start` (starts the Nitro server).

### D. Analytics & Tracking (Optional)
If you wish to track site visits and bag commission inquiries:
- Insert your Google Analytics / Plausible tracking snippet into `src/routes/__root.tsx` inside the `<head>` section or via TanStack router head configuration.

### E. Content & Media Maintenance
- Reference product images and visual studies are managed centrally in `src/data/data.json`.
- High-resolution webp/jpg images should be stored in `public/` or `src/assets/`.
