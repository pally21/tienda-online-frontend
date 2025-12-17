# 📡 DEMOSTRACIÓN DEL BACKEND

## Estado del Backend

El backend está corriendo en el **puerto 3001** con Node.js + Express.

### Verificar que está activo

```bash
# Ejecuta esto en terminal
curl http://localhost:3001/api/productos
```

---

## 🧪 TESTS DEL BACKEND

### 1️⃣ Obtener Productos (Sin autenticación)

```bash
curl http://localhost:3001/api/productos | python3 -m json.tool
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Camisa Casual",
      "precio": 49990,
      "stock": 25,
      "imagen": "https://images.unsplash.com/..."
    },
    ...
  ]
}
```

---

### 2️⃣ Login (Autenticación)

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login
```

**Respuesta esperada:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Admin Tienda",
    "email": "admin@tienda.com",
    "role": "ADMIN"
  }
}
```

---

### 3️⃣ Crear Producto (Requiere Token ADMIN)

```bash
# 1. Primero obtén el token
TOKEN=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

# 2. Luego crea un producto
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nombre": "Producto Test",
    "descripcion": "Producto de prueba",
    "precio": 49990,
    "stock": 10,
    "categoria": "Test",
    "imagen": "https://via.placeholder.com/500"
  }' \
  http://localhost:3001/api/productos
```

---

### 4️⃣ Crear Pedido (Requiere Token USER/ADMIN)

```bash
# 1. Obtén token
TOKEN=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

# 2. Crea un pedido
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "productos": [
      {"id": 1, "cantidad": 2, "precio": 49990}
    ],
    "total": 99980,
    "datosEnvio": {
      "nombre": "Cliente Test",
      "email": "cliente@test.com",
      "telefono": "912345678",
      "direccion": "Calle Test 123",
      "comuna": "Santiago",
      "region": "Metropolitana"
    },
    "metodoPago": "tarjeta"
  }' \
  http://localhost:3001/api/pedidos
```

---

### 5️⃣ Ver Todos los Pedidos (Admin)

```bash
# 1. Obtén token admin
TOKEN=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

# 2. Ver todos los pedidos
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/pedidos/admin/todas
```

---

### 6️⃣ Cambiar Estado de Pedido (Admin)

```bash
# 1. Obtén token admin
TOKEN=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

# 2. Cambiar estado del pedido 1
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"estado": "Enviado"}' \
  http://localhost:3001/api/pedidos/1/estado
```

---

## 📋 ENDPOINTS DEL BACKEND

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obtener datos del usuario actual

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear producto (ADMIN)
- `PUT /api/productos/:id` - Actualizar producto (ADMIN)
- `DELETE /api/productos/:id` - Eliminar producto (ADMIN)

### Pedidos
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos` - Ver mis pedidos
- `GET /api/pedidos/:id` - Ver detalle de pedido
- `GET /api/pedidos/admin/todas` - Ver todos los pedidos (ADMIN)
- `PUT /api/pedidos/:id/estado` - Cambiar estado de pedido (ADMIN)

---

## 🔐 CREDENCIALES PARA TESTING

### Admin
```
Email: admin@tienda.com
Contraseña: admin123
Role: ADMIN
```

### Usuario Regular (crear con registro)
```
Nombre: Test User
Email: test@test.com
RUT: 12345678K
Contraseña: test123
Role: USER
```

---

## 🛠️ CÓMO DEMOSTRAR EL BACKEND EN LA EVALUACIÓN

### Opción 1: Terminal Simple (Más fácil)

1. Abre Terminal en VS Code
2. Ve a carpeta `backend`: `cd backend`
3. Ejecuta: `node server-demo.js`
4. Verás: `Servidor escuchando en puerto 3001`

### Opción 2: Con Logs

Si quieres ver los logs mientras usas la aplicación:

```bash
cd backend
node server-demo.js
```

Luego en otra terminal:
```bash
curl http://localhost:3001/api/productos
```

### Opción 3: Ver Archivo del Servidor

El backend está en: `backend/server-demo.js`

Muéstralo en tu presentación y que vean:
- Línea 1: `const express = require('express')`
- Línea donde escucha: `.listen(3001, ...)`
- Los endpoints definidos
- La autenticación con JWT
- La base de datos in-memory

---

## ✅ CHECKLIST PARA DEMOSTRACIÓN

- [ ] Backend corriendo en puerto 3001
- [ ] GET /api/productos devuelve 6 productos
- [ ] POST /api/auth/login devuelve token JWT
- [ ] POST /api/productos crea producto (requiere token ADMIN)
- [ ] POST /api/pedidos crea pedido con número de seguimiento
- [ ] GET /api/pedidos/admin/todas devuelve todos los pedidos
- [ ] PUT /api/pedidos/:id/estado cambia estado
- [ ] Frontend accede a todos los endpoints correctamente

---

## 🎯 LO IMPORTANTE PARA MOSTRAR

**El backend es la "API REST" de tu aplicación:**

1. **Sin backend** → La aplicación no podría:
   - Guardar productos
   - Autenticar usuarios
   - Procesar pedidos
   - Cambiar estados de órdenes

2. **Con backend** → Toda la tienda funciona porque:
   - Los datos persisten
   - Las operaciones se validan
   - Los usuarios se autentican
   - Los pedidos se registran

**Esto es crucial para la evaluación** porque demuestra que entiendes:
- Arquitectura cliente-servidor
- API REST
- Autenticación y autorización
- Base de datos (aunque sea in-memory)

