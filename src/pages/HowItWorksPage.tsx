import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'

function HowItWorksPage() {
  return (
    <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-content space-y-12">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            Para compradores
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Cómo funciona LexManhwa
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Una guía rápida para entender el funcionamiento de la demo y cómo
            adaptarla a tu proyecto.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-primary-400">01</span>
              Qué es LexManhwa
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              LexManhwa es una aplicación web ligera para leer manhwas, mangas o
              cómics en formato vertical. Está diseñada para funcionar
              completamente en el navegador sin necesidad de backend, usando
              localStorage e IndexedDB para persistencia.
            </p>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-primary-400">02</span>
              Panel de administración
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Accede en{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                /admin/login
              </code>
              (credenciales demo:{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                demo / demo
              </code>
              ). Desde ahí puedes crear manhwas, añadir capítulos y subir
              imágenes que se almacenan en IndexedDB.
            </p>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-primary-400">03</span>
              Lector optimizado
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              El lector usa scroll vertical nativo con navegación por teclado
              (flechas, Home, End), guardado automático de progreso y barra de
              progreso visual. Funciona offline tras la primera carga.
            </p>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-primary-400">04</span>
              Personalización visual
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              El sistema de colores usa variables CSS y Tailwind. Cambia la
              paleta en{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                tailwind.config.ts
              </code>
              y los gradientes de portada en
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                src/components/manhwa/ManhwaCover.tsx
              </code>
              .
            </p>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-primary-400">05</span>
              Portadas generadas
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Las portadas son SVG generados localmente (sin dependencias
              externas). La función
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                generateCoverSVG
              </code>
              en{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                src/lib/utils/cover.ts
              </code>
              crea data URIs deterministas según título y variante.
            </p>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-primary-400">06</span>
              Despliegue y datos
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Compila con{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                npm run build
              </code>
              y sirve la carpeta{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                dist/
              </code>
              en cualquier hosting estático (Netlify, Vercel, Cloudflare Pages,
              GitHub Pages). Los datos de demo persisten por navegador; para
              producción conecta Supabase o tu API preferida.
            </p>
          </Card>
        </div>

        <Card className="p-5 sm:p-6 border-t-2 border-primary-500/30">
          <h2 className="text-lg font-semibold text-white">
            Próximos pasos sugeridos
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex gap-3">
              <span className="shrink-0 text-primary-400">→</span>
              Reemplazar el store demo por Supabase/PostgreSQL usando los tipos
              existentes en{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                src/types/manhwa.ts
              </code>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-primary-400">→</span>
              Añadir autenticación real (email/password, OAuth) con
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                src/features/auth/
              </code>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-primary-400">→</span>
              Implementar búsqueda full-text (Meilisearch, Typesense, o PG
              tsvector) en la ruta{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                /buscar
              </code>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-primary-400">→</span>
              Añadir PWA (service worker, manifest) para instalación y lectura
              offline completa
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-primary-400">→</span>
              Internacionalización (i18n) con{' '}
              <code className="bg-elevated px-1.5 py-0.5 rounded text-primary-300 font-mono text-xs">
                react-i18next
              </code>
              o similar
            </li>
          </ul>
        </Card>

        <div className="text-center">
          <Link
            to="/explorar"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>
    </main>
  )
}

export default HowItWorksPage
