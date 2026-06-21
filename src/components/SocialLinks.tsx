import type {SiteSettings} from '@/sanity/content';

const platforms: {key: keyof SiteSettings; label: string}[] = [
  {key: 'instagram', label: 'Instagram'},
  {key: 'linkedin', label: 'LinkedIn'},
  {key: 'behance', label: 'Behance'},
  {key: 'youtube', label: 'YouTube'},
  {key: 'x', label: 'X'}
];

export default function SocialLinks({
  settings,
  className
}: {
  settings: SiteSettings | null;
  className?: string;
}) {
  if (!settings) return null;
  const items = platforms.filter((p) => settings[p.key]);
  if (items.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-5 text-sm ${className ?? ''}`}>
      {items.map((p) => (
        <a
          key={p.key}
          href={settings[p.key] as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mist transition-colors hover:text-paper"
        >
          {p.label}
        </a>
      ))}
    </div>
  );
}
