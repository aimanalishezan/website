import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { Project, Locale } from '@/lib/types';

export default function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const t = project.translations[locale];

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
        <Image
          src={project.cover_image}
          alt={t.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/10" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-ink transition group-hover:text-gold-dark">{t.title}</h3>
          {t.summary && <p className="mt-1 text-sm text-ink/60">{t.summary}</p>}
        </div>
        {project.year && <span className="whitespace-nowrap text-xs uppercase tracking-widest2 text-ink/40">{project.year}</span>}
      </div>
    </Link>
  );
}
