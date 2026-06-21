'use client';

import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import type {Category} from '@/data/types';
import type {CmsCaseStudy} from '@/sanity/content';
import CaseStudyCard from './CaseStudyCard';

const categories: (Category | 'all')[] = [
  'all',
  'performance',
  'video',
  'ai',
  'strategy'
];

export default function WorkGrid({studies}: {studies: CmsCaseStudy[]}) {
  const t = useTranslations('work');
  const [active, setActive] = useState<Category | 'all'>('all');

  const filtered =
    active === 'all'
      ? studies
      : studies.filter((c) => c.categories.includes(active));

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === cat
                ? 'border-paper bg-paper text-ink'
                : 'border-line text-mist hover:border-paper/50 hover:text-paper'
            }`}
          >
            {cat === 'all' ? t('all') : t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((study) => (
            <motion.div
              key={study.slug}
              layout
              initial={{opacity: 0, scale: 0.97}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.97}}
              transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-mist">{t('empty')}</p>
      )}
    </div>
  );
}
