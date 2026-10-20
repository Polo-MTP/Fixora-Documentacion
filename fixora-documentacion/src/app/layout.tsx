import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';
import { translationsEs } from '@/lib/i18n';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Fixora',
    default: 'Fixora · Documentación',
  },
  description: 'Documentación del proyecto Fixora: flujo de trabajo, control de versiones y diccionario de datos.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/* Resaltado de coincidencias del buscador (ver global.css). */}
        <style>{'::highlight(fd-search){color:var(--color-fd-primary);text-decoration-line:underline}'}</style>
        <RootProvider i18n={{ locale: 'es', translations: translationsEs }}>{children}</RootProvider>
      </body>
    </html>
  );
}
