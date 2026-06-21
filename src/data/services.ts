import type {Category, Localized} from './types';

export interface Service {
  id: Category;
  number: string;
  title: Localized;
  description: Localized;
  capabilities: Localized[];
}

export const services: Service[] = [
  {
    id: 'performance',
    number: '01',
    title: {tr: 'Performans Pazarlama', en: 'Performance Marketing'},
    description: {
      tr: 'Her harcamayı ölçülebilir büyümeye dönüştüren, dönüşüm odaklı medya satın alma ve optimizasyon.',
      en: 'Conversion-driven media buying and optimization that turns every spend into measurable growth.'
    },
    capabilities: [
      {tr: 'Meta, Google & TikTok Ads yönetimi', en: 'Meta, Google & TikTok Ads management'},
      {tr: 'Dönüşüm hunisi & funnel kurulumu', en: 'Conversion funnel architecture'},
      {tr: 'A/B testleri & ROAS optimizasyonu', en: 'A/B testing & ROAS optimization'},
      {tr: 'Veri katmanı & dönüşüm takibi', en: 'Data layer & conversion tracking'}
    ]
  },
  {
    id: 'video',
    number: '02',
    title: {tr: 'Video Prodüksiyon', en: 'Video Production'},
    description: {
      tr: 'Reklam filmlerinden sosyal içeriklere; markanızı sinematik bir dille anlatan uçtan uca prodüksiyon.',
      en: 'From commercials to social content — end-to-end production that tells your brand story cinematically.'
    },
    capabilities: [
      {tr: 'Reklam filmi & marka filmi', en: 'Commercials & brand films'},
      {tr: 'Sosyal medya içerik üretimi', en: 'Social-first content production'},
      {tr: 'Kurgu, renk & ses tasarımı', en: 'Editing, color & sound design'},
      {tr: 'Senaryo & yaratıcı yönetim', en: 'Scriptwriting & creative direction'}
    ]
  },
  {
    id: 'ai',
    number: '03',
    title: {tr: 'AI Çözümleri', en: 'AI Solutions'},
    description: {
      tr: 'AI ile üretilen görsel ve ses; dakikalar içinde ölçeklenen, dinamik ve kişiselleştirilmiş içerik.',
      en: 'AI-generated visuals and audio — dynamic, personalized content that scales in minutes.'
    },
    capabilities: [
      {tr: 'AI görsel & video üretimi', en: 'AI image & video generation'},
      {tr: 'AI ses & seslendirme', en: 'AI voice & narration'},
      {tr: 'Dinamik kreatif varyasyonlar', en: 'Dynamic creative variations'},
      {tr: 'Marka tutarlı AI iş akışları', en: 'Brand-consistent AI workflows'}
    ]
  },
  {
    id: 'strategy',
    number: '04',
    title: {tr: 'Dijital Strateji', en: 'Digital Strategy'},
    description: {
      tr: '360° marka yönetimi, konumlandırma ve kanal stratejisi ile büyümenin yol haritasını çiziyoruz.',
      en: '360° brand management, positioning and channel strategy that maps the path to growth.'
    },
    capabilities: [
      {tr: '360° marka & iletişim stratejisi', en: '360° brand & communication strategy'},
      {tr: 'Hedef kitle & içgörü araştırması', en: 'Audience & insight research'},
      {tr: 'B2B lead generation', en: 'B2B lead generation'},
      {tr: 'Web sitesi & yazılım', en: 'Website & software development'}
    ]
  }
];
