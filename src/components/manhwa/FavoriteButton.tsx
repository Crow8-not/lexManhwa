import { useState } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { useDemoCatalog } from '../../lib/demo/hooks'

type FavoriteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  manhwaId: string
  size?: 'sm' | 'md'
}

function FavoriteButton({ manhwaId, size = 'md', className = '', onClick, ...props }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useDemoCatalog()
  const favorite = isFavorite(manhwaId)
  const [isLoading, setIsLoading] = useState(false)

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (isLoading) return
    setIsLoading(true)
    toggleFavorite(manhwaId)
    setIsLoading(false)
    onClick?.(event)
  }

  return (
    <button
      type="button"
      className={`
        inline-flex items-center justify-center rounded-xl transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400
        disabled:cursor-not-allowed disabled:opacity-50
        ${size === 'sm' ? 'min-h-9 px-3' : 'min-h-11 px-4'}
        ${favorite
          ? 'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 active:bg-rose-500/35'
          : 'bg-elevated text-slate-300 hover:bg-surface hover:text-white'
        }
        ${className}
      `}
      onClick={handleClick}
      aria-pressed={favorite}
      aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      disabled={isLoading}
      {...props}
    >
      <span aria-hidden="true" className={`text-${size === 'sm' ? 'lg' : 'xl'} ${isLoading ? 'animate-pulse' : ''}`}>
        {favorite ? '♥' : '♡'}
      </span>
      <span className="sr-only">{favorite ? 'En favoritos' : 'Añadir a favoritos'}</span>
    </button>
  )
}

export default FavoriteButton