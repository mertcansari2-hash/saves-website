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

export const caseStudiesQuery = groq`*[_type == "caseStudy"] | order(order asc){${caseStudyFields}}`;
export const featuredCaseStudiesQuery = groq`*[_type == "caseStudy" && featured == true] | order(order asc){${caseStudyFields}}`;
export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{${caseStudyFields}}`;
export const caseStudySlugsQuery = groq`*[_type == "caseStudy" && defined(slug.current)].slug.current`;
