import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import StatusMessage from '../../components/ui/StatusMessage'
import { useDemoCatalog } from '../../lib/demo/hooks'
import {
  getPublishedChaptersForManhwa,
  getReadingProgress,
} from '../../lib/demo/selectors'
import { setProgress } from '../../lib/demo/store'
import { PageImage } from '../../components/reader/PageImage'
import { ChapterNavigation } from '../../components/reader/ChapterNavigation'
import type { Manhwa, Chapter, ReadingProgress } from '../../types/manhwa'

type ReaderState =
  | { status: 'loading' }
  | { status: 'no-params' }
  | { status: 'not-found'; type: 'manhwa' | 'chapter'; manhwa?: Manhwa }
  | {
      status: 'ready'
      manhwa: Manhwa
      chapter: Chapter
      publishedChapters: Chapter[]
      currentIndex: number
      sortedChapters: Chapter[]
    }

export default function ReaderPage() {
  const { manhwas, chapters } = useDemoCatalog()
  const { slug, chapterSlug } = useParams<{
    slug: string
    chapterSlug: string
  }>()
  const navigate = useNavigate()

  const [readerState, setReaderState] = useState<ReaderState>({
    status: 'loading',
  })
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [showHeader, setShowHeader] = useState(true)
  const [showFooter, setShowFooter] = useState(true)
  const headerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const footerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const initialPageIndexRef = useRef(0)

  const resolveReaderState = useCallback(() => {
    if (!slug || !chapterSlug) {
      return { status: 'no-params' as const }
    }
    const manhwa = manhwas.find((m) => m.slug === slug)
    if (!manhwa) {
      return { status: 'not-found' as const, type: 'manhwa' as const }
    }
    const chapter = chapters.find(
      (c) => c.manhwaId === manhwa.id && c.slug === chapterSlug,
    )
    if (!chapter) {
      return { status: 'not-found' as const, type: 'chapter' as const, manhwa }
    }
    const publishedChapters = getPublishedChaptersForManhwa(manhwa.id, chapters)
    const currentIndex = publishedChapters.findIndex((c) => c.id === chapter.id)
    const sortedChapters = publishedChapters

    const progress = getReadingProgress(
      manhwa.id,
      chapters as unknown as ReadingProgress[],
    )
    let initialPageIndex = 0
    if (progress && progress.chapterId === chapter.id) {
      initialPageIndex = Math.max(
        0,
        Math.min(progress.pageNumber - 1, chapter.pages.length - 1),
      )
    }
    initialPageIndexRef.current = initialPageIndex

    return {
      status: 'ready' as const,
      manhwa,
      chapter,
      publishedChapters,
      currentIndex,
      sortedChapters,
    }
  }, [slug, chapterSlug, manhwas, chapters])

  useEffect(() => {
    const state = resolveReaderState()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial state resolution from URL params
    setReaderState(state)
    if (state.status === 'ready') {
      setCurrentPageIndex(initialPageIndexRef.current)
    }
  }, [resolveReaderState])

  const saveCurrentProgress = useCallback(() => {
    if (readerState.status === 'ready') {
      const { manhwa, chapter } = readerState
      if (currentPageIndex >= 0 && currentPageIndex < chapter.pages.length) {
        setProgress(manhwa.id, chapter.id, currentPageIndex + 1)
      }
    }
  }, [readerState, currentPageIndex])

  useEffect(() => {
    saveCurrentProgress()
  }, [currentPageIndex, readerState, saveCurrentProgress])

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveCurrentProgress()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [readerState, saveCurrentProgress])

  const handleScroll = () => {
    setShowHeader(true)
    setShowFooter(true)
    if (headerTimeoutRef.current) clearTimeout(headerTimeoutRef.current)
    if (footerTimeoutRef.current) clearTimeout(footerTimeoutRef.current)
    headerTimeoutRef.current = window.setTimeout(
      () => setShowHeader(false),
      3000,
    )
    footerTimeoutRef.current = window.setTimeout(
      () => setShowFooter(false),
      3000,
    )
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigateToChapter = useCallback(
    (targetSlug: string) => {
      setCurrentPageIndex(0)
      navigate(`/manhwa/${slug}/capitulo/${targetSlug}`)
    },
    [slug, navigate],
  )

  const goToPage = useCallback(
    (pageIndex: number) => {
      if (
        readerState.status === 'ready' &&
        pageIndex >= 0 &&
        pageIndex < readerState.chapter.pages.length
      ) {
        setCurrentPageIndex(pageIndex)
      }
    },
    [readerState],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (readerState.status !== 'ready') return
      const { currentIndex, sortedChapters, chapter } = readerState
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateToChapter(sortedChapters[currentIndex - 1].slug)
      } else if (
        e.key === 'ArrowRight' &&
        currentIndex < sortedChapters.length - 1
      ) {
        navigateToChapter(sortedChapters[currentIndex + 1].slug)
      } else if (e.key === 'ArrowUp' && currentPageIndex > 0) {
        goToPage(currentPageIndex - 1)
      } else if (
        e.key === 'ArrowDown' &&
        currentPageIndex < chapter.pages.length - 1
      ) {
        goToPage(currentPageIndex + 1)
      } else if (e.key === 'Home') {
        goToPage(0)
      } else if (e.key === 'End') {
        goToPage(chapter.pages.length - 1)
      }
    },
    [readerState, currentPageIndex, navigateToChapter, goToPage],
  )

  useEffect(() => {
    if (readerState.status !== 'ready') return
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [readerState.status, currentPageIndex, handleKeyDown])

  if (readerState.status === 'loading') {
    return (
      <main className="min-h-screen bg-ink text-slate-100 px-6 py-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
      </main>
    )
  }

  if (readerState.status === 'no-params') {
    return (
      <main className="min-h-screen bg-ink text-slate-100 px-6 py-10">
        <h1 className="text-2xl font-bold mb-4">Lector</h1>
        <p>Selecciona un capítulo desde el detalle del manhwa.</p>
        <p className="mt-2 text-slate-400">
          Ve a un manhwa y elige un capítulo para empezar a leer.
        </p>
      </main>
    )
  }

  if (readerState.status === 'not-found') {
    const { type, manhwa } = readerState
    const title =
      type === 'manhwa' ? 'Manhwa no encontrado' : 'Capítulo no encontrado'
    const message =
      type === 'manhwa'
        ? 'No existe un manhwa disponible para la dirección solicitada.'
        : 'No existe un capítulo disponible para la dirección solicitada.'
    const linkHref = type === 'manhwa' ? '/explorar' : `/manhwa/${manhwa!.slug}`
    const linkText =
      type === 'manhwa' ? 'Volver a explorar' : 'Volver al manhwa'

    return (
      <main className="surface-grid min-h-[calc(100vh-137px)] px-4 py-12 sm:px-8 sm:py-16">
        <section className="mx-auto max-w-content">
          <StatusMessage tone="empty" title={title}>
            {message}
          </StatusMessage>
          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            to={linkHref}
          >
            {linkText}
          </Link>
        </section>
      </main>
    )
  }

  const { manhwa, chapter, sortedChapters } = readerState

  return (
    <main
      className="min-h-screen bg-ink text-slate-100"
      onScroll={handleScroll}
    >
      {showHeader && (
        <header className="sticky top-0 z-20 bg-ink/95 backdrop-blur border-b border-line/70 px-4 py-3 sm:px-8">
          <div className="mx-auto max-w-[720px] flex items-center justify-between gap-3">
            <Link
              to={`/manhwa/${manhwa.slug}`}
              className="text-sm font-semibold text-primary-300 transition-colors hover:text-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
            >
              ← {manhwa.title}
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold truncate">
                {manhwa.title} — Capítulo {chapter.number}
              </h1>
              <div
                className="mt-1.5 h-1 bg-line/30 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={Math.round(
                  ((currentPageIndex + 1) / chapter.pages.length) * 100,
                )}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progreso del capítulo: ${Math.round(((currentPageIndex + 1) / chapter.pages.length) * 100)}%`}
              >
                <div
                  className="h-full bg-primary-400 transition-all duration-300 ease-out"
                  style={{
                    width: `${((currentPageIndex + 1) / chapter.pages.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <span
              className="text-sm text-slate-400 w-24 text-right"
              aria-hidden="true"
            >
              {currentPageIndex + 1} / {chapter.pages.length}
            </span>
          </div>
        </header>
      )}

      <div
        className="max-w-[720px] mx-auto px-4 py-8 sm:px-6 space-y-8 pb-24"
        role="main"
        aria-label={`Lector: ${manhwa.title} Capítulo ${chapter.number}`}
      >
        {chapter.pages.map((page, index) => (
          <PageImage
            key={page.id}
            page={page}
            isCurrent={index === currentPageIndex}
          />
        ))}
      </div>

      {showFooter && (
        <footer className="sticky bottom-0 z-20 bg-ink/95 backdrop-blur border-t border-line/70 px-4 py-3 sm:px-8">
          <div className="mx-auto max-w-[720px]">
            <ChapterNavigation
              chapters={sortedChapters}
              currentChapter={chapter}
              onNavigate={navigateToChapter}
            />
          </div>
        </footer>
      )}

      <div
        className="fixed bottom-4 right-4 z-30 flex flex-col gap-2"
        aria-hidden="true"
      >
        <button
          type="button"
          onClick={() => goToPage(0)}
          className="rounded-full bg-elevated/90 p-3 text-slate-300 hover:bg-surface hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          aria-label="Ir al inicio"
          title="Inicio (Home)"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 9 12 3 21 9"></polyline>
            <path d="M5 21V9"></path>
            <path d="M19 21V9"></path>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goToPage(chapter.pages.length - 1)}
          className="rounded-full bg-elevated/90 p-3 text-slate-300 hover:bg-surface hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          aria-label="Ir al final"
          title="Final (End)"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 15 12 21 21 15"></polyline>
            <path d="M5 3v12"></path>
            <path d="M19 3v12"></path>
          </svg>
        </button>
      </div>
    </main>
  )
}
