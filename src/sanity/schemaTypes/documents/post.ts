import {defineField, defineType} from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: {source: 'title', maxLength: 80},
      validation: (r) => r.required()
    }),
    defineField({
      name: 'language',
      title: 'Dil',
      type: 'string',
      description: 'Bu yazı hangi dildeki sitede görünsün?',
      options: {
        list: [
          {title: 'Türkçe', value: 'tr'},
          {title: 'English', value: 'en'}
        ],
        layout: 'radio'
      },
      initialValue: 'tr',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın tarihi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required()
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'string',
      initialValue: 'Saves Dijital'
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak görseli',
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet',
      type: 'text',
      rows: 3,
      description: 'Liste ve önizlemelerde görünen kısa açıklama'
    }),
    defineField({
      name: 'body',
      title: 'İçerik',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Başlık 2', value: 'h2'},
            {title: 'Başlık 3', value: 'h3'},
            {title: 'Alıntı', value: 'blockquote'}
          ]
        },
        {type: 'image', options: {hotspot: true}}
      ]
    })
  ],
  orderings: [
    {
      title: 'Yayın tarihi (yeni → eski)',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}]
    }
  ],
  preview: {
    select: {title: 'title', subtitle: 'language', media: 'coverImage'},
    prepare: ({title, subtitle, media}) => ({
      title,
      subtitle: subtitle === 'en' ? 'English' : 'Türkçe',
      media
    })
  }
});
