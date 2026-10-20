import { Wrench } from 'lucide-react';
import { cn } from '@/lib/cn';

/** Isotipo de Fixora: la llave dentro de un cuadro con el color de marca. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-solid text-brand-foreground',
        className,
      )}
    >
      <Wrench className="size-[60%]" strokeWidth={2.5} />
    </span>
  );
}

/** Logotipo completo: isotipo + "Fix" en color de marca + "ora". */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark />
      <span className="text-lg font-semibold tracking-tight">
        <span className="text-brand">Fix</span>ora
      </span>
    </span>
  );
}
