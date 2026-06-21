'use client';

import {useEffect, useRef, useState} from 'react';
import {useInView} from 'framer-motion';
import {useLocale} from 'next-intl';
import {stats} from '@/data/stats';
import {pick} from '@/data/types';

function Stat({
  value,
  suffix,
  prefix,
  label,
  active
}: {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const isFloat = !Number.isInteger(value);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <div className="border-t border-line pt-6">
      <div className="font-display text-5xl tracking-tight sm:text-6xl">
        {prefix}
        {isFloat ? display.toFixed(1) : Math.round(display)}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-3 text-sm text-mist">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, margin: '-100px'});
  const locale = useLocale();

  return (
    <div
      ref={ref}
      className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((s) => (
        <Stat
          key={s.label.en}
          value={s.value}
          suffix={s.suffix}
          prefix={s.prefix}
          label={pick(s.label, locale)}
          active={inView}
        />
      ))}
    </div>
  );
}
