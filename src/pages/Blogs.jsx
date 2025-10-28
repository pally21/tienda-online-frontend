import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from '../components/BlogCard/BlogCard';
import { blogs } from '../data/blogs';
import './Blogs.css';

const Blogs = () => {
  return (
    <Container className="blogs-page py-5">
      <h1 className="text-center mb-5">Nuestro Blog</h1>
      <p className="text-center mb-5 lead">
        Mantente informado con las últimas tendencias en e-commerce y tecnología
      </p>
      
      <Row>
        {blogs.map(blog => (
          <Col key={blog.id} lg={6} className="mb-4">
            <BlogCard blog={blog} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blogs;