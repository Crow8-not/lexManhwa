import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import StatusMessage from '../../components/ui/StatusMessage'
import { useDemoCatalog } from '../../lib/demo/hooks'

export default function ReaderPage() {
  const { manhwas, chapters } = useDemoCatalog()
  const { slug, chapterSlug } = useParams<{ slug: string; chapterSlug: string }>()

  if (!slug || !chapterSlug) {
    return (
      <main className="min-h-screen bg-ink text-slate-100 px-6 py-10">
        <h1 className="text-2xl font-bold mb-4">Lector</h1>
        <p>Lectura vertical pendiente de implementación.</p>
        <p className="mt-2 text-slate-400">Selecciona un capítulo desde el detalle del manhwa.</p>
      </main>
    )
  }

  const manhwa = manhwas.find((m) => m.slug === slug)
  const chapter = chapters.find(
    (c) => c.manhwaId === manhwa?.id && c.slug === chapterSlug,
  )

  if (!manhwa) {
    return (
      <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
        <section className="mx-auto max-w-content">
          <StatusMessage tone="empty" title="Manhwa no encontrado">
            No existe un manhwa disponible para la dirección solicitada.
          </StatusMessage>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            to="/explorar"
          >
            Volver a explorar
          </Link>
        </section>
      </main>
    )
  }

  if (!chapter) {
    return (
      <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
        <section className="mx-auto max-w-content">
          <StatusMessage tone="empty" title="Capítulo no encontrado">
            No existe un capítulo disponible para la dirección solicitada.
          </StatusMessage>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            to={`/manhwa/${manhwa.slug}`}
          >
            Volver al manhwa
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-content">
        <div className="max-w-2xl">
          <Link
            className="text-sm font-semibold text-primary-300 transition-colors hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            to={`/manhwa/${manhwa.slug}`}
          >
            ← Volver a {manhwa.title}
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-white">
            {manhwa.title} — Capítulo {chapter.number}
          </h1>
        </div>
        <div className="mt-8 rounded-2xl border border-line/80 bg-surface p-8 text-center shadow-card">
          <StatusMessage tone="loading" title="Lector en desarrollo">
            La lectura vertical, navegación entre capítulos y progreso se
            implementarán en la Fase 3.
          </StatusMessage>
          <div className="mt-6 space-y-3">
            <p className="text-slate-300">Capítulo: {chapter.title}</p>
            <p className="text-slate-300">Páginas: {chapter.pages.length}</p>
            <Link
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              to={`/manhwa/${manhwa.slug}`}
            >
              Volver al detalle
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
