import Link from 'next/link';
import {
  ArrowRight,
  Database,
  GitBranch,
  GraduationCap,
  type LucideIcon,
  SquareTerminal,
  Users,
} from 'lucide-react';
import { LogoMark } from '@/components/logo';
import { cn } from '@/lib/cn';

const stats = [
  { value: '2', label: 'unidades documentadas' },
  { value: '36', label: 'tablas en el modelo de datos' },
  { value: '15', label: 'riesgos analizados' },
  { value: '5', label: 'integrantes en el equipo' },
];

const stack = [
  { layer: 'Móvil', tech: 'Kotlin' },
  { layer: 'Web', tech: 'Angular' },
  { layer: 'API', tech: 'Express' },
  { layer: 'Datos', tech: 'PostgreSQL' },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col pb-28">
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-fd-border md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-fd-background px-6 py-7">
              <dd className="font-heading text-4xl font-medium tracking-tight">{stat.value}</dd>
              <dt className="mt-1 text-sm text-fd-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto mt-28 w-full max-w-6xl px-6">
        <SectionTitle eyebrow="Documentación" title="Todo el proyecto," highlight="en un solo lugar" />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <BentoCard
            className="lg:col-span-2"
            index="01"
            icon={GraduationCap}
            title="Unidad 1 · Anteproyecto"
            description="Problemática, objetivos, requisitos, MVP, riesgos, metodología Scrum, tecnologías y el patrón Observer."
            href="/docs/proyecto/unidad-1"
          >
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {stack.map((item) => (
                <div key={item.layer} className="rounded-lg border bg-fd-background/60 px-3 py-2.5">
                  <p className="text-xs text-fd-muted-foreground">{item.layer}</p>
                  <p className="font-heading font-medium">{item.tech}</p>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            index="02"
            icon={GitBranch}
            title="Unidad 2 · Versionamiento"
            description="Por qué Git y GitHub, ramas ligadas a Plane, Conventional Commits y políticas de merge."
            href="/docs/proyecto/unidad-2"
          >
            <div className="mt-6 space-y-1.5 font-mono text-xs">
              {['main', 'develop', 'feature/APP-42-…'].map((branch, i) => (
                <div key={branch} className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: ['var(--color-brand)', 'var(--color-brand-sky)', 'var(--color-brand-blue)'][i] }}
                  />
                  {branch}
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            index="03"
            icon={Database}
            title="Diccionario de datos"
            description="36 tablas en 7 módulos, con diagramas entidad-relación y la descripción de cada columna."
            href="/docs/proyecto/unidad-2/diccionario-de-datos"
          />

          <BentoCard
            index="04"
            icon={SquareTerminal}
            title="Guías de desarrollo"
            description="Cómo crear ramas, escribir commits y abrir pull requests que pasen la revisión."
            href="/docs/desarrollo"
          />

          <BentoCard
            index="05"
            icon={Users}
            title="Equipo"
            description="Quién trabaja en la app móvil, la web y el backend."
            href="/equipo"
          />
        </div>
      </section>

      <section className="mx-auto mt-28 w-full max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border px-8 py-16 text-center">
          <div className="brand-glow pointer-events-none absolute inset-0" />
          <div className="hero-dashes pointer-events-none absolute inset-0 !opacity-25" />
          <div className="relative">
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              ¿Por dónde <span className="text-gradient">empezar</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fd-muted-foreground">
              Lee el anteproyecto para entender qué es Fixora, o busca cualquier tema con{' '}
              <kbd className="rounded border px-1.5 font-mono text-xs">Ctrl</kbd>{' '}
              <kbd className="rounded border px-1.5 font-mono text-xs">K</kbd>.
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryButton href="/docs/proyecto/unidad-1">Leer el anteproyecto</PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-dashes pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pt-16 pb-24 text-center md:pt-20 md:pb-32">
        <LogoMark className="h-24 drop-shadow-xl md:h-28" />

        <h1 className="mt-8 text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
          Servicios de confianza,
          <br />
          <span className="text-gradient">bien documentados</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-fd-muted-foreground md:text-xl">
          La documentación de Fixora: la plataforma que conecta a clientes con proveedores verificados ante una
          emergencia o un servicio a domicilio.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PrimaryButton href="/docs">Empezar</PrimaryButton>
          <Link
            href="/docs/proyecto/unidad-2/diccionario-de-datos"
            className="inline-flex items-center rounded-lg px-5 py-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            Ver el modelo de datos
            <ArrowRight className="ml-1.5 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Botón principal: borde con el degradado de marca, como el "Get Started" de angular.dev. */
function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="gradient-border inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium shadow-lg shadow-brand-solid/10 transition-transform hover:-translate-y-0.5"
    >
      {children}
      <ArrowRight className="size-4 text-brand" />
    </Link>
  );
}

function SectionTitle({ eyebrow, title, highlight }: { eyebrow: string; title: string; highlight: string }) {
  return (
    <div className="text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-fd-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-5xl">
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
    </div>
  );
}

function BentoCard({
  index,
  icon: Icon,
  title,
  description,
  href,
  className,
  children,
}: {
  /** Número de la tarjeta ("01", "02"…), en monoespaciada. */
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border bg-fd-card p-6 transition-colors hover:border-brand/50',
        className,
      )}
    >
      <div className="brand-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        {/* Encabezado: número, línea fina e ícono de trazo que se pinta de naranja al pasar el cursor. */}
        <div className="flex items-center gap-3 text-fd-muted-foreground">
          <span className="font-mono text-xs tracking-wider transition-colors group-hover:text-brand">{index}</span>
          <span className="h-px flex-1 bg-fd-border transition-colors group-hover:bg-brand/40" />
          <Icon className="size-[18px] transition-colors group-hover:text-brand" strokeWidth={1.5} />
        </div>
        <h3 className="mt-6 flex items-center gap-1.5 text-lg font-medium">
          {title}
          <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="mt-1.5 text-sm text-fd-muted-foreground">{description}</p>
        {children}
      </div>
    </Link>
  );
}

