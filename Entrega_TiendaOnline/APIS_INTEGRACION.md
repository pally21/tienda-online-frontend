# 🔗 DOCUMENTO: APIs E INTEGRACIÓN

**Tienda Online - Arquitectura de Integración Frontend-Backend**  
**Versión:** 2.0 (MongoDB)  
**Fecha:** 17 de Diciembre de 2025

---

## 📋 Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Flujos de Integración](#flujos-de-integración)
3. [Autenticación JWT](#autenticación-jwt)
4. [Conexión MongoDB](#conexión-mongodb)
5. [Ciclo de Vida de una Transacción](#ciclo-de-vida-de-una-transacción)
6. [Manejo de Errores](#manejo-de-errores)

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (NAVEGADOR)                   │
│  React 18.2+ | React Router | React Bootstrap | Contexts    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     │ JSON + JWT Token
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                 SERVIDOR (Node.js + Express)                 │
│  Puerto: 3002                                                │
│  ├─ Autenticación (JWT)                                     │
│  ├─ Rutas API (/auth, /productos, /pedidos, /admin)        │
│  ├─ Middleware de validación                                │
│  └─ Controladores de lógica de negocio                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ MongoDB Mongoose
                     │ Connection String con Atlas
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              BASE DE DATOS (MongoDB Atlas)                    │
│  Cluster: tiendaonline.laj7uso.mongodb.net                  │
│  Database: tienda_online                                     │
│  ├─ Colección: usuarios                                      │
│  ├─ Colección: productos                                     │
│  └─ Colección: pedidos                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujos de Integración

### 1️⃣ Flujo de Registro e Inicio de Sesión

```
┌─────────────────┐
│  Usuario entra  │
│  a la página    │
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│  Frontend carga Login.jsx / Registro.jsx │
└────────┬────────────────────────────────┘
         │
         │ Usuario completa formulario
         ↓
┌──────────────────────────────────────┐
│  Frontend envía POST /auth/register   │
│  Body: { nombre, email, password }   │
└────────┬─────────────────────────────┘
         │
         ↓
┌────────────────────────────────────────┐
│  Backend (authController.register)     │
│  ├─ Valida datos                       │
│  ├─ Hash contraseña con bcryptjs      │
│  ├─ Crea documento Usuario en MongoDB  │
│  └─ Devuelve usuario creado            │
└────────┬───────────────────────────────┘
         │
         ↓
┌────────────────────────────────────┐
│  Frontend guarda datos locales      │
│  localStorage.setItem('token', ...) │
│  Redirige a Home o Dashboard        │
└────────────────────────────────────┘
```

**Código Frontend (Login.jsx):**
```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    navigate('/');
  } catch (error) {
    console.error('Error en login:', error);
  }
};
```

**Código Backend (authController.js):**
```javascript
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    
    const passwordValida = await usuario.compararPassword(password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    
    const token = jwt.sign(
      { _id: usuario._id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.json({
      success: true,
      token,
      usuario: { _id: usuario._id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

### 2️⃣ Flujo de Carga de Productos

```
┌──────────────────┐
│  Página carga    │
│  (Home, Inicio)  │
└────────┬─────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│  Frontend (ProductosContext.js)          │
│  useEffect → cargarProductos()          │
└────────┬────────────────────────────────┘
         │
         │ GET /api/productos
         ↓
┌──────────────────────────────────────┐
│  Backend (productController)          │
│  exports.getProductos                │
│  → Producto.find({activo: true})     │
└────────┬───────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│  MongoDB retorna array de productos      │
│  [                                        │
│    {                                      │
│      _id: "...",                         │
│      nombre: "Camisa Casual",            │
│      precio: 49990,                      │
│      imagen: "https://...",              │
│      ...                                  │
│    },                                     │
│    ...                                    │
│  ]                                        │
└────────┬───────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│  Frontend (useState + Context)           │
│  setProductos(data)                     │
│  Renderiza <ProductCard /> x5            │
└─────────────────────────────────────────┘
```

**Código Frontend (ProductosContext.js):**
```javascript
const cargarProductos = async () => {
  try {
    setCargando(true);
    const response = await fetchJson("/productos");
    setProductos(Array.isArray(response) ? response : response.data || []);
  } catch (err) {
    setError("No se pudieron cargar los productos");
  } finally {
    setCargando(false);
  }
};
```

**Código Backend (productController.js):**
```javascript
exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ activo: true });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

### 3️⃣ Flujo de Creación de Pedido

```
┌──────────────────────────┐
│ Usuario en Carrito hace  │
│ click en "Checkout"      │
└────────┬─────────────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Frontend (Checkout.jsx)             │
│  Recolecta datos del cliente         │
│  ├─ Nombre, Email, Teléfono         │
│  ├─ Región, Comuna, Dirección       │
│  └─ Items del carrito                │
└────────┬────────────────────────────┘
         │
         │ POST /api/pedidos
         │ + Token JWT
         ↓
┌──────────────────────────────────────┐
│  Backend (pedidoController)          │
│  exports.crearPedido                 │
│  ├─ Valida token (middleware)        │
│  ├─ Crea documento Pedido             │
│  ├─ Actualiza usuario.ultimaCompra   │
│  └─ Retorna pedido con _id           │
└────────┬───────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────┐
│  MongoDB guarda en colección pedidos  │
│  {                                    │
│    _id: "507f1f77bcf86cd799439012",  │
│    usuario: "507f1f77bcf86cd799439011",
│    items: [...],                      │
│    total: 189970,                     │
│    estado: "Pendiente",               │
│    cliente: {...},                    │
│    createdAt: "2025-12-17T..."        │
│  }                                    │
└────────┬───────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────┐
│  Frontend navega a                   │
│  PedidoConfirmado.jsx                │
│  Muestra número de pedido y resumen   │
└──────────────────────────────────────┘
```

---

## 🔐 Autenticación JWT

### Componentes

**1. Token JWT:**
```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDM5NDU0NTUsImV4cCI6MTcwNDU1MDI1NX0.
8U-3b9-K8q5G7h4j2l0m3n4o5p6q7r8s9t
```

- **Header:** Tipo de token y algoritmo
- **Payload:** Usuario ID, rol, timestamps
- **Signature:** Validación con JWT_SECRET

**2. Flujo de Validación:**

```javascript
// Frontend: Guardar token
localStorage.setItem('token', response.token);

// Frontend: Enviar token en headers
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};

// Backend: Middleware de validación
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.usuario = user;
    next();
  });
};

// Backend: Usar middleware en rutas protegidas
router.get('/pedidos', authenticateToken, pedidoController.obtenerPedidosUsuario);
```

---

## 🗄️ Conexión MongoDB

### Configuración

**Backend/server.js:**
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  });
```

**Backend/.env:**
```
MONGODB_URI=mongodb+srv://admin_tienda:todos.2025@tiendaonline.laj7uso.mongodb.net/tienda_online?appName=tiendaonline
JWT_SECRET=secreto_tienda_online_2025
JWT_EXPIRE=7d
PORT=3002
NODE_ENV=development
```

### Modelos Mongoose

**Backend/models/Usuario.js:**
```javascript
const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  estado: { type: String, enum: ['activo', 'suspendido', 'inactivo'], default: 'activo' },
  fechaRegistro: { type: Date, default: Date.now },
  ultimaCompra: Date
});

// Hash password antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = function(passwordIngresada) {
  return bcryptjs.compare(passwordIngresada, this.password);
};
```

**Backend/models/Producto.js:**
```javascript
const productoSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true, min: 0 },
  categoria: String,
  stock: { type: Number, min: 0, default: 0 },
  imagen: String,
  activo: { type: Boolean, default: true }
}, { timestamps: true });
```

**Backend/models/Pedido.js:**
```javascript
const pedidoSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  items: [{
    producto: { type: Schema.Types.ObjectId, ref: 'Producto' },
    nombre: String,
    cantidad: Number,
    precio: Number
  }],
  total: { type: Number, required: true },
  cliente: {
    nombre: String,
    email: String,
    region: String,
    comuna: String,
    direccion: String,
    telefono: String
  },
  estado: { 
    type: String, 
    enum: ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'],
    default: 'Pendiente'
  }
}, { timestamps: true });
```

---

## 🔄 Ciclo de Vida de una Transacción

### Ejemplo: Compra de productos

```
TIEMPO    COMPONENTE          ACCIÓN
═════════════════════════════════════════════════════════════

T1        Frontend (Home)     Usuario ve productos (GET /productos)
          
T2        Frontend (Carrito)  Usuario agrega items al carrito
                              (almacenado en CarritoContext)

T3        Frontend (Checkout) Usuario llena formulario de compra

T4        Frontend            POST /pedidos con:
                              - Token JWT
                              - Items del carrito
                              - Datos del cliente

T5        Backend Middleware  Valida JWT token
                              Extrae usuario._id del token

T6        Backend Controlador Crea documento Pedido en MongoDB:
                              - Referencia a usuario
                              - Array de items
                              - Total a pagar
                              - Información del cliente
                              - Estado inicial: "Pendiente"

T7        MongoDB             Inserta documento en colección "pedidos"
                              Asigna _id único

T8        Backend             Actualiza usuario.ultimaCompra
                              Retorna pedido con _id al frontend

T9        Frontend            Limpia CarritoContext
                              Guarda número de pedido
                              Navega a PedidoConfirmado

T10       Usuario             Ve página de confirmación con:
                              - Número de pedido
                              - Resumen de compra
                              - Información de entrega
```

---

## ⚠️ Manejo de Errores

### Estrategia de Errores

```javascript
// Backend: Crear respuesta de error consistente
const handleError = (res, status, message, error = null) => {
  console.error(`Error ${status}:`, error);
  res.status(status).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  });
};

// Ejemplos de errores comunes:

// 1. Usuario no autenticado (401)
if (!token) {
  return res.status(401).json({
    error: 'Token no proporcionado',
    code: 'NO_TOKEN'
  });
}

// 2. Usuario sin permisos (403)
if (req.usuario.role !== 'ADMIN') {
  return res.status(403).json({
    error: 'No tienes permisos para esta acción',
    code: 'FORBIDDEN'
  });
}

// 3. Email ya existe (409)
const usuarioExistente = await Usuario.findOne({ email });
if (usuarioExistente) {
  return res.status(409).json({
    error: 'El email ya está registrado',
    code: 'EMAIL_EXISTS'
  });
}

// 4. Recurso no encontrado (404)
const producto = await Producto.findById(id);
if (!producto) {
  return res.status(404).json({
    error: 'Producto no encontrado',
    code: 'NOT_FOUND'
  });
}
```

### Manejo Frontend

```javascript
export async function fetchJson(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...options
  };

  const res = await fetch(`http://localhost:3002/api${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data?.error || 'Error desconocido';
    
    // Manejar error 401 (token expirado)
    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    throw new Error(errorMessage);
  }

  return data;
}
```

---

## 📊 Diagrama de Flujo General

```
┌─────────────────┐
│  Usuario Final  │
└────────┬────────┘
         │
    ┌────▼─────────────────────────────┐
    │  FRONTEND (React + Bootstrap)    │
    │  ├─ Login/Registro               │
    │  ├─ Home (Catálogo)              │
    │  ├─ Productos                    │
    │  ├─ Carrito                      │
    │  ├─ Checkout                     │
    │  ├─ Mis Pedidos                  │
    │  └─ Admin Panel                  │
    └────┬─────────────────────────────┘
         │
         │ HTTP + JWT
         │
    ┌────▼──────────────────────────────┐
    │  BACKEND (Node.js + Express)      │
    │  ├─ Auth Routes (/auth)           │
    │  ├─ Product Routes (/productos)   │
    │  ├─ Order Routes (/pedidos)       │
    │  ├─ Admin Routes (/admin)         │
    │  ├─ JWT Middleware                │
    │  └─ Controllers (Lógica)          │
    └────┬──────────────────────────────┘
         │
         │ Mongoose + Queries
         │
    ┌────▼───────────────────────────────┐
    │  MONGODB (Collections)             │
    │  ├─ usuarios (Users)               │
    │  ├─ productos (Products)           │
    │  └─ pedidos (Orders)               │
    └────────────────────────────────────┘
```

---

## 🧪 Testing de la Integración

### Con cURL:

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "Segura123",
    "rut": "12345678-9"
  }'

# 2. Login (obtener token)
TOKEN=$(curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "Segura123"
  }' | jq '.token')

# 3. Obtener productos
curl http://localhost:3002/api/productos

# 4. Crear pedido (requiere token)
curl -X POST http://localhost:3002/api/pedidos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "total": 189970,
    "cliente": {...}
  }'
```

---

## 📝 Resumen de Integración

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Frontend | React | 18.2+ |
| Backend | Node.js + Express | 18+ / 4.18+ |
| Base de Datos | MongoDB Atlas | Última |
| Autenticación | JWT | - |
| Hashing | bcryptjs | 2.4.3+ |
| ORM | Mongoose | 7.0+ |
| CORS | express-cors | 3.8+ |

