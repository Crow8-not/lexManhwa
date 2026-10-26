import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDemoCatalog } from '../../lib/demo/hooks'
import ManhwaList from '../../components/admin/ManhwaList'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

type AdminTab = 'manhwas' | 'settings'

export default function AdminPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logoutAdmin } = useDemoCatalog()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    try {
      logoutAdmin()
    } catch {
      // Ignore errors
    }
    navigate('/admin/login', { replace: true })
  }

  const activeTab: AdminTab = location.pathname.startsWith('/admin/settings')
    ? 'settings'
    : 'manhwas'

  const tabs: { id: AdminTab; label: string; href: string }[] = [
    { id: 'manhwas', label: 'Manhwas', href: '/admin' },
    { id: 'settings', label: 'Ajustes', href: '/admin/settings' },
  ]

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-line transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-line">
            <h1 className="text-lg font-bold text-slate-100">LexManhwa Admin</h1>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500/15 text-primary-300'
                    : 'text-slate-400 hover:bg-elevated hover:text-slate-100'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-line">
            <Button variant="danger" className="w-full" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 p-4 border-b border-line bg-surface/95 backdrop-blur-sm lg:hidden">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          <h1 className="text-lg font-bold text-slate-100">Panel de administración</h1>
          <div className="w-10" />
        </header>

        <main className="p-4 lg:p-6 space-y-6">
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-slate-100">Panel de administración</h1>
            <p className="text-slate-400">Gestiona el catálogo de manhwas y capítulos</p>
          </div>

          {activeTab === 'manhwas' && (
            <ManhwaList />
          )}

          {activeTab === 'settings' && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-100 mb-4">Ajustes</h2>
              <div className="space-y-4 text-slate-300">
                <p>Panel de ajustes en construcción.</p>
                <p className="text-sm">Aquí se podrán configurar opciones globales del sitio.</p>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}