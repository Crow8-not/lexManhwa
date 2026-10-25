# LexManhwa

Aplicación web para descubrir, leer y administrar manhwas.

## Descripción técnica

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth + Storage)
- Diseño: tema oscuro responsive, lectura vertical
- Seguridad: Row Level Security (RLS), roles reader/admin

## Arquitectura

Ver `docs/architecture.md`, `docs/database.md`, `docs/ui.md`, `docs/security.md`.

## Deploy

- Netlify: https://chic-kulfi-dac72a.netlify.app/
- Configurado con `netlify.toml` (build: `npm run build`, redirect SPA)

## Fases del proyecto

Ver `docs/roadmap.md`. Actualmente: Fases 0-12 completas; Fase 13 (documentación y portfolio) en curso.

## Decisiones arquitectónicas

- Arquitectura simple y mantenible (no sobrearquitecturada)
- Separación visual/lógica (`docs/ui.md`)
- Seguridad aplicada en backend (RLS) no solo frontend (`docs/security.md`)
- Datos temporales para desarrollo (`src/data/manhwas.ts`)

## Limitaciones actuales

- Datos de prueba (no conectados a Supabase real)
- Autenticación básica (falta flujo completo con RLS en producción)
- Lector básico (falta navegación entre capítulos y progreso)
- Panel administrativo en construcción

## Mejoras futuras

- Migraciones de base de datos definitivas
- Conexión real con Supabase
- Pruebas end-to-end (Playwright)
- Optimización de imágenes y lazy loading
- Capturas de pantalla y demo de lectura

## Configuración

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Seguridad

- `.env` protegido (`.gitignore`)
- `.env.example` sin credenciales reales
- No hay `secret key` en frontend (`docs/security.md`)
