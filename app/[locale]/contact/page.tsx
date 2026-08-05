import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import { getSiteContent, getSeoMeta } from '@/lib/queries';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta('contact', locale);
  return { title: seo.meta_title, description: seo.meta_description };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations('contact');
  const contact = await getSiteContent('contact', locale);

  return (
    <div className="container-page py-20 md:py-28">
      <SectionHeading eyebrow="AKKHOREKHA" heading={t('heading')} sub={t('sub')} />

      <div className="mt-14 grid gap-16 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <p className="eyebrow mb-2">{t('address')}</p>
            <p className="text-lg text-ink/80">{contact.address}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">{t('phone')}</p>
            <a href={`tel:${contact.phone}`} className="link-underline text-lg text-ink/80">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-2">{t('email')}</p>
            <a href={`mailto:${contact.email}`} className="link-underline text-lg text-ink/80">
              {contact.email}
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
