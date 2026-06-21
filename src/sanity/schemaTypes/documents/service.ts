import {defineField, defineType} from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Hizmet',
  type: 'document',
  fields: [
    defineField({name: 'number', title: 'Numara', type: 'string', description: 'örn: 01'}),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'localeString',
      validation: (r) => r.required()
    }),
    defineField({name: 'description', title: 'Açıklama', type: 'localeText'}),
    defineField({
      name: 'capabilities',
      title: 'Kapsam maddeleri',
      type: 'array',
      of: [{type: 'localeString'}]
    })
  ],
  orderings: [
    {title: 'Sıra', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}
  ],
  preview: {
    select: {title: 'title.tr', subtitle: 'number'}
  }
});
