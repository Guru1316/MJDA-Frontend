import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if the user has an active session or a remember-me token
  const hasSession = sessionStorage.getItem('mj_session');
  const hasRememberToken = localStorage.getItem('mj_remember');

  if (!hasSession && !hasRememberToken) {
    // Kicks them to login AND replaces the bad history entry
    return <Navigate to="/login" replace />;
  }

  // If logged in, let them through
  return <>{children}</>;
};

export default ProtectedRoute;