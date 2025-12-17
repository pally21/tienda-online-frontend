import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Table, Alert } from 'react-bootstrap';
import { useProductos } from '../../context/ProductosContext';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { usuario } = useAuth();
  const { productos, agregarProducto, actualizarProducto, eliminarProducto } = useProductos();
  const { carrito } = useCarrito();
  
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState('success');
  
  // Modal de confirmación para eliminar
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  
  const [formulario, setFormulario] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
    stock: '',
    categoria: ''
  });

  useEffect(() => {
    console.log('Panel Admin cargado para:', usuario?.nombre);
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productoData = {
      ...formulario,
      precio: parseFloat(formulario.precio),
      stock: parseInt(formulario.stock)
    };

    if (modoEdicion && productoSeleccionado) {
      actualizarProducto(productoSeleccionado.id, productoData);
      mostrarMensajeAlerta('Producto actualizado exitosamente', 'success');

      if (carrito.some(item => item.id === productoSeleccionado.id)) {
        mostrarMensajeAlerta('Producto actualizado en el carrito automáticamente', 'info');
      }
    } else {
      agregarProducto(productoData);
      mostrarMensajeAlerta('Producto agregado exitosamente', 'success');
    }

    cerrarModal();
  };

  const abrirModalNuevo = () => {
    setModoEdicion(false);
    setProductoSeleccionado(null);
    setFormulario({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: '',
      stock: '',
      categoria: ''
    });
    setShowModal(true);
  };

  const abrirModalEditar = (producto) => {
    setModoEdicion(true);
    setProductoSeleccionado(producto);
    setFormulario({
      nombre: producto.nombre,
      precio: producto.precio.toString(),
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      stock: producto.stock.toString(),
      categoria: producto.categoria
    });
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setModoEdicion(false);
    setProductoSeleccionado(null);
  };

  const handleEliminar = (id, nombre) => {
    setProductoAEliminar({ id, nombre });
    setShowConfirmDelete(true);
  };

  const confirmarEliminar = async () => {
    if (!productoAEliminar) return;
    
    try {
      await eliminarProducto(productoAEliminar.id);
      mostrarMensajeAlerta('✅ Producto eliminado exitosamente', 'success');
      setShowConfirmDelete(false);
      setProductoAEliminar(null);
    } catch (err) {
      mostrarMensajeAlerta('❌ Error: ' + err.message, 'danger');
    }
  };

  const cancelarEliminar = () => {
    setShowConfirmDelete(false);
    setProductoAEliminar(null);
  };

  const mostrarMensajeAlerta = (mensaje, tipo = 'success') => {
    setMensajeAlerta(mensaje);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);
    setTimeout(() => setMostrarAlerta(false), 4000);
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  return (
    <Container className="admin-panel mt-4">

      <Row className="mb-4">
        <Col>
          <h1>Panel de Administrador</h1>
          <p className="text-muted">Gestiona tus productos</p>
        </Col>
        <Col className="text-end">
          <Button variant="success" size="lg" onClick={abrirModalNuevo}>
            + Agregar Producto
          </Button>
        </Col>
      </Row>

      {mostrarAlerta && (
        <Alert variant={tipoAlerta} dismissible onClose={() => setMostrarAlerta(false)}>
          {mensajeAlerta}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Header>
          <h4>Productos Registrados ({productos.length})</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{producto.nombre}</td>
                  <td>{formatearPrecio(producto.precio)}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.categoria?.nombre || producto.categoria}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => abrirModalEditar(producto)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleEliminar(producto.id, producto.nombre)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal para agregar/editar productos */}
      <Modal show={showModal} onHide={cerrarModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del producto"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa el precio"
                name="precio"
                value={formulario.precio}
                onChange={handleChange}
                step="0.01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa la descripción del producto"
                name="descripcion"
                value={formulario.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://ejemplo.com/imagen.jpg"
                name="imagen"
                value={formulario.imagen}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa la cantidad en stock"
                name="stock"
                value={formulario.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la categoría"
                name="categoria"
                value={formulario.categoria}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={cerrarModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {modoEdicion ? 'Actualizar' : 'Crear'} Producto
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal show={showConfirmDelete} onHide={cancelarEliminar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el producto <strong>{productoAEliminar?.nombre}</strong>? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Admin;
