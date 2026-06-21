import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import ServicesGrid from '@/components/ServicesGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import CtaBand from '@/components/CtaBand';
import {getServices, getProcessSteps} from '@/sanity/content';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'services.page'});
  return {title: t('title')};
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const [services, steps] = await Promise.all([
    getServices(),
    getProcessSteps()
  ]);

  return (
    <>
      <section className="px-5 pb-12 pt-36 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={t('services.page.eyebrow')}
            title={t('services.page.title')}
            intro={t('services.page.intro')}
          />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-8xl">
          <ServicesGrid services={services} showCapabilities />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
            intro={t('process.intro')}
          />
          <div className="mt-14">
            <ProcessTimeline steps={steps} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
