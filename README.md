# LexManhwa

Demo comercial local de una aplicación web para descubrir, leer y administrar manhwas. Construida como portfolio listo para venta sin dependencias de backend real.

## Demo en vivo

**URL:** https://lex-manhwa.netlify.app/

**Credenciales admin (demo):**

- Email: `admin@demo.com`
- Contraseña: `demo1234`

## Stack técnico

- **Frontend:** React 19 + TypeScript + Vite 8
- **Estilos:** Tailwind CSS 3 (tema oscuro, responsive)
- **Routing:** React Router DOM 7
- **Estado:** Demo store en localStorage/IndexedDB (sin backend)
- **Calidad:** ESLint + TypeScript estricto + Prettier
- **Deploy:** Netlify (SPA redirects configurados)

## Qué incluye la demo

### Páginas públicas

- **Home** — Hero, banner demo, manhwas destacados, sección "Cómo funciona", footer con contacto
- **Explorar** — Grid responsive con filtros por género, búsqueda, paginación
- **Buscar** — Búsqueda en tiempo real con debounce, resultados tipados
- **Géneros** — Lista de géneros + detalle por género con grid de manhwas
- **Detalle manhwa** — Portada SVG local, sinopsis, géneros, estado, lista de capítulos publicados
- **Lector vertical** — Navegación teclado (← → ↑ ↓ Home End), progreso persistente, header/footer auto-ocultables, navegación entre capítulos
- **Login / Admin** — Login demo, panel admin con sidebar responsive, CRUD completo de manhwas/capítulos/páginas, subida de imágenes (base64 en demo)

### Funcionalidades core

- **Favoritos** — Toggle persistente (corazón en cards y detalle), vista filtrada en Explorar
- **Progreso de lectura** — Guarda página actual por capítulo, restaura al volver
- **Portadas SVG** — Generadas localmente (sin imágenes externas), colores por género
- **Datos demo** — 6 manhwas, ~30 capítulos, ~150 páginas precargadas en localStorage/IndexedDB
- **Responsive verificado** — Breakpoints: 375px / 768px / 1024px / 1440px+

### Panel admin (solo demo)

- Gestión de manhwas: crear/editar/eliminar, portada SVG automática
- Gestión de capítulos: orden, publicación, slug auto
- Gestión de páginas: subir múltiples imágenes (base64), reordenar, eliminar
- Persistencia en demo store (localStorage/IndexedDB)

## Cómo ejecutar localmente

```bash
# Instalar dependencias
npm install

# Desarrollo (hot reload)
npm run dev

# Build producción
npm run build

# Preview build local
npm run preview

# Lint (0 errors, 0 warnings)
npm run lint

# Formato
npm run format
```

Requisitos: Node 20+, npm 10+. 8 GB RAM suficiente.

## Cómo personalizar

### Cambiar manhwas y datos

Edita `src/data/manhwas.ts` y `src/data/chapters.ts`. Los IDs son UUIDs v4; los slugs se usan en URLs. Ejecuta `npm run build` para regenerar.

### Cambiar portadas

Las portadas son SVG generados en `src/lib/demo/images.ts` → `generateCoverSvg()`. Modifica la paleta por género o el generador de formas.

### Textos y copy

- UI: componentes en `src/components/`
- Páginas: `src/pages/`
- Metadatos: `index.html` (title, description, og:)

### Colores y tema

`tailwind.config.js` → `colors.ink`, `colors.primary`, `colors.surface`, etc. Tema oscuro por defecto.

## Cómo desplegar en Netlify / Vercel

### Netlify (recomendado, configurado)

1. Conecta el repo en Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. `netlify.toml` ya incluye redirects SPA
5. Deploy automático en push a `main`

### Vercel

1. Importa el repo
2. Framework preset: Vite
3. Build: `npm run build`, Output: `dist`
4. Agrega `vercel.json` con rewrites SPA si hace falta

### Variables de entorno

**No se requieren.** La demo es 100% local (localStorage/IndexedDB). `.env.example` está vacío por diseño.

## Limitaciones conocidas

- **Demo local / single-user** — Datos en localStorage/IndexedDB del navegador. No hay sincronización entre dispositivos ni usuarios reales.
- **Sin backend real** — No usa Supabase ni base de datos. `src/lib/supabase/` existe solo como referencia de arquitectura.
- **Auth simulada** — Login demo con credenciales hardcodeadas en `src/pages/auth/LoginPage.tsx`. No hay JWT, RLS ni sesiones reales.
- **Imágenes en base64** — Subida admin guarda imágenes como data URLs en demo store. No apto para producción (tamaño, rendimiento).
- **Sin tests automatizados** — Verificación manual en navegador. Ver sección de tests opcional abajo.
- **SEO básico** — SPA client-side only. Para SSR/SEO real migra a Next.js/Remix.
- **Accesibilidad** — Cumple AA básico (contraste, focus-visible, ARIA en lector). Pendiente auditoría completa.

## Próximos pasos / Roadmap técnico

| Prioridad | Item                                              | Esfuerzo    |
| --------- | ------------------------------------------------- | ----------- |
| Alta      | Backend real (Supabase/PostgreSQL + RLS)          | 2-3 semanas |
| Alta      | Auth real (Supabase Auth, magic link, OAuth)      | 1-2 semanas |
| Media     | Tests unitarios (Vitest + RTL) + E2E (Playwright) | 1 semana    |
| Media     | SSR/SEO (migración a Next.js 15 App Router)       | 2-3 semanas |
| Media     | CDN imágenes (Supabase Storage / Cloudinary / R2) | 1 semana    |
| Baja      | PWA (service worker, offline, install prompt)     | 1 semana    |
| Baja      | Internacionalización (i18n)                       | 1 semana    |
| Baja      | Analytics privacidad-first (Plausible / Umami)    | 2 días      |

## Licencia / Contacto

**Licencia:** MIT — Libre para uso comercial, modificar y distribuir. Ver `LICENSE` si existe.

**Contacto portfolio:** Carlos — [email/tu-contacto]

---

_Demo construida como ejercicio de arquitectura frontend moderna. Lista para mostrar a clientes/empleadores._
