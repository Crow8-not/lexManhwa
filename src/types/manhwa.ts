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
}
