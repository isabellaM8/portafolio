import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      marginTop: '80px', 
      borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
      backgroundColor: '#070a10', 
      padding: '40px 20px', 
      color: '#94a3b8' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '20px', 
        textAlign: 'center' 
      }}>
        
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.1rem', 
          background: 'linear-gradient(90deg, #38bdf8, #818cf8)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          fontWeight: '700'
        }}>
          🎨 Mi Portafolio Creativo
        </h3>
        
        <p style={{ fontSize: '0.9rem', maxWidth: '450px', margin: 0, lineHeight: '1.5' }}>
          Transformando ideas y conceptos visuales en experiencias digitales únicas.
        </p>

        <div style={{ display: 'flex', gap: '20px', fontSize: '0.95rem', margin: '10px 0' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#38bdf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
            Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#38bdf8'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
            Facebook
          </a>
        </div>

        <div style={{ fontSize: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)', width: '100%', paddingTop: '20px', marginTop: '10px' }}>
          © {new Date().getFullYear()} — Diseñado y desarrollado con pasión. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}