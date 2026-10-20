import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';
import { translationsEs } from '@/lib/i18n';
import StaticSearchDialog from '@/components/search';
import { DM_Mono, Inter, Inter_Tight } from 'next/font/google';

// Las mismas familias que angular.dev: Inter (texto), Inter Tight (títulos) y DM Mono (código).
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono' });

export const metadata: Metadata = {
  title: {
    template: '%s | Fixora',
    default: 'Fixora · Documentación',
  },
  description: 'Documentación del proyecto Fixora: anteproyecto, flujo de trabajo, control de versiones y diccionario de datos.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${interTight.variable} ${dmMono.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        {/* Resaltado de coincidencias del buscador (ver global.css). */}
        <style>{'::highlight(fd-search){color:var(--color-fd-primary);text-decoration-line:underline}'}</style>
        <RootProvider
          theme={{ defaultTheme: 'dark' }}
          i18n={{ locale: 'es', translations: translationsEs }}
          search={{ SearchDialog: StaticSearchDialog }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
