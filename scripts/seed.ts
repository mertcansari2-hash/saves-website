/**
 * Mevcut statik içeriği (data/*.ts + messages/*.json) Sanity'ye aktarır.
 * Çalıştır: npx tsx scripts/seed.ts
 */
import {createClient} from '@sanity/client';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {caseStudies} from '../src/data/caseStudies';
import {services} from '../src/data/services';
import {stats} from '../src/data/stats';
import {processSteps} from '../src/data/process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// .env.local'i elle yükle
for (const line of readFileSync(join(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}

const tr = JSON.parse(readFileSync(join(root, 'messages/tr.json'), 'utf8'));
const en = JSON.parse(readFileSync(join(root, 'messages/en.json'), 'utf8'));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false
});

const L = (t: string, e: string) => ({tr: t, en: e});
const zip = (a: string[], b: string[]) => a.map((t, i) => L(t, b[i] ?? t));

async function run() {
  const docs: Record<string, unknown>[] = [];

  // --- Site Ayarları ---
  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    email: tr.contact.email,
    phone: tr.contact.phone,
    whatsapp: '',
    address: L(tr.contact.address, en.contact.address),
    formspreeId: ''
  });

  // --- Ana Sayfa ---
  docs.push({
    _id: 'homepage',
    _type: 'homepage',
    heroEyebrow: L(tr.hero.eyebrow, en.hero.eyebrow),
    heroRotating: zip(tr.hero.rotating, en.hero.rotating),
    heroSubtitle: L(tr.hero.subtitle, en.hero.subtitle),
    heroPrimaryCta: L(tr.hero.primaryCta, en.hero.primaryCta),
    heroSecondaryCta: L(tr.hero.secondaryCta, en.hero.secondaryCta),
    showreelEyebrow: L(tr.showreel.eyebrow, en.showreel.eyebrow),
    showreelTitle: L(tr.showreel.title, en.showreel.title),
    servicesEyebrow: L(tr.services.eyebrow, en.services.eyebrow),
    servicesTitle: L(tr.services.title, en.services.title),
    servicesIntro: L(tr.services.intro, en.services.intro),
    workEyebrow: L(tr.work.eyebrow, en.work.eyebrow),
    workTitle: L(tr.work.title, en.work.title),
    workIntro: L(tr.work.intro, en.work.intro),
    processEyebrow: L(tr.process.eyebrow, en.process.eyebrow),
    processTitle: L(tr.process.title, en.process.title),
    processIntro: L(tr.process.intro, en.process.intro),
    statsEyebrow: L(tr.stats.eyebrow, en.stats.eyebrow),
    statsTitle: L(tr.stats.title, en.stats.title),
    ctaEyebrow: L(tr.ctaBand.eyebrow, en.ctaBand.eyebrow),
    ctaTitle: L(tr.ctaBand.title, en.ctaBand.title),
    ctaText: L(tr.ctaBand.text, en.ctaBand.text),
    ctaButton: L(tr.ctaBand.button, en.ctaBand.button)
  });

  // --- Hakkımızda ---
  docs.push({
    _id: 'aboutPage',
    _type: 'aboutPage',
    eyebrow: L(tr.about.eyebrow, en.about.eyebrow),
    title: L(tr.about.title, en.about.title),
    lead: L(tr.about.lead, en.about.lead),
    paragraphs: zip(tr.about.paragraphs, en.about.paragraphs),
    valuesEyebrow: L(tr.about.valuesEyebrow, en.about.valuesEyebrow),
    valuesTitle: L(tr.about.valuesTitle, en.about.valuesTitle),
    values: tr.about.values.map((v: {title: string; description: string}, i: number) => ({
      _key: `v${i}`,
      title: L(v.title, en.about.values[i].title),
      description: L(v.description, en.about.values[i].description)
    })),
    teamEyebrow: L(tr.about.teamEyebrow, en.about.teamEyebrow),
    teamTitle: L(tr.about.teamTitle, en.about.teamTitle),
    teamIntro: L(tr.about.teamIntro, en.about.teamIntro)
  });

  // --- İletişim ---
  docs.push({
    _id: 'contactPage',
    _type: 'contactPage',
    eyebrow: L(tr.contact.eyebrow, en.contact.eyebrow),
    title: L(tr.contact.title, en.contact.title),
    lead: L(tr.contact.lead, en.contact.lead)
  });

  // --- Vaka Çalışmaları ---
  caseStudies.forEach((c, i) => {
    docs.push({
      _id: `caseStudy-${c.slug}`,
      _type: 'caseStudy',
      client: c.client,
      slug: {_type: 'slug', current: c.slug},
      year: c.year,
      categories: c.categories,
      accent: c.accent,
      featured: c.featured,
      order: i,
      tagline: c.tagline,
      summary: c.summary,
      challenge: c.challenge,
      solution: c.solution,
      metrics: c.metrics.map((m, j) => ({_key: `m${j}`, value: m.value, label: m.label}))
    });
  });

  // --- Hizmetler ---
  services.forEach((s, i) => {
    docs.push({
      _id: `service-${s.id}`,
      _type: 'service',
      number: s.number,
      order: i,
      title: s.title,
      description: s.description,
      capabilities: s.capabilities
    });
  });

  // --- İstatistikler ---
  stats.forEach((s, i) => {
    docs.push({
      _id: `stat-${i}`,
      _type: 'stat',
      value: s.value,
      suffix: s.suffix,
      order: i,
      label: s.label
    });
  });

  // --- Süreç Adımları ---
  processSteps.forEach((p, i) => {
    docs.push({
      _id: `processStep-${i}`,
      _type: 'processStep',
      number: p.number,
      order: i,
      title: p.title,
      description: p.description
    });
  });

  // Idempotent: createOrReplace
  let tx = client.transaction();
  for (const d of docs) tx = tx.createOrReplace(d as never);
  await tx.commit();
  console.log(`✓ ${docs.length} doküman Sanity'ye aktarıldı.`);
}

run().catch((e) => {
  console.error('Seed hatası:', e.message);
  process.exit(1);
});
