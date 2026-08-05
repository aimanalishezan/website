import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond, Jost, Noto_Serif_Bengali, Hind_Siliguri } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getSeoMeta, getSiteContent } from '@/lib/queries';
import '../globals.css';

const displayEn = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display-en'
});
const bodyEn = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body-en'
});
const displayBn = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['500', '600', '700'],
  variable: '--font-display-bn'
});
const bodyBn = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body-bn'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: 'bn' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta('home', locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akkhorekha.com';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.meta_title ?? 'AKKHOREKHA',
      template: '%s | AKKHOREKHA'
    },
    description: seo.meta_description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        bn: '/bn',
        en: '/en'
      }
    },
    openGraph: {
      title: seo.meta_title,
      description: seo.meta_description,
      url: `${siteUrl}/${locale}`,
      siteName: 'AKKHOREKHA',
      images: seo.og_image ? [seo.og_image] : ['/images/project-riverside-01.jpg'],
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.meta_title,
      description: seo.meta_description
    },
    robots: { index: true, follow: true }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: 'bn' | 'en' }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) notFound();

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'footer' });
  const footerContent = await getSiteContent('footer', locale);
  const contactContent = await getSiteContent('contact', locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://akkhorekha.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ArchitectureFirm',
    name: 'AKKHOREKHA',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: contactContent.email,
    telephone: contactContent.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactContent.address
    }
  };

  const fontClass =
    locale === 'bn' ? `${displayBn.variable} ${bodyBn.variable}` : `${displayEn.variable} ${bodyEn.variable}`;

  return (
    <html lang={locale === 'bn' ? 'bn-BD' : 'en'} className={fontClass}>
      <body className="font-body bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <AnalyticsTracker locale={locale} />
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} tagline={footerContent.tagline} rightsLabel={t('rights')} />
        </NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
