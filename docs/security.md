# Seguridad de LexManhwa

## 1. Objetivo

La aplicación debe proteger:

- Cuentas de usuarios.
- Información privada.
- Funcionalidades administrativas.
- Archivos subidos.
- Base de datos.
- Credenciales.
- Configuración privada.

La seguridad no debe depender únicamente del frontend.

La autorización importante debe aplicarse en las capas que realmente controlan el recurso, especialmente PostgreSQL, Row Level Security y Storage.

---

## 2. Principio de mínimo privilegio

Cada usuario y componente de la aplicación debe tener únicamente los permisos necesarios para realizar su función.

No conceder permisos administrativos de forma predeterminada.
No utilizar permisos elevados desde el navegador.
No confiar en información enviada por el cliente para determinar privilegios.

---

## 3. Variables de entorno

Las credenciales y configuraciones privadas deben utilizar variables de entorno.

El proyecto deberá tener:

```text
.env.example
```

`.env.example` no debe contener credenciales reales.
Los archivos que contengan secretos reales no deben almacenarse en Git.
El `.gitignore` debe proteger los archivos de entorno apropiados.

---

## 4. Claves de Supabase

El frontend utilizará únicamente la clave pública destinada al navegador.
En la configuración actual de Supabase, las aplicaciones que se ejecutan en el navegador utilizan una `publishable key`.

Las claves secretas están destinadas exclusivamente a componentes controlados por el desarrollador, como servidores o Edge Functions.
Una `secret key` tiene privilegios elevados y puede evitar las políticas RLS, por lo que nunca debe enviarse al navegador.

Supabase está migrando las claves antiguas:

- `anon`
- `service_role`

hacia:

- `publishable`
- `secret`

Durante la implementación se utilizará la nomenclatura actual recomendada por Supabase.

Nunca incluir una `secret key` en:

- Código frontend.
- Git.
- `.env.example`.
- HTML.
- JavaScript enviado al navegador.
- Configuración pública de Netlify.

---

## 5. Autenticación

Supabase Auth gestionará la autenticación.
La aplicación debe manejar como mínimo:

- Usuario no autenticado.
- Sesión cargando.
- Sesión válida.
- Sesión expirada.
- Error de autenticación.

Las rutas privadas deben comprobar la sesión.
La interfaz no debe asumir que una sesión existe únicamente porque el usuario haya navegado hacia una ruta protegida.

---

## 6. Modelo de roles

LexManhwa tendrá inicialmente dos roles:

- `reader`
- `admin`

### reader

Puede:

- Consultar contenido publicado.
- Gestionar sus favoritos.
- Gestionar su progreso de lectura.
- Gestionar los campos permitidos de su perfil.

No puede:

- Crear manhwas.
- Modificar manhwas.
- Eliminar manhwas.
- Crear capítulos.
- Modificar capítulos.
- Eliminar capítulos.
- Administrar géneros.
- Modificar páginas de capítulos.
- Modificar roles.

### admin

Puede gestionar las operaciones administrativas autorizadas:

- Manhwas.
- Géneros.
- Capítulos.
- Páginas.
- Estados de publicación.

---

## 7. Protección del rol administrativo

El campo `role` no puede ser modificable por un usuario normal.

No confiar en:

```javascript
if (user.role === "admin")
```

como mecanismo de seguridad.

Ese tipo de comprobación puede utilizarse para mostrar u ocultar elementos de interfaz, pero no constituye autorización suficiente.
La autorización real debe aplicarse en PostgreSQL mediante RLS y las políticas correspondientes.

Un usuario no debe poder modificar su propio registro para cambiar `reader` a `admin`.

---

## 8. Row Level Security

Las tablas expuestas a través de la API deben utilizar Row Level Security cuando corresponda.
RLS debe configurarse junto con los permisos de PostgreSQL.
No asumir que activar RLS por sí solo define correctamente todos los permisos.

Cada operación relevante debe analizarse por separado:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`

Las políticas deben indicar explícitamente el rol de PostgreSQL al que aplican:

- `anon`
- `authenticated`

Las políticas deben utilizar las funciones de Supabase Auth apropiadas, como `auth.uid()` cuando corresponda.

---

## 9. Pruebas de RLS

Las políticas de seguridad deben probarse.
La implementación debe incluir pruebas que verifiquen como mínimo:

- Usuario no autenticado no puede acceder a datos privados.
- Usuario autenticado puede acceder a sus propios datos.
- Usuario autenticado no puede acceder a datos privados de otro usuario.
- Reader no puede realizar operaciones administrativas.
- Admin puede realizar las operaciones administrativas permitidas.
- Reader no puede cambiar su propio rol.

No considerar RLS terminado únicamente porque la migración se haya ejecutado correctamente.

---

## 10. Protección de perfiles

Los usuarios pueden gestionar únicamente los campos de su propio perfil que estén permitidos.

Un usuario no puede modificar:

- `id`
- `role`
  directamente desde el cliente.

Los campos editables podrán incluir:

- `username`
- `display_name`
- `avatar_url`
  según las reglas finales de la aplicación.

La política de `UPDATE` debe comprobar tanto:

- El registro que se está modificando.
- El estado resultante después de la modificación.

---

## 11. Protección de favoritos

Un usuario únicamente puede:

- Consultar sus propios favoritos.
- Crear sus propios favoritos.
- Eliminar sus propios favoritos.

No puede:

- Crear favoritos para otro usuario.
- Modificar favoritos de otro usuario.
- Eliminar favoritos de otro usuario.

La base de datos debe impedir duplicados mediante la restricción correspondiente.

---

## 12. Protección del progreso

Un usuario únicamente puede:

- Consultar su propio progreso.
- Crear su propio progreso.
- Actualizar su propio progreso.
- Eliminar su propio progreso si la aplicación lo permite.

No puede modificar el progreso de otro usuario.
La combinación utilizada para identificar el progreso actual debe mantenerse consistente con el modelo definido en `docs/database.md`.

---

## 13. Contenido público

El contenido público debe estar limitado a registros que tengan:
`publication_status = published`

Un usuario no autenticado puede consultar únicamente la información que la aplicación haya decidido hacer pública.

Los registros en estado `draft` no deben ser accesibles mediante las consultas públicas normales.
La seguridad de esta regla debe aplicarse mediante la base de datos y no únicamente ocultando elementos en React.

---

## 14. Contenido administrativo

Las operaciones administrativas deben estar protegidas.
Un `reader` no puede utilizar directamente la API para:

- Crear manhwas.
- Editar manhwas.
- Crear capítulos.
- Editar capítulos.
- Subir páginas.
- Cambiar estados de publicación.

Ocultar botones administrativos no sustituye las políticas de seguridad.

---

## 15. Supabase Storage

Las políticas de Storage deben proteger los archivos igual que las tablas de PostgreSQL.
Separar conceptualmente:

- `covers/`
- `chapters/`
- `avatars/`

Las operaciones de escritura administrativa deben estar protegidas.
Los usuarios no deben poder sobrescribir archivos administrativos arbitrariamente.
Los archivos públicos deben ser accesibles únicamente cuando corresponda a contenido publicado.
Los archivos privados deben requerir las políticas de acceso apropiadas.

---

## 16. Subida de archivos

Los archivos subidos deben validarse.
Validar:

- Tipo MIME.
- Extensión.
- Tamaño.
- Nombre.
- Ruta.
- Relación con el recurso correspondiente.

Los formatos iniciales permitidos serán:

- `image/jpeg`
- `image/png`
- `image/webp`
- `image/avif`

No aceptar archivos ejecutables o scripts.
Ejemplos:

- `.exe`
- `.sh`
- `.bat`
- `.js`
- `.php`

La validación no debe depender únicamente de la extensión proporcionada por el navegador.

---

## 17. Límites de archivos

La aplicación debe establecer límites razonables para:

- Tamaño máximo de portada.
- Tamaño máximo de página.
- Número máximo de páginas por capítulo.
- Dimensiones excesivas de imágenes.

Los límites definitivos se establecerán durante la implementación y se documentarán si afectan a la arquitectura.

---

## 18. Validación de datos

Validar los datos tanto en el cliente como en las capas correspondientes del backend.
Validar:

- Títulos.
- Descripciones.
- Slugs.
- Números de capítulos.
- Nombres de géneros.
- Parámetros de búsqueda.
- Datos de perfil.
- Metadatos de archivos.

La validación del frontend mejora la experiencia de usuario.
La seguridad no puede depender de ella.
Un usuario puede modificar manualmente las peticiones enviadas desde el navegador.

---

## 19. Protección contra XSS

No renderizar HTML arbitrario proporcionado por usuarios.
Evitar:
`dangerouslySetInnerHTML`
salvo que exista una necesidad específica y el contenido haya sido sanitizado correctamente.

Preferir texto plano cuando no sea necesario permitir HTML.

---

## 20. Errores

No mostrar al usuario:

- Stack traces.
- Credenciales.
- Secret keys.
- Consultas SQL internas.
- Información sensible de PostgreSQL.
- Información interna de Supabase.
- Variables de entorno.

Los errores deben transformarse en mensajes comprensibles para el usuario.
Durante el desarrollo se podrán registrar detalles técnicos de forma controlada.

---

## 21. Git

No subir secretos al repositorio.
No subir:

- `.env`
- `.env.local`
- `.env.production`
  cuando contengan secretos.

Mantener un `.env.example` sin credenciales reales.
Revisar el repositorio antes de publicar el proyecto.
Si un secreto se filtra accidentalmente, debe considerarse comprometido y debe rotarse.

---

## 22. Netlify

Las variables necesarias para producción deben configurarse mediante la configuración de entorno de Netlify.
No escribir secretos directamente dentro del código fuente.

Las variables públicas necesarias para el frontend pueden exponerse al navegador.
Las variables secretas solamente deben utilizarse en componentes que realmente se ejecuten en un entorno controlado por el servidor.

---

## 23. Dependencias

Mantener las dependencias actualizadas.
Revisar vulnerabilidades conocidas antes del despliegue.
No instalar paquetes innecesarios.
No agregar una dependencia únicamente para resolver una tarea pequeña que pueda solucionarse con las herramientas existentes.

---

## 24. Contenido

La aplicación debe utilizar contenido que tenga autorización para ser almacenado y distribuido.
Para demostraciones utilizar:

- Contenido propio.
- Contenido de dominio público.
- Contenido con licencia.
- Contenido ficticio.
- Contenido creado específicamente para pruebas.

No asumir que una imagen encontrada en Internet puede copiarse y redistribuirse.

---

## 25. Pruebas de seguridad antes de producción

Antes de desplegar deben comprobarse como mínimo:

- [ ] RLS activado en las tablas correspondientes.
- [ ] Permisos PostgreSQL revisados.
- [ ] Políticas SELECT revisadas.
- [ ] Políticas INSERT revisadas.
- [ ] Políticas UPDATE revisadas.
- [ ] Políticas DELETE revisadas.
- [ ] Reader no puede realizar operaciones administrativas.
- [ ] Reader no puede modificar su propio rol.
- [ ] Usuarios no pueden modificar datos de otros usuarios.
- [ ] Storage protegido.
- [ ] Subidas de archivos validadas.
- [ ] No existe secret key en el frontend.
- [ ] No existen secretos en Git.
- [ ] .env está protegido.
- [ ] .env.example no contiene secretos.
- [ ] Autenticación correctamente implementada.
- [ ] Datos privados protegidos.
- [ ] Entradas validadas.
- [ ] Errores manejados.
- [ ] Dependencias revisadas.
- [ ] Pruebas de RLS ejecutadas.

---

## 26. Regla para Copilot Agent

No implementar políticas de seguridad basándose únicamente en suposiciones.
Antes de crear las políticas RLS:

- Leer `docs/database.md`.
- Identificar cada tabla.
- Identificar quién debe poder SELECT.
- Identificar quién debe poder INSERT.
- Identificar quién debe poder UPDATE.
- Identificar quién debe poder DELETE.
- Revisar las relaciones entre tablas.
- Revisar Storage.
- Crear las migraciones.
- Crear pruebas para permitir y denegar operaciones.
- Ejecutar las pruebas.
- Informar de cualquier decisión de seguridad que no esté definida.

No considerar terminada una funcionalidad administrativa hasta que su autorización haya sido protegida fuera del frontend.
