# DOCUMENTO DE INTEGRACIÓN - APIs E Integración Frontend-Backend

**Versión:** 1.0  
**Fecha:** 16 de Diciembre de 2025  
**Asignatura:** DSY1104

---

## TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Flujos de Integración](#flujos-de-integración)
4. [Configuración CORS](#configuración-cors)
5. [Manejo de Errores](#manejo-de-errores)
6. [Autenticación y Autorización](#autenticación-y-autorización)
7. [Sincronización de Datos](#sincronización-de-datos)
8. [Testing de Integración](#testing-de-integración)

---

## INTRODUCCIÓN

Este documento describe cómo el **frontend (React)** se integra con el **backend (Node.js Express)** en la aplicación Tienda Online React.

### Componentes Principales

```
┌─────────────────────────────────────────────────┐
│                 NAVEGADOR CLIENTE                │
├─────────────────────────────────────────────────┤
│                                                   │
│  ┌──────────────────────────────────────────┐  │
│  │     REACT FRONTEND (PORT 3000)           │  │
│  │  ├─ Pages & Components                   │  │
│  │  ├─ Context API (State Management)       │  │
│  │  ├─ React Router (Routing)               │  │
│  │  └─ Fetch/HTTP Client                    │  │
│  └──────────────────────────────────────────┘  │
│                     ↕ HTTP/REST                  │
│  ┌──────────────────────────────────────────┐  │
│  │  NODE.JS + EXPRESS BACKEND (PORT 3001)   │  │
│  │  ├─ Routes & Controllers                 │  │
│  │  ├─ JWT Authentication                   │  │
│  │  ├─ Business Logic                       │  │
│  │  └─ In-Memory Database                   │  │
│  └──────────────────────────────────────────┘  │
│                                                   │
└─────────────────────────────────────────────────┘
```

---

## ARQUITECTURA DEL SISTEMA

### Stack Tecnológico

```
┌────────────────────────────────────────────┐
│           FRONTEND (React)                  │
├────────────────────────────────────────────┤
│ ├─ React 18.2.0                           │
│ ├─ React Router v6                        │
│ ├─ React Bootstrap                        │
│ ├─ Context API                            │
│ └─ Fetch API / Axios                      │
└────────────────────────────────────────────┘
           ↕ REST API (JSON)
┌────────────────────────────────────────────┐
│       BACKEND (Node.js + Express)          │
├────────────────────────────────────────────┤
│ ├─ Node.js v14+                           │
│ ├─ Express.js 4.x                         │
│ ├─ JWT (jsonwebtoken)                     │
│ ├─ bcryptjs                               │
│ └─ CORS middleware                        │
└────────────────────────────────────────────┘
```

### Puertos y Urls

```
Frontend:  http://localhost:3000
Backend:   http://localhost:3001/api
```

---

## FLUJOS DE INTEGRACIÓN

### 1. FLUJO DE REGISTRO Y LOGIN

```
FRONTEND                          BACKEND
   │                                 │
   ├─ Usuario completa formulario   │
   │  de registro                    │
   │                                 │
   ├─ Valida datos (email, RUT)     │
   │                                 │
   ├─ POST /api/auth/register──────→│
   │   {nombre, rut, email, pwd}    │
   │                                 │
   │                    Valida datos │
   │                    Hash password│
   │                    Guarda usuario
   │                                 │
   │←────────── Response 201 ────────┤
   │   {success, user}              │
   │                                 │
   ├─ Muestra: Registro exitoso     │
   ├─ Redirige a Login              │
   │                                 │
   ├─ Usuario entra en Login        │
   │                                 │
   ├─ POST /api/auth/login─────────→│
   │   {email, password}            │
   │                                 │
   │                   Verifica creds│
   │                   Genera JWT    │
   │                                 │
   │←────────── Response 200 ────────┤
   │   {token, user}                │
   │                                 │
   ├─ Guarda token en localStorage  │
   ├─ Guarda usuario en Context     │
   ├─ Redirige a Productos          │
   │                                 │
```

**Código Frontend (src/utils/api.js):**
```javascript
export const registroUsuario = async (datos) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  return response.json();
};

export const loginUsuario = async (email, contraseña) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, contraseña })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.data.token);
  }
  return data;
};
```

---

### 2. FLUJO DE COMPRA (CARRITO → CHECKOUT)

```
FRONTEND                          BACKEND
   │                                 │
   ├─ Usuario navega Productos     │
   │                                 │
   ├─ GET /api/productos────────────→│
   │                                 │
   │                    Obtiene lista│
   │                                 │
   │←────── Response 200 ────────────┤
   │   [producto1, producto2, ...]   │
   │                                 │
   ├─ Renderiza catálogo            │
   │                                 │
   ├─ Usuario agrega al carrito     │
   │                                 │
   ├─ POST /api/cart/add────────────→│
   │   {producto_id, cantidad}      │
   │   Headers: {Authorization}     │
   │                                 │
   │                Valida JWT       │
   │                Valida stock     │
   │                Agrega a carrito │
   │                                 │
   │←────── Response 201 ────────────┤
   │   {items, total}               │
   │                                 │
   ├─ Actualiza carrito en Context  │
   ├─ Muestra: "+1 al carrito"      │
   │                                 │
   ├─ Usuario va a Carrito          │
   │                                 │
   ├─ GET /api/cart─────────────────→│
   │   Headers: {Authorization}     │
   │                                 │
   │                Obtiene carrito  │
   │                                 │
   │←────── Response 200 ────────────┤
   │   {items[], total}             │
   │                                 │
   ├─ Renderiza carrito             │
   ├─ Muestra total                 │
   │                                 │
   ├─ Usuario hace click en Checkout│
   │                                 │
   ├─ Llena formulario de envío     │
   │                                 │
   ├─ POST /api/pedidos────────────→│
   │   {nombre, email, dirección,   │
   │    ciudad, región, pago}       │
   │   Headers: {Authorization}     │
   │                                 │
   │                Valida datos    │
   │                Valida carrito  │
   │                Crea pedido     │
   │                Reduce stock    │
   │                Limpia carrito  │
   │                                 │
   │←────── Response 201 ────────────┤
   │   {numero_pedido, items,       │
   │    total, estado}              │
   │                                 │
   ├─ Guarda número en Context      │
   ├─ Limpia carrito Context        │
   ├─ Redirige a Confirmación       │
   │                                 │
   ├─ Muestra: Pedido #TRK...       │
   │                                 │
```

**Código Frontend (src/context/CarritoContext.jsx):**
```javascript
export const agregarAlCarrito = async (productoId, cantidad) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ producto_id: productoId, cantidad })
  });
  return response.json();
};
```

---

### 3. FLUJO DE GESTIÓN DE PEDIDOS (ADMIN)

```
FRONTEND (ADMIN)                  BACKEND
   │                                 │
   ├─ Admin va a Panel Admin        │
   │                                 │
   ├─ GET /api/pedidos─────────────→│
   │   Headers: {Authorization}     │
   │   Headers: {Role: ADMIN}       │
   │                                 │
   │                Valida JWT+Admin │
   │                Obtiene pedidos  │
   │                                 │
   │←────── Response 200 ────────────┤
   │   [pedido1, pedido2, ...]      │
   │                                 │
   ├─ Renderiza tabla de pedidos    │
   │                                 │
   ├─ Admin selecciona cambiar estado
   │                                 │
   ├─ PUT /api/pedidos/{id}/estado─→│
   │   {estado: "Procesando"}       │
   │   Headers: {Authorization}     │
   │                                 │
   │                Valida JWT+Admin │
   │                Actualiza estado │
   │                                 │
   │←────── Response 200 ────────────┤
   │   {pedido actualizado}         │
   │                                 │
   ├─ Actualiza tabla en real-time  │
   │                                 │
```

---

### 4. FLUJO DE GESTIÓN DE PRODUCTOS (ADMIN)

```
FRONTEND (ADMIN)                  BACKEND
   │                                 │
   ├─ GET /api/productos────────────→│
   │                                 │
   │                Obtiene productos│
   │                                 │
   │←────── Response 200 ────────────┤
   │   [prod1, prod2, ...]          │
   │                                 │
   ├─ Admin hace click "Crear"      │
   │                                 │
   ├─ Llena formulario              │
   │                                 │
   ├─ POST /api/productos──────────→│
   │   {nombre, descripción,        │
   │    precio, stock, imagen}      │
   │   Headers: {Authorization}     │
   │                                 │
   │                Valida JWT+Admin │
   │                Valida datos    │
   │                Crea producto   │
   │                                 │
   │←────── Response 201 ────────────┤
   │   {producto nuevo}             │
   │                                 │
   ├─ Muestra confirmación          │
   ├─ Recarga lista (cada 5 seg)    │
   │                                 │
   ├─ Nuevo producto aparece        │
   │                                 │
   ├─ Admin hace click "Editar"     │
   │                                 │
   ├─ Modifica campos               │
   │                                 │
   ├─ PUT /api/productos/{id}──────→│
   │   {campos a actualizar}        │
   │   Headers: {Authorization}     │
   │                                 │
   │                Valida JWT+Admin │
   │                Actualiza       │
   │                                 │
   │←────── Response 200 ────────────┤
   │   {producto actualizado}       │
   │                                 │
   ├─ Cambios reflejados en tienda  │
   │                                 │
   ├─ Admin hace click "Eliminar"   │
   │                                 │
   ├─ DELETE /api/productos/{id}───→│
   │   Headers: {Authorization}     │
   │                                 │
   │                Valida JWT+Admin │
   │                Elimina         │
   │                                 │
   │←────── Response 200 ────────────┤
   │   {éxito}                      │
   │                                 │
   ├─ Producto desaparece de tienda │
   │                                 │
```

---

## CONFIGURACIÓN CORS

### Backend (server-demo.js)

```javascript
const express = require('express');
const app = express();

// CORS Configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

### Frontend (src/utils/api.js)

```javascript
const API_URL = 'http://localhost:3001/api';

const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok && response.status === 401) {
    // Token expirado
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return response.json();
};
```

---

## MANEJO DE ERRORES

### Estrategia de Errores

```
┌─────────────────────────────────────────┐
│         ERROR EN LA APLICACIÓN           │
├─────────────────────────────────────────┤
│                                          │
│  Backend Error                           │
│  ├─ 400 Bad Request (datos inválidos)   │
│  │   └─ Mostrar mensaje al usuario      │
│  ├─ 401 Unauthorized (falta token)      │
│  │   └─ Redirigir a login               │
│  ├─ 403 Forbidden (sin permisos)        │
│  │   └─ Mostrar "Acceso denegado"       │
│  └─ 500 Server Error                    │
│      └─ Mostrar "Error del servidor"    │
│                                          │
│  Network Error                           │
│  ├─ No internet                          │
│  │   └─ Mostrar "Sin conexión"          │
│  └─ Timeout                              │
│      └─ Mostrar "Conexión lenta"        │
│                                          │
└─────────────────────────────────────────┘
```

### Ejemplo de Manejo Frontend

```javascript
// src/pages/Registro.jsx
const handleRegistro = async (formData) => {
  try {
    const response = await registroUsuario(formData);
    
    if (response.success) {
      // ✅ Éxito
      toast.success('Registro exitoso');
      navigate('/login');
    } else {
      // ❌ Error del backend
      toast.error(response.message);
      console.log('Error:', response.message);
    }
  } catch (error) {
    // ❌ Error de red
    toast.error('Error de conexión');
    console.log('Error de red:', error);
  }
};
```

### Respuestas de Error Backend

```javascript
// Formato estándar de error
{
  "success": false,
  "message": "Email ya existe",
  "statusCode": 400
}

// Con detalles adicionales
{
  "success": false,
  "message": "Validación fallida",
  "statusCode": 400,
  "errors": {
    "email": "Email inválido",
    "password": "Mínimo 6 caracteres"
  }
}
```

---

## AUTENTICACIÓN Y AUTORIZACIÓN

### JWT Flow

```
1. REGISTRO/LOGIN
   Usuario envía credenciales
   Backend genera JWT
   Frontend guarda en localStorage
   
2. SOLICITUD AUTENTICADA
   Frontend incluye: Authorization: Bearer {token}
   Backend verifica JWT
   Extrae userId, email, role
   
3. ACCESO DENEGADO
   Token falta o inválido → Error 401
   Role insuficiente → Error 403
   
4. RENOVACIÓN
   Token válido 7 días
   Después: Usuario debe hacer login de nuevo
```

### Código Backend (Middleware de Autenticación)

```javascript
// backend/server-demo.js

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token requerido'
    });
  }
  
  try {
    const decoded = jwt.verify(token, 'tu_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

// Uso en rutas
app.post('/api/pedidos', verificarToken, (req, res) => {
  // req.user contiene userId, email, role
  const userId = req.user.userId;
  // ... lógica del pedido
});
```

### Código Backend (Middleware de Autorización)

```javascript
const esAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requiere rol ADMIN'
    });
  }
  next();
};

// Uso en rutas
app.delete('/api/productos/:id', verificarToken, esAdmin, (req, res) => {
  // Solo ADMIN puede llegar aquí
});
```

---

## SINCRONIZACIÓN DE DATOS

### Estrategia de Sincronización

```javascript
// Context API para estado global
export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar productos al montar
  useEffect(() => {
    cargarProductos();
  }, []);

  // Sincronizar cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      cargarProductos();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://localhost:3001/api/productos'
      );
      const data = await response.json();
      if (data.success) {
        setProductos(data.data);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
    setLoading(false);
  };

  return (
    <ProductosContext.Provider value={{ productos, loading }}>
      {children}
    </ProductosContext.Provider>
  );
};
```

### Actualización en Tiempo Real

- **Carrito:** Se actualiza inmediatamente al agregar/eliminar
- **Productos:** Se sincronizan cada 5 segundos
- **Pedidos:** Se actualizan al cambiar estado
- **Usuarios:** Datos guardados en Context tras login

---

## TESTING DE INTEGRACIÓN

### Script de Prueba

```bash
#!/bin/bash
# backend/test-api.sh

BASE_URL="http://localhost:3001/api"

# 1. REGISTRO
echo "=== 1. REGISTRO ==="
REGISTER=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "rut": "12345678-K",
    "email": "test@example.com",
    "contraseña": "test123"
  }')
echo $REGISTER | jq

# 2. LOGIN
echo -e "\n=== 2. LOGIN ==="
LOGIN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "contraseña": "test123"
  }')
echo $LOGIN | jq

TOKEN=$(echo $LOGIN | jq -r '.data.token')
echo "Token: $TOKEN"

# 3. VER PRODUCTOS
echo -e "\n=== 3. VER PRODUCTOS ==="
curl -s -X GET $BASE_URL/productos | jq

# 4. AGREGAR AL CARRITO
echo -e "\n=== 4. AGREGAR AL CARRITO ==="
curl -s -X POST $BASE_URL/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "producto_id": "prod_1",
    "cantidad": 2
  }' | jq

# 5. VER CARRITO
echo -e "\n=== 5. VER CARRITO ==="
curl -s -X GET $BASE_URL/cart \
  -H "Authorization: Bearer $TOKEN" | jq

# 6. CREAR PEDIDO
echo -e "\n=== 6. CREAR PEDIDO ==="
curl -s -X POST $BASE_URL/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "telefono": "+56912345678",
    "direccion": "Calle 123",
    "ciudad": "Santiago",
    "region": "Metropolitana",
    "metodo_pago": "tarjeta"
  }' | jq

# 7. VER PEDIDOS
echo -e "\n=== 7. VER PEDIDOS ==="
curl -s -X GET $BASE_URL/pedidos/usuario \
  -H "Authorization: Bearer $TOKEN" | jq
```

### Ejecución del Test

```bash
cd backend
chmod +x test-api.sh
./test-api.sh
```

---

## COMUNICACIÓN ENTRE COMPONENTES

### Ejemplo: ProductCard → Backend → Confirmación

```
ProductCard.jsx (Componente)
    │
    └─→ agregarAlCarrito(productoId, cantidad)
         │
         └─→ CarritoContext.jsx (Context API)
              │
              └─→ POST /api/cart/add
                   │
                   └─→ Backend (server-demo.js)
                        │
                        ├─ Valida JWT
                        ├─ Valida stock
                        ├─ Agrega a carrito (en memoria)
                        │
                        └─→ Response: {success, items, total}
                             │
                             └─→ CarritoContext actualiza estado
                                  │
                                  └─→ Componentes se re-renderizan
```

---

## RESUMEN DE INTEGRACIÓN

| Aspecto | Frontend | Backend |
|--------|----------|---------|
| **Framework** | React 18 | Express.js |
| **Puerto** | 3000 | 3001 |
| **Autenticación** | localStorage + JWT | JWT middleware |
| **State Management** | Context API | Memoria (arrays) |
| **HTTP Client** | Fetch API | N/A |
| **CORS** | Configurado en Backend | Headers de respuesta |
| **Errores** | Toast/UI mensajes | JSON responses |
| **Sincronización** | Interval (5 seg) | Real-time |

---

**Versión:** 1.0  
**Última actualización:** 16 de Diciembre de 2025  
**Documentación:** Completa y operacional

