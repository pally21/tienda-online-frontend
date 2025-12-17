import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const PedidosContext = createContext();

export const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { usuario, token } = useAuth();

  // Cargar pedidos del usuario al autenticarse
  const cargarPedidos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/pedidos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Error al cargar pedidos');
      
      const data = await response.json();
      setPedidos(data.data || []);
    } catch (err) {
      console.error('Error cargando pedidos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (usuario && token) {
      cargarPedidos();
    }
  }, [usuario, token, cargarPedidos]);

  const crearPedido = async (datosPedido, productosCarrito, total, metodoPago = 'tarjeta') => {
    try {
      setLoading(true);
      setError(null);
      
      // Validar que tenemos token
      if (!token) {
        throw new Error('No estás autenticado. Por favor inicia sesión.');
      }

      console.log('📦 Creando pedido:', {
        token: token.substring(0, 20) + '...',
        datosEnvio: datosPedido,
        productosCarrito: productosCarrito.length,
        total,
        metodoPago
      });
      
      const response = await fetch('http://localhost:3001/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productos: productosCarrito,
          total,
          datosEnvio: datosPedido,
          metodoPago
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('❌ Error del servidor:', data);
        throw new Error(data.error || 'Error al crear pedido en el servidor');
      }
      
      const nuevoPedido = data.data;
      console.log('✅ Pedido creado:', nuevoPedido.id);
      
      // Actualizar estado local
      setPedidos([nuevoPedido, ...pedidos]);
      
      return nuevoPedido;
    } catch (err) {
      console.error('Error creando pedido:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obtenerPedidoPorId = (id) => {
    return pedidos.find(pedido => pedido.id === parseInt(id));
  };

  const actualizarEstadoPedido = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`http://localhost:3001/api/pedidos/${id}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (!response.ok) throw new Error('Error al actualizar estado');
      
      const data = await response.json();
      
      // Actualizar estado local
      setPedidos(pedidos.map(pedido =>
        pedido.id === id ? data.data : pedido
      ));
      
      return data.data;
    } catch (err) {
      console.error('Error actualizando estado:', err);
      setError(err.message);
      throw err;
    }
  };

  const eliminarPedido = (id) => {
    setPedidos(pedidos.filter(pedido => pedido.id !== id));
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        loading,
        error,
        crearPedido,
        obtenerPedidoPorId,
        actualizarEstadoPedido,
        eliminarPedido,
        cargarPedidos
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos debe ser usado dentro de PedidosProvider');
  }
  return context;
};