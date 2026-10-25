# Arquitectura de LexManhwa

## 1. Objetivo

LexManhwa es una aplicación web para descubrir, leer y administrar manhwas.

La arquitectura inicial está diseñada para ser:

- Sencilla.
- Mantenible.
- Segura.
- Económica.
- Adecuada para una aplicación de portafolio.
- Compatible con un equipo de desarrollo de recursos limitados.

No se utilizarán arquitecturas complejas mientras no exista una necesidad real.

---

## 2. Arquitectura general

```text
                         USUARIO
                            |
                            v
                    +---------------+
                    |    Netlify    |
                    | React + Vite  |
                    +-------+-------+
                            |
                +-----------+-----------+
                |           |           |
                v           v           v
             Supabase   Supabase    Supabase
               Auth     PostgreSQL   Storage
                |           |           |
                +-----------+-----------+
                            |
                            v
                         Imágenes
```

---

## 3. Frontend

El frontend utilizará:

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- React Router.

El frontend será responsable de:

- Mostrar la interfaz.
- Gestionar navegación.
- Gestionar interacciones.
- Gestionar formularios.
- Mostrar estados de carga.
- Mostrar errores.
- Gestionar la sesión del usuario.
- Consultar Supabase.
- Mostrar el lector de capítulos.

El frontend no debe contener secretos.

---

## 4. Supabase

Supabase será utilizado como plataforma backend administrada.

Se utilizarán sus siguientes servicios:

### Supabase Auth

Para:

- Registro.
- Inicio de sesión.
- Cierre de sesión.
- Sesiones.
- Gestión de usuarios autenticados.

### PostgreSQL

Para almacenar:

- Perfiles.
- Manhwas.
- Géneros.
- Capítulos.
- Páginas.
- Favoritos.
- Progreso de lectura.

### Supabase Storage

Para almacenar:

- Portadas.
- Páginas de capítulos.

### Row Level Security

Para controlar qué usuarios pueden:

- Leer datos.
- Crear datos.
- Modificar datos.
- Eliminar datos.

---

## 5. Netlify

Netlify se utilizará para desplegar el frontend.

Flujo:

```text
Desarrollador
      |
      v
     Git
      |
      v
   GitHub
      |
      v
   Netlify
      |
      v
Producción
```

Supabase funcionará como servicio externo para:

- Base de datos.
- Autenticación.
- Storage.

---

## 6. Estructura inicial del frontend

La estructura propuesta será:

```text
src/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── manhwa/
│   └── reader/
│
├── pages/
│   ├── home/
│   ├── browse/
│   ├── search/
│   ├── manhwa/
│   ├── reader/
│   ├── auth/
│   ├── profile/
│   └── admin/
│
├── features/
│   ├── auth/
│   ├── manhwa/
│   ├── reader/
│   ├── favorites/
│   └── progress/
│
├── hooks/
├── lib/
│   ├── supabase/
│   └── utils/
│
├── routes/
├── stores/
├── types/
├── App.tsx
└── main.tsx
```

Esta estructura podrá modificarse cuando aparezcan necesidades reales.

No crear carpetas solamente porque estén incluidas en esta documentación.

---

## 7. Áreas principales

### Área pública
- Inicio.
- Explorar.
- Búsqueda.
- Géneros.
- Detalles del manhwa.
- Lectura de capítulos.

### Área autenticada
- Perfil.
- Favoritos.
- Progreso de lectura.

### Área administrativa
- Panel administrativo.
- Gestión de manhwas.
- Gestión de capítulos.
- Gestión de imágenes.
- Publicación de contenido.

---

## 8. Separación de responsabilidades

La aplicación debe separar razonablemente:

```text
Interfaz
   |
   v
Componentes
   |
   v
Lógica de aplicación
   |
   v
Servicios
   |
   v
Supabase
```

Evitar colocar toda la lógica dentro de los componentes visuales.

---

## 9. Principios de arquitectura

Preferir:

- Simple > Complejo
- Claro > Mágico
- Reutilizable > Duplicado
- Seguro > Conveniente
- Mantenible > Sobrearquitecturado

---

## 10. Evolución

La arquitectura puede evolucionar cuando aparezcan nuevos requisitos.

No anticipar problemas que todavía no existen.

La complejidad debe justificarse por una necesidad real del proyecto.