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
  return (
    <div
      aria-label={`Portada temporal de ${manhwa.title}`}
      className={`flex items-end bg-gradient-to-br p-2 sm:p-3 ${coverClasses[manhwa.cover]} ${className}`}
      role="img"
    >
      {showGenre ? <Badge tone="primary">{manhwa.genre}</Badge> : null}
    </div>
  )
}

export default ManhwaCover
