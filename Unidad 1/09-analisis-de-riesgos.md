# Análisis de riesgos

La puntuación de cada riesgo es **Probabilidad × Impacto** (escala 1 a 5 en ambos).

| ID | Riesgo | Categoría | Probabilidad (1–5) | Impacto (1–5) | Puntuación | Nivel de riesgo | Mitigación | Responsable | Estado |
| --- | --- | --- | :---: | :---: | :---: | --- | --- | --- | --- |
| 1 | Cambios en requisitos durante el desarrollo | Gestión | 4 | 4 | 16 | Alto | Validar requisitos con el cliente, controlar cambios mediante versiones y priorizar el backlog. | Líder de proyecto | Abierto |
| 2 | Retrasos en tareas o entregables | Gestión | 4 | 4 | 16 | Alto | Planificar sprints, establecer fechas límite y dar seguimiento semanal a avances y bloqueos. | Líder de proyecto | Abierto |
| 3 | Comunicación deficiente entre integrantes | Equipo | 3 | 4 | 12 | Alto | Usar un canal único de comunicación, reuniones breves y registro de acuerdos/tareas. | Líder de proyecto | Abierto |
| 4 | Abandono o indisponibilidad de integrantes | Equipo | 3 | 5 | 15 | Alto | Documentar funciones, mantener repositorio compartido y distribuir conocimientos críticos. | Líder de proyecto | Abierto |
| 5 | Errores de programación y defectos funcionales | Técnico | 4 | 5 | 20 | Crítico | Aplicar revisión de código, estándares de desarrollo, manejo de errores y correcciones priorizadas. | Equipo de desarrollo | Abierto |
| 6 | Problemas de integración frontend/backend | Técnico | 4 | 5 | 20 | Crítico | Definir contratos de API, usar ambientes de integración y realizar pruebas de endpoints. | Desarrollo Full Stack | Abierto |
| 7 | Pérdida o corrupción del código fuente | Técnico | 2 | 5 | 10 | Alto | Usar Git, repositorio remoto, ramas, commits frecuentes y copias de seguridad. | Equipo de desarrollo | Abierto |
| 8 | Pérdida, corrupción o inconsistencia de datos en la base de datos | Datos | 3 | 5 | 15 | Alto | Diseñar respaldos, restricciones de integridad, migraciones controladas y pruebas de recuperación. | Backend / BD | Abierto |
| 9 | Vulnerabilidades de seguridad y acceso no autorizado | Seguridad | 4 | 5 | 20 | Crítico | Implementar autenticación/autorización, validación de entradas, cifrado y revisión de vulnerabilidades. | Backend / Seguridad | Abierto |
| 10 | Fallas o cambios en APIs externas | Integración | 3 | 4 | 12 | Alto | Documentar dependencias, manejar errores/timeouts y preparar alternativas o versiones compatibles. | Backend | Abierto |
| 11 | Errores en geolocalización, mapas o cálculo de ubicación | Funcional | 3 | 5 | 15 | Alto | Validar coordenadas, permisos y precisión; probar distintos escenarios y dispositivos. | Frontend / Backend | Abierto |
| 12 | Problemas de diseño UX/UI que dificulten la contratación | UX/UI | 3 | 4 | 12 | Alto | Realizar prototipos, pruebas de usabilidad y revisión de flujos críticos antes de liberar. | Diseño UX/UI | Abierto |
| 13 | Bajo rendimiento de la aplicación | Rendimiento | 3 | 5 | 15 | Alto | Optimizar consultas, recursos y endpoints; medir tiempos de respuesta y realizar pruebas de carga. | Equipo de desarrollo | Abierto |
| 14 | Falta de pruebas y detección tardía de errores | Calidad | 4 | 4 | 16 | Alto | Definir casos de prueba, pruebas funcionales, integración y regresión antes de cada entrega. | QA / Desarrollo | Abierto |
| 15 | Incumplimiento de objetivos y alcance del anteproyecto | Gestión | 3 | 5 | 15 | Alto | Definir objetivos medibles, revisar avances contra el alcance y gestionar prioridades y cambios. | Líder de proyecto | Abierto |

## Matriz visual de riesgos – Fixora

Ubica la intersección entre Probabilidad e Impacto. El número resultante es la puntuación del riesgo.

| Probabilidad ↓ / Impacto → | 1 | 2 | 3 | 4 | 5 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **5** | 5 | 10 | 15 | 20 | 25 |
| **4** | 4 | 8 | 12 | 16 | 20 |
| **3** | 3 | 6 | 9 | 12 | 15 |
| **2** | 2 | 4 | 6 | 8 | 10 |
| **1** | 1 | 2 | 3 | 4 | 5 |

**Leyenda:** Bajo · Moderado · Alto · Crítico

## Riesgos ubicados en la matriz

| Probabilidad | Impacto | Puntuación | Nivel | Riesgos (ID) |
| :---: | :---: | :---: | --- | --- |
| 4 | 5 | 20 | Crítico | 5, 6, 9 |
| 4 | 4 | 16 | Alto | 1, 2, 14 |
| 3 | 5 | 15 | Alto | 4, 8, 11, 13, 15 |
| 3 | 4 | 12 | Alto | 3, 10, 12 |
| 2 | 5 | 10 | Alto | 7 |
