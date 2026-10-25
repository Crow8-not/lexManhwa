import Badge from '../ui/Badge'
import type { Manhwa } from '../../types/manhwa'

type ManhwaCoverProps = {
  manhwa: Manhwa
  className?: string
  showGenre?: boolean
}

const coverClasses: Record<Manhwa['cover'], string> = {
  'indigo-coral': 'from-primary-600/80 via-indigo-950 to-accent-500/50',
  'cyan-violet': 'from-cyan-500/60 via-indigo-950 to-primary-600/70',
  'amber-rose': 'from-amber-400/60 via-rose-950 to-accent-500/70',
  'emerald-blue': 'from-emerald-400/50 via-slate-950 to-cyan-500/70',
  'violet-amber': 'from-violet-500/70 via-indigo-950 to-amber-400/60',
}

function ManhwaCover({
  manhwa,
  className = '',
  showGenre = false,
}: ManhwaCoverProps) {
  const imageUrl = manhwa.coverImage || `https://picsum.photos/seed/${manhwa.slug}/300/450`;
  return (
    <div
      aria-label={`Portada de ${manhwa.title}`}
      className={`flex items-end relative overflow-hidden rounded-2xl ${className}`}
      role="img"
    >
      <img
        src={imageUrl}
        alt={manhwa.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${coverClasses[manhwa.cover]}`} />
      <div className="relative z-10 w-full p-2 sm:p-3">
        {showGenre ? <Badge tone="primary">{manhwa.genre}</Badge> : null}
      </div>
    </div>
  )
}

export default ManhwaCover
