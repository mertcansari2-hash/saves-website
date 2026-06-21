import {useTranslations} from 'next-intl';

const clients = ['Starbucks', "Domino's", 'Kom', 'Noksel', 'Saves', '360°'];

export default function LogoMarquee() {
  const t = useTranslations('clients');

  return (
    <section className="border-y border-line py-10">
      <p className="eyebrow mb-8 px-5 text-center sm:px-8">{t('label')}</p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
          {[...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="font-display whitespace-nowrap text-2xl font-medium text-mist/70 transition-colors hover:text-paper sm:text-3xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
