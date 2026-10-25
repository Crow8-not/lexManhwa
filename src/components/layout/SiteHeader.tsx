import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Explorar', to: '/explorar' },
  { label: 'Buscar', to: '/buscar' },
  { label: 'Géneros', to: '/generos' },
]

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm ${
      isActive
        ? 'bg-elevated text-white'
        : 'text-slate-300 hover:bg-elevated hover:text-white'
    }`

  return (
    <header className="border-b border-line/70 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-8 sm:py-4">
        <NavLink
          className="shrink-0 text-base font-bold tracking-tight text-white sm:text-lg"
          to="/"
        >
          Lex<span className="text-accent-400">Manhwa</span>
        </NavLink>
        <nav
          aria-label="Navegación de demostración"
          className="hidden items-center gap-1 md:flex"
        >
          {navigationItems.map((item) => (
            <NavLink className={linkClasses} key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/"
          className="hidden sm:inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          Acceder
        </Link>
        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="rounded-lg p-2 text-slate-300 hover:bg-elevated hover:text-white md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          <span aria-hidden="true" className="text-xl">
            ☰
          </span>
        </button>
      </div>
      {isMenuOpen ? (
        <nav
          aria-label="Navegación móvil"
          className="border-t border-line/70 px-4 py-3 md:hidden"
        >
          <div className="mx-auto flex max-w-content flex-col gap-1">
            {navigationItems.map((item) => (
              <NavLink
                className={linkClasses}
                key={item.to}
                onClick={() => setIsMenuOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}

export default SiteHeader
