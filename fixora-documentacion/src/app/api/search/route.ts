import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  // El contenido está en español: separa palabras y quita palabras vacías en ese idioma.
  language: 'spanish',
});
