import type { ChapterPage } from '../../types/manhwa'
import { useState } from 'react'

type PageImageProps = {
  page: ChapterPage
  isCurrent?: boolean
}

const errorPlaceholder = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1080" viewBox="0 0 720 1080"><rect width="720" height="1080" fill="#0b1220"/><rect x="28" y="28" width="664" height="1024" rx="18" fill="#111c30" stroke="#334155" stroke-width="3"/><text x="360" y="480" fill="#fb7185" font-family="system-ui, sans-serif" font-size="36" font-weight="600" text-anchor="middle">Error al cargar</text><text x="360" y="540" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="28" text-anchor="middle">Página no disponible</text></svg>',
)}`

const loadingPlaceholder = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1080" viewBox="0 0 720 1080"><rect width="720" height="1080" fill="#0b1220"/><rect x="28" y="28" width="664" height="1024" rx="18" fill="#111c30" stroke="#334155" stroke-width="3"/><text x="360" y="520" fill="#6366f1" font-family="system-ui, sans-serif" font-size="32" font-weight="600" text-anchor="middle">Cargando…</text></svg>',
)}`

export function PageImage({ page, isCurrent }: PageImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(loadingPlaceholder)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setImageSrc(page.imageUrl ?? errorPlaceholder)
    setHasError(false)
  }

  const handleError = () => {
    setHasError(true)
    setImageSrc(errorPlaceholder)
  }

  return (
    <div
      className="w-full max-w-[720px] mx-auto"
      role="img"
      aria-label={`Página ${page.pageNumber} del capítulo`}
      aria-hidden={!isCurrent}
    >
      <img
        src={imageSrc}
        alt={`Página ${page.pageNumber}`}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-auto block rounded-xl border border-line/50 shadow-lg"
        width={720}
        height={1080}
      />
      {hasError && (
        <p className="mt-2 text-center text-sm text-slate-400">
          No se pudo cargar la página {page.pageNumber}
        </p>
      )}
    </div>
  )
}
