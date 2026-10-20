import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },
    links: [
      { text: 'Inicio', url: '/', active: 'url' },
      { text: 'Documentación', url: '/docs', active: 'nested-url' },
      { text: 'Diccionario de datos', url: '/docs/proyecto/unidad-2/diccionario-de-datos', active: 'nested-url' },
      { text: 'Equipo', url: '/equipo', active: 'url' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
