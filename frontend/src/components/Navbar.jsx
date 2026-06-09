// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* El logo ahora te redirige al inicio/login */}
      <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>
        Bio<span>Auth</span>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-item" style={{ textDecoration: 'none' }}>
            Autenticación
          </Link>
        </li>
        <li>
          <Link to="/perfil" className="nav-item" style={{ textDecoration: 'none' }}>
            Mi Perfil
          </Link>
        </li>
        <li>
          <Link to="/admin" className="nav-item nav-btn-mock" style={{ textDecoration: 'none' }}>
            Panel Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;