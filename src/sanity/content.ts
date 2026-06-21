import {client} from './client';
import * as q from './queries';
import type {Category, Localized} from '@/data/types';

// Site içeriği ~60 sn'de bir tazelenir (panelde "Publish" sonrası otomatik yansır)
const opts = {next: {revalidate: 60}} as const;

export interface CmsCaseStudy {
  _id: string;
  client: string;
  slug: string;
  year?: string;
  categories: Category[];
  accent?: string;
  featured?: boolean;
  tagline?: Localized;
  summary?: Localized;
  challenge?: Localized;
  solution?: Localized;
  imageUrl?: string;
  metrics?: {value: string; label: Localized}[];
}

export interface CmsService {
  _id: string;
  number?: string;
  title: Localized;
  description?: Localized;
  capabilities?: Localized[];
}

export interface CmsStat {
  _id: string;
  value: number;
  suffix?: string;
  label?: Localized;
}

export interface CmsProcessStep {
  _id: string;
  number?: string;
  title?: Localized;
  description?: Localized;
}

export interface SiteSettings {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: Localized;
  instagram?: string;
  linkedin?: string;
  behance?: string;
  youtube?: string;
  x?: string;
  showreelVideo?: string;
  showreelPosterUrl?: string;
  formspreeId?: string;
}

export const getSiteSettings = () =>
  client.fetch<SiteSettings | null>(q.siteSettingsQuery, {}, opts);

export const getHomepage = () =>
  client.fetch<Record<string, unknown> | null>(q.homepageQuery, {}, opts);

export const getAboutPage = () =>
  client.fetch<Record<string, unknown> | null>(q.aboutPageQuery, {}, opts);

export const getContactPage = () =>
  client.fetch<Record<string, unknown> | null>(q.contactPageQuery, {}, opts);

export const getServices = () =>
  client.fetch<CmsService[]>(q.servicesQuery, {}, opts);

export const getStats = () => client.fetch<CmsStat[]>(q.statsQuery, {}, opts);

export const getProcessSteps = () =>
  client.fetch<CmsProcessStep[]>(q.processStepsQuery, {}, opts);

export const getCaseStudies = () =>
  client.fetch<CmsCaseStudy[]>(q.caseStudiesQuery, {}, opts);

export const getFeaturedCaseStudies = () =>
  client.fetch<CmsCaseStudy[]>(q.featuredCaseStudiesQuery, {}, opts);

export const getCaseStudy = (slug: string) =>
  client.fetch<CmsCaseStudy | null>(q.caseStudyBySlugQuery, {slug}, opts);

export const getCaseStudySlugs = () =>
  client.fetch<string[]>(q.caseStudySlugsQuery, {}, opts);

// --- Blog ---
export interface CmsPostListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt: string;
  author?: string;
}

export interface CmsPost extends CmsPostListItem {
  language: string;
  body?: unknown[];
}

export const getPosts = (locale: string) =>
  client.fetch<CmsPostListItem[]>(q.postsByLangQuery, {locale}, opts);

export const getPost = (slug: string) =>
  client.fetch<CmsPost | null>(q.postBySlugQuery, {slug}, opts);

export const getPostSlugs = () =>
  client.fetch<string[]>(q.postSlugsQuery, {}, opts);
