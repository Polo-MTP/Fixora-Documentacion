# MVP (Producto Mínimo Viable)

El Producto Mínimo Viable de Fixora es un demo enfocado en resolver el problema principal que es el conectar de forma rápida, segura y geolocalizada a un cliente con un proveedor verificado de un servicio ante una emergencia o servicio urgente. El MVP prioriza las funciones críticas de validación, mapa/seguimiento, temporizador de respuesta y gestión de estados para probar el modelo operativo antes de añadir apartados más complejos.

## Funcionalidades incluidas en el MVP

- **Módulo de Registro y Validación Documental (Portal Web)**
  - Formulario de registro de prestadores de servicio con carga de documentos personales (identificación, RFC, comprobante de domicilio) para ser aprobados o rechazados manualmente por el rol Administrador.
- **Registro y Autenticación de Clientes (App Móvil)**
  - Creación de cuenta y acceso seguro para usuarios clientes mediante credenciales.
- **Solicitud de Servicio de Emergencia y Temporizador (App Móvil)**
  - Activación del Botón de Emergencia que omite formularios extensos, emite una alerta sonora/notificación al técnico más cercano y activa un temporizador de respuesta de máximo 5 minutos.
- **Seguimiento GPS y Cambios de Estado en Tiempo Real (App Móvil) (Función DEMO limitada a tokens de API)**
  - Visualización en mapa del trayecto del técnico hacia el domicilio con estimación de tiempo de llegada y actualización de estados del servicio (Pendiente, Aceptado, En camino, Llegado, Finalizado, Cancelado).
- **Cierre de Servicio y Registro de Pago/Adeudo (App Móvil)**
  - Declaración manual del estado del pago por parte del técnico ya sea efectivo o transferencia.
- **Sistema Básico de Calificación Bidireccional (App Móvil)**
  - Calificación por estrellas (1 a 5) y comentarios al finalizar la atención, visibles en el perfil del prestador de servicios.
- **Panel de Administración Básica**
  - Módulo para que el Administrador revise solicitudes de registro de proveedores pendientes y gestione el estado de la cuenta (aprobar/suspender).
