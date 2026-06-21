import type {Localized} from './types';

export interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: Localized;
}

export const stats: Stat[] = [
  {value: 10, suffix: '+', label: {tr: 'Yıl deneyim', en: 'Years of experience'}},
  {value: 35, suffix: '+', label: {tr: 'Global & ulusal marka', en: 'Global & national brands'}},
  {value: 120, suffix: '+', label: {tr: 'Yürütülen kampanya', en: 'Campaigns delivered'}},
  {value: 4.2, suffix: 'x', label: {tr: 'Ortalama ROAS', en: 'Average ROAS'}}
];
