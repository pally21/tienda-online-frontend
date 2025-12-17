import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Alert, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import './AdminPedidos.css';

const AdminPedidos = () => {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showDetalles, setShowDetalles] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  const cargarPedidos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/pedidos/admin/todas', {
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
    cargarPedidos();
  }, [cargarPedidos]);

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

  const mostrarDetalles = (pedido) => {
    setPedidoSeleccionado(pedido);
    setNuevoEstado(pedido.estado);
    setShowDetalles(true);
  };

  const actualizarEstado = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/pedidos/${pedidoSeleccionado.id}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (!response.ok) throw new Error('Error al actualizar estado');
      
      const data = await response.json();
      
      // Actualizar lista local
      setPedidos(pedidos.map(p => p.id === data.data.id ? data.data : p));
      setShowDetalles(false);
    } catch (err) {
      console.error('Error actualizando estado:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Cargando pedidos...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4 mb-4">
      <Row className="mb-4">
        <Col>
          <h1>📦 Gestión de Pedidos</h1>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Header>
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">Total de pedidos: {pedidos.length}</h5>
            </Col>
            <Col md="auto">
              <Button variant="outline-primary" onClick={cargarPedidos} size="sm">
                🔄 Actualizar
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {pedidos.length === 0 ? (
            <p className="text-muted text-center py-4">No hay pedidos aún</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Productos</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td><strong>#{pedido.id}</strong></td>
                      <td>{pedido.datosEnvio?.nombre || 'Sin nombre'}</td>
                      <td>{pedido.email}</td>
                      <td className="small">{formatearFecha(pedido.fecha)}</td>
                      <td className="fw-bold">{formatearPrecio(pedido.total)}</td>
                      <td>
                        <Badge bg="secondary">{pedido.productos.length}</Badge>
                      </td>
                      <td>
                        <Badge bg={obtenerColorEstado(pedido.estado)}>
                          {pedido.estado}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => mostrarDetalles(pedido)}
                        >
                          👁️ Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal de detalles del pedido */}
      <Modal show={showDetalles} onHide={() => setShowDetalles(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Pedido #{pedidoSeleccionado?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pedidoSeleccionado && (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <h6 className="text-muted">DATOS DE ENVÍO</h6>
                  <p>
                    <strong>Nombre:</strong> {pedidoSeleccionado.datosEnvio?.nombre}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {pedidoSeleccionado.datosEnvio?.direccion}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {pedidoSeleccionado.datosEnvio?.ciudad}, {pedidoSeleccionado.datosEnvio?.region}
                  </p>
                  <p>
                    <strong>Email:</strong> {pedidoSeleccionado.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {pedidoSeleccionado.datosEnvio?.telefono}
                  </p>
                </Col>
                <Col md={6}>
                  <h6 className="text-muted">INFORMACIÓN DEL PEDIDO</h6>
                  <p>
                    <strong>Fecha:</strong> {formatearFecha(pedidoSeleccionado.fecha)}
                  </p>
                  <p>
                    <strong>Método de pago:</strong> {pedidoSeleccionado.metodoPago === 'tarjeta' ? '💳 Tarjeta' : pedidoSeleccionado.metodoPago === 'transferencia' ? '🏦 Transferencia' : '💵 Contra entrega'}
                  </p>
                  <p>
                    <strong>Número de seguimiento:</strong> <code>{pedidoSeleccionado.numeroSeguimiento}</code>
                  </p>
                  <p>
                    <strong>Total:</strong> <span className="h5 text-primary">{formatearPrecio(pedidoSeleccionado.total)}</span>
                  </p>
                </Col>
              </Row>

              <h6 className="text-muted mb-3">PRODUCTOS</h6>
              <Table striped bordered size="sm" className="mb-4">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th className="text-end">Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidoSeleccionado.productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {producto.imagen && (
                            <img 
                              src={producto.imagen} 
                              alt={producto.nombre}
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          )}
                          {producto.nombre}
                        </div>
                      </td>
                      <td className="text-end">{formatearPrecio(producto.precio)}</td>
                      <td className="text-center">{producto.cantidad}</td>
                      <td className="text-end fw-bold">{formatearPrecio(producto.precio * producto.cantidad)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <hr />

              <h6 className="text-muted">ACTUALIZAR ESTADO</h6>
              <Form.Group className="mb-3">
                <Form.Label>Nuevo Estado</Form.Label>
                <Form.Select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                >
                  <option value="Pendiente">⏳ Pendiente</option>
                  <option value="Procesando">⚙️ Procesando</option>
                  <option value="Enviado">📤 Enviado</option>
                  <option value="Entregado">✅ Entregado</option>
                  <option value="Cancelado">❌ Cancelado</option>
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetalles(false)}>
            Cerrar
          </Button>
          <Button 
            variant="primary" 
            onClick={actualizarEstado}
            disabled={nuevoEstado === pedidoSeleccionado?.estado}
          >
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPedidos;
