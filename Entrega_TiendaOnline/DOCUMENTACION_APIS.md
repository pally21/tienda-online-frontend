# 📚 DOCUMENTACIÓN DE APIs

**Tienda Online - API REST**  
**Versión:** 2.0 (MongoDB)  
**Fecha:** 17 de Diciembre de 2025  
**Base URL:** `http://localhost:3002/api`

---

## 📋 Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Productos](#productos)
3. [Pedidos](#pedidos)
4. [Admin](#admin)
5. [Códigos de Error](#códigos-de-error)

---

## 🔐 Autenticación

### POST /auth/register
Registrar un nuevo usuario en el sistema.

**Request:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "MiContraseña123",
  "rut": "12345678-9"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "usuario": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "role": "USER",
    "estado": "activo",
    "fechaRegistro": "2025-12-17T21:55:15.447Z"
  }
}
```

**Validaciones:**
- Email único en la base de datos
- Contraseña mínimo 6 caracteres
- Email con formato válido

---

### POST /auth/login
Iniciar sesión y obtener JWT token.

**Request:**
```json
{
  "email": "juan@ejemplo.com",
  "password": "MiContraseña123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "role": "USER"
  },
  "expiresIn": "7d"
}
```

**Headers requeridos para siguientes llamadas:**
```
Authorization: Bearer <token>
```

---

### GET /auth/me
Obtener información del usuario autenticado.

**Headers requeridos:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "success": true,
  "usuario": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "role": "USER",
    "estado": "activo",
    "fechaRegistro": "2025-12-17T21:55:15.447Z",
    "ultimaCompra": "2025-12-17T22:10:00.000Z"
  }
}
```

---

## 📦 Productos

### GET /productos
Obtener lista de todos los productos.

**Query Parameters:**
- `categoria` (opcional): Filtrar por categoría
- `limit` (opcional): Número de productos a devolver
- `skip` (opcional): Número de productos a saltar

**Response (200 OK):**
```json
[
  {
    "_id": "694350f3339c92c665cb2190",
    "nombre": "Camisa Casual",
    "descripcion": "Camisa casual cómoda de algodón puro",
    "precio": 49990,
    "categoria": "Ropa",
    "stock": 25,
    "imagen": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    "activo": true,
    "createdAt": "2025-12-18T00:55:15.447Z",
    "updatedAt": "2025-12-18T00:55:15.447Z"
  },
  {
    "_id": "694350f3339c92c665cb2191",
    "nombre": "Zapatos Deportivos",
    "descripcion": "Zapatos deportivos de alta calidad",
    "precio": 89990,
    "categoria": "Calzado",
    "stock": 20,
    "imagen": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    "activo": true,
    "createdAt": "2025-12-18T00:55:15.448Z",
    "updatedAt": "2025-12-18T00:55:15.448Z"
  }
]
```

---

### GET /productos/:id
Obtener detalle de un producto específico.

**Response (200 OK):**
```json
{
  "_id": "694350f3339c92c665cb2190",
  "nombre": "Camisa Casual",
  "descripcion": "Camisa casual cómoda de algodón puro. Perfecta para el día a día",
  "precio": 49990,
  "categoria": "Ropa",
  "stock": 25,
  "imagen": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  "activo": true,
  "createdAt": "2025-12-18T00:55:15.447Z",
  "updatedAt": "2025-12-18T00:55:15.447Z"
}
```

---

### POST /productos
Crear un nuevo producto (Solo ADMIN).

**Headers requeridos:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request:**
```json
{
  "nombre": "Producto Nuevo",
  "descripcion": "Descripción del producto",
  "precio": 29990,
  "categoria": "Electrónica",
  "stock": 50,
  "imagen": "https://ejemplo.com/imagen.jpg",
  "activo": true
}
```

**Response (201 Created):**
```json
{
  "_id": "694350f3339c92c665cb2195",
  "nombre": "Producto Nuevo",
  "descripcion": "Descripción del producto",
  "precio": 29990,
  "categoria": "Electrónica",
  "stock": 50,
  "imagen": "https://ejemplo.com/imagen.jpg",
  "activo": true,
  "createdAt": "2025-12-17T21:55:15.447Z",
  "updatedAt": "2025-12-17T21:55:15.447Z"
}
```

---

### PUT /productos/:id
Actualizar un producto existente (Solo ADMIN).

**Headers requeridos:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request:**
```json
{
  "nombre": "Camisa Casual Actualizada",
  "precio": 54990,
  "stock": 30
}
```

**Response (200 OK):**
```json
{
  "_id": "694350f3339c92c665cb2190",
  "nombre": "Camisa Casual Actualizada",
  "descripcion": "Camisa casual cómoda de algodón puro",
  "precio": 54990,
  "categoria": "Ropa",
  "stock": 30,
  "imagen": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  "activo": true,
  "updatedAt": "2025-12-17T21:56:30.000Z"
}
```

---

### DELETE /productos/:id
Eliminar un producto (Solo ADMIN).

**Headers requeridos:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Producto eliminado exitosamente"
}
```

---

## 🛒 Pedidos

### POST /pedidos
Crear un nuevo pedido (Requiere autenticación).

**Headers requeridos:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "items": [
    {
      "producto": "694350f3339c92c665cb2190",
      "nombre": "Camisa Casual",
      "cantidad": 2,
      "precio": 49990
    },
    {
      "producto": "694350f3339c92c665cb2191",
      "nombre": "Zapatos Deportivos",
      "cantidad": 1,
      "precio": 89990
    }
  ],
  "total": 189970,
  "cliente": {
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "region": "Región Metropolitana",
    "comuna": "Santiago",
    "direccion": "Calle Principal 123",
    "telefono": "+56912345678"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "pedido": {
    "_id": "507f1f77bcf86cd799439012",
    "usuario": "507f1f77bcf86cd799439011",
    "items": [
      {
        "producto": "694350f3339c92c665cb2190",
        "nombre": "Camisa Casual",
        "cantidad": 2,
        "precio": 49990
      }
    ],
    "total": 189970,
    "cliente": {
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "region": "Región Metropolitana",
      "comuna": "Santiago",
      "direccion": "Calle Principal 123",
      "telefono": "+56912345678"
    },
    "estado": "Pendiente",
    "createdAt": "2025-12-17T21:55:15.447Z",
    "updatedAt": "2025-12-17T21:55:15.447Z"
  }
}
```

**Estados posibles:** Pendiente, Procesando, Enviado, Entregado, Cancelado

---

### GET /pedidos
Obtener los pedidos del usuario autenticado.

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "usuario": {
      "_id": "507f1f77bcf86cd799439011",
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com"
    },
    "items": [...],
    "total": 189970,
    "estado": "Procesando",
    "createdAt": "2025-12-17T21:55:15.447Z"
  }
]
```

---

### GET /pedidos/:id
Obtener detalle de un pedido específico.

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "usuario": "507f1f77bcf86cd799439011",
  "items": [
    {
      "producto": "694350f3339c92c665cb2190",
      "nombre": "Camisa Casual",
      "cantidad": 2,
      "precio": 49990,
      "detalles": {...}
    }
  ],
  "total": 189970,
  "cliente": {...},
  "estado": "Procesando",
  "createdAt": "2025-12-17T21:55:15.447Z",
  "updatedAt": "2025-12-17T22:30:00.000Z"
}
```

---

## 👨‍💼 Admin

### GET /admin/usuarios
Obtener lista de todos los usuarios (Solo ADMIN).

**Headers requeridos:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "role": "USER",
    "estado": "activo",
    "fechaRegistro": "2025-12-17T21:55:15.447Z",
    "ultimaCompra": "2025-12-17T22:10:00.000Z"
  }
]
```

---

### GET /admin/usuarios/:id
Obtener detalle de un usuario específico (Solo ADMIN).

**Response (200 OK):** Mismo formato que arriba.

---

### PUT /admin/usuarios/:id/estado
Cambiar estado de un usuario (Solo ADMIN).

**Request:**
```json
{
  "estado": "suspendido"
}
```

**Estados válidos:** activo, suspendido, inactivo

**Response (200 OK):**
```json
{
  "success": true,
  "usuario": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "estado": "suspendido"
  }
}
```

---

### DELETE /admin/usuarios/:id
Eliminar un usuario (Solo ADMIN).

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Usuario eliminado exitosamente"
}
```

---

### GET /admin/pedidos
Obtener todos los pedidos (Solo ADMIN).

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "usuario": {
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com"
    },
    "items": [...],
    "total": 189970,
    "estado": "Procesando",
    "createdAt": "2025-12-17T21:55:15.447Z"
  }
]
```

---

### PUT /admin/pedidos/:id/estado
Actualizar estado de un pedido (Solo ADMIN).

**Request:**
```json
{
  "estado": "Enviado"
}
```

**Response (200 OK):** Pedido actualizado con nuevo estado.

---

## ⚠️ Códigos de Error

| Código | Descripción |
|--------|------------|
| **200** | OK - Solicitud exitosa |
| **201** | Created - Recurso creado exitosamente |
| **400** | Bad Request - Datos inválidos |
| **401** | Unauthorized - Token inválido o ausente |
| **403** | Forbidden - Sin permisos (no es ADMIN) |
| **404** | Not Found - Recurso no encontrado |
| **409** | Conflict - Email ya registrado |
| **500** | Internal Server Error - Error del servidor |

**Ejemplo de error (401):**
```json
{
  "error": "Token no proporcionado o inválido",
  "status": 401
}
```

---

## 📝 Notas Importantes

1. **Autenticación:** Todos los endpoints excepto `/auth/register` y `/auth/login` requieren token JWT
2. **Roles:** Solo usuarios con rol ADMIN pueden acceder a endpoints `/admin/*`
3. **Base de datos:** MongoDB Atlas con conexión segura
4. **Timeout:** Los tokens expiran en 7 días
5. **CORS:** Habilitado para http://localhost:3000

---

## 🔍 Pruebas de la API

Puedes probar los endpoints usando:
- **Swagger UI:** http://localhost:3002/api-docs
- **Postman:** Importar endpoints desde el README
- **cURL:** Ver ejemplos en comandos shell

**Ejemplo cURL:**
```bash
# Registrar usuario
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "Segura123",
    "rut": "12345678-9"
  }'

# Obtener productos
curl http://localhost:3002/api/productos

# Crear pedido (requiere token)
curl -X POST http://localhost:3002/api/pedidos \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

