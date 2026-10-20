# Requisitos funcionales

## Registro y verificación

1. El sistema debe permitir al proveedor registrar sus datos personales, de negocio (horario, RFC, dirección), ubicación geográfica y documentos probatorios a través de un portal web, para su verificación y aprobación antes de habilitar su cuenta.
2. El sistema debe notificar al proveedor el resultado de su proceso de verificación (aprobado, rechazado o documentación incompleta).

## Perfil y cuenta

1. El sistema debe mostrar al proveedor un panel con sus estadísticas de actividad, notificaciones, reseñas recibidas e historial de reportes.
2. El sistema debe permitir al cliente crear y gestionar su cuenta, y consultar su historial de servicios con el desglose de cada uno (fecha, proveedor, costo, estado).
3. El sistema debe mostrar al cliente una pantalla principal con servicios recomendados, accesos directos por categoría y una barra de búsqueda.

## Localización y mapa

1. El sistema debe mostrar en un mapa la ubicación de los proveedores disponibles, ya sea filtrados por servicio seleccionado o de forma general.
2. El sistema debe permitir al cliente consultar la ficha del proveedor (información, reseñas, trabajos realizados, evidencias) al seleccionarlo en el mapa.
3. El sistema debe calcular y mostrar la ruta y tiempo estimado de llegada (ETA) del proveedor, actualizando su posición en tiempo real durante el traslado.

## Solicitud de servicio

1. El sistema debe permitir al cliente llenar un formulario con los detalles del servicio requerido, o utilizar un botón de emergencia que omita el formulario y notifique al proveedor de forma inmediata y marcada como urgente.
2. El sistema debe emitir una alarma/notificación al proveedor al recibir una nueva solicitud, con un límite máximo de 5 minutos para aceptarla o rechazarla.
3. El sistema debe notificar al cliente si el proveedor no respondió a tiempo, y permitirle cancelar la solicitud en cualquier momento antes de que sea aceptada.
4. El sistema debe generar el mapa de traslado una vez aceptada la solicitud, y notificar al cliente cuando el proveedor haya llegado a su ubicación.
5. El sistema debe permitir al proveedor cancelar el servicio después de aceptarlo, solicitando evidencia justificante para evitar penalización.

## Pagos

1. El sistema debe permitir al cliente registrar el estado de pago del servicio (efectivo, transferencia).
2. El sistema debe acumular y mostrar el historial de pagos y adeudos pendientes, tanto al cliente como al proveedor.

## Calificaciones y reputación

1. El sistema debe permitir al cliente calificar y dejar una reseña del proveedor al finalizar el servicio, y calcular una calificación promedio visible en su perfil público.
2. El sistema debe permitir al proveedor dejar comentarios/calificación sobre el cliente, visibles para otros proveedores antes de aceptar una nueva solicitud del mismo.

## Reportes y disputas

1. El sistema debe permitir al cliente y al proveedor generar reportes relacionados con un servicio o incidente, adjuntando evidencia (fotos u otros archivos), los cuales serán canalizados hacia Soporte/Administrador para su revisión.

## Administración y soporte

1. El sistema debe permitir al Administrador revisar y aprobar/rechazar los registros de nuevos proveedores, así como gestionar los pagos y comisiones generadas en la plataforma.

## Notificaciones

1. El sistema debe enviar notificaciones push a clientes y proveedores ante cambios de estado relevantes del servicio (aceptado, cancelado, en camino, finalizado).
