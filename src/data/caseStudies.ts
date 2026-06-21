import type {Category, Localized} from './types';

export interface Metric {
  value: string;
  label: Localized;
}

export interface CaseStudy {
  slug: string;
  client: string;
  year: string;
  categories: Category[];
  tagline: Localized;
  summary: Localized;
  challenge: Localized;
  solution: Localized;
  metrics: Metric[];
  accent: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'starbucks',
    client: 'Starbucks',
    year: '2024',
    categories: ['performance', 'video'],
    accent: '#1e3932',
    featured: true,
    tagline: {
      tr: 'Sezonluk kampanyalarda dönüşüm odaklı büyüme',
      en: 'Conversion-led growth across seasonal campaigns'
    },
    summary: {
      tr: 'Global kahve zinciri için performans odaklı dijital reklam ve yaratıcı içerik üretimi.',
      en: 'Performance-driven digital advertising and creative production for the global coffee chain.'
    },
    challenge: {
      tr: 'Yoğun rekabetin olduğu hızlı tüketim kategorisinde, sezonluk ürünleri öne çıkarırken uygulama indirmelerini ve mağaza ziyaretlerini ölçülebilir biçimde artırmak gerekiyordu.',
      en: 'In a fiercely competitive QSR category, the goal was to spotlight seasonal products while measurably lifting app installs and store visits.'
    },
    solution: {
      tr: 'Sinematik reklam filmleri ile veri odaklı medya satın almayı birleştirdik; sezona özel kreatifleri kanal bazında test ederek harcamayı en yüksek dönüşüme yönlendirdik.',
      en: 'We paired cinematic ad films with data-driven media buying, testing season-specific creatives per channel to steer spend toward the highest conversions.'
    },
    metrics: [
      {value: '+3.8x', label: {tr: 'ROAS', en: 'ROAS'}},
      {value: '+47%', label: {tr: 'Uygulama indirme', en: 'App installs'}},
      {value: '-32%', label: {tr: 'Dönüşüm maliyeti', en: 'Cost per conversion'}}
    ]
  },
  {
    slug: 'dominos',
    client: "Domino's",
    year: '2024',
    categories: ['performance', 'ai'],
    accent: '#006491',
    featured: true,
    tagline: {
      tr: 'AI destekli kreatifle ölçeklenen sipariş büyümesi',
      en: 'Order growth scaled with AI-powered creative'
    },
    summary: {
      tr: 'Global zincir için dönüşüm getiren dijital reklam kampanyaları ve AI ile üretilen dinamik içerik.',
      en: 'Conversion-generating digital campaigns and AI-produced dynamic content for the global chain.'
    },
    challenge: {
      tr: 'Yüksek frekanslı kampanya takviminde, kreatif yorgunluğunu önleyecek hız ve çeşitlilikte içerik üretmek temel zorluktu.',
      en: 'On a high-frequency campaign calendar, the core challenge was producing content fast and varied enough to beat creative fatigue.'
    },
    solution: {
      tr: 'AI görsel ve video üretimini dinamik kreatif optimizasyonuyla birleştirdik; yüzlerce varyasyonu otomatik test ederek en iyi performans gösterenleri ölçekledik.',
      en: 'We combined AI image and video generation with dynamic creative optimization, auto-testing hundreds of variations and scaling top performers.'
    },
    metrics: [
      {value: '+62%', label: {tr: 'Online sipariş', en: 'Online orders'}},
      {value: '5x', label: {tr: 'Kreatif üretim hızı', en: 'Creative output speed'}},
      {value: '+4.1x', label: {tr: 'ROAS', en: 'ROAS'}}
    ]
  },
  {
    slug: 'kom',
    client: 'Kom',
    year: '2023',
    categories: ['strategy', 'video'],
    accent: '#3a2f4a',
    featured: true,
    tagline: {
      tr: 'Dijital dönüşüm ve yeni marka dili',
      en: 'Digital transformation and a new brand language'
    },
    summary: {
      tr: 'Markanın dijital dönüşümü, yenilikçi görsel tasarım ve hedef kitle odaklı sosyal medya stratejisi.',
      en: "The brand's digital transformation, innovative visual design and audience-led social media strategy."
    },
    challenge: {
      tr: 'Geleneksel bir marka algısını, genç hedef kitleyle güçlü bağ kuran çağdaş bir dijital kimliğe taşımak gerekiyordu.',
      en: 'A traditional brand perception needed to be carried into a contemporary digital identity that resonates with a younger audience.'
    },
    solution: {
      tr: 'Yeni bir görsel sistem ve içerik stratejisi kurguladık; platforma özel sosyal medya içerikleriyle marka bilinirliğini ve etkileşimi yükselttik.',
      en: 'We built a new visual system and content strategy, lifting brand awareness and engagement with platform-native social content.'
    },
    metrics: [
      {value: '+180%', label: {tr: 'Sosyal etkileşim', en: 'Social engagement'}},
      {value: '+95%', label: {tr: 'Takipçi büyümesi', en: 'Follower growth'}},
      {value: '2.4M', label: {tr: 'Aylık erişim', en: 'Monthly reach'}}
    ]
  },
  {
    slug: 'noksel',
    client: 'Noksel',
    year: '2023',
    categories: ['strategy', 'performance'],
    accent: '#2b2b2b',
    featured: false,
    tagline: {
      tr: 'B2B kurumsal kimlik ve lead üretimi',
      en: 'B2B corporate identity and lead generation'
    },
    summary: {
      tr: 'B2B sektöründe kurumsal kimlik, dijital görünürlük ve hedef odaklı müşteri adayı (lead) yaratma.',
      en: 'Corporate identity, digital visibility and targeted lead generation in the B2B sector.'
    },
    challenge: {
      tr: 'Uzun satış döngüsüne sahip B2B sektöründe, nitelikli müşteri adaylarını ölçülebilir bir maliyetle elde etmek gerekiyordu.',
      en: 'In a B2B sector with long sales cycles, the task was acquiring qualified leads at a measurable cost.'
    },
    solution: {
      tr: 'Kurumsal kimliği yeniledik, sektörel içerik ve LinkedIn odaklı kampanyalarla karar vericilere ulaşan bir lead üretim motoru kurduk.',
      en: 'We refreshed the corporate identity and built a lead-generation engine reaching decision-makers via sector content and LinkedIn-led campaigns.'
    },
    metrics: [
      {value: '+210%', label: {tr: 'Nitelikli lead', en: 'Qualified leads'}},
      {value: '-28%', label: {tr: 'Lead maliyeti', en: 'Cost per lead'}},
      {value: '+140%', label: {tr: 'Organik trafik', en: 'Organic traffic'}}
    ]
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
