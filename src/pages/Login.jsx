import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simulación de login (en producción validarías contra backend)
    if (formData.email && formData.password) {
      alert('¡Login exitoso!');
      navigate('/');
    } else {
      setError('Por favor completa todos los campos');
    }
  };

  return (
    <Container className="login-page py-5">
      <div className="login-container">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-3">
            Iniciar Sesión
          </Button>

          <div className="text-center">
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;