import {defineField, defineType} from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Ana Sayfa',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'showreel', title: 'Showreel'},
    {name: 'sections', title: 'Bölüm Başlıkları'},
    {name: 'cta', title: 'CTA Bandı'}
  ],
  fields: [
    defineField({name: 'heroEyebrow', title: 'Hero üst etiket', type: 'localeString', group: 'hero'}),
    defineField({
      name: 'heroRotating',
      title: 'Hero dönen başlıklar',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'hero'
    }),
    defineField({name: 'heroSubtitle', title: 'Hero alt metin', type: 'localeText', group: 'hero'}),
    defineField({name: 'heroPrimaryCta', title: 'Hero birincil buton', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroSecondaryCta', title: 'Hero ikincil buton', type: 'localeString', group: 'hero'}),

    defineField({name: 'showreelEyebrow', title: 'Showreel üst etiket', type: 'localeString', group: 'showreel'}),
    defineField({name: 'showreelTitle', title: 'Showreel başlık', type: 'localeString', group: 'showreel'}),

    defineField({name: 'servicesEyebrow', title: 'Hizmetler üst etiket', type: 'localeString', group: 'sections'}),
    defineField({name: 'servicesTitle', title: 'Hizmetler başlık', type: 'localeString', group: 'sections'}),
    defineField({name: 'servicesIntro', title: 'Hizmetler açıklama', type: 'localeText', group: 'sections'}),
    defineField({name: 'workEyebrow', title: 'İşler üst etiket', type: 'localeString', group: 'sections'}),
    defineField({name: 'workTitle', title: 'İşler başlık', type: 'localeString', group: 'sections'}),
    defineField({name: 'workIntro', title: 'İşler açıklama', type: 'localeText', group: 'sections'}),
    defineField({name: 'processEyebrow', title: 'Süreç üst etiket', type: 'localeString', group: 'sections'}),
    defineField({name: 'processTitle', title: 'Süreç başlık', type: 'localeString', group: 'sections'}),
    defineField({name: 'processIntro', title: 'Süreç açıklama', type: 'localeText', group: 'sections'}),
    defineField({name: 'statsEyebrow', title: 'İstatistik üst etiket', type: 'localeString', group: 'sections'}),
    defineField({name: 'statsTitle', title: 'İstatistik başlık', type: 'localeString', group: 'sections'}),

    defineField({name: 'ctaEyebrow', title: 'CTA üst etiket', type: 'localeString', group: 'cta'}),
    defineField({name: 'ctaTitle', title: 'CTA başlık', type: 'localeString', group: 'cta'}),
    defineField({name: 'ctaText', title: 'CTA metin', type: 'localeText', group: 'cta'}),
    defineField({name: 'ctaButton', title: 'CTA buton', type: 'localeString', group: 'cta'})
  ],
  preview: {prepare: () => ({title: 'Ana Sayfa içeriği'})}
});

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Hakkımızda Sayfası',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Üst etiket', type: 'localeString'}),
    defineField({name: 'title', title: 'Başlık', type: 'localeString'}),
    defineField({name: 'lead', title: 'Giriş metni', type: 'localeText'}),
    defineField({
      name: 'paragraphs',
      title: 'Paragraflar',
      type: 'array',
      of: [{type: 'localeText'}]
    }),
    defineField({name: 'valuesEyebrow', title: 'Değerler üst etiket', type: 'localeString'}),
    defineField({name: 'valuesTitle', title: 'Değerler başlık', type: 'localeString'}),
    defineField({
      name: 'values',
      title: 'Değerler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Başlık', type: 'localeString'},
            {name: 'description', title: 'Açıklama', type: 'localeText'}
          ],
          preview: {select: {title: 'title.tr'}}
        }
      ]
    }),
    defineField({name: 'teamEyebrow', title: 'Ekip üst etiket', type: 'localeString'}),
    defineField({name: 'teamTitle', title: 'Ekip başlık', type: 'localeString'}),
    defineField({name: 'teamIntro', title: 'Ekip açıklama', type: 'localeText'}),
    defineField({
      name: 'teamPhotos',
      title: 'Ekip görselleri',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}]
    })
  ],
  preview: {prepare: () => ({title: 'Hakkımızda içeriği'})}
});

export const contactPage = defineType({
  name: 'contactPage',
  title: 'İletişim Sayfası',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Üst etiket', type: 'localeString'}),
    defineField({name: 'title', title: 'Başlık', type: 'localeString'}),
    defineField({name: 'lead', title: 'Giriş metni', type: 'localeText'})
  ],
  preview: {prepare: () => ({title: 'İletişim içeriği'})}
});
