# Diseño de base de datos de LexManhwa

## 1. Objetivo

LexManhwa utilizará PostgreSQL mediante Supabase como base de datos principal.

La base de datos almacenará información estructurada y relaciones entre usuarios, manhwas, capítulos, géneros, favoritos y progreso de lectura.

Las imágenes se almacenarán mediante Supabase Storage.

La primera versión debe mantener un modelo de datos sencillo y normalizado, evitando entidades innecesarias.

---

## 2. Tecnología

La base de datos utilizará:

- PostgreSQL.
- Supabase.
- Row Level Security (RLS).
- Migraciones de base de datos.

Supabase Auth será responsable de la identidad y autenticación de los usuarios.

El identificador del usuario de Supabase Auth será utilizado como referencia para `profiles.id`.

---

## 3. Entidades iniciales

La primera versión tendrá las siguientes entidades:

- `profiles`
- `manhwa`
- `genres`
- `manhwa_genres`
- `chapters`
- `chapter_pages`
- `favorites`
- `reading_progress`

No crear entidades adicionales hasta que exista una necesidad funcional concreta.

---

## 4. Relaciones principales

```text
profiles
    |
    +---- favorites -------- manhwa
    |
    +---- reading_progress - manhwa
    |                          |
    |                          +---- chapters
    |
    +---- created_by ---------- manhwa
                               |
                               +---- chapters
                                      |
                                      +---- chapter_pages

manhwa
   |
   +---- manhwa_genres ---- genres
```

---

## 5. profiles

Representa información adicional asociada a un usuario autenticado.

**Campos:**
- `id`
- `username`
- `display_name`
- `avatar_url`
- `role`
- `created_at`
- `updated_at`

**`id`**
Debe utilizar el mismo identificador del usuario correspondiente de Supabase Auth.
Debe existir una relación con el usuario autenticado.

**`username`**
Nombre de usuario.
Debe ser único si se utiliza como identificador público.

**`display_name`**
Nombre mostrado públicamente.

**`avatar_url`**
Referencia al avatar del usuario.
Puede ser NULL.

**`role`**
Rol del usuario.
Valores iniciales:
- `reader`
- `admin`

El usuario no puede modificar su propio role.
La autorización administrativa no debe depender únicamente del frontend.
Las políticas de PostgreSQL y Row Level Security deben impedir que un usuario normal se convierta a sí mismo en administrador.

**`created_at`**
Fecha de creación del perfil.

**`updated_at`**
Fecha de última actualización.

---

## 6. manhwa

Representa una obra disponible en la plataforma.

**Campos:**
- `id`
- `title`
- `slug`
- `description`
- `cover_path`
- `author`
- `artist`
- `status`
- `publication_status`
- `created_by`
- `created_at`
- `updated_at`

**`id`**
Identificador único del manhwa.

**`title`**
Título de la obra.

**`slug`**
Identificador legible utilizado para las rutas públicas.
Ejemplo:
`solo-leveling`
Debe ser único.

**`description`**
Descripción de la obra.
Puede ser NULL si todavía no se ha añadido.

**`cover_path`**
Ruta del archivo dentro de Supabase Storage.
No depender directamente de una URL pública permanente.
Ejemplo conceptual:
`covers/solo-leveling.webp`

**`author`**
Autor de la obra.
Puede ser NULL.

**`artist`**
Artista de la obra.
Puede ser NULL.

**`status`**
Representa el estado de la obra.
Valores iniciales:
- `ongoing`
- `completed`
- `hiatus`
- `cancelled`

Este campo describe el estado del manhwa y no su visibilidad en la plataforma.

**`publication_status`**
Representa si el contenido está disponible públicamente.
Valores iniciales:
- `draft`
- `published`

Un manhwa en estado `draft` no debe aparecer en el catálogo público.
Un manhwa `published` puede aparecer en el catálogo público si cumple las demás condiciones necesarias.

**`created_by`**
Identificador del usuario administrador que creó el registro.
Debe referenciar `profiles.id`.

**`created_at`**
Fecha de creación.

**`updated_at`**
Fecha de última actualización.

---

## 7. genres

Representa los géneros disponibles.

**Campos:**
- `id`
- `name`
- `slug`

**`name`**
Nombre visible del género.
Ejemplos:
- Action
- Adventure
- Comedy
- Drama
- Fantasy
- Romance
- School
- Sports

**`slug`**
Identificador utilizado para URLs o filtros.
Debe ser único.

---

## 8. manhwa_genres

Representa la relación muchos-a-muchos entre manhwas y géneros.

**Campos:**
- `manhwa_id`
- `genre_id`

Ambos campos deben utilizar claves foráneas.
Debe existir una restricción única sobre:
`manhwa_id + genre_id`

Esto evita asignar el mismo género dos veces al mismo manhwa.

---

## 9. chapters

Representa los capítulos pertenecientes a un manhwa.

**Campos:**
- `id`
- `manhwa_id`
- `number`
- `title`
- `slug`
- `publication_status`
- `created_by`
- `created_at`
- `updated_at`

**`manhwa_id`**
Identificador del manhwa al que pertenece el capítulo.
Debe utilizar una clave foránea.

**`number`**
Número del capítulo.
Debe utilizar un tipo numérico apropiado.
La combinación:
`manhwa_id + number`
debe ser única.
Esto evita tener dos capítulos con el mismo número dentro de un mismo manhwa.

**`title`**
Título opcional del capítulo.

**`slug`**
Identificador legible del capítulo.
Debe ser único dentro del contexto apropiado.

**`publication_status`**
Valores iniciales:
- `draft`
- `published`

Un capítulo en estado `draft` no debe aparecer para lectores públicos.

**`created_by`**
Identificador del administrador que creó el capítulo.
Debe referenciar `profiles.id`.

**`created_at`**
Fecha de creación.

**`updated_at`**
Fecha de última actualización.

---

## 10. chapter_pages

Representa las páginas de un capítulo.

**Campos:**
- `id`
- `chapter_id`
- `page_number`
- `storage_path`
- `created_at`

**`chapter_id`**
Identificador del capítulo.
Debe utilizar una clave foránea.

**`page_number`**
Número de página utilizado para determinar el orden de lectura.
La combinación:
`chapter_id + page_number`
debe ser única.

**`storage_path`**
Ruta del archivo dentro de Supabase Storage.
Ejemplo conceptual:
`chapters/solo-leveling/chapter-001/001.webp`

No almacenar la imagen binaria dentro de PostgreSQL.

---

## 11. favorites

Representa los manhwas guardados por un usuario.

**Campos:**
- `id`
- `user_id`
- `manhwa_id`
- `created_at`

**Restricción única**
La combinación:
`user_id + manhwa_id`
debe ser única.
Esto impide que un usuario agregue el mismo manhwa varias veces.

**Seguridad**
Un lector solamente puede:
- Crear sus propios favoritos.
- Consultar sus propios favoritos.
- Eliminar sus propios favoritos.

No debe poder modificar favoritos pertenecientes a otros usuarios.

---

## 12. reading_progress

Representa el progreso de lectura de un usuario.

**Campos:**
- `id`
- `user_id`
- `manhwa_id`
- `chapter_id`
- `page_number`
- `updated_at`

**Restricción principal**
La combinación:
`user_id + manhwa_id`
debe ser única.
Esto permite mantener un único registro de progreso actual por manhwa.

**Relaciones**
`chapter_id` debe pertenecer al mismo `manhwa_id`.
La aplicación y las restricciones correspondientes deben evitar inconsistencias entre ambos valores.

**Seguridad**
Un usuario solamente puede consultar y modificar su propio progreso.

---

## 13. Índices y restricciones únicas

Las restricciones únicas importantes serán:

- `profiles.username`
- `manhwa.slug`
- `genres.slug`
- `manhwa_genres.manhwa_id + genre_id`
- `chapters.manhwa_id + number`
- `chapter_pages.chapter_id + page_number`
- `favorites.user_id + manhwa_id`
- `reading_progress.user_id + manhwa_id`

Los índices adicionales deben crearse basándose en las consultas reales de la aplicación.
Índices inicialmente esperables:

- `chapters.manhwa_id`
- `chapter_pages.chapter_id`
- `favorites.user_id`
- `reading_progress.user_id`
- `manhwa.publication_status`
- `manhwa.status`

No crear índices innecesarios.

---

## 14. Claves foráneas

Las relaciones principales deben utilizar claves foráneas.

Ejemplos:

```text
chapters.manhwa_id
        |
        v
manhwa.id

chapter_pages.chapter_id
        |
        v
chapters.id

manhwa_genres.manhwa_id
        |
        v
manhwa.id

manhwa_genres.genre_id
        |
        v
genres.id

favorites.user_id
        |
        v
profiles.id

favorites.manhwa_id
        |
        v
manhwa.id

reading_progress.user_id
        |
        v
profiles.id

reading_progress.manhwa_id
        |
        v
manhwa.id

reading_progress.chapter_id
        |
        v
chapters.id
```

---

## 15. Integridad de datos

Las relaciones entre entidades deben mantenerse consistentes.
Ejemplos:

- Un capítulo no puede existir sin un manhwa válido.
- Una página no puede existir sin un capítulo válido.
- Un favorito no puede existir sin un usuario válido.
- Un favorito no puede existir sin un manhwa válido.
- Un progreso no puede pertenecer a un usuario inexistente.
- Un capítulo utilizado en `reading_progress` debe pertenecer al manhwa correspondiente.

Las reglas de integridad deben implementarse en la base de datos cuando sea apropiado y no únicamente mediante validaciones del frontend.

---

## 16. Row Level Security

Las tablas relevantes deben utilizar Row Level Security.

**Lectores**
Un lector puede:
- Consultar contenido publicado.
- Gestionar sus favoritos.
- Gestionar su progreso.
- Gestionar los campos permitidos de su propio perfil.

Un lector no puede:
- Crear manhwas.
- Modificar manhwas.
- Eliminar manhwas.
- Crear capítulos.
- Modificar capítulos.
- Eliminar capítulos.
- Modificar páginas de capítulos.
- Cambiar su propio rol.

**Administradores**
Los administradores pueden gestionar el contenido autorizado:
- Manhwas.
- Géneros.
- Capítulos.
- Páginas.
- Estados de publicación.

Las políticas RLS deben comprobar el rol mediante una estrategia segura.
No confiar únicamente en el frontend.

---

## 17. Publicación

El sistema diferencia entre:

**Estado de la obra**
- `ongoing`
- `completed`
- `hiatus`
- `cancelled`

**Estado de publicación**
- `draft`
- `published`

Esto permite, por ejemplo:
Manhwa: `ongoing` + `published`
o:
Manhwa: `ongoing` + `draft`

El estado de publicación controla la visibilidad dentro de la plataforma.
El estado de la obra describe la situación de la obra.

---

## 18. Supabase Storage

Supabase Storage almacenará las imágenes.
Separación conceptual:

- `covers/`
- `chapters/`
- `avatars/`

**Covers**
Ejemplo:
`covers/solo-leveling.webp`

**Chapters**
Ejemplo:
```text
chapters/solo-leveling/chapter-001/001.webp
chapters/solo-leveling/chapter-001/002.webp
chapters/solo-leveling/chapter-001/003.webp
```

**Avatars**
Ejemplo:
`avatars/user-id/avatar.webp`

La base de datos almacenará la referencia al archivo mediante `storage_path`.
No almacenar imágenes binarias directamente en PostgreSQL.

---

## 19. Subida de archivos

Las subidas administrativas deben validar:
- Tipo MIME.
- Extensión.
- Tamaño.
- Nombre del archivo.

No permitir archivos ejecutables.
La aplicación debe evitar confiar únicamente en la extensión proporcionada por el navegador.
Las políticas de Storage deben impedir que usuarios no autorizados modifiquen archivos administrativos.

---

## 20. Eliminación de datos

Las reglas de eliminación deben definirse explícitamente durante la creación de las migraciones.
Cuando una entidad dependiente no tenga sentido sin su entidad padre, puede utilizarse eliminación en cascada de manera controlada.

Ejemplos posibles:
```text
manhwa
  |
  +---- chapters
           |
           +---- chapter_pages
```

La eliminación de un manhwa debe estudiarse cuidadosamente antes de utilizar `CASCADE`, especialmente porque implica eliminar capítulos y páginas asociadas.
Las eliminaciones destructivas de contenido publicado deben protegerse mediante permisos administrativos.

---

## 21. Migraciones

Todos los cambios estructurales de la base de datos deben representarse mediante migraciones.
Las migraciones deben poder reproducirse en otro entorno.
No depender de modificaciones manuales no documentadas.
Antes de ejecutar una migración destructiva debe existir una revisión explícita.

---

## 22. Datos de demostración

Durante el desarrollo se pueden utilizar datos de demostración.
Los datos de demostración deben utilizar contenido:
- Propio.
- De dominio público.
- Con licencia apropiada.
- Creado específicamente para pruebas.

No incluir contenido protegido por derechos de autor sin autorización.

---

## 23. Evolución futura

Podrían añadirse posteriormente:
- `comments`
- `ratings`
- `bookmarks`
- `notifications`
- `reports`

Estas entidades no forman parte de la primera versión.
No deben crearse tablas anticipadamente sin una funcionalidad que las necesite.

---

## 24. Regla para la implementación

Antes de crear las tablas definitivas:
- Revisar este documento.
- Crear las migraciones.
- Revisar las claves foráneas.
- Revisar las restricciones únicas.
- Revisar las políticas RLS.
- Revisar las políticas de Storage.
- Probar las operaciones de lector.
- Probar las operaciones administrativas.

No crear la base de datos definitiva únicamente a partir de suposiciones del frontend.