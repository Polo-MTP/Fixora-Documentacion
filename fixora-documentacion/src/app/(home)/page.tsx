import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Database,
  GitBranch,
  GitMerge,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';

const stats: { value: string; label: string; href?: string }[] = [
  { value: '36', label: 'tablas documentadas' },
  { value: '7', label: 'módulos de datos' },
  { value: '3', label: 'frentes: móvil, web y backend' },
  { value: '5', label: 'integrantes en el equipo', href: '/equipo' },
];

const sections: { icon: LucideIcon; title: string; description: string; href: string }[] = [
  {
    icon: BookOpen,
    title: 'General',
    description: 'Qué es Fixora, cómo está organizada la documentación y con qué herramientas trabajamos.',
    href: '/docs',
  },
  {
    icon: GraduationCap,
    title: 'Proyecto · Unidad 2',
    description: 'Justificación del versionamiento, flujo de trabajo y avance de cada criterio de la unidad.',
    href: '/docs/proyecto',
  },
  {
    icon: Database,
    title: 'Diccionario de datos',
    description: 'Las 36 tablas de la base de datos agrupadas por módulo, con tipos, llaves y diagramas.',
    href: '/docs/proyecto/unidad-2/diccionario-de-datos',
  },
  {
    icon: GitBranch,
    title: 'Desarrollo',
    description: 'Guías del día a día: ramas, Conventional Commits y la plantilla de pull requests.',
    href: '/docs/desarrollo',
  },
];

const modules = [
  { name: 'Cuentas, roles y accesos', slug: 'cuentas', tables: 6 },
  { name: 'Negocios y sucursales', slug: 'negocios', tables: 7 },
  { name: 'Personal', slug: 'personal', tables: 4 },
  { name: 'Proveedores', slug: 'proveedores', tables: 6 },
  { name: 'Servicio', slug: 'servicio', tables: 5 },
  { name: 'Chat', slug: 'chat', tables: 3 },
  { name: 'Reseñas y reportes', slug: 'resenas-y-reportes', tables: 5 },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col pb-24">
      <section className="relative overflow-hidden border-b">
        <div className="brand-glow pointer-events-none absolute inset-0" />
        <div className="blueprint-grid pointer-events-none absolute inset-0" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-20 pb-16 md:pt-28 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-fd-background/70 px-3 py-1 text-xs font-medium text-fd-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-brand" />
              Documentación del proyecto
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
              Cómo se construye <span className="text-brand">Fixora</span>, paso a paso.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-fd-muted-foreground">
              El flujo de trabajo del equipo, las decisiones de versionamiento y el modelo de datos completo de la
              plataforma, en un solo sitio y con buscador.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-solid px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
              >
                Leer la documentación
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/docs/proyecto/unidad-2/flujo-de-trabajo"
                className="inline-flex items-center gap-2 rounded-lg border bg-fd-background/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-fd-accent"
              >
                <GitMerge className="size-4" />
                Ver el flujo de trabajo
              </Link>
            </div>
          </div>

          <BranchCard />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6">
        <dl className="grid grid-cols-2 divide-x divide-y border-x border-b md:grid-cols-4 md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-8">
              <dt className="text-sm text-fd-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight">{stat.value}</dd>
              {stat.href && (
                <dd className="mt-2">
                  <Link href={stat.href} className="text-sm font-medium text-brand hover:underline">
                    Conocer al equipo →
                  </Link>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto mt-20 w-full max-w-6xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Explora la documentación</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {sections.map(({ icon: Icon, title, description, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex gap-4 rounded-xl border bg-fd-card p-5 transition-colors hover:border-brand/60"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="flex items-center gap-1 font-semibold">
                  {title}
                  <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-1 text-sm text-fd-muted-foreground">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Modelo de datos por módulo</h2>
            <p className="mt-1 text-fd-muted-foreground">Cada módulo tiene su diagrama y la descripción de cada columna.</p>
          </div>
          <Link
            href="/docs/proyecto/unidad-2/diccionario-de-datos"
            className="text-sm font-medium text-brand hover:underline"
          >
            Ver convenciones →
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {modules.map((module) => (
            <li key={module.slug}>
              <Link
                href={`/docs/proyecto/unidad-2/diccionario-de-datos/${module.slug}`}
                className="inline-flex items-center gap-2 rounded-full border bg-fd-card px-4 py-2 text-sm transition-colors hover:border-brand/60 hover:text-brand"
              >
                {module.name}
                <span className="rounded-full bg-fd-secondary px-2 text-xs text-fd-muted-foreground">
                  {module.tables}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

/** Tarjeta estática que muestra el recorrido de una tarea: rama → commit → PR → develop. */
function BranchCard() {
  const steps = [
    { label: 'Rama', value: 'feature/APP-42-autenticacion-google' },
    { label: 'Commit', value: 'feat(auth): lógica de Google Auth (APP-42)' },
    { label: 'Pull request', value: 'Squash and merge → develop · 1 aprobación' },
    { label: 'Publicación', value: 'develop → main · semanal' },
  ];

  return (
    <div className="relative rounded-xl border bg-fd-background/85 shadow-xl shadow-brand/5 backdrop-blur">
      <div className="flex items-center gap-1.5 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-fd-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-fd-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-fd-muted-foreground/30" />
        <span className="ml-3 text-xs text-fd-muted-foreground">recorrido de una tarea</span>
      </div>
      <ol className="relative p-5">
        <span className="absolute top-8 bottom-8 left-[27px] w-px bg-gradient-to-b from-brand to-brand-alt" />
        {steps.map((step) => (
          <li key={step.label} className="relative flex gap-4 py-3">
            <span className="relative z-10 mt-1 size-3.5 shrink-0 rounded-full border-2 border-brand bg-fd-background" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">{step.label}</p>
              <p className="mt-0.5 truncate font-mono text-sm">{step.value}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
