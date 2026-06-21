import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import Reveal from './Reveal';

export default function CtaBand() {
  const t = useTranslations('ctaBand');

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-8xl">
        <Reveal className="relative overflow-hidden rounded-3xl bg-paper px-6 py-16 text-ink sm:px-12 lg:px-20 lg:py-24">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative">
            <span className="eyebrow text-ink/50">{t('eyebrow')}</span>
            <h2 className="display mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              {t('title')}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink/70">{t('text')}</p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-graphite"
            >
              {t('button')} <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
