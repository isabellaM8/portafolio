import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer'; // o la ruta donde lo guardes


export default function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Coches');
  const [image, setImage] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [editingId, setEditingId] = useState(null); // ID del diseño que se está editando
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchDesigns();
    }
  }, [token, navigate]);

  const fetchDesigns = () => {
    axios.get('http://127.0.0.1:8000/api/designs')
      .then(response => setDesigns(response.data))
      .catch(error => console.error("Error al cargar lista:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    // Si estamos editando, enviamos a la ruta con ID
    const url = editingId 
      ? `http://127.0.0.1:8000/api/designs/${editingId}` 
      : 'http://127.0.0.1:8000/api/designs';

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setMessage(editingId ? '¡Diseño actualizado con éxito!' : '¡Diseño publicado con éxito!');
      resetForm();
      fetchDesigns();
      setLoading(false);
    })
    .catch(error => {
      console.error("Error en la operación:", error);
      setMessage('Hubo un error al procesar la solicitud.');
      setLoading(false);
    });
  };

  const handleEdit = (design) => {
    setEditingId(design.id);
    setTitle(design.title);
    setDescription(design.description);
    setCategory(design.category);
    setImage(null); // La imagen es opcional al editar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás segura de que deseas eliminar este diseño?')) {
      axios.delete(`http://127.0.0.1:8000/api/designs/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(() => {
        fetchDesigns();
        setMessage('Diseño eliminado correctamente.');
      })
      .catch(error => {
        console.error("Error al eliminar:", error);
        setMessage('No se pudo eliminar el diseño.');
      });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Coches');
    setImage(null);
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Barra de Navegación */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'rgba(9, 13, 22, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🛠️ Panel de Administración
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Ver Galería</Link>
          <button 
            onClick={handleLogout}
            style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Formulario de Subida / Edición */}
        <div style={{ backgroundColor: '#131b2e', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <h2 style={{ marginTop: 0, color: '#fff', fontSize: '1.5rem', marginBottom: '20px' }}>
            {editingId ? '✏️ Editar Diseño' : '✨ Publicar Nueva Obra'}
          </h2>

          {message && (
            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', borderRadius: '8px', marginBottom: '20px', fontSize: '0.95rem' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Título de la Obra:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Descripción / Historia:</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required
                rows="4"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>Categoría:</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#090d16', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
              >
                <option value="Coches">Coches</option>
                <option value="Motos">Motos</option>
                <option value="K-pop">K-pop</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>
                {editingId ? 'Imagen Nueva (Opcional, si deseas cambiarla):' : 'Seleccionar Imagen:'}
              </label>
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
                {...(!editingId ? { required: true } : {})}
                style={{ color: '#94a3b8', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ backgroundColor: '#38bdf8', color: '#090d16', border: 'none', padding: '14px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', flex: 1 }}
              >
                {loading ? 'Guardando...' : editingId ? 'Actualizar Diseño' : 'Publicar en la Galería'}
              </button>

              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  style={{ backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Listado de Diseños Existentes para Administrar */}
        <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '20px' }}>📂 Obras Publicadas ({designs.length})</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {designs.map(design => (
            <div key={design.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#131b2e', padding: '15px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={design.image_url} alt={design.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1rem' }}>{design.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: '650' }}>{design.category}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleEdit(design)}
                  style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(design.id)}
                  style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
<Footer />
    </div>
  );
}