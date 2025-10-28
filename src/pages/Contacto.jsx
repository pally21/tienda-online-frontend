import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setFormData({ nombre: '', email: '', mensaje: '' });
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <Container className="contacto-page py-5">
      <h1 className="text-center mb-5">Contáctanos</h1>
      
      <Row>
        <Col lg={6} className="mb-4">
          <h3>Información de Contacto</h3>
          <div className="contact-info mt-4">
            <p><strong>📧 Email:</strong> contacto@tiendaonline.cl</p>
            <p><strong>📱 Teléfono:</strong> +56 9 1234 5678</p>
            <p><strong>📍 Dirección:</strong> Santiago, Chile</p>
            <p><strong>⏰ Horario:</strong> Lunes a Viernes 9:00 - 18:00</p>
          </div>
        </Col>
        
        <Col lg={6}>
          <h3>Envíanos un Mensaje</h3>
          {enviado && (
            <Alert variant="success" className="mt-3">
              ¡Mensaje enviado correctamente! Te responderemos pronto.
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Enviar Mensaje
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;