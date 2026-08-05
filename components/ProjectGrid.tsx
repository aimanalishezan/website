import ProjectCard from './ProjectCard';
import type { Project, Locale } from '@/lib/types';

export default function ProjectGrid({ projects, locale }: { projects: Project[]; locale: Locale }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} locale={locale} />
      ))}
    </div>
  );
}
