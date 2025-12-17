import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const usuarioStr = localStorage.getItem("usuario");
  let nombreUsuario = null;
  
  try {
    if (usuarioStr) {
      const usuarioObj = JSON.parse(usuarioStr);
      nombreUsuario = usuarioObj.nombre;
    }
  } catch (e) {
    console.error("Error parsing usuario:", e);
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>

              {/* ⭐ Saludo personalizado si está logueado */}
              {nombreUsuario ? (
                <h1 className="display-3 fw-bold mb-4">
                  Hola, {nombreUsuario}! 👋  
                </h1>
              ) : (
                <h1 className="display-3 fw-bold mb-4">
                  Bienvenido a TiendaOnline
                </h1>
              )}

              <p className="lead mb-4">
                Descubre los mejores productos con la mejor calidad y precio.
                Tu tienda online de confianza.
              </p>

              <Link to="/productos">
                <Button variant="primary" size="lg">
                  Ver Productos
                </Button>
              </Link>
            </Col>

            <Col lg={6}>
              <div className="hero-image">
                🛍️
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="text-center mb-5">¿Por qué elegirnos?</h2>
        <Row>
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">🚚</div>
            <h4>Envío Rápido</h4>
            <p>Entregamos en todo Chile en tiempo récord</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">💳</div>
            <h4>Pago Seguro</h4>
            <p>Múltiples métodos de pago seguros</p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="feature-icon mb-3">⭐</div>
            <h4>Calidad Garantizada</h4>
            <p>Productos de la mejor calidad</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
