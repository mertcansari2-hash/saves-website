import Reveal from './Reveal';
import type {ReactNode} from 'react';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className
}: Props) {
  const isCenter = align === 'center';
  return (
    <div
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} ${className ?? ''}`}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-6 text-lg leading-relaxed text-mist ${
              isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
