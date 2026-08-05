import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer({
  locale,
  tagline,
  rightsLabel
}: {
  locale: 'bn' | 'en';
  tagline?: string;
  rightsLabel: string;
}) {
  const t = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="hairline bg-ink text-paper">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <Image src="/logo.png" alt="AKKHOREKHA" width={180} height={82} className="h-9 w-auto" />
          {tagline && <p className="mt-4 max-w-xs text-sm text-paper/60">{tagline}</p>}
        </div>

        <div className="flex flex-col gap-3 text-sm uppercase tracking-widest2 text-paper/70">
          <Link href="/about" className="hover:text-gold">
            {t('about')}
          </Link>
          <Link href="/projects" className="hover:text-gold">
            {t('projects')}
          </Link>
          <Link href="/contact" className="hover:text-gold">
            {t('contact')}
          </Link>
        </div>

        <div className="flex gap-4 text-sm text-paper/70 md:justify-end">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gold">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold">
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {year} AKKHOREKHA. {rightsLabel}.
          </span>
          <span className="uppercase tracking-widest2">{locale === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}</span>
        </div>
      </div>
    </footer>
  );
}
