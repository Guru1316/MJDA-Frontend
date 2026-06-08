import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionStr = sessionStorage.getItem('mj_session') || localStorage.getItem('mj_remember');
  
  if (sessionStr) {
    try {
      const session = JSON.parse(sessionStr);
      // If already logged in, redirect them away from Auth pages instantly!
      // eslint-disable-next-line react-hooks/error-boundaries
      return <Navigate to={session.role === 'admin' ? '/admin' : '/'} replace />;
    } catch (e) {
      console.error("Invalid session data", e);
    }
  }

  return <>{children}</>;
};

export default PublicRoute;