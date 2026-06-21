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
import {caseStudies} from '@/data/caseStudies';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const featured = caseStudies.filter((c) => c.featured);

  return (
    <>
      <Hero />
      <LogoMarquee />

      {/* Services preview */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t('services.eyebrow')}
              title={t('services.title')}
              intro={t('services.intro')}
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
            <ServicesGrid />
          </div>
        </div>
      </section>

      <Showreel />

      {/* Featured work */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t('work.eyebrow')}
              title={t('work.title')}
              intro={t('work.intro')}
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
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
            intro={t('process.intro')}
          />
          <div className="mt-14">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={t('stats.eyebrow')}
            title={t('stats.title')}
          />
          <div className="mt-14">
            <StatsCounter />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
