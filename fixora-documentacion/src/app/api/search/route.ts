import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Sitio exportado: el índice se genera al compilar y el buscador lo consulta en el navegador (ver components/search.tsx).
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // El contenido está en español: separa palabras y quita palabras vacías en ese idioma.
  language: 'spanish',
});
