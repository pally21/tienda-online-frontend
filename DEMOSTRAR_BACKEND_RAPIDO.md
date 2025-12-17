# 🎯 DEMOSTRACIÓN RÁPIDA DEL BACKEND (5 MINUTOS)

## PASO 1: Abre dos terminales

### Terminal 1: Ejecutar Backend
```bash
cd /Users/usuario/tienda-online-react/backend
node server-demo.js
```

Verás:
```
Servidor escuchando en puerto 3001 ✅
```

### Terminal 2: Ejecutar Tests

```bash
cd /Users/usuario/tienda-online-react/backend
bash test-api.sh
```

---

## PASO 2: Muestra esto en la Evaluación

### Opción A: Mostrar la Terminal con Backend Corriendo
```
✅ Abres Terminal 1
✅ Ves: "Servidor escuchando en puerto 3001"
✅ El evaluador ve que está activo
```

### Opción B: Ejecutar Comandos Manuales
```bash
# Comando 1: Ver productos
curl http://localhost:3001/api/productos

# Comando 2: Login (obtiene JWT)
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login

# Comando 3: Ver todo los pedidos (admin)
curl -H "Authorization: Bearer <token>" \
  http://localhost:3001/api/pedidos/admin/todas
```

### Opción C: Mostrar el Archivo del Servidor
```
1. Abre: backend/server-demo.js en VS Code
2. Muestra:
   - Línea 1: require('express')
   - Línea ~15: app.listen(3001)
   - Línea ~50-100: Los endpoints GET /api/productos
   - Línea ~150: POST /api/auth/login
   - Línea ~250: POST /api/pedidos
3. Explica: "Este archivo contiene TODO el servidor"
```

---

## PASO 3: Explica qué es el Backend

> **"El backend es la API REST que recibe solicitudes del frontend"**

### Flujo de datos:

```
FRONTEND (React)
      ↓ (fetch/axios)
BACKEND (Node.js/Express) ← PORT 3001
      ↓ (procesa)
RESPUESTA JSON
      ↓
FRONTEND (mostrar datos)
```

### Ejemplos:

1. **Cuando haces clic en "Agregar al carrito"**
   - Frontend hace: `POST /api/pedidos`
   - Backend: procesa y guarda en BD
   - Backend responde: `{ success: true, numero_seguimiento: "TRK..." }`
   - Frontend: muestra confirmación

2. **Cuando ves los productos**
   - Frontend hace: `GET /api/productos`
   - Backend: busca en BD y responde con JSON
   - Frontend: renderiza los 6 productos

3. **Cuando haces login**
   - Frontend hace: `POST /api/auth/login`
   - Backend: valida credenciales, genera JWT
   - Backend responde: `{ token: "eyJ...", usuario: {...} }`
   - Frontend: guarda token y redirige

---

## PASO 4: Detalles Técnicos para Mostrar

### Stack usado:
- **Framework:** Express.js (para Node.js)
- **Puerto:** 3001
- **Base de datos:** Arrays en memoria (temporal)
- **Autenticación:** JWT (JSON Web Tokens)
- **Hashing:** bcryptjs para contraseñas

### Endpoints implementados (15 total):

**Autenticación (3):**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

**Productos (5):**
- GET /api/productos
- GET /api/productos/:id
- POST /api/productos (ADMIN)
- PUT /api/productos/:id (ADMIN)
- DELETE /api/productos/:id (ADMIN)

**Pedidos (7):**
- POST /api/pedidos
- GET /api/pedidos
- GET /api/pedidos/:id
- GET /api/pedidos/admin/todas (ADMIN)
- PUT /api/pedidos/:id/estado (ADMIN)
- POST /api/pedidos/:id/cancelar (ADMIN)
- GET /api/pedidos/:id/estado

---

## PASO 5: Código importante del Backend

### Escucha en puerto 3001:
```javascript
app.listen(3001, () => {
  console.log('Servidor escuchando en puerto 3001');
});
```

### Endpoint GET productos:
```javascript
app.get('/api/productos', (req, res) => {
  res.json({
    success: true,
    data: productos
  });
});
```

### Autenticación con JWT:
```javascript
const token = jwt.sign(
  { id: usuario.id, email: usuario.email, role: usuario.role },
  'tu-secreto-super-seguro',
  { expiresIn: '7d' }
);
```

### Crear pedido:
```javascript
app.post('/api/pedidos', autenticar, (req, res) => {
  const nuevoNumeroSeguimiento = 'TRK' + 
    Math.random().toString(36).substr(2, 10).toUpperCase();
  
  const pedido = {
    ...req.body,
    numeroSeguimiento: nuevoNumeroSeguimiento,
    estado: 'Pendiente'
  };
  
  pedidos.push(pedido);
  res.json({ success: true, data: pedido });
});
```

---

## ✅ CHECKLIST PARA DEMOSTRACIÓN

En la evaluación muestras:

- [ ] Backend corriendo en puerto 3001
- [ ] Terminal mostrando "Servidor escuchando"
- [ ] Ejecutas comando `curl http://localhost:3001/api/productos`
- [ ] Respuesta JSON con 6 productos
- [ ] Ejecutas login y obtienes JWT token
- [ ] Utilizas token para ver pedidos (protegido)
- [ ] Explicas qué hace cada endpoint
- [ ] Muestras el archivo `server-demo.js`
- [ ] Explicas flujo request-response
- [ ] Mencionas autenticación JWT
- [ ] Mencionas validación de roles (ADMIN/USER)

---

## 🎬 GUION PARA PRESENTAR (2 MINUTOS)

```
"El backend es un servidor Node.js con Express que corre en el puerto 3001.

Aquí puedo demostrar:

1. [Abre terminal] Terminal mostrando 'Servidor escuchando en puerto 3001'

2. [Ejecuta] curl http://localhost:3001/api/productos
   Ves la respuesta JSON con los 6 productos de mi tienda

3. [Ejecuta] curl -X POST ... login
   Obtienes un JWT token que se usa para autenticación

4. [Muestra archivo] Abro server-demo.js y veo:
   - Todos los endpoints (GET, POST, PUT, DELETE)
   - Validación de roles
   - Manejo de errores
   - Seguridad con JWT

5. [Explica] 
   'Cuando el usuario hace clic en 'Agregar al carrito', 
   el frontend envía una solicitud HTTP al backend,
   el backend procesa la solicitud, y devuelve una respuesta JSON.
   Esto es una API REST.'

¿Preguntas?"
```

---

## 🚀 COMANDO RÁPIDO PARA EJECUTAR

Si quieres un comando que lo haga TODO:

```bash
# En una terminal
cd /Users/usuario/tienda-online-react/backend && node server-demo.js

# En otra terminal (después de 2 segundos)
sleep 2 && curl -s http://localhost:3001/api/productos | python3 -m json.tool | head -20
```

---

## 📱 ALTERNATIVA: Si no funciona

Si por algún motivo el backend no inicia, puedes mostrar:

1. El archivo `backend/server-demo.js` en VS Code
2. El contenido del archivo (enseña el código)
3. Explica qué hace línea por línea
4. Muestras los 15 endpoints definidos

Esto también demuestra que entiendes backend aunque no esté ejecutándose en ese momento.

