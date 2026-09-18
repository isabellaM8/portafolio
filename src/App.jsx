import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Commissions from './pages/Commissions'; // Asegúrate de que este archivo exista en src/pages/
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal / galería pública */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Ruta para realizar pedidos / encargos */}
        <Route path="/commissions" element={<Commissions />} />

        {/* Ruta protegida exclusiva para el administrador */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}