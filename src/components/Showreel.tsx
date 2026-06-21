'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';
import {motion} from 'framer-motion';

export default function Showreel() {
  const t = useTranslations('showreel');
  const [playing, setPlaying] = useState(false);

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-8xl">
        <div className="mb-8 flex items-end justify-between">
          <span className="eyebrow">{t('eyebrow')}</span>
          <span className="font-display text-sm text-mist">{t('duration')}</span>
        </div>

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-80px'}}
          transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
          className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-line"
        >
          {/* Placeholder media surface — replace with real <video> later */}
          <div className="media-placeholder absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            aria-label={t('play')}
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-paper/30 bg-ink/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-accent">
              {playing ? (
                <span className="flex gap-1.5">
                  <span className="h-5 w-1.5 bg-paper" />
                  <span className="h-5 w-1.5 bg-paper" />
                </span>
              ) : (
                <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-paper" />
              )}
            </span>
          </button>

          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <p className="display max-w-lg text-2xl sm:text-3xl lg:text-4xl">
              {t('title')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
