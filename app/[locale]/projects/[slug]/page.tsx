import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getProjectBySlug, getProjects } from '@/lib/queries';
import type { Locale } from '@/lib/types';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const t = project.translations[locale];

  return {
    title: t.title,
    description: t.summary ?? t.description ?? undefined,
    openGraph: {
      title: t.title,
      description: t.summary ?? undefined,
      images: [project.cover_image]
    }
  };
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  const t = await getTranslations('projects');

  if (!project) notFound();

  const tr = project.translations[locale];

  const facts: { label: string; value?: string | number | null }[] = [
    { label: t('year'), value: project.year },
    { label: t('location'), value: project.location },
    { label: t('landArea'), value: project.land_area },
    { label: t('builtArea'), value: project.built_area },
    { label: t('status'), value: project.status }
  ];

  return (
    <article>
      <div className="relative h-[60vh] min-h-[420px] w-full bg-ink">
        <Image src={project.cover_image} alt={tr.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="container-page absolute bottom-10 left-0 right-0 text-paper">
          <h1 className="font-display text-4xl md:text-6xl">{tr.title}</h1>
        </div>
      </div>

      <div className="container-page grid gap-16 py-16 md:grid-cols-3 md:py-24">
        <div className="md:col-span-2">
          {tr.summary && <p className="font-display text-2xl text-ink/80">{tr.summary}</p>}
          {tr.description && (
            <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink/70">{tr.description}</p>
          )}

          {project.media.length > 0 && (
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {project.media.map((m, i) =>
                m.media_type === 'image' ? (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                    <Image
                      src={m.url}
                      alt={m.caption || tr.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 45vw, 100vw"
                    />
                  </div>
                ) : (
                  <div key={i} className="relative aspect-video overflow-hidden bg-ink/5 sm:col-span-2">
                    <iframe
                      src={m.url}
                      title={m.caption || tr.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <aside className="hairline space-y-4 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          {facts
            .filter((f) => f.value)
            .map((f) => (
              <div key={f.label} className="flex justify-between border-b border-ink/10 pb-3 text-sm">
                <span className="uppercase tracking-widest2 text-ink/40">{f.label}</span>
                <span className="text-right text-ink/80">{f.value}</span>
              </div>
            ))}

          <Link href="/projects" className="link-underline mt-6 inline-block text-sm uppercase tracking-widest2">
            &larr; {t('backToProjects')}
          </Link>
        </aside>
      </div>
    </article>
  );
}
