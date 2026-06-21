import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'contact'});
  return {title: t('title')};
}

export default async function ContactPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <section className="px-5 pb-24 pt-36 sm:px-8 lg:px-12 lg:pt-44">
      <div className="mx-auto max-w-8xl">
        <span className="eyebrow">{t('eyebrow')}</span>
        <h1 className="display mt-5 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
          {t('title')}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">
          {t('lead')}
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          {/* Direct info */}
          <div className="space-y-10">
            <span className="eyebrow">{t('infoEyebrow')}</span>
            <div className="space-y-8">
              <div>
                <p className="eyebrow text-mist/70">{t('emailLabel')}</p>
                <a
                  href={`mailto:${t('email')}`}
                  className="mt-1 block text-xl transition-colors hover:text-accent"
                >
                  {t('email')}
                </a>
              </div>
              <div>
                <p className="eyebrow text-mist/70">{t('phoneLabel')}</p>
                <p className="mt-1 text-xl">{t('phone')}</p>
              </div>
              <div>
                <p className="eyebrow text-mist/70">{t('addressLabel')}</p>
                <p className="mt-1 text-xl">{t('address')}</p>
              </div>
              <div>
                <p className="eyebrow text-mist/70">{t('socialLabel')}</p>
                <div className="mt-2 flex gap-5 text-sm">
                  {['Instagram', 'LinkedIn', 'Behance'].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-mist transition-colors hover:text-paper"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
