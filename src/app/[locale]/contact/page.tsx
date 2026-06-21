import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import SocialLinks from '@/components/SocialLinks';
import {getContactPage, getSiteSettings} from '@/sanity/content';
import {pick, type Localized} from '@/data/types';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const c = (await getContactPage()) as Record<string, Localized | undefined>;
  return {title: c?.title ? pick(c.title, locale) : 'İletişim'};
}

export default async function ContactPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  const [contactRaw, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings()
  ]);
  const c = (contactRaw ?? {}) as Record<string, Localized | undefined>;
  const get = (k: string) => (c[k] ? pick(c[k] as Localized, locale) : '');

  return (
    <section className="px-5 pb-24 pt-36 sm:px-8 lg:px-12 lg:pt-44">
      <div className="mx-auto max-w-8xl">
        <span className="eyebrow">{get('eyebrow')}</span>
        <h1 className="display mt-5 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
          {get('title')}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">
          {get('lead')}
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          {/* Direct info */}
          <div className="space-y-10">
            <span className="eyebrow">{t('infoEyebrow')}</span>
            <div className="space-y-8">
              {settings?.email && (
                <div>
                  <p className="eyebrow text-mist/70">{t('emailLabel')}</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="mt-1 block text-xl transition-colors hover:text-accent"
                  >
                    {settings.email}
                  </a>
                </div>
              )}
              {settings?.phone && (
                <div>
                  <p className="eyebrow text-mist/70">{t('phoneLabel')}</p>
                  <p className="mt-1 text-xl">{settings.phone}</p>
                </div>
              )}
              {settings?.address && (
                <div>
                  <p className="eyebrow text-mist/70">{t('addressLabel')}</p>
                  <p className="mt-1 text-xl">{pick(settings.address, locale)}</p>
                </div>
              )}
              <div>
                <p className="eyebrow text-mist/70">{t('socialLabel')}</p>
                <SocialLinks settings={settings} className="mt-2" />
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm formspreeId={settings?.formspreeId} />
          </div>
        </div>
      </div>
    </section>
  );
}
