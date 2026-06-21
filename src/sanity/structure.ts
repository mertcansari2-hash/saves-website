import type {StructureResolver} from 'sanity/structure';

// Tekil (singleton) dokümanlar + koleksiyonlar için düzenli menü
const singletons: {id: string; title: string; icon?: string}[] = [
  {id: 'siteSettings', title: 'Site Ayarları'},
  {id: 'homepage', title: 'Ana Sayfa'},
  {id: 'aboutPage', title: 'Hakkımızda'},
  {id: 'contactPage', title: 'İletişim Sayfası'}
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('İçerik')
    .items([
      ...singletons.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .child(S.document().schemaType(s.id).documentId(s.id))
      ),
      S.divider(),
      S.documentTypeListItem('caseStudy').title('Vaka Çalışmaları'),
      S.documentTypeListItem('service').title('Hizmetler'),
      S.documentTypeListItem('stat').title('İstatistikler'),
      S.documentTypeListItem('processStep').title('Süreç Adımları')
    ]);
