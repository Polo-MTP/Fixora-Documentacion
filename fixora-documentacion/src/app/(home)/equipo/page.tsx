import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import {
  areaInfo,
  avatarUrl,
  getAdvisor,
  getMembers,
  initials,
  type Area,
  type Member,
  type Person,
} from '@/lib/team';

export const metadata: Metadata = {
  title: 'Equipo',
  description: 'Quiénes construyen Fixora y de qué se encarga cada integrante.',
};

const areaColor: Record<Area, string> = {
  movil: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  web: 'border-brand/40 bg-brand/10 text-brand',
  backend: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300',
  docs: 'border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-300',
};

export default function TeamPage() {
  // Orden alfabético y una sola cuadrícula: nadie va primero por su área ni por su lugar en team.json.
  const members = [...getMembers()].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const advisor = getAdvisor();

  return (
    <main className="flex-1 pb-24">
      <section className="relative overflow-hidden border-b">
        <div className="hero-dashes pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
          <span className="inline-flex items-center gap-2 rounded-full border bg-fd-background/70 px-3 py-1 text-xs font-medium text-fd-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-brand" />
            {members.length} integrantes
          </span>
          <h1 className="mt-6 text-4xl font-medium tracking-tight md:text-6xl">
            Equipo <span className="text-gradient">Fixora</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-fd-muted-foreground">
            Las personas que construyen Fixora y el frente en el que trabaja cada una. Si tienes una duda sobre una
            parte del proyecto, aquí sabes a quién preguntarle.
          </p>
        </div>
      </section>

      {/* Flex centrado en vez de grid: la última fila incompleta queda al centro, no cargada a la izquierda. */}
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-4 px-6 py-12">
        {members.map((member) => (
          <div key={member.name} className="w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
            <MemberCard member={member} />
          </div>
        ))}
      </div>

      {advisor && (
        <section className="mx-auto w-full max-w-6xl border-t px-6 pt-12">
          <h2 className="text-center font-mono text-xs uppercase tracking-widest text-fd-muted-foreground">Docente</h2>
          <div className="mx-auto mt-6 w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
            <MemberCard member={advisor} />
          </div>
        </section>
      )}
    </main>
  );
}

/** Tarjeta de una persona; las responsabilidades y las áreas solo aparecen en los integrantes. */
function MemberCard({ member }: { member: Person | Member }) {
  const avatar = avatarUrl(member);
  const { responsibilities = [], areas = [] } = member as Partial<Member>;

  return (
    <article className="flex h-full flex-col rounded-xl border bg-fd-card p-5 transition-colors hover:border-brand/50">
      <div className="flex items-center gap-4">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element -- avatar externo de GitHub, sin optimizador de imágenes
          <img src={avatar} alt="" className="size-14 shrink-0 rounded-xl border bg-fd-muted object-cover" />
        ) : (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-brand/10 font-semibold text-brand">
            {initials(member.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="font-semibold leading-tight">{member.name}</h3>
          <p className="mt-0.5 text-sm text-fd-muted-foreground">{member.role}</p>
          {member.github && (
            <a
              href={`https://github.com/${member.github}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-0.5 font-mono text-xs text-fd-muted-foreground hover:text-brand"
            >
              @{member.github}
              <ArrowUpRight className="size-3" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm">{member.summary}</p>

      {responsibilities.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-fd-muted-foreground">
          {responsibilities.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
              <span>{renderInlineCode(item)}</span>
            </li>
          ))}
        </ul>
      )}

      {areas.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {areas.map((area) => (
            <span key={area} className={`rounded-md border px-2 py-0.5 text-xs font-medium ${areaColor[area]}`}>
              {areaInfo[area].label} · {areaInfo[area].stack}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

/** Convierte `texto` entre comillas invertidas en <code>. */
function renderInlineCode(text: string) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith('`') ? (
      <code key={i} className="rounded border bg-fd-muted px-1 py-0.5 text-xs text-fd-foreground">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}
