import { Link, useParams } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import ManhwaCover from '../../components/manhwa/ManhwaCover'
import StatusMessage from '../../components/ui/StatusMessage'
import { manhwas } from '../../data/manhwas'
import type { ManhwaStatus } from '../../types/manhwa'

const statusLabels: Record<ManhwaStatus, string> = {
  ongoing: 'En publicación',
  completed: 'Completado',
  hiatus: 'En pausa',
}

const statusTones: Record<ManhwaStatus, 'success' | 'warning' | 'neutral'> = {
  ongoing: 'success',
  completed: 'neutral',
  hiatus: 'warning',
}

function ManhwaDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const manhwa = manhwas.find((item) => item.slug === slug)

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

  return (
    <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
      <article className="mx-auto max-w-content">
        <Link
          className="text-sm font-semibold text-primary-300 transition-colors hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          to="/explorar"
        >
          ← Volver a explorar
        </Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(180px,280px)_1fr] lg:items-start lg:gap-10">
          <ManhwaCover
            className="aspect-[4/5] rounded-2xl border border-line/80 shadow-card"
            manhwa={manhwa}
            showGenre
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={statusTones[manhwa.status]}>
                {statusLabels[manhwa.status]}
              </Badge>
              <Badge tone="neutral">{manhwa.latestChapter}</Badge>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {manhwa.title}
            </h1>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-slate-400">Autor</dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {manhwa.author}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">Artista</dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {manhwa.artist}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">Género</dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {manhwa.genre}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">Último capítulo</dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {manhwa.latestChapter}
                </dd>
              </div>
            </dl>
            <Card className="mt-8 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white">Descripción</h2>
              <p className="mt-3 leading-7 text-slate-300">
                {manhwa.description}
              </p>
            </Card>
            <div className="mt-6 flex gap-3">
              <Link
                to={`/lector?manhwa=${manhwa.slug}`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                Leer primer capítulo
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default ManhwaDetailPage
