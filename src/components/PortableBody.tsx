import {PortableText, type PortableTextComponents} from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="mb-6 text-lg leading-relaxed text-paper/85">{children}</p>
    ),
    h2: ({children}) => (
      <h2 className="display mt-12 mb-5 text-3xl sm:text-4xl">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-10 mb-4 text-2xl font-medium">{children}</h3>
    ),
    blockquote: ({children}) => (
      <blockquote className="my-8 border-l-2 border-accent pl-6 text-xl italic text-paper">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({children}) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-lg text-paper/85">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg text-paper/85">
        {children}
      </ol>
    )
  },
  marks: {
    strong: ({children}) => (
      <strong className="font-semibold text-paper">{children}</strong>
    ),
    em: ({children}) => <em className="italic">{children}</em>,
    link: ({children, value}) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-4 transition-colors hover:text-paper"
      >
        {children}
      </a>
    )
  },
  types: {
    image: ({value}: {value: {url?: string; alt?: string}}) =>
      value?.url ? (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.url}
            alt={value.alt || ''}
            className="w-full rounded-xl border border-line"
          />
        </figure>
      ) : null
  }
};

export default function PortableBody({value}: {value: unknown}) {
  if (!value) return null;
  return (
    <div>
      <PortableText
        value={value as never}
        components={components}
      />
    </div>
  );
}
