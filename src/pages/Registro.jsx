import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./Registro.css";
import { fetchJson } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { regionesComunas } from "../data/regionesComunas";
import { validarRUN, validarEmail } from "../utils/validaciones"; // IMPORTACIÓN CORRECTA

const Registro = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    fechaNacimiento: "",
    region: "",
    comuna: "",
    direccion: "",
    password: "",
    confirmar: "",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const actualizar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "region") {
      setForm((prev) => ({ ...prev, comuna: "" }));
    }
  };

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    // --- VALIDACIÓN RUN ---
    if (!validarRUN(form.run)) {
      setError("RUN inválido. Use formato: 19011022K o 19.011.022-K");
      return;
    }

    // --- VALIDACIÓN EMAIL ---
    if (!validarEmail(form.correo)) {
      setError("Email inválido. Use un email válido (ej: usuario@gmail.com)");
      return;
    }

    // --- VALIDACIÓN PASSWORDS ---
    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const payload = {
        nombre: form.nombre,
        apellido: form.apellidos,
        email: form.correo,
        password: form.password,
        direccion: form.direccion,
        telefono: "",
      };

      console.log("📤 Enviando registro:", payload);

      await fetchJson("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setExito("Registro exitoso. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Error en registro:", err);
      setError(err.message || "Error al registrar. Verifique los datos.");
    }
  };

  return (
    <Container className="registro-page">
      <Row className="align-items-center">
        
        {/* IMAGEN */}
        <Col md={6} className="registro-img-container">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-1353.jpg"
            alt="registro"
            className="registro-img"
          />
        </Col>

        {/* FORMULARIO */}
        <Col md={6}>
          <div className="card-form">
            <h2 className="text-center mb-4">Registro de Usuario</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {exito && <Alert variant="success">{exito}</Alert>}

            <Form onSubmit={enviar}>
              
              {/* RUN + FECHA */}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>RUN</Form.Label>
                    <Form.Control
                      name="run"
                      placeholder="12345678K"
                      value={form.run}
                      onChange={actualizar}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      name="fechaNacimiento"
                      value={form.fechaNacimiento}
                      onChange={actualizar}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* NOMBRE + APELLIDOS */}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      name="nombre"
                      value={form.nombre}
                      onChange={actualizar}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      name="apellidos"
                      value={form.apellidos}
                      onChange={actualizar}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* CORREO */}
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={actualizar}
                  required
                />
              </Form.Group>

              {/* DIRECCIÓN */}
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  name="direccion"
                  value={form.direccion}
                  onChange={actualizar}
                  required
                />
              </Form.Group>

              {/* REGIÓN + COMUNA */}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Región</Form.Label>
                    <Form.Select
                      name="region"
                      value={form.region}
                      onChange={actualizar}
                      required
                    >
                      <option value="">Seleccione región</option>
                      {Object.keys(regionesComunas).map((reg) => (
                        <option key={reg} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Comuna</Form.Label>
                    <Form.Select
                      name="comuna"
                      value={form.comuna}
                      onChange={actualizar}
                      disabled={!form.region}
                      required
                    >
                      <option value="">Seleccione comuna</option>

                      {form.region &&
                        regionesComunas[form.region].map((com) => (
                          <option key={com} value={com}>
                            {com}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* PASSWORD */}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={actualizar}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmar"
                      value={form.confirmar}
                      onChange={actualizar}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* BOTÓN */}
              <Button type="submit" className="btn-primary w-100 mt-3">
                Registrarse
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
