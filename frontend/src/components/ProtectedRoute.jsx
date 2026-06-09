// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  // ========================================================
  // MOCKUP DE JWT: Simulamos leer el Token y el Rol desde LocalStorage
  // Cuando conectes tu backend, podrás decodificar el JWT real aquí.
  // ========================================================
  const token = localStorage.getItem('token'); 
  const userRol = localStorage.getItem('user_rol'); // 'Usuario' o 'Admin'

  // Si no hay token, significa que ni siquiera se ha logeado -> Al Login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay token pero el rol actual no está autorizado para esta ruta -> Al Perfil
  if (allowedRoles && !allowedRoles.includes(userRol)) {
    alert('Acceso denegado: No tienes permisos de Administrador.');
    return <Navigate to="/perfil" replace />;
  }

  // Si pasa todas las validaciones, renderiza el componente hijo mediante <Outlet />
  return <Outlet />;
};

export default ProtectedRoute;