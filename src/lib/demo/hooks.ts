import { useSyncExternalStore } from 'react'
import {
  getDemoState,
  isPersistenceAvailable,
  resetDemoState,
  subscribe,
} from './store'

export function useDemoCatalog() {
  const state = useSyncExternalStore(subscribe, getDemoState, getDemoState)

  return {
    manhwas: state.manhwas,
    chapters: state.chapters,
    progress: state.progress,
    persistenceAvailable: isPersistenceAvailable(),
    resetDemoState,
  }
}
