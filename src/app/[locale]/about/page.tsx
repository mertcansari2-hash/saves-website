import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import StatsCounter from '@/components/StatsCounter';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import {getAboutPage, getStats} from '@/sanity/content';
import {pick, type Localized} from '@/data/types';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const about = (await getAboutPage()) as Record<string, Localized | undefined>;
  return {title: about?.title ? pick(about.title, locale) : 'Hakkımızda'};
}

interface ValueItem {
  title?: Localized;
  description?: Localized;
}

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  await getTranslations();

  const [aboutRaw, stats] = await Promise.all([getAboutPage(), getStats()]);
  const about = (aboutRaw ?? {}) as Record<string, unknown>;
  const get = (k: string) => {
    const v = about[k] as Localized | undefined;
    return v ? pick(v, locale) : '';
  };
  const paragraphs = ((about.paragraphs as Localized[] | undefined) ?? []).map(
    (p) => pick(p, locale)
  );
  const values = (about.values as ValueItem[] | undefined) ?? [];
  const teamPhotos =
    (about.teamPhotos as {url?: string}[] | undefined)?.filter((p) => p.url) ??
    [];
  const teamSlots = teamPhotos.length > 0 ? teamPhotos : [0, 1, 2, 3];

  return (
    <>
      <section className="px-5 pb-12 pt-36 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-8xl">
          <span className="eyebrow">{get('eyebrow')}</span>
          <h1 className="display mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
            {get('title')}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-mist">
            {get('lead')}
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
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Values */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={get('valuesEyebrow')}
            title={get('valuesTitle')}
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={i}
                delay={i * 0.06}
                className="bg-graphite p-8 transition-colors hover:bg-elevated"
              >
                <h3 className="text-lg font-medium">
                  {v.title ? pick(v.title, locale) : ''}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {v.description ? pick(v.description, locale) : ''}
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
            eyebrow={get('teamEyebrow')}
            title={get('teamTitle')}
            intro={get('teamIntro')}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamSlots.map((slot, i) => (
              <Reveal key={i} delay={i * 0.06}>
                {typeof slot === 'object' && slot.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slot.url}
                    alt=""
                    className="aspect-[3/4] w-full rounded-xl border border-line object-cover"
                  />
                ) : (
                  <div className="media-placeholder aspect-[3/4] w-full rounded-xl border border-line" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
