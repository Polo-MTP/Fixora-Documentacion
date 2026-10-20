# Justificación de la Herramienta y Plataforma de Versionamiento

Para garantizar un desarrollo ordenado y escalable, se ha seleccionado **Git** como sistema de control de versiones y **GitHub** como plataforma de alojamiento remoto. Esta decisión proporciona una justificación sólida y técnica basada en las necesidades de un equipo interdisciplinario de 5 personas manejando múltiples repositorios enfocados en Móvil, Web y Backend.

## 1. Elección del Sistema de Control de Versiones: Git

* **Desarrollo concurrente y distribuido:** Git permite que los 5 integrantes del equipo trabajen de forma simultánea en sus entornos locales sin bloquearse entre sí ni alterar el código principal. Esto es vital para un proyecto con múltiples frentes tecnológicos como Kotlin, Angular y Node.js.
* **Estrategia de ramificación o Branching:** Su arquitectura facilita la creación de ramas independientes para cada nueva funcionalidad, por ejemplo, la integración de mapas o pasarelas de pagos. Esto permite aislar pruebas y errores sin comprometer la estabilidad de la rama principal main que irá a producción.
* **Trazabilidad y recuperación de desastres:** Proporciona un historial criptográfico e inmutable de cada línea de código modificada. Si un cambio genera una falla crítica en el servidor, Git permite revertir el sistema a una versión estable anterior de manera inmediata.

## 2. Elección de la Plataforma de Alojamiento: GitHub

* **Revisión de código y control de calidad:** GitHub centraliza el trabajo mediante Pull Requests. Esto establece un filtro técnico donde el código escrito por un desarrollador debe ser evaluado y aprobado por otro integrante mediante un Code Review antes de integrarse a la aplicación final, minimizando así posibles vulnerabilidades.
* **Alineación con la metodología Scrum:** Mediante herramientas nativas como GitHub Issues y tableros Kanban a través de GitHub Projects, la plataforma permite vincular directamente las tareas de cada Sprint con las aportaciones de código exactas que resuelven ese requerimiento.
* **Preparación para Integración y Despliegue Continuo CI/CD:** A través de GitHub Actions, el proyecto contará con la infraestructura necesaria para automatizar pruebas de testing y despliegues cada vez que se detecte nuevo código, agilizando la entrega de actualizaciones para la aplicación.
