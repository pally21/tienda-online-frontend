import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente ProtectedRoute
 * Protege rutas que requieren autenticación
 * 
 * Uso: <ProtectedRoute element={<AdminPage />} rolesRequeridos={['ADMIN']} />
 */
export const ProtectedRoute = ({ element, rolesRequeridos = [] }) => {
  const { estaAutenticado, role, cargando } = useAuth();

  // Mientras se carga la autenticación
  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // No está autenticado
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // Está autenticado pero no tiene el rol requerido
  if (rolesRequeridos.length > 0 && !rolesRequeridos.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Todo bien, mostrar el elemento
  return element;
};

export default ProtectedRoute;
