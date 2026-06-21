export type Category = 'performance' | 'video' | 'ai' | 'strategy';

export interface Localized {
  tr: string;
  en: string;
}

export function pick(value: Localized, locale: string): string {
  return locale === 'en' ? value.en : value.tr;
}
