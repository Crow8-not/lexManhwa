import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { resetDemoState } from '../../lib/demo/store'

const CONTACT_EMAIL = 'contacto@ejemplo.com'

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
        <p>LexManhwa · Demo comercial</p>
        <div className="flex flex-wrap items-center gap-3">
          <p>Diseñado para leer con calma.</p>
          <Link
            to="/como-funciona"
            className="text-slate-400 hover:text-primary-300 transition-colors underline-offset-2 hover:underline"
          >
            Cómo funciona
          </Link>
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
        <p className="text-xs text-slate-500 sm:order-last">
          ¿Quieres esta demo para tu proyecto? →{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary-300 hover:text-primary-200 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
