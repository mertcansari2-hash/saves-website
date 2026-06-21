import type {Localized} from './types';

export interface ProcessStep {
  number: string;
  title: Localized;
  description: Localized;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: {tr: 'Strateji & Keşif', en: 'Strategy & Discovery'},
    description: {
      tr: 'Marka, hedef kitle ve pazar içgörülerini analiz eder; ölçülebilir hedeflerle yol haritasını çıkarırız.',
      en: 'We analyze brand, audience and market insights, then map a roadmap with measurable goals.'
    }
  },
  {
    number: '02',
    title: {tr: 'Kampanya Kurulumu & Yönetimi', en: 'Campaign Setup & Management'},
    description: {
      tr: 'Kreatif üretimi, kanal planlaması ve medya satın almayı tek elden kurar ve canlıya alırız.',
      en: 'We build creative, channel planning and media buying under one roof and take it live.'
    }
  },
  {
    number: '03',
    title: {tr: 'Optimizasyon', en: 'Optimization'},
    description: {
      tr: 'Gerçek zamanlı verilerle test eder, bütçeyi en yüksek dönüşüme yönlendirir ve sürekli iyileştiririz.',
      en: 'We test with real-time data, steer budget to the highest conversions and continuously improve.'
    }
  },
  {
    number: '04',
    title: {tr: 'Raporlama & Ölçümleme', en: 'Reporting & Measurement'},
    description: {
      tr: 'Şeffaf dashboard ve düzenli raporlarla sonuçları, öğrenimleri ve bir sonraki adımı net paylaşırız.',
      en: 'With transparent dashboards and regular reports we share results, learnings and next steps clearly.'
    }
  }
];
