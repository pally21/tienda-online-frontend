import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCarrito } from '../../context/CarritoContext';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    alert(`${producto.nombre} agregado al carrito`);
  };

  return (
    <Card className="product-card h-100">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={producto.imagen || 'https://via.placeholder.com/300'} 
          alt={producto.nombre}
          className="product-image"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-title">{producto.nombre}</Card.Title>
        <Card.Text className="product-description">
          {producto.descripcion}
        </Card.Text>
        <div className="mt-auto">
          <div className="product-price mb-3">
            ${producto.precio.toLocaleString('es-CL')}
          </div>
          <Button 
            variant="primary" 
            className="w-100 btn-agregar"
            onClick={handleAgregar}
          >
            Agregar al Carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;