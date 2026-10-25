import { chapters as seedChapters } from '../../data/chapters'
import { manhwas as seedManhwas } from '../../data/manhwas'
import type {
  Chapter,
  ChapterPage,
  CoverVariant,
  DemoState,
  Manhwa,
  ManhwaStatus,
} from '../../types/manhwa'

export const DEMO_STORAGE_KEY = 'lexmanhwa:demo:v1'
export const DEMO_STATE_VERSION = 1

type DemoUpdater = (state: DemoState) => DemoState
type DemoListener = () => void

const listeners = new Set<DemoListener>()

const statuses: ManhwaStatus[] = ['ongoing', 'completed', 'hiatus']
const coverVariants: CoverVariant[] = [
  'indigo-coral',
  'cyan-violet',
  'amber-rose',
  'emerald-blue',
  'violet-amber',
]

let persistenceAvailable = canUseLocalStorage()
let currentState: DemoState | null = null

function canUseLocalStorage() {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const probeKey = `${DEMO_STORAGE_KEY}:probe`
    window.localStorage.setItem(probeKey, '1')
    window.localStorage.removeItem(probeKey)
    return true
  } catch {
    return false
  }
}

export function isPersistenceAvailable() {
  return persistenceAvailable
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isManhwa(value: unknown): value is Manhwa {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    isString(value.title) &&
    isString(value.slug) &&
    isString(value.description) &&
    isString(value.author) &&
    isString(value.artist) &&
    isString(value.genre) &&
    isString(value.status) &&
    statuses.includes(value.status as ManhwaStatus) &&
    isString(value.latestChapter) &&
    isString(value.cover) &&
    coverVariants.includes(value.cover as CoverVariant) &&
    (value.coverImage === undefined || isString(value.coverImage))
  )
}

function isChapterPage(value: unknown): value is ChapterPage {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    typeof value.pageNumber === 'number' &&
    Number.isFinite(value.pageNumber) &&
    (value.imageUrl === undefined || isString(value.imageUrl)) &&
    (value.imageKey === undefined || isString(value.imageKey))
  )
}

function isChapter(value: unknown): value is Chapter {
  if (!isRecord(value)) {
    return false
  }

  return (
    isString(value.id) &&
    isString(value.manhwaId) &&
    typeof value.number === 'number' &&
    Number.isFinite(value.number) &&
    isString(value.title) &&
    isString(value.slug) &&
    Array.isArray(value.pages) &&
    value.pages.every(isChapterPage)
  )
}

function isDemoState(value: unknown): value is DemoState {
  return (
    isRecord(value) &&
    value.version === DEMO_STATE_VERSION &&
    Array.isArray(value.manhwas) &&
    value.manhwas.every(isManhwa) &&
    Array.isArray(value.chapters) &&
    value.chapters.every(isChapter)
  )
}

function createSeedState(): DemoState {
  return {
    version: DEMO_STATE_VERSION,
    manhwas: seedManhwas.map((manhwa) => ({ ...manhwa })),
    chapters: seedChapters.map((chapter) => ({
      ...chapter,
      pages: chapter.pages.map((page) => ({ ...page })),
    })),
  }
}

function saveState(state: DemoState) {
  if (!persistenceAvailable || typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state))
  } catch {
    persistenceAvailable = false
  }
}

function readPersistedState(): DemoState | null {
  if (!persistenceAvailable || typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    return isDemoState(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function getDemoState(): DemoState {
  if (currentState) {
    return currentState
  }

  currentState = readPersistedState() ?? createSeedState()
  return currentState
}

export function setDemoState(updater: DemoUpdater) {
  const nextState = updater(getDemoState())
  currentState = { ...nextState }
  saveState(currentState)

  listeners.forEach((listener) => listener())
}

export function subscribe(listener: DemoListener) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function resetDemoState() {
  currentState = createSeedState()
  saveState(currentState)

  listeners.forEach((listener) => listener())
}
