import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="login-page">
      <Row className="align-items-center">
        
        {/* Imagen lado izquierdo */}
        <Col md={6} className="login-img-container">
          <img
            src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg"
            alt="login"
            className="login-img"
          />
        </Col>

        {/* Formulario */}
        <Col md={6}>
          <div className="card-form">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Alert variant="info">
              <strong>Demo Admin:</strong> admin@tienda.com / admin123
            </Alert>

            <Form onSubmit={manejarSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  disabled={cargando}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  disabled={cargando}
                />
              </Form.Group>

              <Button 
                type="submit" 
                className="w-100" 
                size="lg"
                disabled={cargando}
              >
                {cargando ? "Iniciando..." : "Ingresar"}
              </Button>
            </Form>

            <p className="text-center mt-3">
              ¿No tienes cuenta?{" "}
              <a href="/registro" className="link">
                Regístrate aquí
              </a>
            </p>

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
