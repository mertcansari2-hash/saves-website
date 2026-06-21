import {defineField, defineType} from 'sanity';

// İki dilli kısa metin (başlık, etiket vb.)
export const localeString = defineType({
  name: 'localeString',
  title: 'Metin (TR/EN)',
  type: 'object',
  fields: [
    defineField({name: 'tr', title: 'Türkçe', type: 'string'}),
    defineField({name: 'en', title: 'English', type: 'string'})
  ],
  options: {columns: 2}
});

// İki dilli uzun metin (paragraf)
export const localeText = defineType({
  name: 'localeText',
  title: 'Uzun Metin (TR/EN)',
  type: 'object',
  fields: [
    defineField({name: 'tr', title: 'Türkçe', type: 'text', rows: 3}),
    defineField({name: 'en', title: 'English', type: 'text', rows: 3})
  ],
  options: {columns: 2}
});
