import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoCatalog } from '../../lib/demo/hooks'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'

export default function LoginPage() {
  const navigate = useNavigate()
  const { loginAdmin, isAdminAuthenticated } = useDemoCatalog()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (email === 'admin@demo.com' && password === 'demo1234') {
      loginAdmin()
      navigate('/admin', { replace: true })
    } else {
      setError('Credenciales inválidas. Usa admin@demo.com / demo1234')
    }
  }

  if (isAdminAuthenticated()) {
    navigate('/admin', { replace: true })
    return null
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-ink px-4 py-10">
      <Card className="w-full max-w-md">
        <div className="p-8 space-y-6">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-slate-100">Panel de Administración</h1>
            <p className="mt-2 text-slate-400">Inicia sesión para gestionar el catálogo</p>
          </header>

          <div className="bg-surface/50 rounded-xl p-4 text-xs text-slate-400 space-y-1">
            <p><strong>Credenciales de prueba:</strong></p>
            <p>Email: <code className="text-slate-300">admin@demo.com</code></p>
            <p>Contraseña: <code className="text-slate-300">demo1234</code></p>
          </div>

          {error && (
            <div className="rounded-lg bg-rose-500/15 border border-rose-500/30 p-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@demo.com"
              required
              autoComplete="email"
            />
            <Input
              id="password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="demo1234"
              required
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full" size="lg">
              Iniciar sesión
            </Button>
          </form>
        </div>
      </Card>
    </main>
  )
}