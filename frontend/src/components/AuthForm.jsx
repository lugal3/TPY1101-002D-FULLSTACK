// AuthForm.jsx
import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = () => {
  // Estado para controlar si estamos en modo Login (true) o Crear Cuenta (false)
  const [isLogin, setIsLogin] = useState(true);

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  // Estado para manejar los errores de validación
  const [errors, setErrors] = useState({});

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar el error del campo que se está modificando
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Función para alternar entre Login y Registro
  const switchMode = (mode) => {
    setIsLogin(mode);
    // Limpiar formulario y errores al cambiar de pestaña
    setFormData({ nombre: '', correo: '', contrasena: '' });
    setErrors({});
  };

  // Validaciones del formulario
  const validarFormulario = () => {
    let erroresDetectados = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación del nombre (solo si es Crear Cuenta)
    if (!isLogin && !formData.nombre.trim()) {
      erroresDetectados.nombre = 'El nombre es obligatorio.';
    }

    // Validación del correo
    if (!formData.correo) {
      erroresDetectados.correo = 'El correo electrónico es obligatorio.';
    } else if (!regexEmail.test(formData.correo)) {
      erroresDetectados.correo = 'El formato del correo no es válido.';
    }

    // Validación de contraseña (mínimo 2 caracteres como solicitaste)
    if (!formData.contrasena) {
      erroresDetectados.contrasena = 'La contraseña es obligatoria.';
    } else if (formData.contrasena.length < 2) {
      erroresDetectados.contrasena = 'La contraseña debe tener al menos 2 caracteres.';
    }

    setErrors(erroresDetectados);
    // Retorna true si no hay errores
    return Object.keys(erroresDetectados).length === 0;
  };

  // Manejador del envío
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      if (isLogin) {
        // ========================================================
        // ANOTACIÓN: ENDPOINT PARA INICIAR SESIÓN (LOGIN)
        // ========================================================
        console.log('Enviando datos a la API de Login...', {
          correo: formData.correo,
          contrasena: formData.contrasena
        });
        /* Ejemplo de integración:
          fetch('https://api.tu-servidor.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: formData.correo, contrasena: formData.contrasena })
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.error(err));
        */
        alert('Simulación: Login exitoso');
      } else {
        // ========================================================
        // ANOTACIÓN: ENDPOINT PARA CREAR CUENTA (SIGN UP)
        // ========================================================
        console.log('Enviando datos a la API de Registro...', formData);
        /* Ejemplo de integración:
          fetch('https://api.tu-servidor.com/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.error(err));
        */
        alert('Simulación: Registro exitoso');
      }
    }
  };

  return (
    <div className="auth-container">
      {/* Pestañas para intercalar entre Login y Registro */}
      <div className="auth-tabs">
        <button 
          type="button" 
          className={`tab-button ${isLogin ? 'active' : ''}`}
          onClick={() => switchMode(true)}
        >
          Logear
        </button>
        <button 
          type="button" 
          className={`tab-button ${!isLogin ? 'active' : ''}`}
          onClick={() => switchMode(false)}
        >
          Crear Cuenta
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Campo Nombre: Solo se renderiza si NO está en modo Login */}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-input"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
          </div>
        )}

        {/* Campo Correo */}
        <div className="form-group">
          <label htmlFor="correo" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="form-input"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
          {errors.correo && <span className="error-text">{errors.correo}</span>}
        </div>

        {/* Campo Contraseña */}
        <div className="form-group">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            className="form-input"
            value={formData.contrasena}
            onChange={handleChange}
            placeholder="Mínimo 2 caracteres"
          />
          {errors.contrasena && <span className="error-text">{errors.contrasena}</span>}
        </div>

        {/* Botón de Envío Dinámico */}
        <button type="submit" className="submit-button">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>

        {/* Texto alternativo inferior para mejorar la UX */}
        <div className="toggle-prompt">
          {isLogin ? (
            <span>¿No tienes cuenta? <button type="button" className="toggle-link" onClick={() => switchMode(false)}>Regístrate aquí</button></span>
          ) : (
            <span>¿Ya tienes cuenta? <button type="button" className="toggle-link" onClick={() => switchMode(true)}>Inicia sesión aquí</button></span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;