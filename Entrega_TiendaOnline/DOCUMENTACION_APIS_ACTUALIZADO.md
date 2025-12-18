# 📚 DOCUMENTACIÓN DE APIs - ACTUALIZADO

**Tienda Online - API REST**  
**Versión:** 2.1 (MongoDB + Optimizaciones)  
**Fecha:** 17 de Diciembre de 2025  
**Base URL:** `http://localhost:3002/api`

---

## 🔄 CAMBIOS RECIENTES (v2.1)

### Mejoras de Estabilidad y Performance

1. **Timeouts de MongoDB Aumentados**
   - `connectTimeoutMS`: 300,000ms (5 minutos)
   - `socketTimeoutMS`: 300,000ms (5 minutos)
   - `serverSelectionTimeoutMS`: 300,000ms (5 minutos)

2. **Pool de Conexiones Expandido**
   - `maxPoolSize`: 50 conexiones
   - `minPoolSize`: 10 conexiones
   - Mejor manejo de carga concurrente

3. **Reintentos Automáticos**
   - Hasta 3 intentos automáticos en operaciones de eliminación
   - Espera de 2 segundos entre intentos
   - Mejora significativa en fiabilidad

4. **HeartBeat Mejorado**
   - `heartbeatFrequencyMS`: 30,000ms
   - Mantiene las conexiones activas
   - Previene desconexiones inesperadas

---

## 📋 Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Productos](#productos)
3. [Pedidos](#pedidos)
4. [Admin](#admin)
5. [Códigos de Error](#códigos-de-error)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🔐 Autenticación

### POST /auth/register
Registrar un nuevo usuario en el sistema.

**Request:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "MiContraseña123"
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
    "estado": "activo"
  }
}
```

### POST /auth/login
Iniciar sesión y obtener token JWT.

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
  }
}
```

**Headers requeridos para rutas protegidas:**
```
Authorization: Bearer <token>
```

---

## 📦 Productos

### GET /productos
Obtener todos los productos activos.

**Response (200 OK):**
```json
[
  {
    "_id": "694350f3339c92c665cb2191",
    "nombre": "Zapatos Deportivos",
    "descripcion": "Zapatos deportivos de alta calidad para correr",
    "precio": 89990,
    "categoria": "Calzado",
    "stock": 20,
    "imagen": "https://images.unsplash.com/...",
    "activo": true,
    "createdAt": "2025-12-18T00:55:15.448Z",
    "updatedAt": "2025-12-18T00:55:15.448Z"
  }
]
```

### GET /productos/:id
Obtener un producto específico por ID.

**Response (200 OK):**
```json
{
  "_id": "694350f3339c92c665cb2191",
  "nombre": "Zapatos Deportivos",
  "descripcion": "Zapatos deportivos de alta calidad",
  "precio": 89990,
  "categoria": "Calzado",
  "stock": 20,
  "imagen": "https://images.unsplash.com/...",
  "activo": true
}
```

### POST /productos (Admin)
Crear un nuevo producto (requiere rol ADMIN).

**Request:**
```json
{
  "nombre": "Producto Nuevo",
  "descripcion": "Descripción del producto",
  "precio": 49990,
  "categoria": "Categoría",
  "stock": 10,
  "imagen": "https://url-imagen.com/..."
}
```

**Response (201 Created):**
```json
{
  "message": "Producto creado exitosamente",
  "producto": {
    "_id": "507f1f77bcf86cd799439012",
    "nombre": "Producto Nuevo",
    "precio": 49990,
    ...
  }
}
```

### PUT /productos/:id (Admin)
Actualizar un producto existente.

**Request:**
```json
{
  "precio": 59990,
  "stock": 15
}
```

**Response (200 OK):**
```json
{
  "message": "Producto actualizado exitosamente",
  "producto": { ... }
}
```

### DELETE /productos/:id (Admin)
Eliminar un producto por ID.

**Características:**
- Reintentos automáticos hasta 3 veces
- Espera de 2 segundos entre intentos
- Timeout de 5 minutos por operación

**Response (200 OK):**
```json
{
  "message": "Producto eliminado exitosamente",
  "producto": { ... }
}
```

**Response (504 Gateway Timeout):**
```json
{
  "message": "Tiempo de espera agotado. MongoDB está lento. Intenta nuevamente.",
  "error": "Socket timeout"
}
```

---

## 🛒 Pedidos

### GET /pedidos (Autenticado)
Obtener todos los pedidos del usuario autenticado.

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "usuarioId": "507f1f77bcf86cd799439011",
    "productos": [
      {
        "productoId": "694350f3339c92c665cb2191",
        "cantidad": 2,
        "precioUnitario": 89990
      }
    ],
    "total": 179980,
    "estado": "confirmado",
    "fecha": "2025-12-17T21:55:15.448Z"
  }
]
```

### POST /pedidos (Autenticado)
Crear un nuevo pedido.

**Request:**
```json
{
  "productos": [
    {
      "productoId": "694350f3339c92c665cb2191",
      "cantidad": 2
    }
  ],
  "direccion": "Calle Principal 123",
  "region": "Metropolitana",
  "comuna": "Santiago"
}
```

**Response (201 Created):**
```json
{
  "message": "Pedido creado exitosamente",
  "pedido": { ... }
}
```

---

## 👨‍💼 Admin

### GET /admin/estadisticas
Obtener estadísticas del sistema (Admin).

**Response (200 OK):**
```json
{
  "totalProductos": 5,
  "totalUsuarios": 10,
  "totalPedidos": 25,
  "totalVentas": 2500000
}
```

### GET /admin/productos
Obtener todos los productos (incluyendo inactivos).

### PUT /admin/productos/:id
Actualizar estado de un producto.

---

## ⚠️ Códigos de Error

| Código | Descripción | Solución |
|--------|-------------|----------|
| 400 | Bad Request | Verifica los parámetros enviados |
| 401 | No autorizado | Incluye un token JWT válido |
| 403 | Prohibido | Necesitas rol ADMIN |
| 404 | No encontrado | El recurso no existe |
| 500 | Error interno | Contacta a soporte |
| 504 | Gateway Timeout | MongoDB está lento, intenta nuevamente |

---

## 🔧 Solución de Problemas

### Problema: Socket timeout después de 30 segundos
**Causa:** MongoDB Atlas está tardando en responder.

**Soluciones:**
1. Espera 2-3 minutos e intenta nuevamente
2. Verifica tu conexión a internet
3. Comprueba que tu IP está en la whitelist de MongoDB Atlas
4. El sistema reintentar automáticamente hasta 3 veces

### Problema: Conexión rechazada en puerto 3002
**Causa:** El backend no está corriendo.

**Solución:**
```bash
cd backend
npm start
```

### Problema: CORS Error
**Causa:** El frontend está intentando acceder desde un puerto diferente.

**Verificar en api.js:**
```javascript
const API_URL = "http://localhost:3002/api";
```

---

## 📊 Rendimiento

**Configuración de MongoDB optimizada:**
- Pool de conexiones: 50 máximo, 10 mínimo
- Timeouts: 5 minutos para operaciones largas
- Reintentos: Automáticos con backoff
- HeartBeat: 30 segundos

**Rendimiento esperado:**
- Lectura de productos: < 100ms
- Creación de pedidos: < 500ms
- Eliminación: < 3 segundos (con reintentos)

---

**Última actualización:** 17 de Diciembre de 2025  
**Versión:** 2.1  
**Estado:** Producción
