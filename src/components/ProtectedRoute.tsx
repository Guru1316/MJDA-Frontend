import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean; // <-- Added this
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const sessionStr = sessionStorage.getItem('mj_session') || localStorage.getItem('mj_remember');

  if (!sessionStr) {
    // Not logged in? Kick to login and replace history!
    return <Navigate to="/login" replace />;
  }

  try {
    const session = JSON.parse(sessionStr);
    
    // If this page requires Admin, but user is a student, kick them to Home!
    if (requireAdmin && session.role !== 'admin') {
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