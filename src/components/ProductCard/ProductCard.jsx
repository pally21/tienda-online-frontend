import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCarrito } from '../../context/CarritoContext';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto);
    
    // Mostrar feedback visual
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <Card className="product-card h-100">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={producto.imagen || 'https://via.placeholder.com/400x400?text=Sin+imagen'} 
          alt={producto.nombre}
          className="product-image"
          onError={(e) => {
            // Si la imagen no carga, usar un placeholder
            e.target.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(producto.nombre);
          }}
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
            variant={agregado ? "success" : "primary"} 
            className="w-100 btn-agregar"
            onClick={handleAgregar}
          >
            {agregado ? "✅ Agregado" : "Agregar al Carrito"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;