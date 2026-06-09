// UserPanel.jsx
import React, { useState } from 'react';
import './Panels.css';

const UserPanel = () => {
  // Estado para controlar si estamos editando o solo visualizando
  const [isEditing, setIsEditing] = useState(false);

  // Estado que almacena la información del usuario
  const [profile, setProfile] = useState({
    nombre: "Luis Ugalde",
    correo: "luis.ugalde@correo.com",
    rol: "Usuario",
    miembroDesde: "Enero 2026",
    id: "USR-8842"
  });

  // Estado temporal para guardar los cambios antes de confirmar
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleEditClick = () => {
    setTempProfile({ ...profile }); // Copiamos el estado actual al temporal
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleSave = () => {
    setProfile({ ...tempProfile }); // Guardamos los cambios en el estado principal
    setIsEditing(false);

    // ========================================================
    // ANOTACIÓN: ENDPOINT PARA ACTUALIZAR PERFIL (PUT / PATCH)
    // ========================================================
    console.log('Enviando perfil actualizado a la API...', tempProfile);
    /* fetch(`https://api.tu-servidor.com/usuarios/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempProfile)
      })
    */
    alert('Cambios guardados con éxito (Mockup)');
  };

  return (
    <div className="dashboard-layout">
      <div className="panel-header">
        <h1>Mi Perfil de Usuario</h1>
      </div>

      <div className="metrics-grid">
        <div className="card">
          <h3>Sesiones Iniciadas</h3>
          <p className="value">14</p>
        </div>
        <div className="card" style={{ borderLeftColor: 'var(--accent-green)' }}>
          <h3>Acciones Realizadas</h3>
          <p className="value">142</p>
        </div>
        <div className="card">
          <h3>Estado de Cuenta</h3>
          <p className="value" style={{ color: 'var(--primary-turquoise)', fontSize: '1.4rem' }}>Activo</p>
        </div>
      </div>

      <div className="profile-section">
        <div className="info-box">
          <h2>Información de la Cuenta</h2>
          
          <div className="info-item">
            <label>ID de Usuario</label>
            <p>{profile.id}</p>
          </div>

          <div className="info-item">
            <label>Nombre Completo</label>
            {isEditing ? (
              <input 
                type="text" 
                name="nombre" 
                className="edit-input" 
                value={tempProfile.nombre} 
                onChange={handleInputChange} 
              />
            ) : (
              <p>{profile.nombre}</p>
            )}
          </div>

          <div className="info-item">
            <label>Correo Electrónico</label>
            {isEditing ? (
              <input 
                type="email" 
                name="correo" 
                className="edit-input" 
                value={tempProfile.correo} 
                onChange={handleInputChange} 
              />
            ) : (
              <p>{profile.correo}</p>
            )}
          </div>

          <div className="info-item">
            <label>Tipo de Cuenta</label>
            <p><span className="badge user">{profile.rol}</span></p>
          </div>

          <div className="info-item">
            <label>Fecha de Registro</label>
            <p>{profile.miembroDesde}</p>
          </div>

          <div className="edit-actions">
            {isEditing ? (
              <>
                <button type="button" className="panel-btn" onClick={handleSave}>Guardar</button>
                <button type="button" className="panel-btn secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
              </>
            ) : (
              <button type="button" className="panel-btn" onClick={handleEditClick}>Editar Perfil</button>
            )}
          </div>
        </div>

        <div className="info-box">
          <h2>Última Actividad</h2>
          <div className="info-item" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem' }}>
            <label>Hace unos instantes</label>
            <p>Visualizando panel de control.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;