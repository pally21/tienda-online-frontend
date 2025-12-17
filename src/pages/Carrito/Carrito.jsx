import React from 'react';
import { Container, Row, Col, Card, Button, Table, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import './Carrito.css';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, calcularTotal } = useCarrito();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const handleCantidadChange = (id, nuevaCantidad) => {
    if (nuevaCantidad >= 1) {
      actualizarCantidad(id, parseInt(nuevaCantidad));
    }
  };

  if (carrito.length === 0) {
    return (
      <Container className="carrito-vacio mt-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="carrito-vacio-icon">🛒</div>
            <h2>Tu carrito está vacío</h2>
            <p className="text-muted">No has agregado productos aún</p>
            <Link to="/productos">
              <Button variant="primary" size="lg">
                Ver Productos
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="carrito-page mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">🛒 Mi Carrito</h1>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Productos ({carrito.length})</h5>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => {
                  if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
                    vaciarCarrito();
                  }
                }}
              >
                Vaciar Carrito
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image 
                            src={item.imagen} 
                            alt={item.nombre}
                            thumbnail
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            className="me-3"
                          />
                          <div>
                            <strong>{item.nombre}</strong>
                            <br />
                            <small className="text-muted">{item.categoria}</small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        {formatearPrecio(item.precio)}
                      </td>
                      <td className="align-middle">
                        <div className="cantidad-control d-flex align-items-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleCantidadChange(item.id, item.cantidad - 1)}
                          >
                            -
                          </Button>
                          <input 
                            type="number" 
                            value={item.cantidad}
                            onChange={(e) => handleCantidadChange(item.id, e.target.value)}
                            className="form-control mx-2 text-center"
                            style={{ width: '60px' }}
                            min="1"
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleCantidadChange(item.id, item.cantidad + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="align-middle">
                        <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>
                      </td>
                      <td className="align-middle">
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => eliminarDelCarrito(item.id)}
                        >
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="resumen-compra sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Resumen de Compra</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatearPrecio(calcularTotal())}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary fs-4">{formatearPrecio(calcularTotal())}</strong>
              </div>
              <Link to="/checkout">
                <Button variant="success" size="lg" className="w-100 mb-2">
                  Proceder al Pago
                </Button>
              </Link>
              <Link to="/productos">
                <Button variant="outline-primary" className="w-100">
                  Seguir Comprando
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;