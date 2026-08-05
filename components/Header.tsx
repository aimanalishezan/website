import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ locale }: { locale: 'bn' | 'en' }) {
  const t = useTranslations('nav');

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/projects', label: t('projects') },
    { href: '/contact', label: t('contact') }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-dark.png" alt="AKKHOREKHA" width={200} height={92} className="h-8 w-auto md:h-9" priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-underline text-sm uppercase tracking-widest2 text-ink/80 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher currentLocale={locale} />
      </div>

      {/* Mobile nav */}
      <nav className="container-page flex items-center gap-6 overflow-x-auto pb-3 md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap text-xs uppercase tracking-widest2 text-ink/70">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
