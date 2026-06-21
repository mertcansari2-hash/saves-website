# Saves Dijital — Web Sitesi

360° dijital reklam ajansı için premium, çift dilli (TR/EN) tanıtım ve portföy sitesi.

## Teknoloji

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (tema `src/app/globals.css` içinde `@theme` ile)
- **next-intl** (TR/EN, `[locale]` routing — varsayılan: `tr`)
- **Framer Motion** (sinematik animasyonlar)

## Çalıştırma

```bash
npm run dev      # geliştirme → http://localhost:3000 (otomatik /tr'ye yönlenir)
npm run build    # üretim derlemesi
npm run start    # üretim sunucusu
npm run lint     # ESLint
```

## Yapı

```
src/
  app/[locale]/        # tüm sayfalar (home, work, work/[slug], services, about, contact)
  components/          # Hero, Showreel, WorkGrid, ServicesGrid, ProcessTimeline, ...
  data/                # caseStudies.ts, services.ts, stats.ts, process.ts (çift dilli {tr,en})
  i18n/                # routing, navigation, request (next-intl)
  proxy.ts             # locale yönlendirme (Next 16 "proxy" = eski "middleware")
messages/              # tr.json, en.json (tüm arayüz metinleri)
```

## İçeriği düzenleme

- **Metinler / çeviriler:** `messages/tr.json` ve `messages/en.json`
- **Vaka çalışmaları (Starbucks, Domino's, Kom, Noksel):** `src/data/caseStudies.ts`
- **Hizmetler / istatistikler / süreç:** `src/data/*.ts`
- **Renkler & tipografi:** `src/app/globals.css` → `@theme` bloğu (ink, paper, accent, fontlar)

## Yer tutucu medya → gerçek medya

Şu an showreel, vaka görselleri, müşteri logoları ve ekip fotoğrafları CSS gradient
yer tutucularıdır (`.media-placeholder` ve inline gradient'ler):

- **Showreel:** `src/components/Showreel.tsx` içindeki `.media-placeholder` div'ini bir
  `<video>` (veya poster + play) ile değiştirin. Dosyaları `public/` altına koyun.
- **Vaka görselleri:** `src/components/CaseStudyCard.tsx` ve `work/[slug]/page.tsx`
  içindeki gradient `background`'ı `next/image` ile değiştirin; `caseStudies.ts`'e
  `image` alanı ekleyebilirsiniz.
- **Logolar:** `src/components/LogoMarquee.tsx` — metin yerine SVG logolar koyun.

## Notlar

- İletişim formu şimdilik **client-side**'dır (gerçek gönderim yok). Backend/e-posta
  entegrasyonu için `src/components/ContactForm.tsx` içindeki `handleSubmit`'i bağlayın.
