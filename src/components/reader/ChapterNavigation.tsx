import { useMemo } from 'react'
import type { Chapter } from '../../types/manhwa'

type ChapterNavigationProps = {
  chapters: Chapter[]
  currentChapter: Chapter
  onNavigate: (chapterSlug: string) => void
}

export function ChapterNavigation({
  chapters,
  currentChapter,
  onNavigate,
}: ChapterNavigationProps) {
  const sortedChapters = useMemo(
    () => [...chapters].sort((a, b) => a.number - b.number),
    [chapters],
  )

  const currentIndex = sortedChapters.findIndex(
    (c) => c.id === currentChapter.id,
  )
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < sortedChapters.length - 1

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-[720px] mx-auto px-2"
      aria-label="Navegación de capítulos"
    >
      <button
        type="button"
        disabled={!hasPrev}
        onClick={() => hasPrev && onNavigate(sortedChapters[currentIndex - 1].slug)}
        className="inline-flex items-center gap-2 min-h-11 px-4 py-2 text-sm font-semibold rounded-xl bg-elevated border border-line text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface transition-colors"
        aria-label="Capítulo anterior"
      >
        ← Anterior
      </button>

      <div className="flex-1" role="group" aria-label="Selector de capítulo">
        <label htmlFor="chapter-select" className="sr-only">
          Seleccionar capítulo
        </label>
        <select
          id="chapter-select"
          value={currentChapter.slug}
          onChange={(e) => onNavigate(e.target.value)}
          className="w-full sm:w-auto min-h-11 px-4 py-2 text-sm font-medium rounded-xl bg-elevated border border-line text-white appearance-none bg-no-repeat bg-right pr-10 cursor-pointer hover:border-primary-400 focus:border-primary-400 focus:outline-none"
        >
          {sortedChapters.map((chapter) => (
            <option key={chapter.id} value={chapter.slug}>
              Capítulo {String(chapter.number).padStart(2, '0')} — {chapter.title}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        disabled={!hasNext}
        onClick={() => hasNext && onNavigate(sortedChapters[currentIndex + 1].slug)}
        className="inline-flex items-center gap-2 min-h-11 px-4 py-2 text-sm font-semibold rounded-xl bg-primary-500 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary-400 transition-colors"
        aria-label="Capítulo siguiente"
      >
        Siguiente →
      </button>
    </nav>
  )
}