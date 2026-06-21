'use client';

import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {visionTool} from '@sanity/vision';
import {schemaTypes} from './src/sanity/schemaTypes';
import {structure} from './src/sanity/structure';

// Studio için public değerler (tarayıcı paketine gömülür; gizli değil).
// Site tarafı (src/sanity/client.ts) NEXT_PUBLIC_* env'leri kullanır.
const projectId = 'n65dhiqo';
const dataset = 'production';
const apiVersion = '2024-01-01';

export default defineConfig({
  name: 'default',
  title: 'Saves Dijital',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion})
  ],
  schema: {types: schemaTypes}
});
