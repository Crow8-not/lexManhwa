import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDemoCatalog } from '../../lib/demo/hooks'

function GenresPage() {
  const { manhwas } = useDemoCatalog()
  const genres = useMemo(
    () => [...new Set(manhwas.map((manhwa) => manhwa.genre))].sort(),
    [manhwas],
  )

  return (
    <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-content">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            Catálogo temporal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Géneros
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Explora las historias disponibles por género.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {genres.map((genre) => (
            <Link
              key={genre}
              className="rounded-2xl border border-line bg-surface p-5 text-lg font-semibold text-white transition-colors hover:border-primary-400 hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              to={`/buscar?genre=${encodeURIComponent(genre)}`}
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default GenresPage
