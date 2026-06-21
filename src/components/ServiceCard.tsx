import {useLocale, useTranslations} from 'next-intl';
import {pick} from '@/data/types';
import type {Service} from '@/data/services';
import Reveal from './Reveal';

interface Props {
  service: Service;
  index: number;
  showCapabilities?: boolean;
}

export default function ServiceCard({service, index, showCapabilities}: Props) {
  const locale = useLocale();
  const t = useTranslations('services');

  return (
    <Reveal
      delay={index * 0.06}
      className="group relative flex flex-col border-t border-line py-8 transition-colors hover:border-paper/40"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm text-accent">{service.number}</span>
        <h3 className="display text-2xl sm:text-3xl">{pick(service.title, locale)}</h3>
      </div>
      <p className="mt-4 max-w-xl text-mist leading-relaxed">
        {pick(service.description, locale)}
      </p>

      {showCapabilities && (
        <div className="mt-7">
          <span className="eyebrow text-mist/70">{t('page.capabilities')}</span>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {service.capabilities.map((cap, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-paper/80"
              >
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                {pick(cap, locale)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Reveal>
  );
}
