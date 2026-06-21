import {defineField, defineType} from 'sanity';

const categoryOptions = [
  {title: 'Performans', value: 'performance'},
  {title: 'Video', value: 'video'},
  {title: 'AI', value: 'ai'},
  {title: 'Strateji', value: 'strategy'}
];

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Vaka Çalışması',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Marka adı',
      type: 'string',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {source: 'client', maxLength: 60},
      validation: (r) => r.required()
    }),
    defineField({name: 'year', title: 'Yıl', type: 'string'}),
    defineField({
      name: 'categories',
      title: 'Kategoriler',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: categoryOptions},
      validation: (r) => r.required().min(1)
    }),
    defineField({
      name: 'image',
      title: 'Kapak görseli',
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'accent',
      title: 'Vurgu rengi (hex)',
      type: 'string',
      description: 'Görsel yoksa kullanılır, örn: #1e3932',
      initialValue: '#1a1a1a'
    }),
    defineField({
      name: 'featured',
      title: 'Ana sayfada öne çıkar',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
      description: 'Küçük sayı önce görünür',
      initialValue: 0
    }),
    defineField({name: 'tagline', title: 'Slogan', type: 'localeString'}),
    defineField({name: 'summary', title: 'Özet', type: 'localeText'}),
    defineField({name: 'challenge', title: 'Zorluk', type: 'localeText'}),
    defineField({name: 'solution', title: 'Çözüm', type: 'localeText'}),
    defineField({
      name: 'metrics',
      title: 'Sonuç metrikleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Değer', type: 'string'},
            {name: 'label', title: 'Etiket', type: 'localeString'}
          ],
          preview: {
            select: {title: 'value', subtitle: 'label.tr'}
          }
        }
      ]
    })
  ],
  orderings: [
    {
      title: 'Sıra',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    }
  ],
  preview: {
    select: {title: 'client', subtitle: 'tagline.tr', media: 'image'}
  }
});
