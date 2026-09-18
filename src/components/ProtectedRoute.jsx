import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token');

  // Si no hay token guardado, redirige automáticamente al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}