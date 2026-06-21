'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function Hero() {
  const t = useTranslations('hero');
  const rotating = t.raw('rotating') as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % rotating.length),
      3200
    );
    return () => clearInterval(id);
  }, [rotating.length]);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="media-placeholder absolute inset-0 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-8xl">
        <motion.span
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
          className="eyebrow"
        >
          {t('eyebrow')}
        </motion.span>

        <h1 className="display mt-6 text-[clamp(2.75rem,9vw,8rem)]">
          <span className="block overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{y: '100%', opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: '-100%', opacity: 0}}
                transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                className="block bg-gradient-to-r from-paper via-paper to-accent bg-clip-text text-transparent"
              >
                {rotating[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1]}}
          className="mt-8 max-w-xl text-lg leading-relaxed text-mist"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1]}}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact"
            className="rounded-full bg-paper px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
          >
            {t('primaryCta')}
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-line px-7 py-3 text-sm font-medium text-paper transition-colors hover:border-paper"
          >
            {t('secondaryCta')}
          </Link>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-8xl">
        <span className="eyebrow flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-mist" />
          {t('scroll')}
        </span>
      </div>
    </section>
  );
}
