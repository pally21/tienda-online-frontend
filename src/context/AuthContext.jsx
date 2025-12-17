import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginAPI, register as registerAPI, logout as logoutAPI } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario del localStorage al montar
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    const roleGuardado = localStorage.getItem('role');

    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
      setRole(roleGuardado);
    }

    setCargando(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await loginAPI(email, password);
      setToken(response.token);
      setUsuario(response.usuario);
      setRole(response.usuario.role);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // REGISTER
  const register = async (nombre, email, password) => {
    try {
      setError(null);
      const response = await registerAPI(nombre, email, password);
      setToken(response.token);
      setUsuario(response.usuario);
      setRole(response.usuario.role);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // LOGOUT
  const logout = () => {
    logoutAPI();
    setToken(null);
    setUsuario(null);
    setRole(null);
    setError(null);
  };

  const value = {
    usuario,
    token,
    role,
    cargando,
    error,
    login,
    register,
    logout,
    estaAutenticado: !!token,
    esAdmin: role === 'ADMIN'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
