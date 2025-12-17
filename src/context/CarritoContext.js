import React, { createContext, useState, useContext } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    console.log('🛒 Agregando al carrito:', producto);
    
    const productoExiste = carrito.find(item => item.id === producto.id);
    
    if (productoExiste) {
      // Aumentar cantidad
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
      console.log('✅ Cantidad aumentada para:', producto.nombre);
    } else {
      // Agregar nuevo producto
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      console.log('✅ Producto agregado:', producto.nombre);
    }
    
    return true;
  };

  const eliminarDelCarrito = (id) => {
    console.log('🗑️ Eliminando del carrito:', id);
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    console.log('🧹 Vaciando carrito');
    setCarrito([]);
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    
    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad } : item
    ));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        actualizarCantidad,
        calcularTotal,
        obtenerCantidadTotal
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};