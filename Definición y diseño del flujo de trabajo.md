# Flujo de Trabajo y Gestión de Código

## 1. Definición del Flujo de Trabajo
Ramas Principales
-	main: Refleja el código estable en producción. Siempre debe ser compilable y estar 100% funcional.
-	develop: Rama de integración donde conviven los desarrollos finalizados. Las integraciones de esta rama se compilan para enviarse a producción una vez por semana.

Ramas de Trabajo
-	Se crearán a partir de develop para trabajar en tareas específicas. Una vez finalizada la tarea y aprobado el Pull Request, la rama se fusionará con develop y se eliminará.

## 2. Nomenclatura de Ramas e Integración con Plane
Usaremos la nomenclatura de Git Branch Naming Conventions. La estructura estándar es:
(Tipo/ID-de-Plane/Descripción-Corta)

Ejemplo:
“feature/PLANE-1042-autenticacion-google”

•	Nuevas Funcionalidades: feature/APP-42-autenticacion-google

•	Corrección de Bugs: bugfix/APP-87-correccion-monto-carrito

•	Hotfix Urgente: hotfix/APP-105-error-500-checkout

•	Lanzamientos: release/v1.2.0

## 3. Formato de Commits y Enlace a Plane
Adoptamos el estándar Conventional Commits 1.0.0. Para vincular los commits con Plane, se recomienda incluir la clave de la tarea entre paréntesis o en el mensaje.

Etiquetas Principales:

feat, fix, docs, style, refactor, perf, test, build, ci, chore.

Estructura del commit:
<tipo>(<módulo/ámbito>): <descripción corta> (<ID-PLANE>) [cuerpo del mensaje opcional con mayor detalle]

Ejemplo de uso:
feat(auth): desarrollo de la lógica para implementación de Google Auth (APP-42) 
Se agregaron correctamente los endpoints, métodos y controladores para la correcta integración con la API de Google Auth.

## 4. Políticas de Combinación y Protección en GitHub
En la configuración de GitHub (Settings > Branches > Branch protection rules), se establecerán reglas estrictas para main y develop:
1.	Require a pull request before merging:
-	Al menos 1 aprobación de un miembro de equipo (Misael).
-	Se prohíbe explícitamente el push directo a las ramas protegidas (main y develop).
2.	Estrategia de Merge recomendada:
-	Squash and Merge: Para ramas feature/* y bugfix/* hacia develop. Permite mantener un historial limpio resumiendo múltiples commits temporales en uno solo.
-	Create a Merge Commit: Para ramas release/* o hotfix/* hacia main (conserva la trazabilidad completa del release).
3.	Automatically delete head branches:
-	La opción para eliminar ramas automáticamente tras hacer merge debe estar activada en el repositorio.

## 5. Plantilla para Pull Requests (PR) en GitHub
Plantilla de Conventional Commits
Todo Pull Request creado en GitHub debe usar la siguiente plantilla para estandarizar la revisión:
1.	Descripción de los Cambios
-	Breve explicación de qué hace este PR y qué problema resuelve.
2.	Vinculación con Plane
-	Relacionado con Plane Issue: **[APP-XX]**(link al issue en Plane) 
3.	Pruebas Realizadas
- Pruebas unitarias ejecutadas exitosamente.
- Verificado en entorno local.
4.	Capturas / Videos (Opcional)
-	Muestra cambios de UI/UX si aplica
