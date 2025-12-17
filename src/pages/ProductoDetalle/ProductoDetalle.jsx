import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Alert } from 'react-bootstrap';
import { fetchJson } from '../../utils/api';
import { useCarrito } from '../../context/CarritoContext';
import './ProductoDetalle.css';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      try {
        // Producto por ID
        const prod = await fetchJson(`/productos/${id}`);
        setProducto(prod);

        // Productos relacionados
        const all = await fetchJson(`/productos`);
        const rel = all
          .filter(p => p.categoria.id === prod.categoria.id && p.id !== prod.id)
          .slice(0, 4);

        setRelacionados(rel);
      } catch (e) {
        navigate('/productos');
      }
    }

    cargarDatos();
  }, [id, navigate]);

  const agregar = () => {
    for (let i = 0; i < cantidad; i++) agregarAlCarrito(producto);
    setMostrarAlerta(true);
    setTimeout(() => setMostrarAlerta(false), 3000);
  };

  if (!producto)
    return <h3 className="text-center mt-5">Cargando...</h3>;

  return (
    <Container className="producto-detalle mt-4">

      {mostrarAlerta && (
        <Alert variant="success" className="alerta-flotante">
          Producto agregado al carrito
        </Alert>
      )}

      <Button variant="outline-secondary" onClick={() => navigate('/productos')}>
        ← Volver
      </Button>

      <Row className="mt-4">
        <Col md={6}>
          <img
            src={producto.imagen || "https://via.placeholder.com/600"}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
          />
        </Col>

        <Col md={6}>
          <Badge className="mb-3">{producto.categoria.nombre}</Badge>

          <h1>{producto.nombre}</h1>
          <h3 className="text-primary">
            ${producto.precio.toLocaleString("es-CL")}
          </h3>

          <p className="mt-3">{producto.descripcion}</p>

          <h5 className="mt-4">Stock disponible: {producto.stock}</h5>

          <div className="cantidad mt-3 d-flex gap-3 align-items-center">
            <Button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</Button>
            <span>{cantidad}</span>
            <Button onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}>+</Button>
          </div>

          <Button className="mt-4 w-100" onClick={agregar}>
            🛒 Agregar al carrito
          </Button>
        </Col>
      </Row>

      {relacionados.length > 0 && (
        <>
          <h3 className="mt-5">Productos relacionados</h3>
          <Row>
            {relacionados.map(p => (
              <Col md={3} key={p.id}>
                <Card className="mt-3">
                  <Card.Img src={p.imagen || "https://via.placeholder.com/300"} />
                  <Card.Body>
                    <Card.Title>{p.nombre}</Card.Title>
                    <Card.Text>${p.precio.toLocaleString("es-CL")}</Card.Text>
                    <Link to={`/producto/${p.id}`}>
                      <Button variant="outline-primary" className="w-100">Ver detalle</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

    </Container>
  );
};

export default ProductoDetalle;
