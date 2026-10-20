import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Fixora';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// Repositorio de esta documentación (botón "Abrir en GitHub" de cada página).
export const gitConfig = {
  user: 'Polo-MTP',
  repo: 'Fixora-Documentacion',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}

// Ruta del proyecto Fumadocs dentro del repositorio (la raíz guarda los .md fuente).
export const docsDir = 'fixora-documentacion/content/docs';
