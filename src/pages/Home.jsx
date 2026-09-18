import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

export default function Home() {
  const [designs, setDesigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null); // Estado para el modal de vista detallada

  useEffect(() => {
    // Cargar los diseños desde Laravel
    axios.get('http://127.0.0.1:8000/api/designs')
      .then(response => {
        setDesigns(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar los diseños:", error);
        setLoading(false);
      });
  }, []);

  // Filtrar por categoría y término de búsqueda
  const filteredDesigns = designs.filter(design => {
    const designCat = design.category ? design.category.toLowerCase().trim() : '';
    const selectedCat = selectedCategory.toLowerCase().trim();

    const matchesCategory = selectedCategory === 'Todos' || 
      designCat === selectedCat || 
      (selectedCat === 'coches' && designCat === 'automotriz');

    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          design.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Todos', 'Coches', 'Motos', 'K-pop', 'General'];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Luz ambiental de fondo (Mejora Visual) */}
      <div style={{
        position: 'absolute',
        top: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '650px',
        height: '280px',
        background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(129,140,248,0.04) 55%, transparent 80%)',
        filter: 'blur(70px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Barra de Navegación */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', letterSpacing: '0.5px', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🎨 Mi Portafolio Creativo
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', fontSize: '0.95rem' }}>
          <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>Galería</Link>
          <Link to="/commissions" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Pedir Encargo</Link>
          <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Admin</Link>
        </div>
      </nav>

      {/* Encabezado */}
      <header style={{ textAlign: 'center', padding: '50px 20px 30px 20px', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-1px' }}>
          Explora mi Universo Visual
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 30px auto', lineHeight: '1.5' }}>
          Diseños especializados en coches, motos, estética K-pop y proyectos generales.
        </p>

        {/* Buscador */}
        <div style={{ maxWidth: '400px', margin: '0 auto 25px auto' }}>
          <input 
            type="text" 
            placeholder="Buscar por título o descripción..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 18px', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.12)', backgroundColor: '#131b2e', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Botones de Categorías */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: selectedCategory === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: selectedCategory === cat ? '#38bdf8' : '#131b2e',
                color: selectedCategory === cat ? '#090d16' : '#94a3b8',
                fontWeight: selectedCategory === cat ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Cuadrícula de Diseños */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1, paddingBottom: '60px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>Cargando creaciones...</p>
        ) : filteredDesigns.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
            {filteredDesigns.map(design => (
              <div 
                key={design.id} 
                onClick={() => setSelectedDesign(design)} 
                style={{ 
                  backgroundColor: '#131b2e', 
                  borderRadius: '14px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255, 255, 255, 0.06)', 
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)';
                  e.currentTarget.style.boxShadow = '0 12px 30px -10px rgba(56, 189, 248, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                }}
              >
                <img 
                  src={
                    design.image_url.startsWith('http') 
                      ? design.image_url 
                      : `http://127.0.0.1:8000/storage/${design.image_url}`
                  } 
                  alt={design.title} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '600', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {design.category}
                  </span>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: '700' }}>{design.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.4', margin: 0, flexGrow: 1 }}>
                    {design.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#131b2e', borderRadius: '16px', border: '1px dashed rgba(255, 255, 255, 0.1)', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: 0 }}>No hay obras registradas en esta categoría o búsqueda.</p>
          </div>
        )}
      </main>

      {/* Modal de Vista Detallada (Lightbox) */}
      {selectedDesign && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => setSelectedDesign(null)}>
          <div style={{
            backgroundColor: '#131b2e',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            maxWidth: '800px',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedDesign(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '85vh', overflowY: 'auto' }}>
              <img 
                src={
                  selectedDesign.image_url.startsWith('http') 
                    ? selectedDesign.image_url 
                    : `http://127.0.0.1:8000/storage/${selectedDesign.image_url}`
                } 
                alt={selectedDesign.title} 
                style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', backgroundColor: '#000' }} 
              />
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '0.85rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: '700' }}>
                  {selectedDesign.category}
                </span>
                <h2 style={{ color: '#fff', margin: '8px 0 12px 0', fontSize: '1.8rem' }}>
                  {selectedDesign.title}
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                  {selectedDesign.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Modular */}
      <Footer />

    </div>
  );
}