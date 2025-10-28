import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { regiones } from '../data/regiones';
import { validarRUN } from '../utils/validaciones';
import './Registro.css';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    email: '',
    fechaNacimiento: '',
    region: '',
    comuna: '',
    direccion: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [comunas, setComunas] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (formData.region) {
      const regionSeleccionada = regiones.find(r => r.id === parseInt(formData.region));
      setComunas(regionSeleccionada ? regionSeleccionada.comunas : []);
    } else {
      setComunas([]);
    }
  }, [formData.region]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar RUN
    if (!formData.run) {
      newErrors.run = 'El RUN es requerido';
    } else if (formData.run.length < 7 || formData.run.length > 9) {
      newErrors.run = 'El RUN debe tener entre 7 y 9 caracteres';
    } else if (!validarRUN(formData.run)) {
      newErrors.run = 'El RUN ingresado no es válido';
    }

    // Validar nombre
    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length > 50) {
      newErrors.nombre = 'El nombre no puede exceder 50 caracteres';
    }

    // Validar apellidos
    if (!formData.apellidos) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    } else if (formData.apellidos.length > 100) {
      newErrors.apellidos = 'Los apellidos no pueden exceder 100 caracteres';
    }

    // Validar email
    const emailPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (formData.email.length > 100) {
      newErrors.email = 'El correo no puede exceder 100 caracteres';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com';
    }

    // Validar dirección
    if (!formData.direccion) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (formData.direccion.length > 300) {
      newErrors.direccion = 'La dirección no puede exceder 300 caracteres';
    }

    // Validar región y comuna
    if (!formData.region) {
      newErrors.region = 'Debe seleccionar una región';
    }
    if (!formData.comuna) {
      newErrors.comuna = 'Debe seleccionar una comuna';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 4 || formData.password.length > 10) {
      newErrors.password = 'La contraseña debe tener entre 4 y 10 caracteres';
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Guardar usuario
      const usuario = {
        ...formData,
        tipo: 'Cliente',
        fechaRegistro: new Date().toISOString()
      };
      
      console.log('Usuario registrado:', usuario);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Container className="registro-page py-5">
      <div className="registro-container">
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        
        {success && (
          <Alert variant="success">
            Usuario registrado correctamente. Redirigiendo al login...
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>RUN (sin puntos ni guión)</Form.Label>
            <Form.Control
              type="text"
              name="run"
              value={formData.run}
              onChange={handleChange}
              placeholder="19011022K"
              isInvalid={!!errors.run}
            />
            <Form.Control.Feedback type="invalid">
              {errors.run}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  isInvalid={!!errors.apellidos}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.apellidos}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Región</Form.Label>
                <Form.Select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  isInvalid={!!errors.region}
                >
                  <option value="">Seleccione una región</option>
                  {regiones.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.nombre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.region}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Comuna</Form.Label>
                <Form.Select
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  isInvalid={!!errors.comuna}
                  disabled={!formData.region}
                >
                  <option value="">Seleccione una comuna</option>
                  {comunas.map(comuna => (
                    <option key={comuna.id} value={comuna.id}>
                      {comuna.nombre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.comuna}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              isInvalid={!!errors.direccion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.direccion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-3">
            Registrarse
          </Button>

          <div className="text-center">
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Registro;