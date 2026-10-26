import { useSyncExternalStore } from 'react'
import {
  getDemoState,
  getFavorites,
  isFavorite,
  isPersistenceAvailable,
  resetDemoState,
  setDemoState,
  subscribe,
  loginAdmin,
  logoutAdmin,
  isAdminAuthenticated,
  toggleFavorite,
} from './store'

export function useDemoCatalog() {
  const state = useSyncExternalStore(subscribe, getDemoState, getDemoState)

  return {
    manhwas: state.manhwas,
    chapters: state.chapters,
    progress: state.progress,
    favorites: state.favorites,
    adminSession: state.adminSession,
    persistenceAvailable: isPersistenceAvailable(),
    resetDemoState,
    setDemoState,
    loginAdmin,
    logoutAdmin,
    isAdminAuthenticated,
    getFavorites,
    toggleFavorite,
    isFavorite,
  }
}
