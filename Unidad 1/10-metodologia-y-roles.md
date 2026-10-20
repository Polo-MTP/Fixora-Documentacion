# Elección de metodología y roles de equipo

## Metodología seleccionada

Metodología ágil basada en **Scrum**.

**Debido a** que el desarrollo de una aplicación móvil con geolocalización y transacciones financieras requiere un enfoque iterativo. Scrum permite dividir el proyecto en ciclos cortos de trabajo (Sprints de 2 a 3 semanas), lo que facilita entregar módulos funcionales poco a poco (por ejemplo, primero el registro, luego el mapa, después los pagos) y corregir errores rápidamente sin tener que esperar hasta el final del desarrollo.

## Roles de equipo

Para optimizar el trabajo y cubrir todas las tecnologías seleccionadas (Kotlin, Angular, Express, MongoDB y PostgreSQL), el equipo se dividirá en los siguientes 5 roles clave:

### 1. Project Manager / Scrum Master (Líder del Proyecto)

**Responsabilidades:** Es el encargado de planificar los Sprints, supervisar que se cumplan los objetivos y los tiempos, y eliminar cualquier obstáculo que detenga a los programadores. Además, gestionará la documentación del proyecto y la presentación de avances.

### 2. Desarrollador Móvil (Especialista en Kotlin)

**Responsabilidades:** Se encargará de programar íntegramente las aplicaciones de Android (App Cliente y App Técnico). Su enfoque principal será integrar los mapas (GPS), configurar las notificaciones push para las alertas de emergencia y construir interfaces rápidas y fluidas para el usuario.

### 3. Desarrollador Backend y Arquitecto de Datos (Especialista en Express / Node.js)

**Responsabilidades:** Será el creador de la API y de la lógica del servidor. Se encargará de programar los algoritmos de emparejamiento, gestionar las conexiones en tiempo real (WebSockets) y administrar la arquitectura dual de las bases de datos.

### 4. Desarrollador Frontend Web (Especialista en Angular)

**Responsabilidades:** Su tarea será construir el Panel de Administración Web. Se asegurará de que el equipo de soporte tenga una plataforma segura y rápida para validar documentos de los técnicos, ver estadísticas, gestionar usuarios y supervisar los reportes o disputas.

### 5. Diseñador UI/UX y Analista de Calidad (QA Tester)

**Responsabilidades:** Diseñará las pantallas, los botones y el flujo visual de las aplicaciones (Figma/Adobe XD) para asegurar que la app sea fácil de usar en un momento de emergencia. Una vez que los programadores terminen una función, este rol se encargará de hacer pruebas exhaustivas para encontrar "bugs" o errores antes de presentar el proyecto.
