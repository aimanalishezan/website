'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: 'bn' | 'en' }) {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const nextLocale = currentLocale === 'bn' ? 'en' : 'bn';

  return (
    <button
      onClick={() => router.replace({ pathname, params }, { locale: nextLocale })}
      className="rounded-full border border-ink/20 px-4 py-1.5 text-xs uppercase tracking-widest2 text-ink/80 transition hover:border-gold hover:text-ink"
      aria-label="Switch language"
    >
      {t('switchTo')}
    </button>
  );
}
