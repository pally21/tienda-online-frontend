import React from 'react';
import { Container, Row, Col, Card, Badge, Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePedidos } from '../../context/PedidosContext';
import './MisPedidos.css';

const MisPedidos = () => {
  const { pedidos, eliminarPedido } = usePedidos();
  const [showModal, setShowModal] = React.useState(false);
  const [pedidoAEliminar, setPedidoAEliminar] = React.useState(null);

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

  const obtenerColorEstado = (estado) => {
    const colores = {
      'Pendiente': 'warning',
      'Procesando': 'info',
      'Enviado': 'primary',
      'Entregado': 'success',
      'Cancelado': 'danger'
    };
    return colores[estado] || 'secondary';
  };

  const handleEliminarClick = (pedido) => {
    setPedidoAEliminar(pedido);
    setShowModal(true);
  };

  const confirmarEliminar = () => {
    if (pedidoAEliminar) {
      eliminarPedido(pedidoAEliminar.id);
      setShowModal(false);
      setPedidoAEliminar(null);
    }
  };

  const cancelarEliminar = () => {
    setShowModal(false);
    setPedidoAEliminar(null);
  };

  if (pedidos.length === 0) {
    return (
      <Container className="mis-pedidos-vacio mt-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="pedidos-vacio-icon">📦</div>
            <h2>No tienes pedidos aún</h2>
            <p className="text-muted">Cuando realices una compra, aparecerá aquí</p>
            <Link to="/productos">
              <Button variant="primary" size="lg">
                Explorar Productos
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mis-pedidos-page mt-4 mb-5">
      <Row className="mb-4">
        <Col>
          <h1>Mis Pedidos</h1>
          <p className="text-muted">Historial de {pedidos.length} pedido(s)</p>
        </Col>
      </Row>

      <Row>
        {pedidos.map((pedido) => (
          <Col key={pedido.id} xs={12} className="mb-4">
            <Card className="pedido-card">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Pedido #{pedido.id}</strong>
                  <br />
                  <small className="text-muted">{formatearFecha(pedido.fecha)}</small>
                </div>
                <Badge bg={obtenerColorEstado(pedido.estado)}>
                  {pedido.estado}
                </Badge>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <h6 className="mb-3">Productos:</h6>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Precio Unit.</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.productos.map((producto) => (
                          <tr key={producto.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={producto.imagen} 
                                  alt={producto.nombre}
                                  style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                                  className="rounded"
                                />
                                {producto.nombre}
                              </div>
                            </td>
                            <td>{producto.cantidad}</td>
                            <td>{formatearPrecio(producto.precio)}</td>
                            <td><strong>{formatearPrecio(producto.precio * producto.cantidad)}</strong></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>

                  <Col md={4}>
                    <Card className="bg-light">
                      <Card.Body>
                        <h6 className="mb-3">Datos de Envío</h6>
                        <p className="mb-1"><strong>Nombre:</strong> {pedido.datosEnvio?.nombre || pedido.datosCliente?.nombre}</p>
                        <p className="mb-1"><strong>Email:</strong> {pedido.datosEnvio?.email || pedido.datosCliente?.email || pedido.email}</p>
                        <p className="mb-1"><strong>Teléfono:</strong> {pedido.datosEnvio?.telefono || pedido.datosCliente?.telefono}</p>
                        <p className="mb-1"><strong>Dirección:</strong> {pedido.datosEnvio?.direccion || pedido.datosCliente?.direccion}</p>
                        <p className="mb-1"><strong>Ciudad:</strong> {pedido.datosEnvio?.ciudad || pedido.datosCliente?.ciudad}</p>
                        <p className="mb-3"><strong>Región:</strong> {pedido.datosEnvio?.region || pedido.datosCliente?.region}</p>
                        
                        <hr />
                        
                        <div className="d-flex justify-content-between mb-2">
                          <span>Subtotal:</span>
                          <span>{formatearPrecio(pedido.total)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Envío:</span>
                          <span className="text-success">Gratis</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <strong>Total:</strong>
                          <strong className="text-primary fs-5">{formatearPrecio(pedido.total)}</strong>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEliminarClick(pedido)}
                >
                  🗑️ Eliminar Pedido
                </Button>
                <Link to={`/pedido-confirmado/${pedido.id}`}>
                  <Button variant="outline-primary" size="sm">
                    Ver Detalles
                  </Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={cancelarEliminar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pedidoAEliminar && (
            <>
              <p>¿Estás seguro de que deseas eliminar este pedido?</p>
              <p><strong>Pedido #{pedidoAEliminar.id}</strong></p>
              <p className="text-muted">Esta acción no se puede deshacer.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminar}>
            Eliminar Pedido
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MisPedidos;