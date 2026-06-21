import {defineField, defineType} from 'sanity';

export const stat = defineType({
  name: 'stat',
  title: 'İstatistik',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Değer (sayı)',
      type: 'number',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'suffix',
      title: 'Son ek',
      type: 'string',
      description: 'örn: +, x, %'
    }),
    defineField({name: 'order', title: 'Sıra', type: 'number', initialValue: 0}),
    defineField({name: 'label', title: 'Etiket', type: 'localeString'})
  ],
  orderings: [
    {title: 'Sıra', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}
  ],
  preview: {
    select: {value: 'value', suffix: 'suffix', subtitle: 'label.tr'},
    prepare: ({value, suffix, subtitle}) => ({
      title: `${value ?? ''}${suffix ?? ''}`,
      subtitle
    })
  }
});

export const processStep = defineType({
  name: 'processStep',
  title: 'Süreç Adımı',
  type: 'document',
  fields: [
    defineField({name: 'number', title: 'Numara', type: 'string'}),
    defineField({name: 'order', title: 'Sıra', type: 'number', initialValue: 0}),
    defineField({name: 'title', title: 'Başlık', type: 'localeString'}),
    defineField({name: 'description', title: 'Açıklama', type: 'localeText'})
  ],
  orderings: [
    {title: 'Sıra', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}
  ],
  preview: {
    select: {title: 'title.tr', subtitle: 'number'}
  }
});
