import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { usePedidos } from '../../context/PedidosContext';
import './PedidoConfirmado.css';

const PedidoConfirmado = () => {
  const { id } = useParams();
  const { obtenerPedidoPorId } = usePedidos();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const pedidoEncontrado = obtenerPedidoPorId(parseInt(id));
    setPedido(pedidoEncontrado);
  }, [id, obtenerPedidoPorId]);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!pedido) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h2>Pedido no encontrado</h2>
          <Link to="/productos">
            <Button variant="primary">Ir a Productos</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pedido-confirmado-page mt-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="confirmacion-icon text-center mb-4">
            <div className="check-icon">✓</div>
            <h1 className="text-success">¡Pedido Confirmado!</h1>
            <p className="text-muted">Gracias por tu compra</p>
          </div>

          <Card className="mb-4">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Pedido #{pedido.id}</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6}>
                  <h6>Datos de Envío:</h6>
                  <p className="mb-1"><strong>{pedido.datosEnvio?.nombre || pedido.datosCliente?.nombre}</strong></p>
                  <p className="mb-1">{pedido.datosEnvio?.email || pedido.datosCliente?.email || pedido.email}</p>
                  <p className="mb-1">{pedido.datosEnvio?.telefono || pedido.datosCliente?.telefono}</p>
                  <p className="mb-1">{pedido.datosEnvio?.direccion || pedido.datosCliente?.direccion}</p>
                  <p className="mb-1">{pedido.datosEnvio?.ciudad || pedido.datosCliente?.ciudad}, {pedido.datosEnvio?.region || pedido.datosCliente?.region}</p>
                </Col>
                <Col md={6}>
                  <h6>Información del Pedido:</h6>
                  <p className="mb-1"><strong>Fecha:</strong> {formatearFecha(pedido.fecha)}</p>
                  <p className="mb-1"><strong>Estado:</strong> <span className="badge bg-warning">{pedido.estado}</span></p>
                  <p className="mb-1"><strong>Método de Pago:</strong> {pedido.metodoPago === 'tarjeta' ? '💳 Tarjeta' : pedido.metodoPago === 'transferencia' ? '🏦 Transferencia' : '💵 Contra entrega'}</p>
                  {pedido.numeroSeguimiento && (
                    <p className="mb-1"><strong>Seguimiento:</strong> <code>{pedido.numeroSeguimiento}</code></p>
                  )}
                </Col>
              </Row>

              <h6 className="mb-3">Productos:</h6>
              <ListGroup variant="flush">
                {pedido.productos.map((producto) => (
                  <ListGroup.Item key={producto.id}>
                    <Row className="align-items-center">
                      <Col xs={2}>
                        <img 
                          src={producto.imagen} 
                          alt={producto.nombre}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={6}>
                        <strong>{producto.nombre}</strong>
                        <br />
                        <small className="text-muted">Cantidad: {producto.cantidad}</small>
                      </Col>
                      <Col xs={4} className="text-end">
                        <strong>{formatearPrecio(producto.precio * producto.cantidad)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mt-4 p-3 bg-light rounded">
                <Row>
                  <Col xs={6}>
                    <p className="mb-1">Subtotal:</p>
                    <p className="mb-1">Envío:</p>
                    <h5 className="mb-0">Total:</h5>
                  </Col>
                  <Col xs={6} className="text-end">
                    <p className="mb-1">{formatearPrecio(pedido.total)}</p>
                    <p className="mb-1 text-success">Gratis</p>
                    <h5 className="mb-0 text-primary">{formatearPrecio(pedido.total)}</h5>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>

          <div className="text-center">
            <p className="mb-3">
              Hemos enviado un email de confirmación a <strong>{pedido.datosEnvio?.email || pedido.datosCliente?.email || pedido.email}</strong>
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link to="/mis-pedidos">
                <Button variant="primary" size="lg">
                  Ver Mis Pedidos
                </Button>
              </Link>
              <Link to="/productos">
                <Button variant="outline-primary" size="lg">
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PedidoConfirmado;