# 📌 TARJETA DE REFERENCIA RÁPIDA - BACKEND

## 🎯 QUÉ ES EL BACKEND

Tu aplicación tiene dos partes:

```
FRONTEND (lo que ves en navegador)  ←→  BACKEND (servidor)
React en puerto 3000                     Node.js en puerto 3001
```

El backend es el **servidor** que:
- ✅ Guarda datos (productos, usuarios, pedidos)
- ✅ Autentica usuarios (login/registro)
- ✅ Autoriza acciones (si eres admin o no)
- ✅ Procesa solicitudes HTTP
- ✅ Responde con JSON

---

## ⚡ COMANDO RÁPIDO PARA DEMOSTRAR

### En Terminal 1 (Backend):
```bash
cd /Users/usuario/tienda-online-react/backend
node server-demo.js
```

Verás: `✅ Servidor escuchando en puerto 3001`

### En Terminal 2 (Prueba):
```bash
# Ver productos
curl http://localhost:3001/api/productos | head -10

# Login (obtener JWT)
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login
```

---

## 📋 LOS 15 ENDPOINTS

### Autenticación (3)
```
POST   /api/auth/register       → Crear cuenta
POST   /api/auth/login          → Login (obtiene token)
GET    /api/auth/me             → Datos del usuario
```

### Productos (5)
```
GET    /api/productos           → Ver todos
GET    /api/productos/:id       → Ver uno
POST   /api/productos           → Crear (ADMIN)
PUT    /api/productos/:id       → Editar (ADMIN)
DELETE /api/productos/:id       → Eliminar (ADMIN)
```

### Pedidos (7)
```
POST   /api/pedidos             → Crear pedido
GET    /api/pedidos             → Ver mis pedidos
GET    /api/pedidos/:id         → Ver detalle
GET    /api/pedidos/admin/todas → Ver todos (ADMIN)
GET    /api/pedidos/:id/estado  → Ver estado
PUT    /api/pedidos/:id/estado  → Cambiar estado (ADMIN)
POST   /api/pedidos/:id/cancelar → Cancelar (ADMIN)
```

---

## 🔑 CREDENCIALES

```
Admin:
  Email: admin@tienda.com
  Contraseña: admin123
  Role: ADMIN

Usuario:
  Crear con registro
  Cualquier email/contraseña
```

---

## 🛡️ SEGURIDAD

### JWT (Token)
- Generado en: `POST /api/auth/login`
- Expira en: 7 días
- Se envía en: Header `Authorization: Bearer <token>`

### Roles
- `ADMIN`: Puede crear/editar/eliminar productos y ver todos los pedidos
- `USER`: Puede ver productos y crear pedidos

### Contraseñas
- Hasheadas con: bcryptjs
- Nunca se envía en respuestas

---

## 🔄 FLUJO TÍPICO

```
1. Usuario abre tienda → Frontend hace GET /api/productos
2. Backend responde → JSON con 6 productos
3. Usuario hace login → Frontend hace POST /api/auth/login
4. Backend genera token → Responde con JWT
5. Usuario agrega carrito → Frontend guarda en estado local
6. Usuario compra → Frontend hace POST /api/pedidos + token
7. Backend crea pedido → Genera número de seguimiento
8. Admin ve pedidos → GET /api/pedidos/admin/todas + token admin
```

---

## 💾 ARCHIVO PRINCIPAL

```
backend/server-demo.js
├── Línea 1: require('express')
├── Línea 15: app.listen(3001)
├── Línea 50+: GET /api/productos
├── Línea 100+: POST /api/auth/login (genera JWT)
├── Línea 150+: POST /api/pedidos (crea pedido)
└── Línea 200+: PUT /api/pedidos/id/estado (cambiar estado)
```

---

## 📚 DOCUMENTACIÓN QUE TIENES

| Archivo | Para | Tiempo |
|---------|------|--------|
| `PRESENTAR_BACKEND_GUIA.md` | Presentación rápida | 5 min |
| `CHECKLIST_PRESENTACION_BACKEND.md` | Hacerlo bien | 10 min |
| `DEMOSTRACION_BACKEND.md` | Todos los tests | Referencia |
| `ARQUITECTURA_SISTEMA.md` | Entender todo | 15 min |
| `backend/test-api.sh` | Script automático | 2 min |

---

## ✅ CHECKLIST PRE-PRESENTACIÓN

- [ ] Backend corriendo: `node server-demo.js`
- [ ] Terminal mostrando: "Servidor escuchando en puerto 3001"
- [ ] Prueba GET productos: `curl http://localhost:3001/api/productos`
- [ ] Prueba login: `curl -X POST ... /api/auth/login`
- [ ] Entiendo qué es REST
- [ ] Entiendo qué es JWT
- [ ] Entiendo autenticación vs autorización
- [ ] Puedo explicar flujo request-response
- [ ] Sé dónde está el código (`backend/server-demo.js`)

---

## 💬 EXPLICACIÓN DE 1 MINUTO

> "Mi aplicación es full-stack: Frontend (React) + Backend (Node.js).
>
> El backend es un servidor que corre en el puerto 3001. Tiene 15 endpoints REST que manejan:
>
> - Autenticación: Login genera un JWT token de 7 días
> - Productos: CRUD (crear, leer, actualizar, eliminar)
> - Pedidos: Crear, ver, cambiar estado
>
> Aquí vemos:
> 1. Backend corriendo (terminal)
> 2. GET /api/productos devuelve JSON con 6 productos
> 3. POST /api/auth/login devuelve JWT token
> 4. Todo está protegido por roles (ADMIN/USER)
>
> Sin backend solo habría interfaz bonita. Con backend, toda la tienda funciona."

---

## 🎬 DEMORACIÓN EN VIVO

**Paso 1 (30 seg):** Mostrar backend corriendo
```
Terminal mostrando "Servidor escuchando en puerto 3001" ✅
```

**Paso 2 (1 min):** Ejecutar curl
```
curl http://localhost:3001/api/productos
→ Ves JSON con 6 productos ✅
```

**Paso 3 (1 min):** Obtener token
```
curl -X POST ... /api/auth/login
→ Ves token JWT ✅
```

**Paso 4 (1 min):** Mostrar código
```
Abre backend/server-demo.js
Señala los endpoints ✅
```

**Total: 4 minutos**

---

## 🚨 SI ALGO FALLA

| Problema | Solución |
|----------|----------|
| Backend no inicia | `pkill -f "node server-demo.js"` luego `node server-demo.js` |
| Puerto 3001 ocupado | `lsof -i :3001` y mata el proceso |
| curl no funciona | Usa navegador: `http://localhost:3001/api/productos` |
| Python no instalado | Omite `\| python3 -m json.tool` |
| Algo sigue fallando | Muestra el código en VS Code y explica qué hace |

---

## 🎓 CONCEPTOS CLAVE

### REST API
- **R**epresentational **S**tate **T**ransfer
- HTTP verbs: GET (leer), POST (crear), PUT (actualizar), DELETE (eliminar)
- Responde en JSON

### JWT (Token)
- Seguro: no envías contraseña en cada solicitud
- Con expiración: se vuelve inválido después de 7 días
- Con información: contiene id, email, role

### In-Memory DB
- Temporal: se pierde al reiniciar
- Para demo: muestra concepto sin usar BD real
- En producción: usarías MongoDB, PostgreSQL, etc.

---

## 📞 RESPUESTAS RÁPIDAS A PREGUNTAS

**P: ¿Qué es un servidor?**
A: Un programa que escucha solicitudes y responde. Tu backend escucha en puerto 3001.

**P: ¿Qué es REST?**
A: Estándar para hacer APIs. Usa HTTP verbs en URLs claras.

**P: ¿Cuántos endpoints?**
A: 15 endpoints en total.

**P: ¿Cómo se autentica?**
A: Login genera JWT token. Se envía en cada solicitud protegida.

**P: ¿Por qué JWT y no sesiones?**
A: JWT es más escalable y stateless.

**P: ¿Se pierde data?**
A: Sí, es in-memory. Para demo. En producción usarías BD real.

---

## 🎯 RESUMEN FINAL

Tu backend:
- ✅ Funciona en puerto 3001
- ✅ Tiene 15 endpoints
- ✅ Usa JWT para seguridad
- ✅ Valida roles (ADMIN/USER)
- ✅ Responde con JSON
- ✅ Está listo para presentar

**Próximo paso:**
Abre `PRESENTAR_BACKEND_GUIA.md` para empezar.

