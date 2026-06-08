import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const sessionStr = sessionStorage.getItem('mj_session') || localStorage.getItem('mj_remember');

  if (!sessionStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const session = JSON.parse(sessionStr);
    const isAdmin = session.role === 'admin';
    const currentPath = window.location.pathname;

    // RULE 1: If Admin, ONLY allow access to /admin
    if (isAdmin && currentPath !== '/admin') {
      // eslint-disable-next-line react-hooks/error-boundaries
      return <Navigate to="/admin" replace />;
    }

    // RULE 2: If Student, block access to /admin
    if (!isAdmin && currentPath === '/admin') {
      // eslint-disable-next-line react-hooks/error-boundaries
      return <Navigate to="/" replace />;
    }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;