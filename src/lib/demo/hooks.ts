import { useSyncExternalStore } from 'react'
import {
  getDemoState,
  isPersistenceAvailable,
  resetDemoState,
  setDemoState,
  subscribe,
  loginAdmin,
  logoutAdmin,
  isAdminAuthenticated,
} from './store'

export function useDemoCatalog() {
  const state = useSyncExternalStore(subscribe, getDemoState, getDemoState)

  return {
    manhwas: state.manhwas,
    chapters: state.chapters,
    progress: state.progress,
    adminSession: state.adminSession,
    persistenceAvailable: isPersistenceAvailable(),
    resetDemoState,
    setDemoState,
    loginAdmin,
    logoutAdmin,
    isAdminAuthenticated,
  }
}
