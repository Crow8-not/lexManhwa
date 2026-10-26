import { Link } from 'react-router-dom'
import type { Manhwa } from '../../types/manhwa'
import Badge from '../ui/Badge'
import ManhwaCover from './ManhwaCover'
import FavoriteButton from './FavoriteButton'

type ManhwaCardProps = {
  manhwa: Manhwa
  className?: string
  latestChapterLabel?: string
  showFavorite?: boolean
}

const statusLabels: Record<Manhwa['status'], string> = {
  ongoing: 'En publicaci\u00f3n',
  completed: 'Completado',
  hiatus: 'En pausa',
}

const statusTones: Record<Manhwa['status'], 'success' | 'warning' | 'neutral'> =
  {
    ongoing: 'success',
    completed: 'neutral',
    hiatus: 'warning',
  }

function ManhwaCard({
  manhwa,
  className = '',
  latestChapterLabel,
  showFavorite = false,
}: ManhwaCardProps) {
  return (
    <Link
      aria-label={`Ver detalle de ${manhwa.title}`}
      className={`group block min-w-0 overflow-hidden rounded-2xl border border-line/80 bg-surface shadow-card transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 ${className}`}
      to={`/manhwa/${manhwa.slug}`}
    >
      <ManhwaCover className="aspect-[4/5]" manhwa={manhwa} showGenre />
      <div className="space-y-2 p-2 sm:space-y-3 sm:p-4">
        <div className="min-w-0 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-xs font-semibold text-white sm:text-sm">
              {manhwa.title}
            </h3>
            <p className="mt-1 truncate text-[11px] text-slate-400 sm:text-xs">
              {latestChapterLabel ?? manhwa.latestChapter}
            </p>
          </div>
          {showFavorite && (
            <FavoriteButton
              manhwaId={manhwa.id}
              size="sm"
              className="shrink-0"
            />
          )}
        </div>
        <Badge
          className="max-w-full truncate"
          tone={statusTones[manhwa.status]}
        >
          {statusLabels[manhwa.status]}
        </Badge>
      </div>
    </Link>
  )
}

export default ManhwaCard
