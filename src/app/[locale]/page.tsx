import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import Showreel from '@/components/Showreel';
import SectionHeading from '@/components/SectionHeading';
import ServicesGrid from '@/components/ServicesGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import StatsCounter from '@/components/StatsCounter';
import CtaBand from '@/components/CtaBand';
import CaseStudyCard from '@/components/CaseStudyCard';
import Reveal from '@/components/Reveal';
import {
  getHomepage,
  getServices,
  getStats,
  getProcessSteps,
  getFeaturedCaseStudies,
  getSiteSettings
} from '@/sanity/content';
import {pick, type Localized} from '@/data/types';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [home, services, stats, steps, featured, settings] = await Promise.all([
    getHomepage(),
    getServices(),
    getStats(),
    getProcessSteps(),
    getFeaturedCaseStudies(),
    getSiteSettings()
  ]);

  const h = (home ?? {}) as Record<string, Localized | undefined>;
  const get = (k: string) => (h[k] ? pick(h[k] as Localized, locale) : '');
  const rotating = ((home?.heroRotating as Localized[] | undefined) ?? []).map(
    (r) => pick(r, locale)
  );

  return (
    <>
      <Hero
        eyebrow={get('heroEyebrow')}
        rotating={rotating}
        subtitle={get('heroSubtitle')}
        primaryCta={get('heroPrimaryCta')}
        secondaryCta={get('heroSecondaryCta')}
        scroll={t('hero.scroll')}
      />
      <LogoMarquee />

      {/* Services preview */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={get('servicesEyebrow')}
              title={get('servicesTitle')}
              intro={get('servicesIntro')}
            />
            <Reveal delay={0.1}>
              <Link
                href="/services"
                className="hidden text-sm text-mist transition-colors hover:text-paper sm:inline-flex sm:items-center sm:gap-2"
              >
                {t('services.viewAll')} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <div className="mt-14">
            <ServicesGrid services={services} />
          </div>
        </div>
      </section>

      <Showreel
        eyebrow={get('showreelEyebrow')}
        title={get('showreelTitle')}
        play={t('showreel.play')}
        duration={t('showreel.duration')}
        posterUrl={settings?.showreelPosterUrl}
      />

      {/* Featured work */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={get('workEyebrow')}
              title={get('workTitle')}
              intro={get('workIntro')}
            />
            <Reveal delay={0.1}>
              <Link
                href="/work"
                className="hidden text-sm text-mist transition-colors hover:text-paper sm:inline-flex sm:items-center sm:gap-2"
              >
                {t('work.viewAll')} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={get('processEyebrow')}
            title={get('processTitle')}
            intro={get('processIntro')}
          />
          <div className="mt-14">
            <ProcessTimeline steps={steps} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <SectionHeading eyebrow={get('statsEyebrow')} title={get('statsTitle')} />
          <div className="mt-14">
            <StatsCounter stats={stats} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
