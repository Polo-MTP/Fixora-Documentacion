# Fixora · Documentación

Sitio de documentación del proyecto Fixora, hecho con [Fumadocs](https://fumadocs.dev) y Next.js.

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000.

## Estructura del contenido

```txt
content/docs/
├── (general)/              Introducción y herramientas
├── proyecto/               Entregables formales
│   └── unidad-2/
│       ├── control-de-versiones.mdx
│       ├── flujo-de-trabajo.mdx
│       └── diccionario-de-datos/   Una página por módulo
└── desarrollo/             Guías: ramas, commits y pull requests
```

- Cada carpeta tiene un `meta.json` con el título y el orden de sus páginas. Las que llevan `"root": true` aparecen como secciones en el selector del menú lateral.
- Los archivos `.md` de la raíz del repositorio son la fuente original del contenido.
- Para diagramas usa `<Mermaid chart={`...`} />` dentro de cualquier `.mdx`.

## Código

| Ruta | Qué contiene |
| --- | --- |
| `src/app/(home)/page.tsx` | Página de inicio |
| `content/team.json` | Integrantes que muestra la página `/equipo` (áreas válidas: `movil`, `web`, `backend`, `docs`) |
| `src/app/docs/layout.tsx` | Layout de la documentación y color de cada sección |
| `src/lib/layout.shared.tsx` | Logo y enlaces de la barra superior |
| `src/lib/i18n.ts` | Textos de la interfaz en español |
| `src/components/mermaid.tsx` | Componente de diagramas |
| `src/app/global.css` | Colores de la marca |
