import type { Chapter, ChapterPage } from '../types/manhwa'

const SEED_MANHWA_IDS = Array.from(
  { length: 20 },
  (_, index) => `manhwa-${String(index + 1).padStart(3, '0')}`,
)

const CHAPTERS_PER_MANHWA = 3
const PAGES_PER_CHAPTER = 5

function createPageImageUrl(
  manhwaId: string,
  chapterNumber: number,
  pageNumber: number,
) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1080" viewBox="0 0 720 1080"><rect width="720" height="1080" fill="#0b1220"/><rect x="28" y="28" width="664" height="1024" rx="18" fill="#111c30" stroke="#334155" stroke-width="3"/><text x="360" y="430" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="40" font-weight="700" text-anchor="middle">${manhwaId}</text><text x="360" y="510" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="34" text-anchor="middle">Capítulo ${chapterNumber}</text><text x="360" y="610" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="30" text-anchor="middle">Página ${pageNumber}</text></svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function createPages(manhwaId: string, chapterNumber: number): ChapterPage[] {
  return Array.from({ length: PAGES_PER_CHAPTER }, (_, index) => {
    const pageNumber = index + 1

    return {
      id: `${manhwaId}-capitulo-${chapterNumber}-pagina-${pageNumber}`,
      pageNumber,
      imageUrl: createPageImageUrl(manhwaId, chapterNumber, pageNumber),
    }
  })
}

function createChapter(manhwaId: string, number: number): Chapter {
  return {
    id: `${manhwaId}-capitulo-${number}`,
    manhwaId,
    number,
    title: `Capítulo ${number}`,
    slug: `capitulo-${number}`,
    pages: createPages(manhwaId, number),
  }
}

export function createSeedChapters(): Chapter[] {
  return SEED_MANHWA_IDS.flatMap((manhwaId) =>
    Array.from({ length: CHAPTERS_PER_MANHWA }, (_, index) =>
      createChapter(manhwaId, index + 1),
    ),
  )
}

export const chapters: Chapter[] = createSeedChapters()
