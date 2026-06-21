import {useLocale} from 'next-intl';
import {processSteps} from '@/data/process';
import {pick} from '@/data/types';
import Reveal from './Reveal';

export default function ProcessTimeline() {
  const locale = useLocale();

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, i) => (
        <Reveal
          key={step.number}
          delay={i * 0.08}
          className="flex flex-col bg-graphite p-8 transition-colors hover:bg-elevated"
        >
          <span className="font-display text-5xl text-accent/80">
            {step.number}
          </span>
          <h3 className="mt-6 text-lg font-medium">
            {pick(step.title, locale)}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            {pick(step.description, locale)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
