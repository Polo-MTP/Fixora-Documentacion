import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Exportación estática: `next build` genera `out/`, que Cloudflare sirve como archivos (ver wrangler.jsonc).
  output: 'export',
  images: { unoptimized: true },
};

export default withMDX(config);
