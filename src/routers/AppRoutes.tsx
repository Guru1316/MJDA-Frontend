import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all your pages
import Home from '../pages/Home';
import About from '../pages/About';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Faq from '../pages/Faq';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Contact from '../pages/Contact';
import Courses from '../pages/Courses';
import Application from '../pages/Application';
import Admin from '../pages/Admin'; 

// Import the new bouncer
import ProtectedRoute from '../components/ProtectedRoute';

// A simple placeholder for pages we haven't built yet
const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-(--dark) text-white pt-20 px-6 text-center">
    <div className="text-6xl mb-4">🚧</div>
    <h1 className="text-3xl font-bold font-playfair mb-2">{title} Page</h1>
    <p className="text-white/50">We are still building this page, bro. Coming soon!</p>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/courses" element={<Courses />} />
      
      {/* 🔒 PROTECTED ROUTES 🔒 */}
      <Route 
        path="/application" 
        element={
          <ProtectedRoute>
            <Application />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } 
      />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Catch-all for 404 - Page Not Found */}
      <Route path="*" element={<Placeholder title="404 - Not Found" />} />
    </Routes>
  );
};

export default AppRoutes;