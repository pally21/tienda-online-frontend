import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <Card className="blog-card h-100">
      <div className="blog-image-container">
        <div className="blog-icon">
          {blog.icono}
        </div>
      </div>
      <Card.Body>
        <div className="mb-2">
          {blog.categorias.map((cat, idx) => (
            <Badge key={idx} bg="secondary" className="me-1">
              {cat}
            </Badge>
          ))}
        </div>
        <Card.Title className="blog-title">{blog.titulo}</Card.Title>
        <Card.Text className="blog-excerpt">
          {blog.extracto}
        </Card.Text>
        <div className="blog-meta text-muted mb-3">
          {blog.fecha} | {blog.autor}
        </div>
        <Link to={`/blog/${blog.id}`} className="btn btn-primary w-100">
          Leer más
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;