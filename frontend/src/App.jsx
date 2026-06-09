// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AuthForm from './components/AuthForm.jsx';
import UserPanel from './components/UserPanel.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Importamos el guardián

function App() {
  const appStyle = {
    backgroundColor: '#f4f9f9',
    minHeight: '100vh',
    margin: 0,
    padding: 0
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />
        
        <div style={{ padding: '1rem' }}>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<AuthForm />} />
            <Route path="/perfil" element={<UserPanel />} />
            
            {/* RUTAS PROTEGIDAS POR ROL */}
            {/* Todo lo que metas aquí adentro pasará por el filtro del guardián */}
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
            
            {/* Comodín de redirección */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;