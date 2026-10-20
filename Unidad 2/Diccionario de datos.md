Base de datos de Fixora: **36 tablas**, generada a partir del modelo `Fixora DB (corregido).drawio`.

## Convenciones

* Todos los id son **BIGINT**. En el modelo `string` equivale a **VARCHAR**.

* Llave primaria: columna `UniqueID` en cada tabla.

* Llaves foráneas: columnas `*_id` y similares; la tabla de destino aparece en la columna Llave.

* Fechas con hora: `datetime`. Las bajas son lógicas con el campo `active`.

* Los id pueden ir vacíos (nulos) según el caso; por ejemplo, un empleado aún no asignado a una solicitud.

## Índice por módulo

* **Cuentas, roles y accesos**: `users`, `roles`, `personal_data`, `notifications`, `addresses`, `address_user`

* **Negocios y sucursales**: `business`, `branches`, `branch_schedules`, `categories`, `branches_categories`, `portfolio_works`, `portfolio_media`

* **Personal**: `employees`, `employee_profiles`, `employee_vehicles`, `schedule_blocks`

* **Registro y verificación de proveedores**: `suppliers`, `supplier_applications`, `business_supplier`, `type_documents`, `supplier_documents`, `document_validations`

* **Servicio**: `service_requests`, `request_attachments`, `price_adjustment`, `service_payments`, `income_records`

* **Chat**: `conversations`, `request_messages`, `message_attachments`

* **Reseñas y reportes**: `reviews`, `review_attachments`, `reports`, `reports_events`, `report_attachments`

## Módulo: Cuentas, roles y accesos

### users

Cuentas de acceso de todos los usuarios del sistema.

| Columna         | Tipo    | Llave      | Descripción                                                                                                    |
| --------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `UniqueID`      | BIGINT  | PK         | Identificador único del registro.                                                                              |
| `email`         | VARCHAR |            | Correo de acceso. Debe ser único.                                                                              |
| `password_hash` | VARCHAR |            | Contraseña cifrada (hash). Nunca se guarda en texto plano.                                                     |
| `role_id`       | BIGINT  | FK → roles | Rol de la cuenta (cliente, proveedor, gerente, empleado, etc.).                                                |
| `state`         | ENUM    |            | Estado de la cuenta; incluye "por aprobar" mientras un proveedor está en revisión y no puede entrar al portal. |

### roles

Catálogo de roles.

| Columna    | Tipo    | Llave | Descripción                                      |
| ---------- | ------- | ----- | ------------------------------------------------ |
| `UniqueID` | BIGINT  | PK    | Identificador único del registro.                |
| `name`     | VARCHAR |       | Nombre del rol (por ejemplo: gerente, empleado). |
| `active`   | BOOLEAN |       | Indica si el registro está activo (baja lógica). |

### personal_data

Datos personales de cada usuario.

| Columna      | Tipo    | Llave      | Descripción                       |
| ------------ | ------- | ---------- | --------------------------------- |
| `UniqueID`   | BIGINT  | PK         | Identificador único del registro. |
| `user_id`    | BIGINT  | FK → users | Referencia a `users`.             |
| `name`       | VARCHAR |            | Nombre(s) de la persona.          |
| `lastname_p` | VARCHAR |            | Apellido paterno.                 |
| `lastname_m` | VARCHAR |            | Apellido materno.                 |
| `birth_date` | DATE    |            | Fecha de nacimiento.              |

### notifications

Notificaciones enviadas a los usuarios.

| Columna       | Tipo     | Llave       | Descripción                                                                                   |
| ------------- | -------- | ----------- | --------------------------------------------------------------------------------------------- |
| `UniqueID`    | BIGINT   | PK          | Identificador único del registro.                                                             |
| `user_id`     | BIGINT   | FK → users  | Referencia a `users`.                                                                         |
| `type`        | VARCHAR  |             | Tipo de notificación.                                                                         |
| `title`       | VARCHAR  |             | Título corto.                                                                                 |
| `message`     | VARCHAR  |             | Texto de la notificación.                                                                     |
| `entity_type` | VARCHAR  |             | Tipo de entidad a la que apunta (por ejemplo: solicitud, reporte).                            |
| `entity_id`   | BIGINT   | Polimórfica | Id de la entidad a la que apunta. Se interpreta junto con entity_type (relación polimórfica). |
| `read_at`     | DATETIME |             | Fecha y hora en que se leyó; nulo si aún no se lee.                                           |

### addresses

Direcciones físicas.

| Columna        | Tipo    | Llave | Descripción                                            |
| -------------- | ------- | ----- | ------------------------------------------------------ |
| `UniqueID`     | BIGINT  | PK    | Identificador único del registro.                      |
| `reference`    | VARCHAR |       | Referencias para llegar al lugar.                      |
| `street`       | VARCHAR |       | Calle.                                                 |
| `num_ext`      | VARCHAR |       | Número exterior (texto: admite letras, como 12-B).     |
| `num_int`      | VARCHAR |       | Número interior.                                       |
| `colony`       | VARCHAR |       | Colonia.                                               |
| `municipality` | VARCHAR |       | Municipio o alcaldía.                                  |
| `state`        | VARCHAR |       | Estado.                                                |
| `postal_code`  | VARCHAR |       | Código postal (texto, para conservar ceros iniciales). |
| `country`      | VARCHAR |       | País.                                                  |
| `latitude`     | DECIMAL |       | Latitud geográfica.                                    |
| `longitude`    | DECIMAL |       | Longitud geográfica.                                   |
| `active`       | BOOLEAN |       | Indica si el registro está activo (baja lógica).       |

### address_user

Relaciona usuarios con sus direcciones guardadas.

| Columna      | Tipo    | Llave          | Descripción                                                                                                                  |
| ------------ | ------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `UniqueID`   | BIGINT  | PK             | Identificador único del registro.                                                                                            |
| `user_id`    | BIGINT  | FK → users     | Referencia a `users`.                                                                                                        |
| `address_id` | BIGINT  | FK → addresses | Referencia a `addresses`.                                                                                                    |
| `alias`      | VARCHAR |                | Nombre que el usuario le da a la dirección (por ejemplo: Casa, Trabajo).                                                     |
| `is_main`    | BOOLEAN |                | Verdadero si es una dirección registrada por el usuario; falso si es una dirección ocasional capturada al pedir un servicio. |
| `active`     | BOOLEAN |                | Indica si el registro está activo (baja lógica).                                                                             |

## Módulo: Negocios y sucursales

### business

Negocios registrados por proveedores.

| Columna              | Tipo    | Llave | Descripción                                     |
| -------------------- | ------- | ----- | ----------------------------------------------- |
| `UniqueID`           | BIGINT  | PK    | Identificador único del registro.               |
| `name`               | VARCHAR |       | Nombre del negocio.                             |
| `tax_identification` | VARCHAR |       | Identificación fiscal del negocio (RFC u otra). |
| `email`              | VARCHAR |       | Correo electrónico.                             |
| `phone`              | VARCHAR |       | Teléfono de contacto.                           |

### branches

Sucursales de cada negocio.

| Columna             | Tipo    | Llave          | Descripción                                                                                                                |
| ------------------- | ------- | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `UniqueID`          | BIGINT  | PK             | Identificador único del registro.                                                                                          |
| `business_id`       | BIGINT  | FK → business  | Referencia a `business`.                                                                                                   |
| `address_id`        | BIGINT  | FK → addresses | Referencia a `addresses`.                                                                                                  |
| `name`              | VARCHAR |                | Nombre de la sucursal.                                                                                                     |
| `phone`             | VARCHAR |                | Teléfono de contacto.                                                                                                      |
| `timezone`          | VARCHAR |                | Zona horaria de la sucursal.                                                                                               |
| `total_jobs`        | BIGINT  |                | Total de trabajos realizados. Se calcula automáticamente.                                                                  |
| `accepting_request` | BOOLEAN |                | Si la sucursal está recibiendo solicitudes. Se apaga cuando no hay empleados disponibles o cuando el gerente lo desactiva. |
| `description`       | VARCHAR |                | Descripción en texto libre.                                                                                                |
| `logo_key`          | VARCHAR |                | Llave del logo en el almacenamiento.                                                                                       |
| `email`             | VARCHAR |                | Correo electrónico.                                                                                                        |
| `rating_avg`        | DECIMAL |                | Calificación promedio de las reseñas recibidas (dato calculado).                                                           |
| `reviews_count`     | INT     |                | Cantidad de reseñas recibidas (dato calculado).                                                                            |

### branch_schedules

Horario de atención de cada sucursal.

| Columna       | Tipo    | Llave         | Descripción                                      |
| ------------- | ------- | ------------- | ------------------------------------------------ |
| `UniqueID`    | BIGINT  | PK            | Identificador único del registro.                |
| `branch_id`   | BIGINT  | FK → branches | Referencia a `branches`.                         |
| `day_of_week` | INT     |               | Día de la semana (número).                       |
| `open_time`   | TIME    |               | Hora de apertura.                                |
| `close_time`  | TIME    |               | Hora de cierre.                                  |
| `active`      | BOOLEAN |               | Indica si el registro está activo (baja lógica). |

### categories

Categorías de servicio.

| Columna      | Tipo    | Llave | Descripción                                                      |
| ------------ | ------- | ----- | ---------------------------------------------------------------- |
| `UniqueID`   | BIGINT  | PK    | Identificador único del registro.                                |
| `name`       | VARCHAR |       | Nombre.                                                          |
| `slug`       | VARCHAR |       | Texto único para URLs y búsquedas.                               |
| `active`     | BOOLEAN |       | Indica si el registro está activo (baja lógica).                 |
| `icon_key`   | VARCHAR |       | Llave del ícono para el acceso directo en la pantalla principal. |
| `sort_order` | INT     |       | Orden en que se muestra la categoría.                            |

### branches_categories

Categorías que atiende cada sucursal y su precio base.

| Columna            | Tipo    | Llave           | Descripción                                                                           |
| ------------------ | ------- | --------------- | ------------------------------------------------------------------------------------- |
| `UniqueID`         | BIGINT  | PK              | Identificador único del registro.                                                     |
| `category_id`      | BIGINT  | FK → categories | Referencia a `categories`.                                                            |
| `branch_id`        | BIGINT  | FK → branches   | Referencia a `branches`.                                                              |
| `base_price`       | DECIMAL |                 | Precio base de la sucursal para esa categoría.                                        |
| `active`           | BOOLEAN |                 | Indica si el registro está activo (baja lógica).                                      |
| `duration_minutes` | INT     |                 | Duración estimada del servicio, en minutos. Sirve para calcular horarios disponibles. |

### portfolio_works

Trabajos del portafolio de una sucursal.

| Columna       | Tipo    | Llave         | Descripción                       |
| ------------- | ------- | ------------- | --------------------------------- |
| `UniqueID`    | BIGINT  | PK            | Identificador único del registro. |
| `branch_id`   | BIGINT  | FK → branches | Referencia a `branches`.          |
| `title`       | VARCHAR |               | Título del trabajo realizado.     |
| `description` | VARCHAR |               | Descripción en texto libre.       |

### portfolio_media

Fotos de cada trabajo del portafolio.

| Columna       | Tipo    | Llave                | Descripción                                         |
| ------------- | ------- | -------------------- | --------------------------------------------------- |
| `UniqueID`    | BIGINT  | PK                   | Identificador único del registro.                   |
| `work_id`     | BIGINT  | FK → portfolio_works | Trabajo del portafolio al que pertenece la foto.    |
| `file_key`    | VARCHAR |                      | Llave del archivo en el almacenamiento (no la URL). |
| `description` | VARCHAR |                      | Descripción en texto libre.                         |

## Módulo: Personal

### employees

Empleados de una sucursal.

| Columna      | Tipo    | Llave         | Descripción                                                                       |
| ------------ | ------- | ------------- | --------------------------------------------------------------------------------- |
| `UniqueID`   | BIGINT  | PK            | Identificador único del registro.                                                 |
| `user_id`    | BIGINT  | FK → users    | Referencia a `users`.                                                             |
| `branch_id`  | BIGINT  | FK → branches | Referencia a `branches`.                                                          |
| `can_attend` | BOOLEAN |               | Si el empleado sale a dar servicio. Es falso para un gerente que solo administra. |
| `active`     | BOOLEAN |               | Indica si el registro está activo (baja lógica).                                  |

### employee_profiles

Perfil público del empleado.

| Columna             | Tipo    | Llave                   | Descripción                       |
| ------------------- | ------- | ----------------------- | --------------------------------- |
| `UniqueID`          | BIGINT  | PK                      | Identificador único del registro. |
| `employee_id`       | BIGINT  | FK → employees          | Referencia a `employees`.         |
| `photo_key`         | VARCHAR |                         | Llave de la foto de perfil.       |
| `photo_document_id` | BIGINT  | FK → supplier_documents | Documento que respalda la foto.   |
| `bio`               | VARCHAR |                         | Descripción breve del empleado.   |

### employee_vehicles

Vehículos del empleado.

| Columna       | Tipo    | Llave          | Descripción                                      |
| ------------- | ------- | -------------- | ------------------------------------------------ |
| `UniqueID`    | BIGINT  | PK             | Identificador único del registro.                |
| `employee_id` | BIGINT  | FK → employees | Referencia a `employees`.                        |
| `plate`       | VARCHAR |                | Placas.                                          |
| `brand`       | VARCHAR |                | Marca.                                           |
| `model`       | VARCHAR |                | Modelo.                                          |
| `color`       | VARCHAR |                | Color.                                           |
| `active`      | BOOLEAN |                | Indica si el registro está activo (baja lógica). |

### schedule_blocks

Bloqueos de agenda del empleado.

| Columna       | Tipo     | Llave          | Descripción                             |
| ------------- | -------- | -------------- | --------------------------------------- |
| `UniqueID`    | BIGINT   | PK             | Identificador único del registro.       |
| `employee_id` | BIGINT   | FK → employees | Empleado que bloquea el horario.        |
| `starts_at`   | DATETIME |                | Inicio del bloqueo.                     |
| `ends_at`     | DATETIME |                | Fin del bloqueo.                        |
| `reason`      | ENUM     |                | Motivo (vacaciones, personal, ocupado). |
| `created_at`  | DATETIME |                | Fecha y hora de creación del registro.  |

## Módulo: Registro y verificación de proveedores

### suppliers

Proveedores.

| Columna         | Tipo    | Llave      | Descripción                                                                    |
| --------------- | ------- | ---------- | ------------------------------------------------------------------------------ |
| `UniqueID`      | BIGINT  | PK         | Identificador único del registro.                                              |
| `user_id`       | BIGINT  | FK → users | Referencia a `users`.                                                          |
| `supplier_type` | ENUM    |            | Tipo de proveedor: independiente o empresa. Las empresas piden más documentos. |
| `rfc`           | VARCHAR |            | RFC del proveedor.                                                             |
| `active`        | BOOLEAN |            | Indica si el registro está activo (baja lógica).                               |

### supplier_applications

Solicitudes para ser proveedor.

| Columna            | Tipo    | Llave          | Descripción                                                           |
| ------------------ | ------- | -------------- | --------------------------------------------------------------------- |
| `UniqueID`         | BIGINT  | PK             | Identificador único del registro.                                     |
| `reviewed_by`      | BIGINT  | FK → users     | Usuario que revisa la solicitud.                                      |
| `supplier_id`      | BIGINT  | FK → suppliers | Referencia a `suppliers`.                                             |
| `supplier_type`    | ENUM    |                | Tipo de proveedor solicitado.                                         |
| `state`            | ENUM    |                | Estado de la solicitud (por ejemplo: pendiente, aprobada, rechazada). |
| `comments`         | VARCHAR |                | Comentarios del revisor.                                              |
| `application_date` | DATE    |                | Fecha en que se presentó la solicitud.                                |
| `due_date`         | DATE    |                | Fecha de vencimiento.                                                 |

### business_supplier

Relaciona proveedores con sus negocios.

| Columna       | Tipo    | Llave          | Descripción                                                                                         |
| ------------- | ------- | -------------- | --------------------------------------------------------------------------------------------------- |
| `UniqueID`    | BIGINT  | PK             | Identificador único del registro.                                                                   |
| `business_id` | BIGINT  | FK → business  | Negocio del proveedor. Permite que un proveedor tenga varios negocios; no es lo mismo que sucursal. |
| `supplier_id` | BIGINT  | FK → suppliers | Referencia a `suppliers`.                                                                           |
| `active`      | BOOLEAN |                | Indica si el registro está activo (baja lógica).                                                    |

### type_documents

Catálogo de documentos que se piden.

| Columna                    | Tipo    | Llave | Descripción                                       |
| -------------------------- | ------- | ----- | ------------------------------------------------- |
| `UniqueID`                 | BIGINT  | PK    | Identificador único del registro.                 |
| `name`                     | VARCHAR |       | Nombre.                                           |
| `description`              | VARCHAR |       | Descripción en texto libre.                       |
| `requires_expiration_date` | BOOLEAN |       | Si el documento tiene fecha de vencimiento.       |
| `supplier_type`            | ENUM    |       | Tipo de proveedor al que se le pide el documento. |
| `mandatory`                | BOOLEAN |       | Si el documento es obligatorio.                   |
| `active`                   | BOOLEAN |       | Indica si el registro está activo (baja lógica).  |

### supplier_documents

Documentos subidos por proveedores.

| Columna            | Tipo    | Llave               | Descripción                                          |
| ------------------ | ------- | ------------------- | ---------------------------------------------------- |
| `UniqueID`         | BIGINT  | PK                  | Identificador único del registro.                    |
| `supplier_id`      | BIGINT  | FK → suppliers      | Referencia a `suppliers`.                            |
| `type_document_id` | BIGINT  | FK → type_documents | Referencia a `type_documents`.                       |
| `file_key`         | VARCHAR |                     | Llave del archivo en el almacenamiento (no la URL).  |
| `file_hash`        | VARCHAR |                     | Hash del archivo para detectar cambios o duplicados. |
| `upload_date`      | DATE    |                     | Fecha en que se subió.                               |
| `due_date`         | DATE    |                     | Fecha de vencimiento.                                |

### document_validations

Revisión de cada documento.

| Columna       | Tipo     | Llave                   | Descripción                                      |
| ------------- | -------- | ----------------------- | ------------------------------------------------ |
| `UniqueID`    | BIGINT   | PK                      | Identificador único del registro.                |
| `document_id` | BIGINT   | FK → supplier_documents | Referencia a `supplier_documents`.               |
| `result`      | VARCHAR  |                         | Resultado de la revisión (aprobado o rechazado). |
| `reviewed_by` | BIGINT   | FK → users              | Usuario que revisó el documento.                 |
| `comment`     | VARCHAR  |                         | Comentario.                                      |
| `reviewed_at` | DATETIME |                         | Fecha y hora de la revisión.                     |

## Módulo: Servicio

### service_requests

Solicitudes de servicio hechas por clientes.

| Columna           | Tipo     | Llave           | Descripción                                                                                  |
| ----------------- | -------- | --------------- | -------------------------------------------------------------------------------------------- |
| `UniqueID`        | BIGINT   | PK              | Identificador único del registro.                                                            |
| `client_id`       | BIGINT   | FK → users      | Cliente que solicita el servicio.                                                            |
| `category_id`     | BIGINT   | FK → categories | Referencia a `categories`.                                                                   |
| `branch_id`       | BIGINT   | FK → branches   | Referencia a `branches`.                                                                     |
| `address_id`      | BIGINT   | FK → addresses  | Dirección donde se realizará el servicio.                                                    |
| `employee_id`     | BIGINT   | FK → employees  | Empleado asignado; nulo mientras no se asigna.                                               |
| `is_emergency`    | BOOLEAN  |                 | Si es una solicitud de emergencia.                                                           |
| `description`     | VARCHAR  |                 | Descripción en texto libre.                                                                  |
| `status`          | ENUM     |                 | Estado del flujo: pendiente, aceptada, agendada, en curso, completada, cancelada o expirada. |
| `expires_at`      | DATETIME |                 | Fecha límite para que la solicitud sea aceptada.                                             |
| `canceled_by`     | ENUM     |                 | Quién canceló (cliente, proveedor o sistema); nulo si no se canceló.                         |
| `canceled_reason` | VARCHAR  |                 | Motivo de la cancelación.                                                                    |
| `agreed_price`    | DECIMAL  |                 | Precio acordado al aceptar el servicio.                                                      |
| `created_at`      | DATETIME |                 | Fecha y hora de creación del registro.                                                       |
| `scheduled_at`    | DATETIME |                 | Inicio de la cita agendada.                                                                  |
| `scheduled_end`   | DATETIME |                 | Fin estimado de la cita.                                                                     |
| `completed_at`    | DATETIME |                 | Fecha y hora en que se completó el servicio.                                                 |
| `total_amount`    | DECIMAL  |                 | Total final: precio acordado más los ajustes aprobados.                                      |

### request_attachments

Archivos adjuntos a una solicitud.

| Columna      | Tipo     | Llave                 | Descripción                                         |
| ------------ | -------- | --------------------- | --------------------------------------------------- |
| `UniqueID`   | BIGINT   | PK                    | Identificador único del registro.                   |
| `request_id` | BIGINT   | FK → service_requests | Referencia a `service_requests`.                    |
| `file_key`   | VARCHAR  |                       | Llave del archivo en el almacenamiento (no la URL). |
| `mime_type`  | ENUM     |                       | Tipo MIME del archivo (imagen, PDF, etc.).          |
| `size_bytes` | INT      |                       | Tamaño del archivo en bytes.                        |
| `caption`    | VARCHAR  |                       | Texto que acompaña al archivo.                      |
| `created_at` | DATETIME |                       | Fecha y hora de creación del registro.              |

### price_adjustment

Ajustes de precio sobre una solicitud.

| Columna       | Tipo     | Llave                 | Descripción                                                          |
| ------------- | -------- | --------------------- | -------------------------------------------------------------------- |
| `UniqueID`    | BIGINT   | PK                    | Identificador único del registro.                                    |
| `request_id`  | BIGINT   | FK → service_requests | Referencia a `service_requests`.                                     |
| `amount`      | DECIMAL  |                       | Monto adicional.                                                     |
| `reason`      | ENUM     |                       | Motivo del ajuste (por ejemplo: materiales extra, tiempo adicional). |
| `status`      | ENUM     |                       | Estado del ajuste (pendiente, aprobado, rechazado, pagado).          |
| `declared_by` | BIGINT   | FK → users            | Usuario que declara el ajuste.                                       |
| `paid_at`     | DATETIME |                       | Fecha y hora en que se pagó.                                         |

### service_payments

Pagos de las solicitudes.

| Columna      | Tipo     | Llave                 | Descripción                                          |
| ------------ | -------- | --------------------- | ---------------------------------------------------- |
| `UniqueID`   | BIGINT   | PK                    | Identificador único del registro.                    |
| `request_id` | BIGINT   | FK → service_requests | Referencia a `service_requests`.                     |
| `amount`     | DECIMAL  |                       | Monto.                                               |
| `status`     | ENUM     |                       | Estado del pago.                                     |
| `method`     | ENUM     |                       | Método de pago.                                      |
| `reference`  | VARCHAR  |                       | Referencia del pago (id de la pasarela o del banco). |
| `paid_at`    | DATETIME |                       | Fecha y hora en que se pagó.                         |
| `currency`   | VARCHAR  |                       | Moneda del monto (código ISO, por ejemplo MXN).      |

### income_records

Registro de ingresos del proveedor por servicio cobrado.

| Columna             | Tipo     | Llave                 | Descripción                                       |
| ------------------- | -------- | --------------------- | ------------------------------------------------- |
| `UniqueID`          | BIGINT   | PK                    | Identificador único del registro.                 |
| `branch_id`         | BIGINT   | FK → branches         | Referencia a `branches`.                          |
| `request_id`        | BIGINT   | FK → service_requests | Referencia a `service_requests`.                  |
| `payment_id`        | BIGINT   | FK → service_payments | Referencia a `service_payments`.                  |
| `gross_amount`      | DECIMAL  |                       | Monto cobrado al cliente.                         |
| `commission_amount` | DECIMAL  |                       | Comisión que retiene la plataforma.               |
| `net_amount`        | DECIMAL  |                       | Monto que recibe el proveedor.                    |
| `currency`          | VARCHAR  |                       | Moneda del monto (código ISO, por ejemplo MXN).   |
| `status`            | ENUM     |                       | Estado de la liquidación (pendiente o liquidado). |
| `settled_at`        | DATETIME |                       | Fecha y hora en que se liquidó al proveedor.      |
| `created_at`        | DATETIME |                       | Fecha y hora de creación del registro.            |

## Módulo: Chat

### conversations

Conversación asociada a una solicitud.

| Columna      | Tipo     | Llave                 | Descripción                                                |
| ------------ | -------- | --------------------- | ---------------------------------------------------------- |
| `UniqueID`   | BIGINT   | PK                    | Identificador único del registro.                          |
| `request_id` | BIGINT   | FK → service_requests | Referencia a `service_requests`.                           |
| `status`     | VARCHAR  |                       | Estado de la conversación (por ejemplo: abierta, cerrada). |
| `created_at` | DATETIME |                       | Fecha y hora de creación del registro.                     |

### request_messages

Mensajes de una conversación.

| Columna            | Tipo     | Llave                 | Descripción                                                                               |
| ------------------ | -------- | --------------------- | ----------------------------------------------------------------------------------------- |
| `UniqueID`         | BIGINT   | PK                    | Identificador único del registro.                                                         |
| `conversation_id`  | BIGINT   | FK → conversations    | Referencia a `conversations`.                                                             |
| `sender_id`        | BIGINT   | FK → users            | Referencia a `users`.                                                                     |
| `message`          | VARCHAR  |                       | Texto del mensaje.                                                                        |
| `message_reply_id` | BIGINT   | FK → request_messages | Mensaje al que responde; nulo si no es una respuesta.                                     |
| `client_uuid`      | VARCHAR  |                       | Identificador generado por la app para evitar mensajes duplicados al reintentar el envío. |
| `read_at`          | DATETIME |                       | Fecha y hora en que se leyó; nulo si aún no se lee.                                       |
| `created_at`       | DATETIME |                       | Fecha y hora de creación del registro.                                                    |

### message_attachments

Archivos adjuntos a un mensaje.

| Columna       | Tipo     | Llave                 | Descripción                                         |
| ------------- | -------- | --------------------- | --------------------------------------------------- |
| `UniqueID`    | BIGINT   | PK                    | Identificador único del registro.                   |
| `message_id`  | BIGINT   | FK → request_messages | Referencia a `request_messages`.                    |
| `storage_key` | VARCHAR  |                       | Llave del archivo en el almacenamiento (no la URL). |
| `mime_type`   | ENUM     |                       | Tipo MIME del archivo (imagen, PDF, etc.).          |
| `size_bytes`  | INT      |                       | Tamaño del archivo en bytes.                        |
| `created_at`  | DATETIME |                       | Fecha y hora de creación del registro.              |

## Módulo: Reseñas y reportes

### reviews

Reseñas entre cliente y proveedor.

| Columna       | Tipo    | Llave                 | Descripción                                                       |
| ------------- | ------- | --------------------- | ----------------------------------------------------------------- |
| `UniqueID`    | BIGINT  | PK                    | Identificador único del registro.                                 |
| `request_id`  | BIGINT  | FK → service_requests | Referencia a `service_requests`.                                  |
| `direction`   | ENUM    |                       | Quién reseña a quién (cliente a proveedor o proveedor a cliente). |
| `author_id`   | BIGINT  | FK → users            | Usuario que escribe la reseña.                                    |
| `reviewee_id` | BIGINT  | FK → users            | Usuario reseñado.                                                 |
| `rating`      | INT     |                       | Calificación numérica (estrellas).                                |
| `comment`     | VARCHAR |                       | Comentario.                                                       |
| `status`      | ENUM    |                       | Estado de la reseña (por ejemplo: publicada, oculta).             |

### review_attachments

Archivos adjuntos a una reseña.

| Columna       | Tipo     | Llave        | Descripción                                         |
| ------------- | -------- | ------------ | --------------------------------------------------- |
| `UniqueID`    | BIGINT   | PK           | Identificador único del registro.                   |
| `review_id`   | BIGINT   | FK → reviews | Referencia a `reviews`.                             |
| `storage_key` | VARCHAR  |              | Llave del archivo en el almacenamiento (no la URL). |
| `mime_type`   | ENUM     |              | Tipo MIME del archivo (imagen, PDF, etc.).          |
| `size_bytes`  | INT      |              | Tamaño del archivo en bytes.                        |
| `created_at`  | DATETIME |              | Fecha y hora de creación del registro.              |

### reports

Reportes levantados por usuarios.

| Columna           | Tipo     | Llave                 | Descripción                            |
| ----------------- | -------- | --------------------- | -------------------------------------- |
| `UniqueID`        | BIGINT   | PK                    | Identificador único del registro.      |
| `reporter_id`     | BIGINT   | FK → users            | Usuario que levanta el reporte.        |
| `request_id`      | BIGINT   | FK → service_requests | Referencia a `service_requests`.       |
| `category`        | ENUM     |                       | Categoría del reporte.                 |
| `priority`        | ENUM     |                       | Prioridad.                             |
| `status`          | ENUM     |                       | Estado del reporte.                    |
| `description`     | VARCHAR  |                       | Descripción en texto libre.            |
| `assigned_to`     | BIGINT   | FK → users            | Usuario de soporte asignado.           |
| `resolution_type` | ENUM     |                       | Tipo de resolución.                    |
| `resolution_note` | VARCHAR  |                       | Nota con la resolución.                |
| `created_at`      | DATETIME |                       | Fecha y hora de creación del registro. |

### reports_events

Bitácora de eventos de un reporte.

| Columna       | Tipo     | Llave        | Descripción                                          |
| ------------- | -------- | ------------ | ---------------------------------------------------- |
| `UniqueID`    | BIGINT   | PK           | Identificador único del registro.                    |
| `report_id`   | BIGINT   | FK → reports | Referencia a `reports`.                              |
| `author_id`   | BIGINT   | FK → users   | Usuario que genera el evento.                        |
| `type`        | ENUM     |              | Tipo de evento (comentario, cambio de estado, etc.). |
| `body`        | VARCHAR  |              | Contenido del evento.                                |
| `from_status` | ENUM     |              | Estado anterior.                                     |
| `to_status`   | ENUM     |              | Estado nuevo.                                        |
| `created_at`  | DATETIME |              | Fecha y hora de creación del registro.               |

### report_attachments

Archivos adjuntos a un reporte.
