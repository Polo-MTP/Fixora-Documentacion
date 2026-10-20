import { cn } from '@/lib/cn';

/** Isotipo de Fixora (public/brand/logo.svg, vectorizado del logotipo oficial). */
export function LogoMark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- SVG estático, no necesita el optimizador de imágenes
  return <img src="/brand/logo.svg" alt="" aria-hidden className={cn('h-7 w-auto shrink-0', className)} />;
}

/** Logotipo completo: isotipo + Fixora. */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark />
      <span className="font-heading text-[17px] font-semibold tracking-tight">Fixora</span>
    </span>
  );
}
