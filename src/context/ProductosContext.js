import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchJson } from "../utils/api";

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ==========================
  //   CARGAR PRODUCTOS
  // ==========================
  const cargarProductos = async () => {
    try {
      setCargando(true);
      const response = await fetchJson("/productos");
      // La API devuelve { success: true, data: [...] }
      const productosData = response.data || response;
      setProductos(Array.isArray(productosData) ? productosData : []);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("No se pudieron cargar los productos 😥");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
    
    // Recargar productos cada 5 segundos para detectar cambios desde otras pestañas/usuarios
    const intervalo = setInterval(() => {
      console.log('🔄 Recargando productos...');
      cargarProductos();
    }, 5000);
    
    return () => clearInterval(intervalo);
  }, []);

  // ==========================
  //   AGREGAR PRODUCTO
  // ==========================
  const agregarProducto = async (producto) => {
    const nuevo = await fetchJson("/productos", {
      method: "POST",
      body: JSON.stringify(producto),
    });
    setProductos([...productos, nuevo]);
  };

  // ==========================
  //   ACTUALIZAR PRODUCTO
  // ==========================
  const actualizarProducto = async (id, producto) => {
    const actualizado = await fetchJson(`/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify(producto),
    });

    setProductos(productos.map((p) => (p.id === id ? actualizado : p)));
  };

  // ==========================
  //   ELIMINAR PRODUCTO
  // ==========================
  const eliminarProducto = async (id) => {
    try {
      console.log('🗑️ Iniciando eliminación de producto ID:', id);
      
      // Usar fetchJson que incluye el token JWT automáticamente
      const response = await fetchJson(`/productos/${id}`, {
        method: "DELETE"
      });
      
      console.log('✅ Producto eliminado del servidor:', response);

      // RECARGAR lista completa desde servidor
      const productosResponse = await fetchJson("/productos");
      const productosData = productosResponse.data || productosResponse;
      
      console.log('📦 Productos reloaded:', productosData);
      
      setProductos(Array.isArray(productosData) ? productosData : []);
      
      console.log('✅ Estado actualizado');
    } catch (err) {
      console.error('❌ Error eliminando producto:', err);
      throw err;
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        error,
        recargarProductos: cargarProductos,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => useContext(ProductosContext);

