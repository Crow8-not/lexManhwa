import type { Chapter, Manhwa, ReadingProgress } from '../../types/manhwa'

export function getPublishedChaptersForManhwa(
  manhwaId: string,
  chapters: Chapter[],
): Chapter[] {
  return [...chapters]
    .filter((chapter) => chapter.manhwaId === manhwaId)
    .sort((a, b) => a.number - b.number)
}

export function getLatestChapter(manhwaId: string, chapters: Chapter[]): Chapter | null {
  const published = getPublishedChaptersForManhwa(manhwaId, chapters)
  return published.length > 0 ? published[published.length - 1] : null
}

export function formatChapterLabel(chapter: Chapter | null): string {
  if (!chapter) {
    return 'Sin capítulos'
  }
  return `Capítulo ${String(chapter.number).padStart(2, '0')}`
}

export function getChapterCount(manhwaId: string, chapters: Chapter[]): number {
  return getPublishedChaptersForManhwa(manhwaId, chapters).length
}

export function getFirstChapter(manhwaId: string, chapters: Chapter[]): Chapter | null {
  const published = getPublishedChaptersForManhwa(manhwaId, chapters)
  return published.length > 0 ? published[0] : null
}

export function getReadingProgress(
  manhwaId: string,
  progress: ReadingProgress[],
): ReadingProgress | null {
  const manhwaProgress = progress.filter((p) => p.manhwaId === manhwaId)
  if (manhwaProgress.length === 0) {
    return null
  }
  return manhwaProgress.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )[0]
}

export function getContinueReading(
  manhwas: Manhwa[],
  chapters: Chapter[],
  progress: ReadingProgress[],
): Array<{ manhwa: Manhwa; chapter: Chapter; progress: ReadingProgress }> {
  if (progress.length === 0) {
    return []
  }
  const sortedProgress = [...progress].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
  const result: Array<{ manhwa: Manhwa; chapter: Chapter; progress: ReadingProgress }> = []
  for (const p of sortedProgress) {
    const manhwa = manhwas.find((m) => m.id === p.manhwaId)
    const chapter = chapters.find((c) => c.id === p.chapterId)
    if (manhwa && chapter) {
      result.push({ manhwa, chapter, progress: p })
    }
    if (result.length >= 5) {
      break
    }
  }
  return result
}