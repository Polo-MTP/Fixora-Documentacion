# Configuración y parámetros del entorno de versiones

## 1. Objetivo

Establecer la configuración del entorno de control de versiones del proyecto Fixora, definiendo la plataforma de alojamiento, la organización de los repositorios, los mecanismos de acceso, las convenciones para registrar cambios y las reglas de exclusión de archivos.

Esta configuración busca mantener un historial de cambios organizado, facilitar el trabajo colaborativo y reducir el riesgo de incorporar archivos innecesarios o información confidencial al repositorio.

## 2. Plataforma y herramienta de control de versiones

El proyecto utiliza **Git** como sistema de control de versiones y **GitHub** como plataforma para alojar los repositorios remotos.

La versión de Git reportada en el entorno de desarrollo es la **2.48.1**. La rama principal establecida para el proyecto es `main`.

Los repositorios tienen visibilidad privada y el acceso está destinado a los integrantes autorizados del equipo de desarrollo.

## 3. Organización de los repositorios

El proyecto Fixora se organiza en cuatro repositorios independientes:

| Repositorio | Descripción |
|---|---|
| `Documentacion` | Almacena la documentación técnica y académica del proyecto. |
| `Fixora-Android` | Contiene el desarrollo de la aplicación móvil para Android. |
| `Fixora-Backend` | Contiene los componentes del servidor y la lógica de procesamiento del sistema. |
| `Fixora-Frontend` | Contiene los componentes de la interfaz web. |

Esta separación permite administrar los cambios de cada componente de manera independiente, mantener historiales específicos y facilitar la organización del trabajo del equipo.

## 4. Acceso a los repositorios

Todos los integrantes del equipo tienen acceso a los cuatro repositorios privados. La obtención de los repositorios puede realizarse mediante dos mecanismos:

- **HTTPS:** permite clonar y sincronizar repositorios utilizando una URL HTTPS y el método de autenticación admitido por GitHub.
- **SSH:** permite clonar y sincronizar repositorios utilizando una URL SSH y una clave configurada para autenticar al usuario.

La elección entre ambos mecanismos depende de la configuración del entorno de cada integrante. Las credenciales y claves privadas deben mantenerse protegidas y no deben incorporarse al repositorio.

Los permisos específicos de escritura, administración y las medidas de protección de las ramas se documentarán una vez verificados en GitHub.

## 5. Rama principal y registro de cambios

La rama principal establecida para los repositorios es `main`. En ella se concentra la línea principal de desarrollo de cada componente.

Para mantener un historial comprensible, el equipo utilizará la convención **Conventional Commits**, que establece una estructura uniforme para los mensajes de los commits.

La estructura general es:

`<tipo>[ámbito opcional]: <descripción>`

Ejemplos:

- `feat: agregar inicio de sesión`
- `fix: corregir validación del formulario`
- `docs: actualizar documentación del proyecto`
- `refactor: reorganizar servicio de usuarios`
- `test: agregar pruebas de autenticación`
- `chore: actualizar dependencias`

El uso de esta convención facilita la identificación del propósito de cada cambio y mejora la legibilidad del historial de versiones.

La lista definitiva de tipos permitidos y las reglas para nombrar ramas se especificarán en la documentación del flujo de trabajo.

## 6. Archivos de exclusión mediante .gitignore

Cada repositorio cuenta con un archivo `.gitignore` destinado a definir los archivos y directorios que Git debe excluir del seguimiento cuando todavía no están versionados.

### 6.1. Fixora-Frontend

El archivo `.gitignore` contempla las siguientes categorías:

- **Archivos compilados y temporales:** `dist`, `tmp`, `out-tsc` y `bazel-out`.
- **Dependencias de Node.js:** `node_modules` y registros de errores de gestores de paquetes.
- **Configuraciones de editores e IDE:** archivos de IntelliJ, Eclipse, Sublime Text y Visual Studio Code, con excepciones para determinadas configuraciones compartidas.
- **Cachés, pruebas y cobertura:** caché de Angular, resultados de cobertura y archivos generados por pruebas.
- **Archivos del sistema operativo:** `.DS_Store` y `Thumbs.db`.

Estas exclusiones reducen el ruido en los cambios registrados y evitan compartir dependencias instaladas o archivos generados localmente.

### 6.2. Fixora-Android

El archivo `.gitignore` contempla:

- Archivos y configuraciones locales de IntelliJ IDEA y Android Studio.
- El directorio `.gradle` y los archivos generados en `build`.
- `local.properties`, que puede contener rutas locales del SDK de Android.
- Archivos generados por la compilación nativa, como `.externalNativeBuild` y `.cxx`.
- Capturas y archivos auxiliares de desarrollo.
- Archivos del sistema operativo, como `.DS_Store`.

Estas reglas permiten mantener en el repositorio el código y los recursos necesarios para el proyecto sin incorporar configuraciones particulares de cada equipo.

### 6.3. Fixora-Backend

El archivo `.gitignore`, compartido inicialmente bajo el nombre `Fixora-Api`, contempla:

- **Dependencias:** `node_modules`.
- **Variables de entorno:** `.env`, variantes de entorno y archivos locales, conservando la excepción para `.env.example`.
- **Archivos de compilación:** `dist`, `build` y `out`.
- **Registros:** archivos de logs y registros de gestores de paquetes.
- **TypeScript:** archivos `*.tsbuildinfo`.
- **Pruebas:** directorios de cobertura y resultados de herramientas de análisis.
- **Editores:** configuraciones de Visual Studio Code e IntelliJ IDEA y archivos temporales.
- **Sistema operativo:** `.DS_Store` y `Thumbs.db`.
- **Archivos temporales y de ejecución:** directorios `tmp` y `temp`, archivos de procesos y archivos de semillas.

La excepción `!.env.example` permite mantener una plantilla de variables de entorno que documente los nombres de las variables necesarias sin incluir valores confidenciales.

### 6.4. Documentacion

Se confirma que el repositorio `Documentacion` cuenta con un archivo `.gitignore`. Su contenido y las categorías de archivos excluidos quedan pendientes de revisión para completar su descripción técnica.

**Consideración:** `.gitignore` no elimina automáticamente archivos que ya están bajo seguimiento de Git. La exclusión de archivos previamente versionados requiere una acción adicional.

## 7. Configuración de seguridad

Los repositorios son privados y el acceso está limitado a los integrantes autorizados del equipo.

Se establece como criterio de seguridad que las contraseñas, los tokens, las claves privadas y los valores confidenciales de las variables de entorno no deben incorporarse al control de versiones.

Las reglas específicas de protección de ramas, los permisos asignados a los colaboradores y los mecanismos de autenticación utilizados por cada integrante se documentarán después de comprobar la configuración real de GitHub.
