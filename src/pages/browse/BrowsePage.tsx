import { useMemo } from 'react'
import ManhwaCard from '../../components/manhwa/ManhwaCard'
import { useDemoCatalog } from '../../lib/demo/hooks'
import { Link } from 'react-router-dom'
import { getLatestChapter, formatChapterLabel } from '../../lib/demo/selectors'

function BrowsePage() {
  const { manhwas, chapters } = useDemoCatalog()

  const manhwasWithLatest = useMemo(
    () =>
      manhwas.map((manhwa) => ({
        ...manhwa,
        _latestChapterLabel: formatChapterLabel(getLatestChapter(manhwa.id, chapters)),
      })),
    [manhwas, chapters],
  )

  return (
    <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-content">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            Catálogo temporal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Explorar manhwas
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Descubre historias ficticias de demostración creadas para LexManhwa.
          </p>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            to="/buscar"
          >
            Buscar en el catálogo
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
          {manhwasWithLatest.map((manhwa) => (
            <ManhwaCard
              key={manhwa.id}
              manhwa={manhwa}
              latestChapterLabel={manhwa._latestChapterLabel}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default BrowsePage
