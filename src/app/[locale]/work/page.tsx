import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import WorkGrid from '@/components/WorkGrid';
import CtaBand from '@/components/CtaBand';
import {getCaseStudies} from '@/sanity/content';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'work.page'});
  return {title: t('title')};
}

export default async function WorkPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const studies = await getCaseStudies();

  return (
    <>
      <section className="px-5 pb-12 pt-36 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={t('work.page.eyebrow')}
            title={t('work.page.title')}
            intro={t('work.page.intro')}
          />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-8xl">
          <WorkGrid studies={studies} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
