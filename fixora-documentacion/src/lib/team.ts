import data from '../../content/team.json';

/** Áreas en el orden en que se muestran en la página del equipo. */
export const areas = ['movil', 'web', 'backend', 'docs'] as const;
export type Area = (typeof areas)[number];

export const areaInfo: Record<Area, { label: string; stack: string }> = {
  movil: { label: 'App móvil', stack: 'Android · Kotlin' },
  web: { label: 'Web', stack: 'Angular' },
  backend: { label: 'Backend', stack: 'Node.js' },
  docs: { label: 'Documentación', stack: 'Fumadocs' },
};

export interface Member {
  name: string;
  role: string;
  areas: Area[];
  summary: string;
  responsibilities: string[];
  github?: string;
  avatar?: string;
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

/** Foto del integrante: la propia (en /public), la de GitHub o ninguna (se muestran sus iniciales). */
export function avatarUrl(member: Member): string | undefined {
  return member.avatar ?? (member.github ? `https://github.com/${member.github}.png?size=160` : undefined);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}
