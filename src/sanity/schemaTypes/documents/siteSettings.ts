import {defineField, defineType} from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  groups: [
    {name: 'contact', title: 'İletişim', default: true},
    {name: 'social', title: 'Sosyal Medya'},
    {name: 'media', title: 'Medya'}
  ],
  fields: [
    // İletişim
    defineField({
      name: 'email',
      title: 'E-posta',
      type: 'string',
      group: 'contact'
    }),
    defineField({
      name: 'phone',
      title: 'Telefon (görünen)',
      type: 'string',
      description: 'Sitede görünen telefon, örn. +90 212 000 00 00',
      group: 'contact'
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp numarası',
      type: 'string',
      description:
        'Sadece rakam, ülke koduyla, başında + veya 0 olmadan. Örn: 905551112233',
      group: 'contact'
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'localeString',
      group: 'contact'
    }),
    // Sosyal medya (boş bırakılanlar sitede gösterilmez)
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'social'
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social'
    }),
    defineField({
      name: 'behance',
      title: 'Behance URL',
      type: 'url',
      group: 'social'
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      group: 'social'
    }),
    defineField({
      name: 'x',
      title: 'X (Twitter) URL',
      type: 'url',
      group: 'social'
    }),
    // Medya
    defineField({
      name: 'showreelVideo',
      title: 'Showreel video URL',
      type: 'url',
      description: 'MP4 ya da YouTube/Vimeo linki (opsiyonel)',
      group: 'media'
    }),
    defineField({
      name: 'showreelPoster',
      title: 'Showreel kapak görseli',
      type: 'image',
      options: {hotspot: true},
      group: 'media'
    }),
    defineField({
      name: 'formspreeId',
      title: 'Formspree form ID',
      type: 'string',
      description:
        'İletişim formunun e-postaya gönderimi için Formspree form ID (örn: xayzbcde)',
      group: 'contact'
    })
  ],
  preview: {
    prepare: () => ({title: 'Site Ayarları'})
  }
});
