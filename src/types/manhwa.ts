export type ManhwaStatus = 'ongoing' | 'completed' | 'hiatus'

export type CoverVariant =
  | 'indigo-coral'
  | 'cyan-violet'
  | 'amber-rose'
  | 'emerald-blue'
  | 'violet-amber'

export type Manhwa = {
  id: string
  title: string
  slug: string
  description: string
  author: string
  artist: string
  genre: string
  status: ManhwaStatus
  latestChapter: string
  cover: CoverVariant
  coverImage?: string
}

export type ChapterPage = {
  id: string
  pageNumber: number
  imageUrl?: string
  imageKey?: string
}

export type Chapter = {
  id: string
  manhwaId: string
  number: number
  title: string
  slug: string
  pages: ChapterPage[]
}

export type ReadingProgress = {
  userId: string
  manhwaId: string
  chapterId: string
  pageNumber: number
  updatedAt: string
}

export type DemoState = {
  version: number
  manhwas: Manhwa[]
  chapters: Chapter[]
  progress: ReadingProgress[]
}
