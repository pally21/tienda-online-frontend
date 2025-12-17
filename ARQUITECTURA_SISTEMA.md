# 📡 ARQUITECTURA DEL SISTEMA (PARA MOSTRAR)

## 🎯 LO QUE NECESITAS DEMOSTRAR

```
┌──────────────────────────────────────────────────────────────────┐
│                          TU APLICACIÓN                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FRONTEND (React)          BACKEND (Node.js + Express)          │
│  Puerto 3000               Puerto 3001                           │
│  ─────────────────         ──────────────────────                │
│  ✅ Páginas               ✅ 15 Endpoints                        │
│  ✅ Componentes           ✅ Autenticación JWT                   │
│  ✅ Context API           ✅ Base de datos en memoria            │
│  ✅ Carrito               ✅ Validación de roles                 │
│  ✅ Checkout              ✅ Encriptación de contraseñas         │
│                                                                  │
│                    ↕️ COMUNICACIÓN JSON ↕️                       │
│                    (HTTP REST API)                              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 💾 ARCHIVOS PRINCIPALES

### FRONTEND:
```
src/
├── App.js                    ← Rutas
├── components/               ← Componentes React
│   ├── Navbar/
│   ├── ProductCard/
│   ├── BlogCard/
│   └── Footer/
├── pages/                    ← Páginas (14 total)
│   ├── Home.jsx
│   ├── Productos.jsx
│   ├── Carrito.jsx
│   ├── Checkout.jsx
│   ├── Admin/Admin.jsx       ← Gestión de productos
│   ├── Admin/AdminPedidos.jsx ← Gestión de pedidos
│   ├── Login.jsx
│   └── ...
└── context/                  ← Estado global
    ├── AuthContext.js
    ├── CarritoContext.js
    ├── ProductosContext.js
    └── PedidosContext.js
```

### BACKEND:
```
backend/
└── server-demo.js           ← TODA la API REST
    ├── Express app
    ├── 15 endpoints
    ├── Autenticación JWT
    ├── Base de datos (arrays)
    └── CORS habilitado
```

---

## 🔄 FLUJO DE UNA COMPRA (PARA EXPLICAR)

```
USUARIO FINAL
     │
     ▼
┌─────────────────────────────────┐
│   1. VER PRODUCTOS (Home)       │
│   Frontend hace:                │
│   GET /api/productos            │
└─────────────────────────────────┘
     │
     ▼
  BACKEND responde:
  { data: [producto1, producto2...] }
     │
     ▼
┌─────────────────────────────────┐
│   2. AGREGAR AL CARRITO         │
│   (No requiere backend)         │
│   Solo estado local React       │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│   3. IR AL CHECKOUT             │
│   Llena formulario              │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│   4. PROCESAR PEDIDO            │
│   Frontend hace:                │
│   POST /api/pedidos             │
│   + Token JWT                   │
│   + Datos envío                 │
│   + Productos del carrito       │
└─────────────────────────────────┘
     │
     ▼
  BACKEND:
  ✅ Valida token
  ✅ Valida productos existen
  ✅ Genera número de seguimiento
  ✅ Guarda en BD
  ✅ Devuelve confirmación
     │
     ▼
┌─────────────────────────────────┐
│   5. CONFIRMACIÓN               │
│   Frontend recibe:              │
│   { numeroSeguimiento: "TRK..." }│
└─────────────────────────────────┘
```

---

## 🛡️ SEGURIDAD DEL BACKEND

### Autenticación (JWT - JSON Web Token)

```
1. Usuario hace login
   POST /api/auth/login
   { email: "admin@tienda.com", password: "admin123" }

2. Backend:
   ✅ Busca usuario en BD
   ✅ Compara contraseña (hasheada con bcryptjs)
   ✅ Si correcto, GENERA JWT token

3. JWT token contiene:
   {
     id: 1,
     email: "admin@tienda.com",
     role: "ADMIN",
     expiresIn: "7d"
   }

4. Frontend guarda token en localStorage
5. Frontend envía en cada solicitud:
   Authorization: Bearer <token>

6. Backend VALIDA el token antes de:
   - Crear productos (solo ADMIN)
   - Eliminar productos (solo ADMIN)
   - Ver todos los pedidos (solo ADMIN)
```

### Roles (Authorization)

```
┌────────────────────────────────────┐
│         USUARIO ANÓNIMO            │
├────────────────────────────────────┤
│ ✅ Ver productos                   │
│ ✅ Ver blogs                       │
│ ✅ Ver contacto                    │
│ ❌ Crear pedido                    │
│ ❌ Ver admin                       │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│         USUARIO (USER)             │
├────────────────────────────────────┤
│ ✅ Ver productos                   │
│ ✅ Crear pedido                    │
│ ✅ Ver mis pedidos                 │
│ ❌ Ver admin                       │
│ ❌ Crear productos                 │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│         ADMIN                      │
├────────────────────────────────────┤
│ ✅ Todo (USER)                     │
│ ✅ Crear productos                 │
│ ✅ Editar productos                │
│ ✅ Eliminar productos              │
│ ✅ Ver todos los pedidos           │
│ ✅ Cambiar estado de pedidos       │
└────────────────────────────────────┘
```

---

## 📊 BASE DE DATOS (IN-MEMORY)

```javascript
// backend/server-demo.js

let usuarios = [
  { id: 1, nombre: "Admin Tienda", email: "admin@tienda.com", 
    password: "$2b$10$...(hasheada)", role: "ADMIN" },
  // ...
];

let productos = [
  { id: 1, nombre: "Camisa Casual", precio: 49990, stock: 25, ... },
  { id: 2, nombre: "Zapatos Deportivos", precio: 89990, stock: 20, ... },
  // ... 6 productos total
];

let pedidos = [
  { 
    id: 1, 
    usuarioId: 1, 
    productos: [...], 
    total: 99980,
    estado: "Entregado",
    numeroSeguimiento: "TRK10RYAYXKJ",
    // ...
  },
  // ...
];
```

**Nota:** Es "in-memory" = se pierde al reiniciar el servidor (ideal para desarrollo/demo)

---

## 🧪 ENDPOINTS (15 TOTAL)

### AUTENTICACIÓN (3)
```
POST   /api/auth/register       ← Crear usuario
POST   /api/auth/login          ← Login (obtiene JWT)
GET    /api/auth/me             ← Datos del usuario actual
```

### PRODUCTOS (5)
```
GET    /api/productos           ← Listar todos
GET    /api/productos/:id       ← Obtener uno
POST   /api/productos           ← Crear (ADMIN)
PUT    /api/productos/:id       ← Editar (ADMIN)
DELETE /api/productos/:id       ← Eliminar (ADMIN)
```

### PEDIDOS (7)
```
POST   /api/pedidos             ← Crear pedido
GET    /api/pedidos             ← Ver mis pedidos
GET    /api/pedidos/:id         ← Ver detalle
GET    /api/pedidos/admin/todas ← Ver todos (ADMIN)
GET    /api/pedidos/:id/estado  ← Ver estado
PUT    /api/pedidos/:id/estado  ← Cambiar estado (ADMIN)
POST   /api/pedidos/:id/cancelar ← Cancelar (ADMIN)
```

---

## 🔌 CONEXIÓN FRONTEND ↔ BACKEND

### Frontend hace solicitud:

```javascript
// src/context/ProductosContext.js
const cargarProductos = async () => {
  const response = await fetch('http://localhost:3001/api/productos');
  const data = await response.json();
  setProductos(data.data);
};
```

### Backend procesa y responde:

```javascript
// backend/server-demo.js
app.get('/api/productos', (req, res) => {
  res.json({
    success: true,
    data: productos
  });
});
```

### Flujo HTTP:

```
CLIENTE (Frontend)           SERVIDOR (Backend)
        │
        │  REQUEST
        │  ─────────────────────────────→
        │  GET /api/productos
        │
        │
        │  ← ─────────────────────────────
        │      RESPONSE
        │      HTTP 200
        │      {
        │        "success": true,
        │        "data": [...]
        │      }
```

---

## 💻 CÓMO EJECUTAR PARA DEMOSTRACIÓN

### Terminal 1: Backend
```bash
cd /Users/usuario/tienda-online-react/backend
node server-demo.js
```

Output esperado:
```
Servidor escuchando en puerto 3001 ✅
```

### Terminal 2: Frontend
```bash
cd /Users/usuario/tienda-online-react
npm start
```

Output esperado:
```
webpack compiled successfully
Compiled successfully!

You can now view tienda-online in the browser.
```

### Terminal 3: Test API (opcional)
```bash
curl http://localhost:3001/api/productos | python3 -m json.tool
```

---

## 📈 ESTADÍSTICAS DEL PROYECTO

```
Frontend:
- Páginas: 14
- Componentes: 4
- Contextos: 4
- Rutas: 14
- CSS: Responsive con Bootstrap

Backend:
- Endpoints: 15
- Autenticación: JWT + bcrypt
- Autorización: 2 roles (ADMIN, USER)
- Base de datos: In-memory (arrays)
- Framework: Express.js

Total de Líneas de Código:
- Frontend: ~1,500 líneas
- Backend: ~500 líneas
- Total: ~2,000 líneas
```

---

## 🎯 PUNTOS CLAVE PARA EXPLICAR

1. **Arquitectura Cliente-Servidor:**
   "El frontend (React) y el backend (Node.js) se comunican mediante HTTP"

2. **API REST:**
   "Uso verbos HTTP: GET (leer), POST (crear), PUT (actualizar), DELETE (eliminar)"

3. **Autenticación:**
   "JWT es un token que prueba quién eres y qué puedes hacer"

4. **Base de datos:**
   "Aunque es in-memory para demo, demuestra cómo funciona una BD real"

5. **Seguridad:**
   "Las contraseñas se hashean, los tokens se validan, los roles se respetan"

---

## ✅ CONCLUSIÓN

Tu aplicación es una **arquitectura real de e-commerce:**

```
Usuario (navegador)
        ↓
Frontend React (localhost:3000)
        ↓
Backend Node.js API REST (localhost:3001)
        ↓
Base de datos (in-memory)
        ↓
Respuesta al usuario (productos, pedidos, confirmaciones)
```

Esto demuestra que entiendes:
- ✅ Desarrollo full-stack
- ✅ APIs REST
- ✅ Autenticación y autorización
- ✅ Arquitectura cliente-servidor
- ✅ Gestión de estado
- ✅ Mejor prácticas de seguridad

