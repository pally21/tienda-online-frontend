import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductosProvider } from './context/ProductosContext';
import { CarritoProvider } from './context/CarritoContext';
import { PedidosProvider } from './context/PedidosContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import NavbarComponent from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle/ProductoDetalle';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import BlogDetalle from './pages/BlogDetalle';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Admin from './pages/Admin/Admin';
import AdminPedidos from './pages/Admin/AdminPedidos';
import Carrito from './pages/Carrito/Carrito';
import Checkout from './pages/Checkout/Checkout';
import MisPedidos from './pages/MisPedidos/MisPedidos';
import PedidoConfirmado from './pages/PedidoConfirmado/PedidoConfirmado';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>
          <PedidosProvider>
            <Router>
              <div className="App">
                <NavbarComponent />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/producto/:id" element={<ProductoDetalle />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blog/:id" element={<BlogDetalle />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/admin" element={<ProtectedRoute element={<Admin />} rolesRequeridos={['ADMIN']} />} />
                    <Route path="/admin/pedidos" element={<ProtectedRoute element={<AdminPedidos />} rolesRequeridos={['ADMIN']} />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/mis-pedidos" element={<ProtectedRoute element={<MisPedidos />} />} />
                    <Route path="/pedido-confirmado/:id" element={<PedidoConfirmado />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </PedidosProvider>
        </CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;