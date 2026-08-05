export type Locale = 'bn' | 'en';

export interface ProjectTranslation {
  title: string;
  summary?: string | null;
  description?: string | null;
}

export interface ProjectMedia {
  media_type: 'image' | 'video';
  url: string;
  caption?: string | null;
}

export interface Project {
  id: string;
  slug: string;
  category: string;
  year?: number | null;
  location?: string | null;
  land_area?: string | null;
  built_area?: string | null;
  status: string;
  cover_image: string;
  is_featured: boolean;
  sort_order: number;
  media: ProjectMedia[];
  translations: Record<Locale, ProjectTranslation>;
}

export interface SiteContent {
  [key: string]: string | undefined;
}

export interface SeoMeta {
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
}
