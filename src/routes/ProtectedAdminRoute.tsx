import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../features/admin/checkAdmin';

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    isAdmin().then(setAdmin);
  }, []);
  if (admin === null) return <div>Cargando...</div>;
  return admin ? <>{children}</> : <Navigate to="/" replace />;
}
