import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Badge, Button } from 'react-bootstrap';
import { blogs } from '../data/blogs';
import './BlogDetalle.css';

const BlogDetalle = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <Container className="py-5">
        <h2>Blog no encontrado</h2>
        <Link to="/blogs">
          <Button>Volver a Blogs</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="blog-detalle-page py-5">
      <nav className="breadcrumb-custom mb-4">
        <Link to="/">Inicio</Link> / <Link to="/blogs">Blogs</Link> / {blog.titulo}
      </nav>

      <article>
        <header className="text-center mb-5">
          <h1 className="display-4 mb-3">{blog.titulo}</h1>
          <div className="text-muted mb-3">
            {blog.fecha} | Por {blog.autor}
          </div>
          <div>
            {blog.categorias.map((cat, idx) => (
              <Badge key={idx} bg="secondary" className="me-2">
                {cat}
              </Badge>
            ))}
          </div>
        </header>

        <div className="blog-icon-large mb-5">
          {blog.icono}
        </div>

        <div className="blog-content">
          <div dangerouslySetInnerHTML={{ __html: blog.contenido }} />
        </div>
      </article>

      <div className="blog-navigation mt-5 pt-4">
        <Link to="/blogs">
          <Button variant="primary">← Volver a Blogs</Button>
        </Link>
      </div>
    </Container>
  );
};

export default BlogDetalle;