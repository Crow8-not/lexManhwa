# Hoja de ruta de LexManhwa

## Objetivo

Construir LexManhwa de forma incremental, manteniendo una arquitectura simple, segura y adecuada para un proyecto de portafolio.

El proyecto debe avanzar por fases y no se debe comenzar una fase importante sin haber completado las decisiones necesarias de la fase anterior.

---

## Fase 0 — Preparación y documentación

- [ ] Revisar documentación general.
- [ ] Revisar arquitectura.
- [ ] Revisar estructura de base de datos.
- [ ] Revisar seguridad.
- [ ] Revisar diseño de interfaz.
- [ ] Revisar hoja de ruta.
- [ ] Confirmar alcance inicial del proyecto.
- [ ] Confirmar tecnologías principales.
- [ ] Confirmar estructura inicial del repositorio.
- [ ] Configurar Git.
- [ ] Crear repositorio en GitHub.

### Resultado esperado
La arquitectura, base de datos, seguridad, interfaz y alcance inicial deben estar suficientemente definidos antes de comenzar el desarrollo de la aplicación.

---

## Fase 1 — Fundación del proyecto

- [ ] Crear proyecto React.
- [ ] Configurar Vite.
- [ ] Configurar TypeScript.
- [ ] Configurar Tailwind CSS.
- [ ] Configurar ESLint.
- [ ] Configurar Prettier.
- [ ] Crear estructura inicial de carpetas.
- [ ] Configurar variables de entorno.
- [ ] Crear `.env.example`.
- [ ] Crear `.gitignore`.
- [ ] Crear README inicial.
- [ ] Crear configuración inicial de Git.
- [ ] Crear primer commit.
- [ ] Verificar que el proyecto se ejecuta correctamente.

### Resultado esperado
La aplicación debe iniciar localmente y contar con una base técnica funcional para comenzar el desarrollo de la interfaz.

---

## Fase 2 — Sistema visual

- [ ] Crear layout principal.
- [ ] Crear Navbar.
- [ ] Crear Footer.
- [ ] Crear sistema de botones.
- [ ] Crear inputs.
- [ ] Crear tarjetas.
- [ ] Crear badges.
- [ ] Crear estados de carga.
- [ ] Crear estados vacíos.
- [ ] Crear estados de error.
- [ ] Definir tipografía.
- [ ] Definir espaciado.
- [ ] Definir bordes y radios.
- [ ] Definir tema visual.
- [ ] Crear componentes reutilizables.
- [ ] Comprobar responsive design.

### Resultado esperado
La aplicación debe contar con un sistema visual coherente y componentes reutilizables antes de construir las páginas principales.

---

## Fase 3 — Catálogo y navegación

- [ ] Crear página de inicio.
- [ ] Crear tarjetas de manhwa.
- [ ] Crear sección de últimas actualizaciones.
- [ ] Crear sección de populares.
- [ ] Crear página de exploración.
- [ ] Crear filtros.
- [ ] Crear búsqueda.
- [ ] Crear página de géneros.
- [ ] Crear página de detalles del manhwa.
- [ ] Crear navegación entre páginas.
- [ ] Crear estados de carga.
- [ ] Crear estados vacíos.
- [ ] Crear estados de error.
- [ ] Comprobar responsive design.

### Resultado esperado
La aplicación debe permitir navegar por un catálogo utilizando datos temporales o de prueba, sin depender todavía de toda la infraestructura de Supabase.

---

## Fase 4 — Supabase y base de datos

- [ ] Crear proyecto Supabase.
- [ ] Configurar PostgreSQL.
- [ ] Crear migraciones.
- [ ] Crear tablas.
- [ ] Crear relaciones.
- [ ] Crear claves foráneas.
- [ ] Crear restricciones de integridad.
- [ ] Crear índices necesarios.
- [ ] Configurar Row Level Security.
- [ ] Crear políticas RLS.
- [ ] Configurar Supabase Storage.
- [ ] Crear buckets.
- [ ] Configurar políticas de Storage.
- [ ] Conectar frontend con Supabase.
- [ ] Verificar consultas básicas.
- [ ] Verificar permisos básicos.

### Resultado esperado
La base de datos y Storage deben estar conectados al proyecto y protegidos mediante las reglas definidas en `docs/database.md` y `docs/security.md`.

---

## Fase 5 — Autenticación y autorización

- [ ] Configurar Supabase Auth.
- [ ] Crear registro.
- [ ] Crear inicio de sesión.
- [ ] Crear cierre de sesión.
- [ ] Implementar manejo de sesión.
- [ ] Manejar estados de autenticación.
- [ ] Crear rutas protegidas.
- [ ] Crear perfil de usuario.
- [ ] Implementar roles.
- [ ] Proteger operaciones administrativas.
- [ ] Probar acceso como usuario no autenticado.
- [ ] Probar acceso como reader.
- [ ] Probar acceso como admin.
- [ ] Probar que un reader no puede elevar sus privilegios.

### Resultado esperado
Los usuarios deben poder autenticarse y las operaciones sensibles deben estar protegidas mediante autorización real, no solamente mediante controles de interfaz.

---

## Fase 6 — Sistema de manhwas

- [ ] Crear manhwa.
- [ ] Editar manhwa.
- [ ] Mostrar información del manhwa.
- [ ] Mostrar géneros.
- [ ] Mostrar capítulos.
- [ ] Agregar favoritos.
- [ ] Eliminar favoritos.
- [ ] Mostrar últimos capítulos.
- [ ] Mostrar estado de publicación.
- [ ] Conectar catálogo con datos reales de Supabase.
- [ ] Probar permisos de las operaciones.

### Resultado esperado
El catálogo debe funcionar utilizando datos reales de Supabase y respetar las reglas de publicación y autorización.

---

## Fase 7 — Lector

- [ ] Crear ruta del lector.
- [ ] Cargar capítulo.
- [ ] Cargar páginas.
- [ ] Implementar lectura vertical.
- [ ] Implementar navegación.
- [ ] Implementar capítulo anterior.
- [ ] Implementar capítulo siguiente.
- [ ] Crear selector de capítulos.
- [ ] Registrar progreso.
- [ ] Recuperar progreso.
- [ ] Implementar lazy loading de imágenes.
- [ ] Manejar errores de carga.
- [ ] Manejar capítulos inexistentes.
- [ ] Probar lector en escritorio.
- [ ] Probar lector en móvil.

### Resultado esperado
El usuario debe poder abrir un capítulo, leer sus páginas, navegar entre capítulos y conservar su progreso.

---

## Fase 8 — Administración

- [ ] Crear panel administrativo.
- [ ] Crear gestión de manhwas.
- [ ] Crear formulario de manhwa.
- [ ] Subir portada.
- [ ] Crear capítulos.
- [ ] Editar capítulos.
- [ ] Subir páginas.
- [ ] Ordenar páginas.
- [ ] Validar archivos.
- [ ] Publicar capítulos.
- [ ] Retirar capítulos.
- [ ] Gestionar estado de publicación.
- [ ] Proteger todas las operaciones administrativas.
- [ ] Probar operaciones con una cuenta reader.
- [ ] Probar operaciones con una cuenta admin.

### Resultado esperado
Un usuario con rol admin debe poder gestionar contenido autorizado sin que un reader pueda ejecutar esas operaciones directamente mediante la API.

---

## Fase 9 — Testing

- [ ] Configurar Vitest.
- [ ] Crear pruebas unitarias.
- [ ] Crear pruebas de componentes.
- [ ] Probar autenticación.
- [ ] Probar perfiles.
- [ ] Probar favoritos.
- [ ] Probar progreso.
- [ ] Probar catálogo.
- [ ] Probar lector.
- [ ] Probar validaciones.
- [ ] Configurar Playwright.
- [ ] Crear pruebas end-to-end.
- [ ] Probar registro e inicio de sesión.
- [ ] Probar navegación principal.
- [ ] Probar lectura de un capítulo.
- [ ] Probar flujo administrativo.
- [ ] Probar restricciones de permisos.

### Resultado esperado
Los flujos principales de LexManhwa deben poder probarse automáticamente y los errores importantes deben estar identificados antes del deployment.

---

## Fase 10 — Seguridad y auditoría

- [ ] Revisar Row Level Security.
- [ ] Revisar políticas de Storage.
- [ ] Revisar políticas administrativas.
- [ ] Revisar autenticación.
- [ ] Revisar autorización.
- [ ] Revisar protección de perfiles.
- [ ] Revisar protección de favoritos.
- [ ] Revisar protección del progreso.
- [ ] Revisar publicación de contenido.
- [ ] Revisar validación de archivos.
- [ ] Revisar límites de archivos.
- [ ] Revisar variables de entorno.
- [ ] Revisar secretos.
- [ ] Revisar `.gitignore`.
- [ ] Revisar dependencias.
- [ ] Realizar pruebas de permisos.
- [ ] Verificar que ningún secreto esté incluido en el frontend.
- [ ] Verificar que ningún usuario pueda modificar su propio rol.
- [ ] Verificar que los drafts no sean accesibles públicamente.

### Resultado esperado
La aplicación debe cumplir las reglas de seguridad definidas en `docs/security.md` antes de considerarse lista para producción.

---

## Fase 11 — Rendimiento y experiencia

- [ ] Optimizar imágenes.
- [ ] Implementar lazy loading.
- [ ] Revisar tamaño del bundle.
- [ ] Revisar carga inicial.
- [ ] Reducir consultas innecesarias.
- [ ] Revisar consultas de catálogo.
- [ ] Revisar carga de capítulos.
- [ ] Revisar carga de imágenes.
- [ ] Revisar Lighthouse.
- [ ] Revisar experiencia móvil.
- [ ] Revisar estados de carga.
- [ ] Revisar errores de red.

### Resultado esperado
La aplicación debe ofrecer una experiencia razonable en dispositivos de escritorio y móviles, especialmente durante la carga de imágenes y capítulos.

---

## Fase 12 — Deployment

- [ ] Preparar repositorio GitHub.
- [ ] Crear proyecto Netlify.
- [ ] Configurar build de producción.
- [ ] Configurar variables de entorno.
- [ ] Configurar Supabase de producción.
- [ ] Configurar Storage de producción.
- [ ] Configurar RLS de producción.
- [ ] Revisar configuración de autenticación.
- [ ] Realizar primer deployment.
- [ ] Probar aplicación en producción.
- [ ] Probar autenticación en producción.
- [ ] Probar lectura en producción.
- [ ] Probar operaciones administrativas en producción.
- [ ] Corregir errores de producción.
- [ ] Realizar deployment estable.

### Resultado esperado
LexManhwa debe estar disponible mediante una URL pública y funcionar correctamente con la configuración de producción.

---

## Fase 13 — Portafolio y documentación final

- [ ] Crear README profesional.
- [ ] Documentar arquitectura.
- [ ] Documentar base de datos.
- [ ] Documentar seguridad.
- [ ] Agregar capturas de pantalla.
- [ ] Agregar enlace de producción.
- [ ] Agregar descripción técnica.
- [ ] Documentar decisiones arquitectónicas.
- [ ] Documentar problemas encontrados.
- [ ] Documentar soluciones.
- [ ] Documentar limitaciones.
- [ ] Documentar mejoras futuras.
- [ ] Revisar estructura final del repositorio.
- [ ] Revisar historial de commits.
- [ ] Verificar que no existan secretos en GitHub.

### Resultado esperado
El proyecto debe quedar presentado como un proyecto de portafolio completo, con código, documentación, aplicación desplegada y explicación de las principales decisiones técnicas.

---

## Orden de implementación

El proyecto debe avanzar aproximadamente en este orden:

```text
Documentación
      ↓
Git + GitHub
      ↓
React + Vite + TypeScript
      ↓
Tailwind CSS
      ↓
Sistema visual
      ↓
Catálogo con datos temporales
      ↓
Supabase + PostgreSQL + Storage
      ↓
RLS + autorización
      ↓
Autenticación
      ↓
Manhwas
      ↓
Lector
      ↓
Administración
      ↓
Testing
      ↓
Auditoría de seguridad
      ↓
Optimización
      ↓
Netlify
      ↓
Portafolio
```

## Regla general de implementación

Cada fase debe completarse de forma funcional antes de avanzar a la siguiente fase importante.

Las decisiones arquitectónicas y de seguridad deben seguir los documentos:
- `docs/architecture.md`
- `docs/database.md`
- `docs/security.md`
- `docs/ui.md`
- `docs/roadmap.md`

Copilot Agent debe consultar estos documentos antes de realizar cambios importantes en la arquitectura, base de datos, autenticación, autorización o estructura del proyecto.

No se deben introducir tecnologías o servicios innecesarios para el alcance inicial de LexManhwa.

El proyecto debe priorizar:
- Simplicidad
- Mantenibilidad
- Seguridad
- Rendimiento razonable
- Responsive design
- Código reutilizable
- Documentación clara
- Facilidad de despliegue

Las funcionalidades futuras que no sean necesarias para la primera versión deben permanecer fuera del alcance inicial.