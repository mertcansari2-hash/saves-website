import {groq} from 'next-sanity';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  ...,
  "showreelPosterUrl": showreelPoster.asset->url
}`;

export const homepageQuery = groq`*[_type == "homepage"][0]`;
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  ...,
  teamPhotos[]{..., "url": asset->url}
}`;
export const contactPageQuery = groq`*[_type == "contactPage"][0]`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc)`;
export const statsQuery = groq`*[_type == "stat"] | order(order asc)`;
export const processStepsQuery = groq`*[_type == "processStep"] | order(order asc)`;

const caseStudyFields = groq`
  _id,
  client,
  "slug": slug.current,
  year,
  categories,
  accent,
  featured,
  order,
  tagline,
  summary,
  challenge,
  solution,
  metrics,
  "imageUrl": image.asset->url
`;

// --- Blog ---
export const postsByLangQuery = groq`*[_type == "post" && language == $locale && defined(publishedAt) && defined(slug.current)] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, "coverUrl": coverImage.asset->url, publishedAt, author
}`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, language, excerpt, "coverUrl": coverImage.asset->url, publishedAt, author,
  body[]{..., _type == "image" => {"url": asset->url}}
}`;
export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

export const caseStudiesQuery = groq`*[_type == "caseStudy"] | order(order asc){${caseStudyFields}}`;
export const featuredCaseStudiesQuery = groq`*[_type == "caseStudy" && featured == true] | order(order asc){${caseStudyFields}}`;
export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{${caseStudyFields}}`;
export const caseStudySlugsQuery = groq`*[_type == "caseStudy" && defined(slug.current)].slug.current`;
