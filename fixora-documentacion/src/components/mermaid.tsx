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

/** Diagrama Mermaid renderizado en el navegador: `<Mermaid chart={`erDiagram ...`} />`. */
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '');
  const isDark = useIsDark();
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;
    void import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        fontFamily: 'inherit',
        theme: isDark ? 'dark' : 'neutral',
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
