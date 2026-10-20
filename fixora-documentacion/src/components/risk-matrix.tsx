import { cn } from '@/lib/cn';

export interface Risk {
  id: number;
  /** Probabilidad, de 1 a 5. */
  p: number;
  /** Impacto, de 1 a 5. */
  i: number;
}

const levels = [
  { name: 'Bajo', min: 1, className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
  { name: 'Moderado', min: 5, className: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300' },
  { name: 'Alto', min: 10, className: 'bg-orange-500/20 text-orange-700 dark:text-orange-300' },
  { name: 'Crítico', min: 20, className: 'bg-rose-500/25 text-rose-700 dark:text-rose-300' },
];

function levelOf(score: number) {
  return [...levels].reverse().find((level) => score >= level.min)!;
}

/** Matriz 5×5 de probabilidad × impacto con los ID de los riesgos en su celda. */
export function RiskMatrix({ risks }: { risks: Risk[] }) {
  const values = [5, 4, 3, 2, 1];

  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full min-w-[520px] table-fixed border-separate border-spacing-1 text-center text-sm">
        <thead>
          <tr>
            <th className="w-28 p-2 text-xs font-medium text-fd-muted-foreground">Probabilidad ↓ / Impacto →</th>
            {[1, 2, 3, 4, 5].map((i) => (
              <th key={i} className="p-2 font-semibold">
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((p) => (
            <tr key={p}>
              <th className="p-2 font-semibold">{p}</th>
              {[1, 2, 3, 4, 5].map((i) => {
                const score = p * i;
                const ids = risks.filter((r) => r.p === p && r.i === i).map((r) => r.id);
                return (
                  <td key={i} className={cn('h-16 rounded-lg p-2 align-middle', levelOf(score).className)}>
                    <div className="text-base font-semibold">{score}</div>
                    {ids.length > 0 && (
                      <div className="mt-1 flex flex-wrap justify-center gap-1">
                        {ids.map((id) => (
                          <span key={id} className="rounded-md bg-fd-background/80 px-1.5 text-xs font-medium text-fd-foreground">
                            R{id}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {levels.map((level, index) => (
          <span key={level.name} className={cn('rounded-md px-2 py-1 font-medium', level.className)}>
            {level.name} · {level.min}
            {index < levels.length - 1 ? `–${levels[index + 1].min - 1}` : '–25'}
          </span>
        ))}
      </div>
    </div>
  );
}
