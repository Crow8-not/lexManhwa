import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import ManhwaCard from '../../components/manhwa/ManhwaCard'
import StatusMessage from '../../components/ui/StatusMessage'
import { useDemoCatalog } from '../../lib/demo/hooks'
import { slugify } from '../../lib/utils/slug'
import { getLatestChapter, formatChapterLabel } from '../../lib/demo/selectors'

function GenreDetailPage() {
  const { manhwas, chapters } = useDemoCatalog()
  const { genreSlug } = useParams<{ genreSlug: string }>()
  const genre = useMemo(
    () => manhwas.find((m) => slugify(m.genre) === genreSlug)?.genre ?? '',
    [manhwas, genreSlug],
  )

  const filteredManhwas = useMemo(
    () =>
      manhwas
        .filter((manhwa) => slugify(manhwa.genre) === genreSlug)
        .map((manhwa) => ({
          ...manhwa,
          _latestChapterLabel: formatChapterLabel(
            getLatestChapter(manhwa.id, chapters),
          ),
        })),
    [manhwas, chapters, genreSlug],
  )

  if (!genre) {
    return (
      <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
        <section className="mx-auto max-w-content">
          <StatusMessage tone="empty" title="Género no encontrado">
            No existe un género disponible para la dirección solicitada.
          </StatusMessage>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            to="/generos"
          >
            Volver a géneros
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-content">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            Catálogo temporal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            {genre}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Explora las historias de este género.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
          {filteredManhwas.map((manhwa) => (
            <ManhwaCard
              key={manhwa.id}
              manhwa={manhwa}
              latestChapterLabel={manhwa._latestChapterLabel}
            />
          ))}
        </div>
        {filteredManhwas.length === 0 && (
          <div className="mt-4">
            <StatusMessage tone="empty" title="Sin manhwas en este género">
              Todavía no hay historias disponibles en esta categoría.
            </StatusMessage>
          </div>
        )}
      </section>
    </main>
  )
}

export default GenreDetailPage
