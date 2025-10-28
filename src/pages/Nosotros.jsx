import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Nosotros.css';

const Nosotros = () => {
  return (
    <Container className="nosotros-page py-5">
      <h1 className="text-center mb-5">Sobre Nosotros</h1>
      
      <Row className="mb-5">
        <Col lg={6}>
          <h2>Nuestra Historia</h2>
          <p>
            TiendaOnline nació en 2025 con la misión de revolucionar la experiencia
            de compra en línea en Chile. Nos dedicamos a ofrecer productos de calidad
            con el mejor servicio al cliente.
          </p>
          <p>
            Con años de experiencia en e-commerce, hemos construido una plataforma
            confiable que conecta a miles de clientes con los productos que necesitan.
          </p>
        </Col>
        <Col lg={6}>
          <div className="about-image">
            🏢
          </div>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Nuestros Valores</h2>
      <Row>
        <Col md={4} className="mb-4">
          <div className="value-card">
            <h4>🎯 Compromiso</h4>
            <p>Comprometidos con la satisfacción de nuestros clientes</p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="value-card">
            <h4>🌟 Calidad</h4>
            <p>Solo ofrecemos productos de la más alta calidad</p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="value-card">
            <h4>🤝 Confianza</h4>
            <p>Construimos relaciones duraderas con nuestros clientes</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Nosotros;