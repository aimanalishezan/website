import { supabase } from './supabase';
import { demoProjects, demoSiteContent, demoSeoMeta } from './demo-data';
import type { Locale, Project, SiteContent, SeoMeta } from './types';

/**
 * All fetchers below try Supabase first (so the dashboard's edits show up
 * live) and fall back to the bundled demo data if Supabase isn't configured
 * yet, or a query fails. This means `next build` / first deploy always
 * renders a complete site even before the database is wired up.
 */

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return demoProjects;

  const { data, error } = await supabase
    .from('projects')
    .select('*, project_translations(*), project_media(*)')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) return demoProjects;

  return data.map(mapProjectRow);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.is_featured);
  return featured.length > 0 ? featured : all.slice(0, 3);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) return demoProjects.find((p) => p.slug === slug) ?? null;

  const { data, error } = await supabase
    .from('projects')
    .select('*, project_translations(*), project_media(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) return demoProjects.find((p) => p.slug === slug) ?? null;

  return mapProjectRow(data);
}

export async function getSiteContent(section: string, locale: Locale): Promise<SiteContent> {
  const fallback = demoSiteContent[section]?.[locale] ?? {};
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('section', section)
    .eq('locale', locale)
    .single();

  if (error || !data) return fallback;
  return { ...fallback, ...(data.content as SiteContent) };
}

export async function getSeoMeta(pageKey: string, locale: Locale): Promise<SeoMeta> {
  const fallback = demoSeoMeta[pageKey]?.[locale] ?? {};
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from('seo_meta')
    .select('meta_title, meta_description, og_image')
    .eq('page_key', pageKey)
    .eq('locale', locale)
    .single();

  if (error || !data) return fallback;
  return { ...fallback, ...data };
}

// ---------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProjectRow(row: any): Project {
  const translations: Project['translations'] = { bn: { title: row.slug }, en: { title: row.slug } };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (row.project_translations ?? []).forEach((t: any) => {
    translations[t.locale as Locale] = {
      title: t.title,
      summary: t.summary,
      description: t.description
    };
  });

  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    year: row.year,
    location: row.location,
    land_area: row.land_area,
    built_area: row.built_area,
    status: row.status,
    cover_image: row.cover_image,
    is_featured: row.is_featured,
    sort_order: row.sort_order,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    media: (row.project_media ?? [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((m: any) => ({ media_type: m.media_type, url: m.url, caption: m.caption })),
    translations
  };
}
