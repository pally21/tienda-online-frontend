# 🏗️ ARQUITECTURA DEL PROYECTO

## Diagrama de Flujo General

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAVEGADOR WEB                           │
│                    http://localhost:3000                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ React Routes
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ↓                  ↓                  ↓
    ┌────────┐        ┌─────────┐      ┌──────────┐
    │ Login  │        │Products │      │  Admin   │
    │ Page   │        │  Page   │      │  Panel   │
    └────┬───┘        └────┬────┘      └─────┬────┘
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                    ┌──────↓───────┐
                    │ AuthContext  │
                    │  + useAuth() │
                    └──────┬───────┘
                           │
                    ┌──────↓────────────────────┐
                    │   API.js (Cliente HTTP)   │
                    │  Incluye JWT en headers   │
                    └──────┬────────────────────┘
                           │
              HTTP/HTTPS   │
            Authorization  │
                          │
        ┌─────────────────↓──────────────────────┐
        │   SERVIDOR NODE.JS + EXPRESS           │
        │      http://localhost:3001             │
        │                                        │
        │  ┌────────────────────────────────┐   │
        │  │   CORS Middleware              │   │
        │  │   Habilita requests del front  │   │
        │  └────────────────┬───────────────┘   │
        │                   │                    │
        │  ┌────────────────↓───────────────┐   │
        │  │ Routes (Express Router)        │   │
        │  │ ├─ /api/auth/*                 │   │
        │  │ └─ /api/productos/*            │   │
        │  └────────────────┬───────────────┘   │
        │                   │                    │
        │  ┌────────────────↓───────────────┐   │
        │  │ Auth Middleware                │   │
        │  │ - Valida JWT token             │   │
        │  │ - Extrae datos del usuario     │   │
        │  │ - Verifica roles               │   │
        │  └────────────────┬───────────────┘   │
        │                   │                    │
        │  ┌────────────────↓───────────────┐   │
        │  │ Controllers (Lógica)           │   │
        │  │ ├─ authController.js           │   │
        │  │ └─ productController.js        │   │
        │  └────────────────┬───────────────┘   │
        │                   │                    │
        │  ┌────────────────↓───────────────┐   │
        │  │ Utilidades                     │   │
        │  │ ├─ jwt.js (Generar/verificar) │   │
        │  │ └─ password.js (Hash/compare) │   │
        │  └────────────────┬───────────────┘   │
        └─────────────────┬──────────────────────┘
                          │
        ┌─────────────────↓──────────────────────┐
        │      BASE DE DATOS - MYSQL             │
        │      localhost:3306                    │
        │                                        │
        │  ┌─────────────────────────────────┐  │
        │  │ Database: tienda_online         │  │
        │  │                                 │  │
        │  │  Tables:                        │  │
        │  │  • usuarios                     │  │
        │  │  • productos                    │  │
        │  │  • pedidos                      │  │
        │  │  • detalle_pedidos              │  │
        │  └─────────────────────────────────┘  │
        └────────────────────────────────────────┘
```

---

## Flujo de Autenticación

```
1. USUARIO HACE LOGIN
   ┌─────────────────────┐
   │ Ingresa email/pwd   │
   │ en Form Login       │
   └──────────┬──────────┘
              │
              ↓
   ┌─────────────────────────────────┐
   │ Frontend envía POST a            │
   │ /api/auth/login con credenciales│
   └──────────┬──────────────────────┘
              │
              ↓
   ┌──────────────────────────────────────┐
   │ Backend recibe en authController.js  │
   │ 1. Busca usuario por email           │
   │ 2. Compara password hasheado         │
   │ 3. Si OK → Genera JWT token          │
   │ 4. Retorna { token, usuario }        │
   └──────────┬───────────────────────────┘
              │
              ↓
   ┌─────────────────────────────────────┐
   │ Frontend recibe token               │
   │ 1. Guarda en localStorage           │
   │ 2. Guarda usuario en state          │
   │ 3. Navega a /                       │
   │ 4. Navbar se actualiza              │
   └──────────┬──────────────────────────┘
              │
              ↓
   ┌──────────────────────────────────────┐
   │ USUARIO AUTENTICADO ✅               │
   │ Token se envía automáticamente       │
   │ en header Authorization de requests │
   └──────────────────────────────────────┘

2. USUARIO ACCEDE A RUTA PROTEGIDA

   Frontend intenta acceder a /admin
              │
              ↓
   ┌─────────────────────────┐
   │ ProtectedRoute valida:  │
   │ • ¿Tiene token? SI      │
   │ • ¿Es ADMIN? SI         │
   │ • Muestra contenido     │
   └─────────────────────────┘

   Si NO es ADMIN → Redirecciona a /

3. USUARIO HACE REQUEST A ENDPOINT PROTEGIDO

   GET /api/admin/datos
   Header: Authorization: Bearer <JWT_TOKEN>
              │
              ↓
   ┌──────────────────────────────────┐
   │ Backend Auth Middleware           │
   │ 1. Extrae token del header        │
   │ 2. Verifica con JWT secret        │
   │ 3. Si inválido → 403 error        │
   │ 4. Si válido → pasa a controller  │
   │ 5. req.usuario tiene datos        │
   └──────────────────────────────────┘
```

---

## Estructura de Carpetas Detallada

```
tienda-online-react/
│
├── 📄 README.md                  ← Documentación principal
├── 📄 SETUP.md                   ← Guía instalación
├── 📄 RESUMEN.md                 ← Resumen técnico
├── 📄 PRESENTACION.md            ← Guía presentación
├── 📄 QUICK-START.md             ← Inicio rápido
├── 📄 package.json               ← Dependencias frontend
│
├── 📁 src/
│   │
│   ├── 📄 App.js                 ← Router principal (con AuthProvider)
│   ├── 📄 App.css
│   ├── 📄 index.js               ← Entry point
│   ├── 📄 index.css
│   ├── 📄 reportWebVitals.js
│   ├── 📄 setupTests.js
│   │
│   ├── 📁 context/ (Estado global)
│   │   ├── 📄 AuthContext.jsx    ← ⭐ NUEVO - Autenticación
│   │   ├── 📄 ProductosContext.js
│   │   ├── 📄 CarritoContext.js
│   │   └── 📄 PedidosContext.js
│   │
│   ├── 📁 components/ (Componentes reutilizables)
│   │   ├── 📄 ProtectedRoute.jsx ← ⭐ NUEVO - Rutas protegidas
│   │   │
│   │   ├── 📁 Navbar/
│   │   │   ├── 📄 Navbar.jsx     ← ⭐ Actualizado - Dinámico
│   │   │   └── 📄 Navbar.css
│   │   │
│   │   ├── 📁 Footer/
│   │   │   ├── 📄 Footer.jsx
│   │   │   └── 📄 Footer.css
│   │   │
│   │   ├── 📁 ProductCard/
│   │   │   ├── 📄 ProductCard.jsx
│   │   │   └── 📄 ProductCard.css
│   │   │
│   │   └── 📁 BlogCard/
│   │       ├── 📄 BlogCard.jsx
│   │       └── 📄 BlogCard.css
│   │
│   ├── 📁 pages/ (Páginas/Vistas)
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 Productos.jsx
│   │   ├── 📄 ProductoDetalle.jsx
│   │   ├── 📄 Nosotros.jsx
│   │   ├── 📄 Blogs.jsx
│   │   ├── 📄 BlogDetalle.jsx
│   │   ├── 📄 Contacto.jsx
│   │   ├── 📄 Login.jsx          ← ⭐ Actualizado - Con backend
│   │   ├── 📄 Registro.jsx
│   │   │
│   │   ├── 📁 Admin/
│   │   │   ├── 📄 Admin.jsx      ← ⭐ Con ProtectedRoute
│   │   │   └── 📄 Admin.css
│   │   │
│   │   ├── 📁 Carrito/
│   │   │   ├── 📄 Carrito.jsx
│   │   │   └── 📄 Carrito.css
│   │   │
│   │   ├── 📁 Checkout/
│   │   │   ├── 📄 Checkout.jsx
│   │   │   └── 📄 Checkout.css
│   │   │
│   │   ├── 📁 MisPedidos/
│   │   │   ├── 📄 MisPedidos.jsx
│   │   │   └── 📄 MisPedidos.css
│   │   │
│   │   └── 📁 PedidoConfirmado/
│   │       ├── 📄 PedidoConfirmado.jsx
│   │       └── 📄 PedidoConfirmado.css
│   │
│   ├── 📁 utils/ (Utilidades)
│   │   ├── 📄 api.js             ← ⭐ Actualizado - Con auth
│   │   └── 📄 validaciones.js
│   │
│   └── 📁 data/ (Datos estáticos)
│       ├── 📄 productos.js
│       ├── 📄 blogs.js
│       └── 📄 regionesComunas.js
│
├── 📁 public/
│   ├── 📄 index.html
│   ├── 📄 manifest.json
│   ├── 📄 favicon.ico
│   └── 📁 images/
│       └── 📁 productos/
│
└── 📁 backend/                   ← ⭐ COMPLETAMENTE NUEVO
    │
    ├── 📄 server.js              ← Entrada del servidor
    ├── 📄 crear-bd.js            ← Script crear BD
    ├── 📄 package.json           ← Dependencias backend
    ├── 📄 .env                   ← Configuración
    ├── 📄 .env.example           ← Plantilla .env
    ├── 📄 .gitignore             ← Para Git
    ├── 📄 README.md              ← Docs backend
    │
    └── 📁 src/
        │
        ├── 📁 config/
        │   └── 📄 database.js    ← Pool MySQL
        │
        ├── 📁 routes/
        │   ├── 📄 authRoutes.js  ← Rutas auth
        │   └── 📄 productRoutes.js ← Rutas productos
        │
        ├── 📁 controllers/
        │   ├── 📄 authController.js ← Lógica login/register
        │   └── 📄 productController.js ← CRUD productos
        │
        ├── 📁 middleware/
        │   └── 📄 auth.js        ← JWT + roles
        │
        └── 📁 utils/
            ├── 📄 jwt.js         ← Generar/verificar JWT
            └── 📄 password.js    ← Hash/validar passwords
```

---

## Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│                                                              │
│  • React 18.2+ (Librería UI)                               │
│  • React Router 6.0+ (Enrutamiento)                         │
│  • React Bootstrap 2.0+ (Componentes UI)                    │
│  • Bootstrap 5.3+ (Estilos CSS)                             │
│  • useAuth Hook (Autenticación personalizada)               │
│  • Fetch API (Requests HTTP)                                │
│  • localStorage (Persistencia)                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           ↕ HTTP
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                        │
│                                                              │
│  • Node.js 16+ (Runtime JavaScript)                         │
│  • Express 4.18+ (Framework web)                            │
│  • CORS Middleware (Cross-origin requests)                  │
│  • JWT (jsonwebtoken 9.1+) (Autenticación)                  │
│  • bcryptjs 2.4+ (Password hashing)                         │
│  • mysql2 3.6+ (Base de datos)                              │
│  • Swagger UI 5.0+ (Documentación API)                      │
│  • dotenv 16.3+ (Configuración)                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                           ↕ SQL
┌─────────────────────────────────────────────────────────────┐
│                    MYSQL 5.7+                               │
│                                                              │
│  • Base de datos relacional                                 │
│  • Tablas: usuarios, productos, pedidos, detalle_pedidos   │
│  • Relaciones con Foreign Keys                              │
│  • InnoDB para transacciones                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Flujo de Datos (CRUD Producto)

```
CREAR PRODUCTO (POST /api/productos)
═════════════════════════════════════

Frontend (Admin.jsx)
    │ 1. Usuario llena formulario
    │ 2. Hace click "Guardar"
    ↓
API.js
    │ 3. POST /api/productos
    │ 4. Header: Authorization: Bearer <TOKEN>
    ↓
Backend (server.js)
    │ 5. CORS middleware permite request
    │ 6. Ruta POST /productos
    ↓
Auth Middleware (auth.js)
    │ 7. Extrae token del header
    │ 8. Verifica JWT
    │ 9. Valida rol = ADMIN
    │ 10. Si no, retorna 403
    ↓
Controller (productController.js)
    │ 11. Valida datos (nombre, precio, stock)
    │ 12. Construye query SQL INSERT
    │ 13. Envía a BD
    ↓
Database (MySQL)
    │ 14. Inserta en tabla productos
    │ 15. Retorna ID generado
    ↓
Backend
    │ 16. Retorna { mensaje, producto }
    ↓
Frontend
    │ 17. Recibe respuesta
    │ 18. Actualiza lista de productos
    │ 19. Muestra mensaje de éxito
    ↓
Usuario ve producto nuevo en tabla


LEER PRODUCTOS (GET /api/productos)
════════════════════════════════════

Frontend (Productos.jsx)
    │ 1. useEffect → cargarProductos()
    ↓
API.js
    │ 2. GET /api/productos
    │ (No requiere token, es público)
    ↓
Backend
    │ 3. No necesita Auth middleware
    │ 4. Ejecuta query SELECT *
    ↓
Database
    │ 5. Retorna todos los productos
    ↓
Frontend
    │ 6. Mapea array y renderiza
    │ 7. Usuario ve tabla/grid
```

---

## Ejemplo Completo de Request/Response

```
REQUEST (Frontend envía):
═════════════════════════

POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@tienda.com",
  "password": "admin123"
}


RESPONSE (Backend retorna):
═══════════════════════════

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Administrador",
    "email": "admin@tienda.com",
    "role": "ADMIN"
  }
}


FRONTEND GUARDA:
════════════════

localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIs...')
localStorage.setItem('usuario', '{"id":1,"nombre":"Administrador"...}')
localStorage.setItem('role', 'ADMIN')


SIGUIENTE REQUEST CON AUTH:
═══════════════════════════

POST /api/productos
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "nombre": "Nuevo Laptop",
  "precio": 999.99,
  "descripcion": "Laptop gaming",
  "stock": 5,
  "categoria": "Electrónica",
  "imagen": "http://..."
}
```

---

**Resumen: Arquitectura moderna, segura y escalable** ✅
