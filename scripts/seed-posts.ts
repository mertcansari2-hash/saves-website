/**
 * Örnek blog yazıları oluşturur. Çalıştır: npx tsx scripts/seed-posts.ts
 */
import {createClient} from '@sanity/client';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
for (const line of readFileSync(join(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2];
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false
});

let k = 0;
const para = (text: string) => ({
  _type: 'block',
  _key: `b${k++}`,
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: `s${k++}`, text, marks: []}]
});
const heading = (text: string) => ({
  _type: 'block',
  _key: `b${k++}`,
  style: 'h2',
  markDefs: [],
  children: [{_type: 'span', _key: `s${k++}`, text, marks: []}]
});

const posts = [
  {
    _id: 'post-performans-2026',
    _type: 'post',
    title: 'Performans Pazarlamasında 2026 Trendleri',
    slug: {_type: 'slug', current: 'performans-pazarlamasinda-2026-trendleri'},
    language: 'tr',
    author: 'Saves Dijital',
    publishedAt: new Date().toISOString(),
    excerpt:
      'Veri odaklı kampanyalar, AI destekli kreatif ve ölçümleme; 2026’da performans pazarlamasını şekillendiren başlıkları derledik.',
    body: [
      para(
        'Performans pazarlaması her yıl daha veri odaklı hale geliyor. 2026’da öne çıkan başlık, yapay zekânın kreatif üretimden bütçe optimizasyonuna kadar her aşamaya entegre olması.'
      ),
      heading('Veri odaklı karar alma'),
      para(
        'Markalar artık sezgiyle değil, gerçek zamanlı verilerle karar veriyor. Doğru kurgulanmış bir ölçümleme altyapısı, her harcamanın getirisini net biçimde görmenizi sağlıyor.'
      ),
      heading('AI destekli kreatif'),
      para(
        'AI ile üretilen görsel ve video varyasyonları, kreatif yorgunluğunu önleyerek kampanyaların ömrünü uzatıyor. Yüzlerce varyasyonu otomatik test edip en iyisini ölçeklemek mümkün.'
      ),
      para(
        'Bu trendleri markanız için nasıl hayata geçirebileceğimizi konuşmak isterseniz, bizimle iletişime geçin.'
      )
    ]
  },
  {
    _id: 'post-ai-video',
    _type: 'post',
    title: 'AI ile Video Prodüksiyon: Markalar İçin Yeni Dönem',
    slug: {_type: 'slug', current: 'ai-ile-video-produksiyon-yeni-donem'},
    language: 'tr',
    author: 'Saves Dijital',
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    excerpt:
      'AI görsel ve ses üretimi, video prodüksiyonun hızını ve ölçeğini değiştiriyor. Markalar için ne anlama geldiğini ele alıyoruz.',
    body: [
      para(
        'Yapay zekâ, video prodüksiyonu daha hızlı, daha esnek ve daha ölçeklenebilir hale getiriyor. Artık tek bir konseptten onlarca kişiselleştirilmiş varyasyon üretmek dakikalar sürüyor.'
      ),
      heading('Hız ve ölçek'),
      para(
        'Geleneksel prodüksiyonda haftalar süren işler, AI destekli iş akışlarıyla günlere iniyor. Bu da markaların kampanya temposuna ayak uydurmasını kolaylaştırıyor.'
      ),
      heading('Marka tutarlılığı'),
      para(
        'Doğru kurulmuş bir AI iş akışı, marka kimliğini koruyarak içerik üretmenizi sağlar. Önemli olan teknolojiyi yaratıcı bir stratejiyle birleştirmek.'
      )
    ]
  }
];

async function run() {
  let tx = client.transaction();
  for (const p of posts) tx = tx.createOrReplace(p as never);
  await tx.commit();
  console.log(`✓ ${posts.length} örnek blog yazısı eklendi.`);
}

run().catch((e) => {
  console.error('Hata:', e.message);
  process.exit(1);
});
