import data from '../../content/team.json';

/** Áreas válidas en content/team.json. */
export const areas = ['movil', 'web', 'backend', 'docs'] as const;
export type Area = (typeof areas)[number];

export const areaInfo: Record<Area, { label: string; stack: string }> = {
  movil: { label: 'App móvil', stack: 'Android · Kotlin' },
  web: { label: 'Web', stack: 'Angular' },
  backend: { label: 'Backend', stack: 'Node.js' },
  docs: { label: 'Documentación', stack: 'Fumadocs' },
};

/** Datos comunes a cualquier persona de la página: integrantes y docente. */
export interface Person {
  name: string;
  role: string;
  summary: string;
  github?: string;
  avatar?: string;
}

export interface Member extends Person {
  areas: Area[];
  responsibilities: string[];
}

/** Valida content/team.json: si falta algo, el build falla con un mensaje claro en vez de publicar una página rota. */
function validate(raw: unknown): Member[] {
  const members = (raw as { members?: unknown }).members;
  if (!Array.isArray(members)) throw new Error('team.json: falta el arreglo "members".');

  members.forEach((m, i) => {
    const where = `team.json → members[${i}]`;
    if (!m?.name || !m.role || !m.summary) throw new Error(`${where}: faltan "name", "role" o "summary".`);
    if (!Array.isArray(m.areas) || m.areas.length === 0) throw new Error(`${where}: "areas" está vacío.`);
    for (const a of m.areas) {
      if (!areas.includes(a)) throw new Error(`${where}: área "${a}" no válida. Usa: ${areas.join(', ')}.`);
    }
    if (!Array.isArray(m.responsibilities) || m.responsibilities.length === 0) {
      throw new Error(`${where}: "responsibilities" está vacío.`);
    }
  });

  return members as Member[];
}

export function getMembers(): Member[] {
  return validate(data);
}

/** Docente del proyecto (opcional en team.json): se muestra aparte, no entre los integrantes. */
export function getAdvisor(): Person | undefined {
  const advisor = (data as { advisor?: Partial<Person> }).advisor;
  if (!advisor) return undefined;
  if (!advisor.name || !advisor.role || !advisor.summary) {
    throw new Error('team.json → advisor: faltan "name", "role" o "summary".');
  }
  return advisor as Person;
}

/** Foto de la persona: la propia (en /public), la de GitHub o ninguna (se muestran sus iniciales). */
export function avatarUrl(member: Person): string | undefined {
  return member.avatar ?? (member.github ? `https://github.com/${member.github}.png?size=160` : undefined);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}
