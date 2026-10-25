import { BrowserRouter } from 'react-router-dom'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ink text-slate-100">
        <SiteHeader />
        <AppRoutes />
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
