import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Obtenemos la URL de la API desde las variables de entorno de Vite.
    // Si no está definida (por ejemplo, en local sin .env), recurre por defecto a localhost.
    const API_URL = import.meta.env.VITE_API_URL || 'https://backend-portafolio-production-be5a.up.railway.app';

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Correo o contraseña incorrectos.');
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al conectar con el servidor.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#05070c', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ width: '100%', maxWidth: '420px', padding: '40px', backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '8px' }}>Acceso Administrador</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Introduce tus credenciales para gestionar el portafolio.</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8', fontWeight: '500' }}>Correo Electrónico:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="laisa26@gmail.com"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8', fontWeight: '500' }}>Contraseña:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Mín. 8 carac. (letras, números y símbolos)"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
            <span style={{ display: 'block', marginTop: '6px', fontSize: '0.75rem', color: '#64748b' }}>
              Debe incluir mayúsculas, minúsculas, números y un carácter especial (ej. Password*123).
            </span>
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '12px', marginTop: '8px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Entrar al Panel
          </button>
        </form>

      </div>
    </div>
  );
}