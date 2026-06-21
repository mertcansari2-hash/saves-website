import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {caseStudies, getCaseStudy} from '@/data/caseStudies';
import {pick} from '@/data/types';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';

export function generateStaticParams() {
  return caseStudies.map((c) => ({slug: c.slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.client,
    description: pick(study.summary, locale)
  };
}

export default async function CaseStudyPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const study = getCaseStudy(slug);
  if (!study) notFound();

  const t = await getTranslations('work');
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <article className="px-5 pt-36 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-8xl">
          <Link
            href="/work"
            className="text-sm text-mist transition-colors hover:text-paper"
          >
            ← {t('detail.back')}
          </Link>

          <div className="mt-10 flex flex-wrap gap-2">
            {study.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-line px-3 py-1 text-xs text-mist"
              >
                {t(`categories.${cat}`)}
              </span>
            ))}
          </div>

          <h1 className="display mt-6 text-[clamp(3rem,10vw,9rem)]">
            {study.client}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-mist">
            {pick(study.tagline, locale)}
          </p>

          {/* Hero media placeholder */}
          <div className="relative mt-12 aspect-[16/8] w-full overflow-hidden rounded-2xl border border-line">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 120% at 30% 20%, ${study.accent}, #0c0c0c 70%)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>

          {/* Meta + overview */}
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_2fr]">
            <dl className="space-y-6 border-t border-line pt-8">
              <div>
                <dt className="eyebrow">{t('detail.client')}</dt>
                <dd className="mt-1 text-lg">{study.client}</dd>
              </div>
              <div>
                <dt className="eyebrow">{t('detail.year')}</dt>
                <dd className="mt-1 text-lg">{study.year}</dd>
              </div>
              <div>
                <dt className="eyebrow">{t('detail.services')}</dt>
                <dd className="mt-1 flex flex-col gap-1 text-lg">
                  {study.categories.map((cat) => (
                    <span key={cat}>{t(`categories.${cat}`)}</span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="border-t border-line pt-8">
              <span className="eyebrow">{t('detail.overview')}</span>
              <p className="mt-4 text-2xl leading-relaxed sm:text-3xl">
                {pick(study.summary, locale)}
              </p>
            </div>
          </div>

          {/* Challenge & solution */}
          <div className="mt-16 grid gap-12 border-t border-line pt-12 sm:grid-cols-2">
            <Reveal>
              <h2 className="eyebrow">{t('detail.challenge')}</h2>
              <p className="mt-4 leading-relaxed text-paper/85">
                {pick(study.challenge, locale)}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="eyebrow">{t('detail.solution')}</h2>
              <p className="mt-4 leading-relaxed text-paper/85">
                {pick(study.solution, locale)}
              </p>
            </Reveal>
          </div>

          {/* Results */}
          <div className="mt-16">
            <span className="eyebrow">{t('detail.results')}</span>
            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {study.metrics.map((m) => (
                <div key={m.label.en} className="bg-graphite p-8">
                  <div className="font-display text-5xl tracking-tight text-accent">
                    {m.value}
                  </div>
                  <p className="mt-3 text-sm text-mist">{pick(m.label, locale)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next project */}
          <Link
            href={`/work/${next.slug}`}
            className="group mt-20 flex items-center justify-between border-t border-line py-10"
          >
            <div>
              <span className="eyebrow">{t('detail.next')}</span>
              <p className="display mt-2 text-4xl transition-colors group-hover:text-accent sm:text-5xl">
                {next.client}
              </p>
            </div>
            <span className="text-3xl text-mist transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
