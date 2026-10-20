'use client';

import { useEffect, useId, useState } from 'react';

/** Sigue en vivo el tema de Fumadocs (clase `dark` en <html>). */
function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains('dark'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

/** Lee una variable de color del tema y la devuelve en hex (Mermaid no entiende oklch). */
function readColor(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx || !value) return '#888888';
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/** Diagrama Mermaid con los colores del sitio: `<Mermaid chart={`erDiagram ...`} />`. */
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '');
  const isDark = useIsDark();
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;
    void import('mermaid').then(async ({ default: mermaid }) => {
      const c = {
        bg: readColor('--color-fd-background'),
        card: readColor('--color-fd-card'),
        muted: readColor('--color-fd-muted'),
        border: readColor('--color-fd-border'),
        fg: readColor('--color-fd-foreground'),
        mutedFg: readColor('--color-fd-muted-foreground'),
        brand: readColor('--color-brand'),
        blue: readColor('--color-brand-blue'),
        sky: readColor('--color-brand-sky'),
      };
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        fontFamily: 'var(--font-inter), sans-serif',
        theme: 'base',
        darkMode: isDark,
        themeVariables: {
          background: c.card,
          primaryColor: c.muted,
          primaryTextColor: c.fg,
          primaryBorderColor: c.sky,
          secondaryColor: c.muted,
          tertiaryColor: c.card,
          lineColor: c.mutedFg,
          textColor: c.fg,
          edgeLabelBackground: c.card,
          clusterBkg: c.card,
          // Diagramas entidad-relación
          attributeBackgroundColorOdd: c.card,
          attributeBackgroundColorEven: c.muted,
          rowOdd: c.card,
          rowEven: c.muted,
          // gitGraph: una rama por color de marca
          git0: c.brand,
          git1: c.sky,
          git2: c.blue,
          git3: c.brand,
          git4: c.sky,
          git5: c.blue,
          gitBranchLabel0: '#ffffff',
          gitBranchLabel1: c.bg,
          gitBranchLabel2: c.bg,
          gitBranchLabel3: c.bg,
          gitBranchLabel4: c.bg,
          gitBranchLabel5: c.bg,
          commitLabelColor: c.fg,
          commitLabelBackground: c.muted,
        },
      });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim());
      if (!cancelled) setSvg(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id, isDark]);

  return (
    <figure className="not-prose my-6 overflow-x-auto rounded-xl border bg-fd-card p-4 [&_svg]:mx-auto">
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="h-40 animate-pulse rounded-lg bg-fd-muted" />
      )}
    </figure>
  );
}
