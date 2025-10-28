import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ProductCard from '../components/ProductCard/ProductCard';
import { productos } from '../data/productos';
import './Productos.css';

const Productos = () => {
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const categorias = ['todos', ...new Set(productos.map(p => p.categoria))];

  const productosFiltrados = productos.filter(producto => {
    const coincideCategoria = filtroCategoria === 'todos' || producto.categoria === filtroCategoria;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <Container className="productos-page py-5">
      <h1 className="text-center mb-4">Nuestros Productos</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="category-select"
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'todos' ? 'Todas las categorías' : cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <Col key={producto.id} lg={3} md={4} sm={6} className="mb-4">
              <ProductCard producto={producto} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No se encontraron productos</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Productos;