import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import StatsCounter from '@/components/StatsCounter';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'about'});
  return {title: t('title')};
}

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const paragraphs = t.raw('paragraphs') as string[];
  const values = t.raw('values') as {title: string; description: string}[];

  return (
    <>
      <section className="px-5 pb-12 pt-36 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-8xl">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1 className="display mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist">
            {t('lead')}
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-8xl gap-8 border-t border-line pt-12 lg:grid-cols-2">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-paper/85">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-8xl">
          <StatsCounter />
        </div>
      </section>

      {/* Values */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={t('valuesEyebrow')}
            title={t('valuesTitle')}
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={i}
                delay={i * 0.06}
                className="bg-graphite p-8 transition-colors hover:bg-elevated"
              >
                <h3 className="text-lg font-medium">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {v.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={t('teamEyebrow')}
            title={t('teamTitle')}
            intro={t('teamIntro')}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="media-placeholder aspect-[3/4] w-full rounded-xl border border-line" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
