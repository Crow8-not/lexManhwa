import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ManhwaCard from '../../components/manhwa/ManhwaCard'
import Input from '../../components/ui/Input'
import StatusMessage from '../../components/ui/StatusMessage'
import Button from '../../components/ui/Button'
import { useDemoCatalog } from '../../lib/demo/hooks'
import type { ManhwaStatus } from '../../types/manhwa'

const statusLabels: Record<ManhwaStatus, string> = {
  ongoing: 'En publicación',
  completed: 'Completado',
  hiatus: 'En pausa',
}

function SearchPage() {
  const { manhwas } = useDemoCatalog()
  const genres = useMemo(
    () => [...new Set(manhwas.map((manhwa) => manhwa.genre))].sort(),
    [manhwas],
  )
  const statuses = useMemo(
    () => [...new Set(manhwas.map((manhwa) => manhwa.status))],
    [manhwas],
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const genreFromUrl = searchParams.get('genre')
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState(
    genreFromUrl && genres.includes(genreFromUrl) ? genreFromUrl : '',
  )
  const [status, setStatus] = useState<ManhwaStatus | ''>('')

  const normalizedQuery = query.trim().toLocaleLowerCase()
  const hasFilters = Boolean(normalizedQuery || genre || status)
  const results = useMemo(
    () =>
      manhwas.filter((manhwa) => {
        const matchesQuery =
          !normalizedQuery ||
          [manhwa.title, manhwa.author, manhwa.artist].some((field) =>
            field.toLocaleLowerCase().includes(normalizedQuery),
          )
        const matchesGenre = !genre || manhwa.genre === genre
        const matchesStatus = !status || manhwa.status === status

        return matchesQuery && matchesGenre && matchesStatus
      }),
    [genre, manhwas, normalizedQuery, status],
  )

  function handleGenreChange(value: string) {
    setGenre(value)
    if (value) {
      setSearchParams({ genre: value })
    } else {
      setSearchParams({})
    }
  }

  function clearFilters() {
    setQuery('')
    setGenre('')
    setStatus('')
    setSearchParams({})
  }

  return (
    <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-content">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            Catálogo temporal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Buscar manhwas
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Busca por título, autor o artista y combina los filtros disponibles.
          </p>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(0,2fr)_1fr_1fr_auto] lg:items-end">
          <Input
            id="manhwa-search"
            label="Buscar"
            placeholder="Buscar por título, autor o artista..."
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="genre-filter"
            >
              Género
            </label>
            <select
              className="min-h-11 w-full rounded-xl border border-line bg-ink px-3.5 text-sm text-white transition-colors hover:border-slate-500 focus:border-primary-400 focus:outline-none"
              id="genre-filter"
              value={genre}
              onChange={(event) => handleGenreChange(event.target.value)}
            >
              <option value="">Todos los géneros</option>
              {genres.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="status-filter"
            >
              Estado
            </label>
            <select
              className="min-h-11 w-full rounded-xl border border-line bg-ink px-3.5 text-sm text-white transition-colors hover:border-slate-500 focus:border-primary-400 focus:outline-none"
              id="status-filter"
              value={status}
              onChange={(event) => {
                const nextStatus =
                  statuses.find((option) => option === event.target.value) ?? ''
                setStatus(nextStatus)
              }}
            >
              <option value="">Todos los estados</option>
              {statuses.map((option) => (
                <option key={option} value={option}>
                  {statusLabels[option]}
                </option>
              ))}
            </select>
          </div>
          <Button variant="secondary" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </div>

        <div className="mt-6 flex min-h-7 items-center justify-between gap-4">
          <p className="text-sm text-slate-300" aria-live="polite">
            {hasFilters
              ? results.length === 0
                ? 'No hay resultados'
                : `${results.length} resultado${results.length === 1 ? '' : 's'}`
              : 'Comienza una búsqueda para ver resultados.'}
          </p>
        </div>

        {!hasFilters ? (
          <div className="mt-4">
            <StatusMessage tone="empty" title="Busca una historia">
              Introduce un título, autor o artista, o selecciona un filtro para
              explorar el catálogo.
            </StatusMessage>
          </div>
        ) : results.length === 0 ? (
          <div className="mt-4">
            <StatusMessage tone="empty" title="Sin coincidencias">
              No encontramos manhwas que coincidan con tu búsqueda.
            </StatusMessage>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
            {results.map((manhwa) => (
              <ManhwaCard key={manhwa.id} manhwa={manhwa} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default SearchPage
