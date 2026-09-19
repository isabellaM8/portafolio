import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Commissions() {
  const [clientName, setClientName] = useState('');
  const [projectType, setProjectType] = useState('Coches');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reemplaza este número con tu número real de WhatsApp con código de país
    const phoneNumber = "573013840860"; 

    // Construir el mensaje personalizado para WhatsApp
    const message = `¡Hola! Me interesa solicitar un encargo para mi proyecto.%0A%0A` +
      `*Nombre:* ${encodeURIComponent(clientName)}%0A` +
      `*Categoría:* ${encodeURIComponent(projectType)}%0A` +
      `*Presupuesto Estimado:* ${encodeURIComponent(budget || 'No especificado')}%0A` +
      `*Detalles / Idea:* ${encodeURIComponent(details)}`;

    // Abrir WhatsApp con el mensaje prellenado
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

    // Limpiar los campos del formulario para un nuevo cliente
    setClientName('');
    setProjectType('Coches');
    setBudget('');
    setDetails('');
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Barra de Navegación Responsiva */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '15px', 
        padding: '15px 25px', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
        backgroundColor: 'rgba(9, 13, 22, 0.85)', 
        backdropFilter: 'blur(10px)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100 
      }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🎨 Mi Portafolio Creativo
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.95rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Galería</Link>
          <Link to="/commissions" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>Pedir Encargo</Link>
          <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Admin</Link>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div style={{ flex: 1, maxWidth: '700px', margin: '40px auto', padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1 style={{ fontSize: '2.3rem', fontWeight: '800', marginBottom: '10px' }}>Solicita tu Encargo</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.5' }}>
            ¿Tienes una idea en mente? Cuéntame los detalles y conversemos directamente por WhatsApp para hacerla realidad.
          </p>
        </div>

        <div style={{ backgroundColor: '#131b2e', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Tu Nombre / Marca:</label>
              <input 
                type="text" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
                required
                placeholder="Ej. Carlos Pérez"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Tipo de Proyecto:</label>
              <select 
                value={projectType} 
                onChange={(e) => setProjectType(e.target.value)} 
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
              >
                <option value="Coches">Coches</option>
                <option value="Motos">Motos</option>
                <option value="K-pop">K-pop</option>
                <option value="General">General / Personalizado</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Presupuesto Estimado (Opcional):</label>
              <input 
                type="text" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                placeholder="Ej. $100 - $200 USD o COP"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Descripción de la Idea o Requerimientos:</label>
              <textarea 
                value={details} 
                onChange={(e) => setDetails(e.target.value)} 
                required
                rows="5"
                placeholder="Cuéntame qué estilo buscas, colores, referencias o el propósito del diseño..."
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              style={{ 
                backgroundColor: '#22c55e', 
                color: '#fff', 
                border: 'none', 
                padding: '14px 24px', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                cursor: 'pointer', 
                fontSize: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                transition: 'background 0.2s',
                marginTop: '10px'
              }}
            >
              💬 Enviar Cotización por WhatsApp
            </button>

          </form>
        </div>

      </div>

      {/* Footer Modular */}
      <Footer />

    </div>
  );
}