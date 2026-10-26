# Diseño de interfaz de LexManhwa

## 1. Objetivo visual

LexManhwa debe sentirse como una plataforma moderna para descubrir y leer manhwas.

La interfaz puede tomar inspiración general de plataformas modernas de lectura, pero no debe copiar:

- Branding.
- Logos.
- Imágenes.
- Textos.
- Código.
- Identidad visual exacta.
- Diseño exacto de otra plataforma.

La aplicación debe desarrollar su propia identidad visual.

El diseño debe priorizar la experiencia de descubrimiento y lectura sin introducir elementos visuales innecesarios.

---

## 2. Principios de diseño

Priorizar:

- Legibilidad.
- Simplicidad.
- Jerarquía visual.
- Navegación rápida.
- Responsive design.
- Accesibilidad.
- Rendimiento.
- Comodidad durante la lectura.
- Consistencia visual.

Los componentes deben mantener comportamientos y estilos coherentes en toda la aplicación.

---

## 3. Navegación

En escritorio se propone inicialmente:

```text
[LOGO]   Inicio   Explorar   Géneros   Últimos

                              Buscar   Perfil
```

En móvil:

```text
[LOGO]                         [Buscar] [Menú]
```

La navegación debe mantenerse sencilla.
Las opciones administrativas solo deben aparecer para usuarios con permisos administrativos.
La navegación visual no constituye una medida de seguridad. Las operaciones sensibles deben estar protegidas mediante autorización en backend/RLS.

---

## 4. Página de inicio

La página de inicio puede contener:

```text
Hero / Destacados
        ↓
Últimas actualizaciones
        ↓
Populares
        ↓
Añadidos recientemente
        ↓
Géneros
```

El orden definitivo podrá cambiar durante la implementación.
La página debe priorizar contenido publicado.
Los contenidos en estado `draft` no deben mostrarse a usuarios públicos.

---

## 5. Tarjeta de manhwa

Una tarjeta puede mostrar:

- Portada.
- Título.
- Último capítulo publicado.
- Estado.
- Géneros importantes.

Ejemplo:

```text
┌─────────────────┐
│                 │
│                 │
│     PORTADA     │
│                 │
│                 │
├─────────────────┤
│ Título          │
│ Capítulo 24     │
│ En publicación  │
└─────────────────┘
```

La tarjeta debe ser reutilizable en:

- Página de inicio.
- Exploración.
- Búsqueda.
- Géneros.
- Secciones de contenido.

Debe existir una versión responsive.
El contenido de la tarjeta debe evitar desbordamientos cuando los títulos sean largos.

---

## 6. Página de detalles

Propuesta inicial:

```text
┌────────────┬──────────────────────────────┐
│            │ Título                       │
│            │                              │
│   PORTADA  │ Autor                        │
│            │ Artista                      │
│            │ Estado                       │
│            │ Géneros                      │
│            │                              │
│            │ Descripción                  │
│            │                              │
│            │ [Leer primero] [Último]      │
└────────────┴──────────────────────────────┘

Capítulos
─────────────────────────────────────────────

Capítulo 25
Capítulo 24
Capítulo 23
Capítulo 22
```

La página debe permitir:

- Ver información del manhwa.
- Ver géneros.
- Ver estado.
- Ver descripción.
- Ver capítulos publicados.
- Acceder al lector.
- Agregar o eliminar favoritos cuando el usuario esté autenticado.

Los capítulos no publicados no deben mostrarse a lectores públicos.

---

## 7. Lector

El lector es una funcionalidad principal.
El modo inicial será vertical:

```text
Navegación del capítulo

        ↓

      PÁGINA 1

        ↓

      PÁGINA 2

        ↓

      PÁGINA 3

        ↓

      PÁGINA 4

        ↓

Navegación del capítulo
```

Las páginas deben estar centradas.
La interfaz debe interferir lo mínimo posible con la lectura.
Las imágenes deben conservar una proporción adecuada y no deformarse.
El lector debe priorizar la carga progresiva de páginas.

---

## 8. Controles del lector

Los controles iniciales pueden incluir:

- Capítulo anterior.
- Capítulo siguiente.
- Selector de capítulo.
- Volver a detalles.
- Indicador de progreso.

Los controles deben ser accesibles sin ocupar innecesariamente el área de lectura.
Los controles pueden mantenerse visibles mediante una interfaz compacta cuando sea útil, especialmente en móvil.
Los controles deben incluir etiquetas accesibles cuando un icono por sí solo no comunique claramente la acción.

---

## 9. Responsive design

La interfaz debe adaptarse a:

- Móviles.
- Tablets.
- Laptops.
- Monitores de escritorio.

La lectura móvil es especialmente importante.
No crear diseños completamente separados para cada dispositivo salvo que sea necesario.
Utilizar un diseño responsive basado en componentes reutilizables y breakpoints coherentes.

Debe comprobarse como mínimo:

- Navegación.
- Catálogo.
- Tarjetas.
- Página de detalles.
- Formularios.
- Panel administrativo.
- Lector.

---

## 10. Accesibilidad

Utilizar:

- HTML semántico.
- Navegación mediante teclado.
- Estados de foco visibles.
- Etiquetas accesibles.
- Contraste adecuado.
- Texto alternativo cuando corresponda.
- Botones semánticos.
- Formularios correctamente etiquetados.

Los iconos no deben ser el único medio de comunicación de una acción importante.
Los elementos interactivos deben tener estados visuales claros:

- Normal.
- Hover.
- Focus.
- Active.
- Disabled.
- Loading.
- Error cuando corresponda.

---

## 11. Estados de carga

Crear estados de carga para:

- Catálogo.
- Búsquedas.
- Detalles.
- Capítulos.
- Imágenes.
- Autenticación.
- Subidas.
- Operaciones administrativas.

Los skeleton loaders pueden utilizarse cuando aporten valor.
El usuario debe recibir una indicación visual cuando una operación tarde más de lo esperado.
Evitar bloqueos visuales innecesarios durante operaciones pequeñas.

---

## 12. Estados vacíos

La aplicación debe informar claramente cuando no existe contenido.
Ejemplos:

- No encontramos manhwas que coincidan con tu búsqueda.
- Todavía no tienes manhwas favoritos.
- Este manhwa todavía no tiene capítulos publicados.
- No hay resultados para este género.
- Todavía no existen manhwas publicados.

Los estados vacíos deben explicar qué ocurre y, cuando sea útil, proporcionar una acción para continuar.

---

## 13. Estados de error

Los errores deben comunicarse de forma clara.
Evitar mostrar mensajes técnicos como:

`PostgrestError 23505`

Mostrar mensajes orientados al usuario.
Ejemplo:

```text
No pudimos cargar los capítulos.
[Intentar nuevamente]
```

Los detalles técnicos deben permanecer en los registros apropiados para desarrollo y diagnóstico.

---

## 14. Componentes reutilizables

Crear componentes reutilizables para:

- Button.
- Input.
- Card.
- Badge.
- Modal.
- Dropdown.
- Loading indicator.
- Toast.
- Pagination.
- Empty state.
- Error state.
- Chapter item.
- Manhwa card.

No crear múltiples versiones visuales del mismo componente sin una razón.
Cuando existan variantes, deben definirse mediante propiedades o variantes claramente documentadas.

---

## 15. Tema visual

El diseño inicial utilizará una interfaz orientada a un tema oscuro.
La paleta definitiva se establecerá durante la implementación.
No repetir colores arbitrariamente por todo el código.
Utilizar variables o tokens de diseño cuando resulte apropiado.
Los colores principales, fondos, superficies, texto, bordes y estados deben mantenerse centralizados.
La interfaz debe conservar suficiente contraste para facilitar la lectura.

---

## 16. Tipografía

La tipografía debe priorizar:

- Legibilidad.
- Buena visualización en pantallas pequeñas.
- Jerarquía clara.
- Diferenciación entre títulos, texto y metadatos.
- Evitar utilizar demasiadas familias tipográficas.

La escala tipográfica debe mantenerse consistente mediante tokens o estilos reutilizables.

---

## 17. Espaciado y layout

Utilizar un sistema de espaciado coherente.
Evitar definir valores arbitrarios diferentes para elementos equivalentes.
Las páginas deben utilizar contenedores con anchos máximos razonables para evitar líneas de texto excesivamente largas.
El layout debe adaptarse progresivamente al tamaño de pantalla.

---

## 18. Formularios

Los formularios deben:

- Utilizar etiquetas claras.
- Mostrar campos obligatorios.
- Validar datos.
- Mostrar errores junto al campo correspondiente.
- Mantener los datos introducidos cuando ocurra un error.
- Mostrar estados de carga durante el envío.
- Evitar múltiples envíos accidentales.

Los formularios administrativos deben ser claros y priorizar la prevención de errores.

---

## 19. Panel administrativo

El panel administrativo tendrá una interfaz diferente del lector, pero deberá mantener el mismo sistema visual general.

Debe permitir gestionar:

- Manhwas.
- Portadas.
- Géneros.
- Capítulos.
- Páginas.
- Publicación de contenido.

Las acciones destructivas o importantes deben solicitar confirmación cuando corresponda.
La interfaz administrativa solo debe estar disponible para usuarios autorizados.
Ocultar un botón administrativo no sustituye la protección mediante autorización y RLS.

---

## 20. Favoritos y progreso

Los usuarios autenticados deben poder:

- Agregar manhwas a favoritos.
- Eliminar manhwas de favoritos.
- Continuar leyendo desde su progreso guardado.

La interfaz debe mostrar claramente el estado actual.
Ejemplos:

`♡ Agregar a favoritos`

y:

`♥ En favoritos`

El progreso de lectura debe ser presentado de forma sencilla y no interferir con la lectura.

---

## 21. Rendimiento visual

Las imágenes de los manhwas pueden ser grandes.
La interfaz debe considerar:

- Lazy loading.
- Imágenes responsive.
- Compresión.
- Tamaños apropiados.
- Carga progresiva.
- Dimensiones conocidas cuando sea posible.

Evitar descargar imágenes que todavía no sean necesarias.
El lector no debe descargar innecesariamente todo el contenido antes de comenzar la lectura.

---

## 22. Imágenes

Las imágenes deben utilizar elementos y atributos apropiados para:

- Dimensiones.
- Texto alternativo.
- Carga diferida.
- Responsive design.

Las portadas deben tener una presentación consistente.
Las páginas del lector deben priorizar la visualización correcta de la imagen sobre efectos visuales innecesarios.

---

## 23. Feedback de acciones

Las acciones importantes deben proporcionar feedback.
Ejemplos:

- `Manhwa agregado a favoritos.`
- `Capítulo publicado correctamente.`
- `Portada subida correctamente.`
- `No se pudo guardar el capítulo.`

Utilizar Toast, mensajes inline u otros componentes apropiados según el contexto.

---

## 24. Confirmaciones

Solicitar confirmación antes de operaciones potencialmente destructivas cuando sea apropiado.
Ejemplos:

- Eliminar un manhwa.
- Eliminar un capítulo.
- Eliminar páginas.
- Retirar contenido publicado.

La confirmación debe explicar claramente qué acción se realizará.

---

## 25. Arquitectura visual

Los componentes visuales deben estar separados de la lógica de negocio cuando sea razonable.

Evitar colocar lógica compleja de:

- Supabase.
- Autenticación.
- Consultas.
- Autorización.
- Gestión de archivos.
  directamente dentro de componentes visuales pequeños.

El sistema visual debe facilitar la reutilización y el mantenimiento.

---

## 26. Regla para Copilot Agent

Antes de crear componentes visuales importantes, Copilot Agent debe revisar:

- `docs/ui.md`
- `docs/architecture.md`
- `docs/database.md`
- `docs/security.md`
- `docs/roadmap.md`

Debe respetar:

- El sistema visual definido.
- El responsive design.
- La accesibilidad.
- Los estados de carga.
- Los estados vacíos.
- Los estados de error.
- La separación entre interfaz y autorización.
- La estructura de componentes definida por la arquitectura.

No debe introducir una nueva librería de UI, sistema de diseño o framework adicional sin justificar primero la necesidad.
No debe copiar directamente el diseño de otra plataforma.
Los cambios importantes en la interfaz deben mantener coherencia con el sistema visual existente.
