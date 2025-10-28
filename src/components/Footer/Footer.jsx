import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <div className="text-center">
          <p className="mb-0">&copy; 2025 TiendaOnline. Todos los derechos reservados.</p>
          <p className="mb-0 mt-2">
            Desarrollado con React y Bootstrap
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;