// AdminPanel.jsx
import React, { useState } from 'react';
import './Panels.css';

const AdminPanel = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Luis Ugalde', correo: 'luis.ugalde@correo.com', rol: 'Usuario', estado: 'Activo' },
    { id: 2, nombre: 'Ana María', correo: 'ana.maria@empresa.cl', rol: 'Admin', estado: 'Activo' },
    { id: 3, nombre: 'Carlos Plaza', correo: 'cplaza@holding.com', rol: 'Usuario', estado: 'Inactivo' },
    { id: 4, nombre: 'Sofía Valdés', correo: 'svaldes@tech.io', rol: 'Usuario', estado: 'Activo' }
  ]);

  const [editingUser, setEditingUser] = useState(null);

  const handleGestionarClick = (usuario) => {
    setEditingUser({ ...usuario });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    
    const listaActualizada = usuarios.map(u => u.id === editingUser.id ? editingUser : u);
    setUsuarios(listaActualizada);

    // MOCKUP: Aquí irá tu fetch PATCH/PUT al backend más adelante
    console.log(`Enviando cambios del usuario #${editingUser.id}:`, editingUser);

    setEditingUser(null);
    alert('Usuario actualizado con éxito.');
  };

  return (
    <div className="dashboard-layout">
      <div className="panel-header">
        <h1>Panel de Administración</h1>
      </div>

      <div className="metrics-grid">
        <div className="card">
          <h3>Usuarios Totales</h3>
          <p className="value">{usuarios.length}</p>
        </div>
        <div className="card" style={{ borderLeftColor: 'var(--accent-green)' }}>
          <h3>Activos</h3>
          <p className="value">{usuarios.filter(u => u.estado === 'Activo').length}</p>
        </div>
        <div className="card">
          <h3>Peticiones API (24h)</h3>
          <p className="value">45.2k</p>
        </div>
      </div>

      <div className="table-container">
        <h2 style={{ margin: '0 0 1rem 0', color: 'var(--dark-green)', fontSize: '1.3rem' }}>Gestión de Usuarios</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usr) => (
              <tr key={usr.id}>
                <td>#{usr.id}</td>
                <td style={{ fontWeight: '500' }}>{usr.nombre}</td>
                <td>{usr.correo}</td>
                <td>
                  <span className={`badge ${usr.rol === 'Admin' ? 'admin' : 'user'}`}>
                    {usr.rol}
                  </span>
                </td>
                <td>
                  <span style={{ color: usr.estado === 'Activo' ? 'var(--primary-turquoise)' : '#64748b', fontWeight: '600' }}>
                    {usr.estado}
                  </span>
                </td>
                <td>
                  <button 
                    type="button" 
                    className="panel-btn secondary" 
                    style={{ padding: '0.3rem 0.7rem', fontSize: '0.85rem' }}
                    onClick={() => handleGestionarClick(usr)}
                  >
                    Gestionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulario de Edición Dinámica */}
        {editingUser && (
          <div className="info-box admin-edit-box">
            <h2>Gestionar Usuario: {editingUser.correo}</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="form-row">
                {/* NUEVO: Campo para editar Nombre */}
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Nombre Completo</label>
                  <input 
                    type="text"
                    name="nombre"
                    className="edit-input"
                    value={editingUser.nombre}
                    onChange={handleEditChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Rol del Sistema</label>
                  <select 
                    name="rol" 
                    className="select-input" 
                    value={editingUser.rol} 
                    onChange={handleEditChange}
                  >
                    <option value="Usuario">Usuario</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Estado de Admisión</label>
                  <select 
                    name="estado" 
                    className="select-input" 
                    value={editingUser.estado} 
                    onChange={handleEditChange}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="edit-actions">
                <button type="submit" className="panel-btn">Aplicar Cambios</button>
                <button type="button" className="panel-btn secondary" onClick={() => setEditingUser(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;