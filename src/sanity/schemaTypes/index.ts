import type {SchemaTypeDefinition} from 'sanity';
import {localeString, localeText} from './objects/locale';
import {siteSettings} from './documents/siteSettings';
import {caseStudy} from './documents/caseStudy';
import {service} from './documents/service';
import {stat, processStep} from './documents/stat';
import {homepage, aboutPage, contactPage} from './documents/pages';

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localeString,
  localeText,
  // singletons
  siteSettings,
  homepage,
  aboutPage,
  contactPage,
  // collections
  caseStudy,
  service,
  stat,
  processStep
];
