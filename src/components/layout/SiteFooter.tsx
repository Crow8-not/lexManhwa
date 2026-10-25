import { useEffect, useState } from 'react'
import { resetDemoState } from '../../lib/demo/store'

function SiteFooter() {
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    if (!restored) {
      return
    }

    const timer = window.setTimeout(() => setRestored(false), 3000)
    return () => window.clearTimeout(timer)
  }, [restored])

  function handleReset() {
    resetDemoState()
    setRestored(true)
  }

  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>LexManhwa · Sistema visual inicial</p>
        <div className="flex flex-wrap items-center gap-3">
          <p>Diseñado para leer con calma.</p>
          <button
            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-line bg-ink px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-elevated hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            type="button"
            onClick={handleReset}
          >
            Restaurar demo
          </button>
          <span aria-live="polite" className="text-xs text-primary-300">
            {restored ? 'Demo restaurada' : ''}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
