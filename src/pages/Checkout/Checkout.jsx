import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { usePedidos } from '../../context/PedidosContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { carrito, calcularTotal, vaciarCarrito } = useCarrito();
  const { crearPedido } = usePedidos();
  
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    region: '',
    codigoPostal: '',
    metodoPago: 'tarjeta'
  });

  const [errores, setErrores] = useState({});
  const [procesando, setProcesando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario escribe
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }

    if (!formulario.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      nuevosErrores.email = 'Email inválido';
    }

    if (!formulario.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formulario.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido';
    }

    if (!formulario.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es requerida';
    }

    if (!formulario.ciudad.trim()) {
      nuevosErrores.ciudad = 'La ciudad es requerida';
    }

    if (!formulario.region.trim()) {
      nuevosErrores.region = 'La región es requerida';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      setProcesando(true);
      
      // Crear el pedido
      const pedido = await crearPedido(formulario, carrito, calcularTotal(), formulario.metodoPago);
      
      // Vaciar el carrito
      vaciarCarrito();
      
      // Redirigir a la página de confirmación
      navigate(`/pedido-confirmado/${pedido.id}`);
    } catch (error) {
      console.error('Error al crear pedido:', error);
      setErrores({ general: 'Error al procesar el pedido. Por favor intenta de nuevo.' });
    } finally {
      setProcesando(false);
    }
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  if (carrito.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          Tu carrito está vacío. Agrega productos antes de continuar.
        </Alert>
        <Button onClick={() => navigate('/productos')}>Ir a Productos</Button>
      </Container>
    );
  }

  return (
    <Container className="checkout-page mt-4 mb-5">
      <h1 className="mb-4">Finalizar Compra</h1>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h4>Datos de Envío</h4>
            </Card.Header>
            <Card.Body>
              {errores.general && (
                <Alert variant="danger" className="mb-3">
                  {errores.general}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre Completo *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        isInvalid={!!errores.nombre}
                        placeholder="Juan Pérez"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formulario.email}
                        onChange={handleChange}
                        isInvalid={!!errores.email}
                        placeholder="juan@ejemplo.com"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={handleChange}
                        isInvalid={!!errores.telefono}
                        placeholder="+56 9 1234 5678"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.telefono}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        type="text"
                        name="codigoPostal"
                        value={formulario.codigoPostal}
                        onChange={handleChange}
                        placeholder="1234567"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Dirección *</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formulario.direccion}
                    onChange={handleChange}
                    isInvalid={!!errores.direccion}
                    placeholder="Calle Principal 123, Depto 4B"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.direccion}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ciudad *</Form.Label>
                      <Form.Control
                        type="text"
                        name="ciudad"
                        value={formulario.ciudad}
                        onChange={handleChange}
                        isInvalid={!!errores.ciudad}
                        placeholder="Santiago"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.ciudad}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Región *</Form.Label>
                      <Form.Control
                        as="select"
                        name="region"
                        value={formulario.region}
                        onChange={handleChange}
                        isInvalid={!!errores.region}
                      >
                        <option value="">Seleccionar región</option>
                        <option value="Metropolitana">Región Metropolitana</option>
                        <option value="Valparaíso">Valparaíso</option>
                        <option value="Biobío">Biobío</option>
                        <option value="Araucanía">Araucanía</option>
                        <option value="Los Lagos">Los Lagos</option>
                        <option value="Maule">Maule</option>
                        <option value="Antofagasta">Antofagasta</option>
                        <option value="Coquimbo">Coquimbo</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errores.region}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <hr />

                <h5 className="mb-3">Método de Pago</h5>
                <Form.Group className="mb-4">
                  <Form.Check
                    type="radio"
                    label="💳 Tarjeta de Crédito/Débito"
                    name="metodoPago"
                    value="tarjeta"
                    checked={formulario.metodoPago === 'tarjeta'}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="🏦 Transferencia Bancaria"
                    name="metodoPago"
                    value="transferencia"
                    checked={formulario.metodoPago === 'transferencia'}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="💵 Pago contra entrega"
                    name="metodoPago"
                    value="contraentrega"
                    checked={formulario.metodoPago === 'contraentrega'}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button 
                  variant="success" 
                  type="submit" 
                  size="lg" 
                  className="w-100"
                  disabled={procesando}
                >
                  {procesando ? '⏳ Procesando...' : 'Confirmar Pedido'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="resumen-pedido sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush" className="mb-3">
                {carrito.map((item) => (
                  <ListGroup.Item key={item.id} className="px-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{item.nombre}</strong>
                        <br />
                        <small className="text-muted">Cantidad: {item.cantidad}</small>
                      </div>
                      <div className="text-end">
                        {formatearPrecio(item.precio * item.cantidad)}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatearPrecio(calcularTotal())}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary fs-4">{formatearPrecio(calcularTotal())}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;