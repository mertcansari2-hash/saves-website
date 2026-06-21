import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {pick} from '@/data/types';
import type {CaseStudy} from '@/data/caseStudies';

export default function CaseStudyCard({study}: {study: CaseStudy}) {
  const locale = useLocale();
  const t = useTranslations('work');

  return (
    <Link href={`/work/${study.slug}`} className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            background: `radial-gradient(120% 120% at 30% 20%, ${study.accent}, #0c0c0c 70%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {study.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-paper/20 bg-ink/30 px-3 py-1 text-xs text-paper/90 backdrop-blur-sm"
            >
              {t(`categories.${cat}`)}
            </span>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-5">
          <span className="font-display text-4xl sm:text-5xl">
            {study.client}
          </span>
          <span className="text-xs text-mist">{study.year}</span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <p className="text-paper/90 leading-snug">{pick(study.tagline, locale)}</p>
        <span className="mt-1 shrink-0 text-xs text-mist opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          {t('viewProject')} →
        </span>
      </div>
    </Link>
  );
}
