import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const NavbarComponent = () => {
  const { carrito } = useCarrito();
  const { usuario, logout, estaAutenticado, esAdmin } = useAuth();

  const cantidad = carrito.length;

  return (
    <Navbar expand="lg" className="main-navbar" fixed="top">
      <Container>
        
        {/* LOGO */}
        <Navbar.Brand className="nav-logo">
          <Link to="/">TiendaOnline</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          {/* MENÚ CENTRAL */}
          <Nav className="mx-auto nav-menu">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/contacto">Contacto</Link>
          </Nav>

          {/* MENÚ DERECHA */}
          <Nav className="nav-right">

            {!estaAutenticado ? (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm mx-1">
                  Iniciar Sesión
                </Link>

                <Link to="/registro" className="btn btn-primary btn-sm mx-1">
                  Registro
                </Link>
              </>
            ) : (
              <>
                <span className="nav-usuario mx-2">
                  👤 {usuario?.nombre}
                </span>

                {esAdmin && (
                  <>
                    <Link to="/admin" className="nav-admin mx-2">
                      ⚙️ Admin
                    </Link>
                    <Link to="/admin/pedidos" className="nav-admin mx-2">
                      📦 Pedidos
                    </Link>
                  </>
                )}

                <Link to="/mis-pedidos" className="nav-mispedidos mx-2">
                  📦 Mis Pedidos
                </Link>

                <button 
                  className="btn btn-danger btn-sm mx-1"
                  onClick={logout}
                >
                  Cerrar Sesión
                </button>
              </>
            )}

            {/* CARRITO */}
            <Link to="/carrito" className="nav-cart">
              🛒
              {cantidad > 0 && (
                <Badge bg="danger" pill className="cart-badge">
                  {cantidad}
                </Badge>
              )}
            </Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
