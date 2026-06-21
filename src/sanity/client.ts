import {createClient} from 'next-sanity';
import {apiVersion, dataset, projectId} from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN açık: hızlı, önbellekli okuma. Anlık güncelleme için ISR/revalidate kullanıyoruz.
  useCdn: true
});
