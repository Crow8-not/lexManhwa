# Instrucciones de desarrollo para LexManhwa

## 1. Descripción del proyecto

LexManhwa es una aplicación web para descubrir, leer y administrar manhwas.

La aplicación tendrá dos tipos principales de usuarios:

- Lectores
- Administradores

Los lectores podrán:

- Explorar manhwas.
- Buscar manhwas.
- Filtrar por géneros.
- Consultar información de un manhwa.
- Leer capítulos.
- Guardar manhwas como favoritos.
- Registrar su progreso de lectura.

Los administradores podrán:

- Crear manhwas.
- Editar información de manhwas.
- Administrar capítulos.
- Subir portadas.
- Subir páginas de capítulos.
- Ordenar páginas.
- Publicar o retirar contenido.

El proyecto tiene como objetivo ser una aplicación de portafolio de calidad profesional que demuestre conocimientos de:

- Desarrollo frontend.
- TypeScript.
- Diseño de interfaces.
- Arquitectura de software.
- Bases de datos relacionales.
- Autenticación.
- Autorización.
- Almacenamiento de archivos.
- Seguridad.
- Responsive design.
- Accesibilidad.
- Testing.
- Git.
- Deployment.

---

## 2. Tecnologías principales

### Frontend

Utilizar:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend y servicios

Utilizar:

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

### Deployment

Utilizar:

- Netlify

### Control de versiones

Utilizar:

- Git
- GitHub

### Calidad del código

Utilizar:

- ESLint
- Prettier

### Testing

Utilizar:

- Vitest
- Playwright

No agregar dependencias adicionales sin una razón técnica clara.

Antes de instalar una nueva dependencia, explicar:

1. Qué problema resuelve.
2. Por qué las herramientas existentes no son suficientes.
3. Qué impacto tendrá sobre el proyecto.

---

## 3. Reglas generales

El proyecto debe utilizar TypeScript.

Utilizar tipado estricto.

Evitar `any`.

No desactivar reglas de TypeScript, ESLint o accesibilidad sin una razón documentada.

Preferir soluciones simples, claras y mantenibles.

No sobrearquitecturar el proyecto.

No introducir microservicios.

No introducir Docker salvo que sea solicitado explícitamente.

No introducir Redis salvo que exista una necesidad real documentada.

No introducir Elasticsearch salvo que exista una necesidad real documentada.

No introducir Kubernetes.

No crear infraestructura innecesaria.

Mantener la cantidad de dependencias razonablemente pequeña.

---

## 4. Reglas para el agente

Antes de modificar el proyecto:

1. Inspecciona la estructura actual.
2. Lee las instrucciones de este archivo.
3. Lee la documentación relacionada con la tarea.
4. Identifica los archivos que deben modificarse.
5. Explica brevemente qué vas a hacer.
6. Implementa únicamente la tarea solicitada.

No implementes funcionalidades futuras.

No modifiques archivos que no estén relacionados con la tarea.

No reescribas partes del proyecto que ya funcionan sin una razón.

No cambies la arquitectura sin explicar primero por qué.

No instales dependencias automáticamente sin informar primero.

No ejecutes migraciones destructivas sin confirmación explícita.

No elimines código existente sin justificarlo.

Si existe una decisión arquitectónica importante que no está definida, detente y solicita confirmación antes de tomarla.

---

## 5. React

Utilizar componentes funcionales.

Utilizar Hooks de React cuando corresponda.

Evitar componentes excesivamente grandes.

Dividir componentes cuando tengan demasiadas responsabilidades.

Preferir componentes reutilizables.

No duplicar lógica entre componentes.

Utilizar React Router para la navegación.

Utilizar HTML semántico.

Mantener la lógica de negocio separada de la presentación cuando sea razonable.

No colocar consultas complejas a la base de datos directamente dentro de componentes visuales grandes.

---

## 6. TypeScript

Todo el código de aplicación debe utilizar TypeScript.

Crear tipos explícitos para:

- Entidades de la base de datos.
- Propiedades de componentes.
- Datos de formularios.
- Respuestas de servicios.
- Estado de la aplicación.
- Parámetros importantes.

Evitar `any`.

Si una operación puede devolver `null` o `undefined`, manejar explícitamente esos casos.

No ignorar errores de TypeScript.

No utilizar conversiones de tipos únicamente para ocultar errores.

---

## 7. Estado de la aplicación

No utilizar estado global innecesariamente.

Preferir estado local cuando únicamente afecte a un componente o pequeña sección.

Utilizar Zustand únicamente cuando exista una necesidad real de compartir estado entre múltiples partes de la aplicación.

No utilizar Zustand para:

- Formularios simples.
- Estados locales.
- Estados que puedan manejarse directamente con React.

---

## 8. Supabase

Supabase será el servicio backend principal del proyecto.

Utilizar PostgreSQL para los datos estructurados.

Utilizar Supabase Auth para autenticación.

Utilizar Supabase Storage para imágenes.

Utilizar Row Level Security (RLS) para controlar el acceso a los datos.

El frontend nunca debe contener:

- Service role key.
- Contraseñas.
- Tokens privados.
- Credenciales privadas.
- Secretos de producción.

Las variables públicas necesarias para conectar el frontend con Supabase deben manejarse mediante variables de entorno.

---

## 9. Autenticación

El sistema tendrá inicialmente dos roles:

- `reader`
- `admin`

Los lectores no deben poder ejecutar operaciones administrativas.

Los administradores podrán gestionar el contenido autorizado.

La autenticación debe utilizar Supabase Auth.

Las rutas protegidas deben comprobar correctamente la sesión.

Debe existir un estado de carga mientras se determina la sesión.

Debe existir un estado apropiado para usuarios no autenticados.

---

## 10. Autorización

La seguridad no debe depender únicamente del frontend.

Ocultar un botón de administración no constituye una medida de seguridad.

Las operaciones administrativas deben estar protegidas mediante las reglas correspondientes en Supabase y PostgreSQL.

Las políticas de Row Level Security deben impedir que un lector ejecute directamente operaciones administrativas.

No confiar únicamente en información proporcionada por el cliente.

---

## 11. Base de datos

La base de datos debe utilizar PostgreSQL.

Las relaciones importantes deben utilizar claves foráneas.

Evitar duplicar información innecesariamente.

Utilizar índices cuando exista una necesidad basada en las consultas reales.

Los cambios de estructura deben quedar registrados mediante migraciones.

No realizar cambios manuales en producción sin registrar el cambio.

La documentación de `docs/database.md` debe mantenerse actualizada.

---

## 12. Almacenamiento de imágenes

Las imágenes de manhwas no deben almacenarse directamente como datos binarios dentro de PostgreSQL.

Utilizar Supabase Storage.

La base de datos debe almacenar la referencia o URL correspondiente.

Separar conceptualmente:

- Portadas.
- Páginas de capítulos.

Validar los archivos antes de subirlos.

Validar:

- Tipo MIME.
- Extensión.
- Tamaño.
- Nombre.
- Errores de subida.

No permitir archivos ejecutables.

---

## 13. Lector de manhwa

El lector es una de las funcionalidades principales del proyecto.

El modo inicial será lectura vertical.

Debe priorizar:

- Legibilidad.
- Velocidad.
- Navegación sencilla.
- Compatibilidad móvil.
- Compatibilidad con escritorio.
- Carga progresiva de imágenes.

No cargar innecesariamente todas las imágenes de un capítulo antes de que el usuario las necesite.

Utilizar lazy loading cuando corresponda.

El lector debe permitir:

- Ver las páginas.
- Ir al capítulo anterior.
- Ir al capítulo siguiente.
- Seleccionar capítulos.
- Volver a la información del manhwa.
- Registrar el progreso de lectura.

---

## 14. Responsive design

La aplicación debe ser responsive.

Diseñar con enfoque mobile-first.

La experiencia de lectura en dispositivos móviles es especialmente importante.

La aplicación debe funcionar correctamente en:

- Teléfonos.
- Tablets.
- Laptops.
- Monitores de escritorio.

No crear interfaces separadas innecesariamente para cada dispositivo.

Preferir CSS responsive y componentes adaptables.

---

## 15. Accesibilidad

Utilizar HTML semántico.

Los elementos interactivos deben poder utilizarse mediante teclado cuando corresponda.

Los botones deben tener nombres accesibles.

Los campos de formularios deben tener etiquetas.

Los estados de foco deben ser visibles.

No depender exclusivamente del color para comunicar información.

Las imágenes deben tener texto alternativo cuando corresponda.

No utilizar iconos como único medio para comunicar una acción importante sin una etiqueta accesible.

---

## 16. Manejo de errores

No ignorar errores silenciosamente.

Los errores deben manejarse de forma controlada.

No mostrar al usuario errores internos sensibles de PostgreSQL o Supabase.

Crear estados adecuados para:

- Error de red.
- Error de autenticación.
- Error de base de datos.
- Error de subida.
- Contenido inexistente.
- Ruta inexistente.
- Falta de permisos.

Los mensajes mostrados al usuario deben ser claros y comprensibles.

---

## 17. Estados de carga

Las operaciones que requieran tiempo deben mostrar estados de carga adecuados.

Esto incluye:

- Carga de manhwas.
- Búsquedas.
- Detalles.
- Capítulos.
- Imágenes.
- Inicio de sesión.
- Subidas de archivos.

Utilizar skeleton loaders cuando aporten una mejora real a la experiencia.

---

## 18. Estados vacíos

La interfaz debe manejar correctamente situaciones donde no exista contenido.

Ejemplos:

- No existen resultados de búsqueda.
- No existen favoritos.
- No existen capítulos.
- No existe historial.
- No existen manhwas.

Mostrar mensajes útiles y no simplemente una pantalla vacía.

---

## 19. Seguridad

Nunca guardar secretos dentro del repositorio.

Nunca subir a Git:

- `.env`
- Contraseñas.
- Service role keys.
- Tokens privados.
- Credenciales.
- Secretos de producción.

Mantener un archivo:

`.env.example`

sin secretos reales.

Validar entradas del usuario.

Validar archivos subidos.

Utilizar Row Level Security.

No confiar en validaciones realizadas únicamente por JavaScript del navegador.

---

## 20. Contenido

La aplicación debe utilizar contenido que el proyecto tenga permiso para alojar y distribuir.

Durante el desarrollo utilizar:

- Contenido propio.
- Contenido de dominio público.
- Contenido con licencia adecuada.
- Contenido de demostración.

No asumir que cualquier manhwa disponible en Internet puede ser copiado, almacenado o distribuido.

---

## 21. ESLint y Prettier

Utilizar ESLint para detectar problemas de código.

Utilizar Prettier para mantener un formato consistente.

No desactivar reglas únicamente para evitar errores.

Si una regla debe desactivarse, documentar la razón.

Antes de considerar terminada una funcionalidad:

1. Ejecutar comprobaciones de TypeScript.
2. Ejecutar ESLint.
3. Ejecutar las pruebas correspondientes.
4. Revisar visualmente la funcionalidad.

---

## 22. Git

Utilizar commits pequeños y relacionados con una sola tarea.

Ejemplos:

```text
feat: crear catálogo de manhwas
feat: agregar lector de capítulos
fix: proteger subida de capítulos
refactor: extraer componente ManhwaCard
docs: actualizar arquitectura
```

No mezclar cambios no relacionados dentro del mismo commit.

No realizar commits gigantes con muchas funcionalidades independientes.

---

## 23. Documentación

La documentación principal está ubicada en:

```text
docs/
├── architecture.md
├── database.md
├── roadmap.md
├── security.md
└── ui.md
```

Antes de implementar una funcionalidad, consultar la documentación relacionada.

Si una implementación contradice la documentación:

1. Identificar el conflicto.
2. Explicarlo.
3. Solicitar una decisión antes de cambiar la arquitectura.

Cuando una decisión importante cambie, actualizar la documentación correspondiente.

---

## 24. Alcance inicial

El proyecto inicial no debe incluir:

- Microservicios.
- Aplicación móvil nativa.
- Chat.
- Sistema de recomendaciones mediante IA.
- Sistema social complejo.
- Pagos.
- Cryptocurrency.
- Redis.
- Elasticsearch.
- Kubernetes.
- Infraestructura innecesaria.

Estas funcionalidades únicamente podrán agregarse si se convierten posteriormente en requisitos explícitos.

---

## 25. Definición de terminado

Una funcionalidad no se considera terminada solamente porque compile.

Debe:

- Cumplir el requisito solicitado.
- Utilizar TypeScript correctamente.
- Respetar la arquitectura.
- Respetar las reglas de seguridad.
- Manejar errores.
- Funcionar correctamente en dispositivos móviles.
- Respetar principios básicos de accesibilidad.
- Pasar las comprobaciones correspondientes.
- Evitar dependencias innecesarias.
- Actualizar la documentación cuando sea necesario.

---

## 26. Regla principal para Copilot Agent

No intentes construir todo LexManhwa de una sola vez.

Trabaja por tareas pequeñas y verificables.

No avances automáticamente hacia funcionalidades futuras.

Implementa únicamente la tarea solicitada.

1. Primero comprende el proyecto.
2. Después propone.
3. Después implementa.
4. Después verifica.
5. Después informa de los cambios realizados.
