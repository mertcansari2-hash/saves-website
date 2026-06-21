import {getLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getHomepage} from '@/sanity/content';
import {pick, type Localized} from '@/data/types';
import Reveal from './Reveal';

export default async function CtaBand() {
  const locale = await getLocale();
  const home = ((await getHomepage()) ?? {}) as Record<string, Localized | undefined>;
  const get = (k: string) => {
    const v = home[k];
    return v ? pick(v, locale) : '';
  };

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-8xl">
        <Reveal className="relative overflow-hidden rounded-3xl bg-paper px-6 py-16 text-ink sm:px-12 lg:px-20 lg:py-24">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative">
            <span className="eyebrow text-ink/50">{get('ctaEyebrow')}</span>
            <h2 className="display mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              {get('ctaTitle')}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink/70">{get('ctaText')}</p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-graphite"
            >
              {get('ctaButton')} <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
