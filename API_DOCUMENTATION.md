# DOCUMENTACIÓN DE APIs - TIENDA ONLINE REACT

**Versión:** 1.0  
**Fecha:** 16 de Diciembre de 2025  
**Backend:** Node.js + Express  
**Autenticación:** JWT (JSON Web Tokens)  
**Base URL:** `http://localhost:3001/api`

---

## TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [Autenticación](#autenticación)
3. [Estructura General](#estructura-general)
4. [Endpoints](#endpoints)
5. [Códigos de Error](#códigos-de-error)
6. [Ejemplos de Uso](#ejemplos-de-uso)

---

## INTRODUCCIÓN

Esta documentación describe todos los endpoints REST disponibles en la API de Tienda Online React. La API permite:
- ✅ Autenticar usuarios
- ✅ Gestionar productos (CRUD)
- ✅ Administrar carrito de compras
- ✅ Procesar pedidos
- ✅ Consultar historial de compras

### Base URL
```
Desarrollo: http://localhost:3001/api
Producción: https://api.tienda-online.com/api
```

### Versión API
```
v1 (actual)
```

---

## AUTENTICACIÓN

### JWT (JSON Web Token)

La API usa JWT para autenticación. Después de hacer login, recibirás un token que debes incluir en las siguientes solicitudes.

#### Flujo de Autenticación
```
1. POST /auth/login → Recibir token
2. Guardar token en localStorage
3. Incluir en header: Authorization: Bearer {token}
4. Token válido por 7 días
```

#### Cómo incluir el Token
En el header de cada solicitud:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Token Expiración
```
Duración: 7 días
Después: Debes hacer login nuevamente
```

---

## ESTRUCTURA GENERAL

### Request Headers
```http
Content-Type: application/json
Authorization: Bearer {token}  (requerido para endpoints autenticados)
```

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Mensaje descriptivo",
  "statusCode": 200
}
```

### Códigos HTTP
| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Falta autenticación |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no existe |
| 500 | Server Error - Error del servidor |

---

## ENDPOINTS

### AUTENTICACIÓN (Auth)

#### 1. Registro de Usuario
```
POST /auth/register
```

**Descripción:** Crear nueva cuenta de usuario

**Body:**
```json
{
  "nombre": "Juan García",
  "rut": "12345678-K",
  "email": "juan@email.com",
  "contraseña": "MiPass123!"
}
```

**Validaciones:**
- Nombre: mínimo 3 caracteres
- RUT: formato válido
- Email: único, válido
- Contraseña: mínimo 6 caracteres

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "juan@email.com",
    "nombre": "Juan García",
    "role": "USER"
  },
  "message": "Usuario registrado exitosamente"
}
```

**Errores:**
- `400`: Email ya existe
- `400`: RUT inválido
- `400`: Datos incompletos

**Curl:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan García",
    "rut": "12345678-K",
    "email": "juan@email.com",
    "contraseña": "MiPass123!"
  }'
```

---

#### 2. Login
```
POST /auth/login
```

**Descripción:** Autenticar usuario y obtener token

**Body:**
```json
{
  "email": "juan@email.com",
  "contraseña": "MiPass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "email": "juan@email.com",
      "nombre": "Juan García",
      "role": "USER"
    }
  },
  "message": "Login exitoso"
}
```

**Token Info:**
- Tipo: JWT
- Duración: 7 días (604800 segundos)
- Secret: Clave privada del servidor
- Payload: { userId, email, role }

**Errores:**
- `401`: Credenciales inválidas
- `404`: Usuario no existe

**Curl:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "contraseña": "MiPass123!"
  }'
```

---

### PRODUCTOS (Productos)

#### 3. Obtener Todos los Productos
```
GET /productos
```

**Descripción:** Listar todos los productos disponibles

**Autenticación:** No requerida

**Query Parameters:** Ninguno

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_1",
      "nombre": "Camisa Casual",
      "descripcion": "Camisa cómoda de algodón",
      "precio": 49990,
      "stock": 25,
      "categoria": "Ropa",
      "imagen": "https://..."
    },
    {
      "id": "prod_2",
      "nombre": "Pantalón Jeans",
      "descripcion": "Jeans de moda",
      "precio": 79990,
      "stock": 15,
      "categoria": "Ropa",
      "imagen": "https://..."
    }
  ],
  "count": 6
}
```

**Curl:**
```bash
curl -X GET http://localhost:3001/api/productos
```

---

#### 4. Obtener Producto por ID
```
GET /productos/:id
```

**Descripción:** Obtener detalles de un producto específico

**Parámetros:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del producto |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "prod_1",
    "nombre": "Camisa Casual",
    "descripcion": "Camisa cómoda de algodón",
    "precio": 49990,
    "stock": 25,
    "categoria": "Ropa",
    "imagen": "https://..."
  }
}
```

**Errores:**
- `404`: Producto no encontrado

**Curl:**
```bash
curl -X GET http://localhost:3001/api/productos/prod_1
```

---

#### 5. Crear Producto (ADMIN)
```
POST /productos
```

**Descripción:** Crear nuevo producto

**Autenticación:** Requerida (ADMIN)

**Body:**
```json
{
  "nombre": "Zapatos Deportivos",
  "descripcion": "Zapatos cómodos para deporte",
  "precio": 89990,
  "stock": 20,
  "categoria": "Calzado",
  "imagen": "https://example.com/zapatos.jpg"
}
```

**Validaciones:**
- Precio > 0
- Stock >= 0
- URL válida
- Todos los campos requeridos

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "prod_123",
    "nombre": "Zapatos Deportivos",
    "precio": 89990,
    "stock": 20,
    "categoria": "Calzado",
    "imagen": "https://..."
  },
  "message": "Producto creado"
}
```

**Errores:**
- `401`: No autenticado
- `403`: No es ADMIN
- `400`: Datos inválidos

**Curl:**
```bash
curl -X POST http://localhost:3001/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "nombre": "Zapatos Deportivos",
    "descripcion": "Zapatos cómodos para deporte",
    "precio": 89990,
    "stock": 20,
    "categoria": "Calzado",
    "imagen": "https://example.com/zapatos.jpg"
  }'
```

---

#### 6. Actualizar Producto (ADMIN)
```
PUT /productos/:id
```

**Descripción:** Actualizar información del producto

**Autenticación:** Requerida (ADMIN)

**Parámetros:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del producto |

**Body:** (todos los campos opcionales)
```json
{
  "nombre": "Zapatos Deportivos Premium",
  "precio": 99990,
  "stock": 15
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "prod_123",
    "nombre": "Zapatos Deportivos Premium",
    "precio": 99990,
    "stock": 15,
    "categoria": "Calzado",
    "imagen": "https://..."
  },
  "message": "Producto actualizado"
}
```

**Errores:**
- `401`: No autenticado
- `403`: No es ADMIN
- `404`: Producto no existe

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/productos/prod_123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "nombre": "Zapatos Deportivos Premium",
    "precio": 99990,
    "stock": 15
  }'
```

---

#### 7. Eliminar Producto (ADMIN)
```
DELETE /productos/:id
```

**Descripción:** Eliminar un producto

**Autenticación:** Requerida (ADMIN)

**Parámetros:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del producto |

**Response (200):**
```json
{
  "success": true,
  "message": "Producto eliminado"
}
```

**Errores:**
- `401`: No autenticado
- `403`: No es ADMIN
- `404`: Producto no existe

**Curl:**
```bash
curl -X DELETE http://localhost:3001/api/productos/prod_123 \
  -H "Authorization: Bearer {token}"
```

---

### CARRITO (Cart)

#### 8. Obtener Carrito
```
GET /cart
```

**Descripción:** Obtener items del carrito del usuario actual

**Autenticación:** Requerida

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "producto_id": "prod_1",
        "nombre": "Camisa Casual",
        "cantidad": 2,
        "precio_unitario": 49990,
        "subtotal": 99980,
        "imagen": "https://..."
      }
    ],
    "total": 99980,
    "cantidad_items": 1
  }
}
```

**Curl:**
```bash
curl -X GET http://localhost:3001/api/cart \
  -H "Authorization: Bearer {token}"
```

---

#### 9. Agregar al Carrito
```
POST /cart/add
```

**Descripción:** Agregar producto al carrito

**Autenticación:** Requerida

**Body:**
```json
{
  "producto_id": "prod_1",
  "cantidad": 2
}
```

**Validaciones:**
- Cantidad > 0
- Producto debe existir
- Stock suficiente

**Response (201):**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 99980
  },
  "message": "Producto agregado al carrito"
}
```

**Errores:**
- `404`: Producto no existe
- `400`: Stock insuficiente
- `400`: Cantidad inválida

**Curl:**
```bash
curl -X POST http://localhost:3001/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "producto_id": "prod_1",
    "cantidad": 2
  }'
```

---

#### 10. Actualizar Cantidad
```
PUT /cart/update/:productId
```

**Descripción:** Cambiar cantidad de producto en carrito

**Autenticación:** Requerida

**Parámetros:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| productId | string | ID del producto |

**Body:**
```json
{
  "cantidad": 5
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 249950
  },
  "message": "Cantidad actualizada"
}
```

**Errores:**
- `404`: Producto no en carrito
- `400`: Cantidad inválida

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/cart/update/prod_1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"cantidad": 5}'
```

---

#### 11. Eliminar del Carrito
```
DELETE /cart/remove/:productId
```

**Descripción:** Eliminar producto del carrito

**Autenticación:** Requerida

**Parámetros:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| productId | string | ID del producto |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [],
    "total": 0
  },
  "message": "Producto removido"
}
```

**Curl:**
```bash
curl -X DELETE http://localhost:3001/api/cart/remove/prod_1 \
  -H "Authorization: Bearer {token}"
```

---

#### 12. Limpiar Carrito
```
POST /cart/clear
```

**Descripción:** Vaciar todo el carrito

**Autenticación:** Requerida

**Response (200):**
```json
{
  "success": true,
  "data": {
    "items": [],
    "total": 0
  },
  "message": "Carrito vaciado"
}
```

**Curl:**
```bash
curl -X POST http://localhost:3001/api/cart/clear \
  -H "Authorization: Bearer {token}"
```

---

### PEDIDOS (Orders)

#### 13. Crear Pedido
```
POST /pedidos
```

**Descripción:** Procesar compra y crear pedido

**Autenticación:** Requerida

**Body:**
```json
{
  "nombre": "Juan García",
  "email": "juan@email.com",
  "telefono": "+56912345678",
  "direccion": "Calle 123, Depto 456",
  "ciudad": "Santiago",
  "region": "Metropolitana",
  "metodo_pago": "tarjeta"
}
```

**Validaciones:**
- Carrito no vacío
- Todos los datos requeridos
- Email válido
- Stock disponible

**Response (201):**
```json
{
  "success": true,
  "data": {
    "numero_pedido": "TRK10RYAYXKJ",
    "usuario_id": "user_123",
    "fecha": "2025-12-16T18:45:00.000Z",
    "items": [
      {
        "producto_id": "prod_1",
        "nombre": "Camisa Casual",
        "cantidad": 2,
        "precio_unitario": 49990,
        "subtotal": 99980
      }
    ],
    "total": 99980,
    "estado": "Pendiente",
    "envio": {
      "nombre": "Juan García",
      "email": "juan@email.com",
      "direccion": "Calle 123, Depto 456",
      "ciudad": "Santiago",
      "region": "Metropolitana"
    },
    "metodo_pago": "tarjeta"
  },
  "message": "Pedido creado exitosamente"
}
```

**Errores:**
- `400`: Carrito vacío
- `400`: Datos incompletos
- `400`: Stock insuficiente

**Curl:**
```bash
curl -X POST http://localhost:3001/api/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "nombre": "Juan García",
    "email": "juan@email.com",
    "telefono": "+56912345678",
    "direccion": "Calle 123, Depto 456",
    "ciudad": "Santiago",
    "region": "Metropolitana",
    "metodo_pago": "tarjeta"
  }'
```

---

#### 14. Obtener Mis Pedidos
```
GET /pedidos/usuario
```

**Descripción:** Listar pedidos del usuario actual

**Autenticación:** Requerida

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "numero_pedido": "TRK10RYAYXKJ",
      "fecha": "2025-12-16T18:45:00.000Z",
      "total": 99980,
      "estado": "Pendiente",
      "items": [...]
    }
  ],
  "count": 1
}
```

**Curl:**
```bash
curl -X GET http://localhost:3001/api/pedidos/usuario \
  -H "Authorization: Bearer {token}"
```

---

#### 15. Obtener Todos los Pedidos (ADMIN)
```
GET /pedidos
```

**Descripción:** Listar todos los pedidos (admin)

**Autenticación:** Requerida (ADMIN)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "numero_pedido": "TRK10RYAYXKJ",
      "usuario_id": "user_123",
      "usuario_email": "juan@email.com",
      "fecha": "2025-12-16T18:45:00.000Z",
      "total": 99980,
      "estado": "Pendiente",
      "items": [...]
    }
  ],
  "count": 5
}
```

**Curl:**
```bash
curl -X GET http://localhost:3001/api/pedidos \
  -H "Authorization: Bearer {token}"
```

---

#### 16. Actualizar Estado de Pedido (ADMIN)
```
PUT /pedidos/:numero_pedido/estado
```

**Descripción:** Cambiar estado del pedido

**Autenticación:** Requerida (ADMIN)

**Parámetros:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| numero_pedido | string | Número de seguimiento |

**Body:**
```json
{
  "estado": "Procesando"
}
```

**Estados válidos:**
- Pendiente
- Procesando
- Enviado
- Entregado
- Cancelado

**Response (200):**
```json
{
  "success": true,
  "data": {
    "numero_pedido": "TRK10RYAYXKJ",
    "estado": "Procesando"
  },
  "message": "Estado actualizado"
}
```

**Errores:**
- `404`: Pedido no existe
- `400`: Estado inválido

**Curl:**
```bash
curl -X PUT http://localhost:3001/api/pedidos/TRK10RYAYXKJ/estado \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"estado": "Procesando"}'
```

---

## CÓDIGOS DE ERROR

| Código | Mensaje | Causa | Solución |
|--------|---------|-------|----------|
| 400 | Bad Request | Datos inválidos o incompletos | Verifica el body de la solicitud |
| 401 | Unauthorized | Falta token o token inválido | Haz login y obtén token |
| 403 | Forbidden | Permisos insuficientes | Necesitas ser ADMIN |
| 404 | Not Found | Recurso no existe | Verifica el ID |
| 500 | Server Error | Error del servidor | Contacta soporte |

### Respuesta de Error Ejemplo
```json
{
  "success": false,
  "message": "Email ya existe",
  "statusCode": 400
}
```

---

## EJEMPLOS DE USO

### Flujo Completo: Registrar → Comprar → Ver Pedido

#### 1. Registrar Usuario
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan García",
    "rut": "12345678-K",
    "email": "juan@email.com",
    "contraseña": "MiPass123!"
  }'
```

#### 2. Login y Guardar Token
```bash
TOKEN=$(curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "contraseña": "MiPass123!"
  }' | jq -r '.data.token')

echo "Token: $TOKEN"
```

#### 3. Obtener Productos
```bash
curl -X GET http://localhost:3001/api/productos
```

#### 4. Agregar al Carrito
```bash
curl -X POST http://localhost:3001/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "producto_id": "prod_1",
    "cantidad": 2
  }'
```

#### 5. Ver Carrito
```bash
curl -X GET http://localhost:3001/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

#### 6. Crear Pedido
```bash
curl -X POST http://localhost:3001/api/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nombre": "Juan García",
    "email": "juan@email.com",
    "telefono": "+56912345678",
    "direccion": "Calle 123, Depto 456",
    "ciudad": "Santiago",
    "region": "Metropolitana",
    "metodo_pago": "tarjeta"
  }'
```

#### 7. Ver Mis Pedidos
```bash
curl -X GET http://localhost:3001/api/pedidos/usuario \
  -H "Authorization: Bearer $TOKEN"
```

---

## RESUMEN DE ENDPOINTS

| HTTP | Endpoint | Descripción | Auth | Admin |
|------|----------|-------------|------|-------|
| POST | /auth/register | Registrar usuario | ❌ | ❌ |
| POST | /auth/login | Login | ❌ | ❌ |
| GET | /productos | Listar productos | ❌ | ❌ |
| GET | /productos/:id | Obtener producto | ❌ | ❌ |
| POST | /productos | Crear producto | ✅ | ✅ |
| PUT | /productos/:id | Actualizar producto | ✅ | ✅ |
| DELETE | /productos/:id | Eliminar producto | ✅ | ✅ |
| GET | /cart | Ver carrito | ✅ | ❌ |
| POST | /cart/add | Agregar al carrito | ✅ | ❌ |
| PUT | /cart/update/:productId | Actualizar cantidad | ✅ | ❌ |
| DELETE | /cart/remove/:productId | Eliminar del carrito | ✅ | ❌ |
| POST | /cart/clear | Limpiar carrito | ✅ | ❌ |
| POST | /pedidos | Crear pedido | ✅ | ❌ |
| GET | /pedidos/usuario | Mis pedidos | ✅ | ❌ |
| GET | /pedidos | Todos los pedidos | ✅ | ✅ |
| PUT | /pedidos/:numero/estado | Cambiar estado | ✅ | ✅ |

**Total:** 15 endpoints

---

**Versión:** 1.0  
**Última actualización:** 16 de Diciembre de 2025  
**Mantenedor:** Equipo de Desarrollo

