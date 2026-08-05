import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/queries';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akkhorekha.com';
  const projects = await getProjects();

  const staticPaths = ['', '/about', '/projects', '/contact'];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`]))
      }
    }))
  );

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  );

  return [...staticEntries, ...projectEntries];
}
