import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useDemoCatalog } from '../lib/demo/hooks'

export default function AdminRoute() {
  const { isAdminAuthenticated } = useDemoCatalog()
  const location = useLocation()

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <Outlet />
}