# AKKHOREKHA — Website

Public marketing site for AKKHOREKHA (অক্ষরেখা), built with Next.js 14 (App
Router), TypeScript, Tailwind CSS, and Supabase. Bilingual: Bangla (`/bn`,
native) and English (`/en`, international), with per-language SEO metadata.

## Stack
- Next.js 14 + TypeScript
- Tailwind CSS (brand palette: black / white / light gold, 60/30/10)
- next-intl for `/bn` and `/en` routing
- Supabase (`@supabase/supabase-js`) for content, projects, and analytics
- Deploy target: Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

The site works immediately with bundled demo content even before Supabase is
connected — once `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
are set (same project as the `akkhorekha-dashboard` app) and content is
published from the dashboard, it automatically takes over from the demo data.

## Project structure

```
app/[locale]/            # bn/en routed pages (home, about, projects, contact)
components/               # Header, Footer, Hero, ProjectCard, ContactForm, ...
lib/                       # Supabase client, data queries, demo fallback data
messages/{bn,en}.json      # static UI copy (nav labels, buttons, etc.)
i18n/                      # next-intl routing + request config
public/images/             # bundled demo project renders
```

Editable *content* (hero text, about copy, contact details, projects, SEO
meta) lives in Supabase and is managed from the separate `akkhorekha-dashboard`
app — not by editing code.

## SEO
- Per-locale `<title>` / meta description pulled from the `seo_meta` table
- `hreflang` alternates between `/bn` and `/en` on every page
- Auto-generated `sitemap.xml` (all pages + all published projects, both
  locales) and `robots.txt`
- Open Graph + Twitter card tags, JSON-LD `ArchitectureFirm` structured data
- First-party pageview logging (`page_views` table) feeds the dashboard's
  Analytics page — no third-party script required. An optional GA4 id can
  also be set via `NEXT_PUBLIC_GA_ID`.

## Deploying to Vercel
1. Push this folder to its own GitHub repo.
2. Import into Vercel, framework preset **Next.js**.
3. Add the environment variables from `.env.example`.
4. Deploy. Set `NEXT_PUBLIC_SITE_URL` to your production domain for correct
   sitemap/canonical URLs.
