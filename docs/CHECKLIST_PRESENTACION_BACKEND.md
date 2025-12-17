# 📋 CHECKLIST PARA LA PRESENTACIÓN DEL BACKEND

## ✅ PRE-PRESENTACIÓN (Hacer esto ANTES)

### Setup del Sistema
- [ ] Abrir VS Code
- [ ] Abrir 2-3 terminales
- [ ] Terminal 1: `cd /Users/usuario/tienda-online-react/backend && node server-demo.js`
- [ ] Esperar a ver: "Servidor escuchando en puerto 3001"
- [ ] Terminal 2: Listo para ejecutar curl
- [ ] Terminal 3: Listo para navegador (opcional)

### Verificaciones
- [ ] Backend responde: `curl http://localhost:3001/api/productos | head -20`
- [ ] Productos visibles en respuesta JSON
- [ ] Frontend corriendo: `http://localhost:3000` en navegador
- [ ] Tienes credenciales: `admin@tienda.com / admin123`

---

## 🎬 DURANTE LA PRESENTACIÓN

### PARTE 1: Mostrar Backend (2 minutos)

**Terminal visible:**
```
Terminal 1: node server-demo.js
✅ Servidor escuchando en puerto 3001
```

**Decir:** 
> "Aquí ven el backend de mi aplicación. Es un servidor Node.js que corre en el puerto 3001."

---

### PARTE 2: Demostrar API (3 minutos)

**Ejecutar en Terminal 2:**

#### Test 1: Ver Productos
```bash
curl -s http://localhost:3001/api/productos | python3 -c \
"import sys, json; d=json.load(sys.stdin); print(f'✅ {len(d[\"data\"])} productos'); 
[print(f'  - {p[\"nombre\"]}: ${p[\"precio\"]:,}') for p in d['data']]"
```

**Decir:**
> "GET /api/productos devuelve los 6 productos. Esto es un endpoint REST."

#### Test 2: Login (obtener JWT)
```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login | python3 -m json.tool | head -15
```

**Decir:**
> "POST /api/auth/login genera un JWT token. Este token prueba quién eres y qué puedes hacer."

#### Test 3: Ver Pedidos (requiere token admin)
```bash
TOKEN=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/pedidos/admin/todas | \
  python3 -c "import sys, json; d=json.load(sys.stdin); \
  print(f'✅ {len(d[\"data\"])} pedidos'); \
  [print(f'  - Pedido {p[\"id\"]}: {p[\"numeroSeguimiento\"]}') for p in d['data']]"
```

**Decir:**
> "GET /api/pedidos/admin/todas solo funciona con un token admin. Esto es autorización por roles."

---

### PARTE 3: Mostrar Código (2 minutos)

**Abrir en VS Code:**
```
backend/server-demo.js
```

**Señalar y explicar:**

1. **Línea ~1:**
   ```javascript
   const express = require('express');
   ```
   > "Importo Express.js, que es el framework para hacer servidores en Node.js"

2. **Línea ~15:**
   ```javascript
   app.listen(3001, () => {
     console.log('Servidor escuchando en puerto 3001');
   });
   ```
   > "El servidor escucha en el puerto 3001"

3. **Línea ~50:**
   ```javascript
   app.get('/api/productos', (req, res) => {
     res.json({ success: true, data: productos });
   });
   ```
   > "Este es un endpoint GET. Cuando alguien pide /api/productos, respondo con JSON"

4. **Línea ~100:**
   ```javascript
   app.post('/api/auth/login', (req, res) => {
     const token = jwt.sign({...}, 'secreto', { expiresIn: '7d' });
     res.json({ token, usuario });
   });
   ```
   > "POST /api/auth/login genera un JWT token que expira en 7 días"

5. **Línea ~150:**
   ```javascript
   app.post('/api/pedidos', autenticar, (req, res) => {
     const numeroSeguimiento = 'TRK' + Math.random()...;
     pedidos.push({ ...req.body, numeroSeguimiento });
     res.json({ success: true, data: pedido });
   });
   ```
   > "POST /api/pedidos crea un pedido con un número de seguimiento único"

---

### PARTE 4: Explicación de Arquitectura (2 minutos)

**Dibujar en la pizarra o mostrar diagrama:**

```
┌─────────────────┐
│  NAVEGADOR      │
│  (Usuario)      │
└────────┬────────┘
         │
      HTTP ↓ ↑
         │   │
┌────────▼───┴──────────┐
│  FRONTEND (React)     │
│  localhost:3000       │
│  ─────────────────    │
│  ✅ Interfaz          │
│  ✅ Componentes       │
│  ✅ Estado            │
└────────┬─────────────┘
         │
      HTTP ↓ ↑
         │   │
┌────────▼───┴──────────────┐
│  BACKEND (Node.js)        │
│  localhost:3001           │
│  ─────────────────────    │
│  ✅ 15 Endpoints          │
│  ✅ Autenticación JWT     │
│  ✅ Autorizacion (roles)  │
│  ✅ BD (in-memory)        │
└────────────────────────────┘
```

**Explicar:**
> "El usuario interactúa con el frontend en el navegador. El frontend hace solicitudes HTTP al backend. El backend procesa las solicitudes y devuelve JSON. El frontend renderiza los datos. Sin backend, solo habría interfaz bonita sin datos reales."

---

## 📊 ENDPOINTS A MENCIONAR

| Método | Endpoint | Descripción | Requiere |
|--------|----------|-------------|----------|
| GET | `/api/productos` | Listar productos | Nada |
| POST | `/api/auth/login` | Login | Email/Contraseña |
| GET | `/api/auth/me` | Datos del usuario | Token |
| POST | `/api/pedidos` | Crear pedido | Token |
| GET | `/api/pedidos/admin/todas` | Ver todos los pedidos | Token + ADMIN |
| PUT | `/api/pedidos/:id/estado` | Cambiar estado | Token + ADMIN |

---

## 🔐 CONCEPTOS CLAVE A EXPLICAR

### 1. REST API
- "API = Application Programming Interface"
- "REST = Representational State Transfer"
- Usa HTTP verbs: GET (leer), POST (crear), PUT (actualizar), DELETE (eliminar)

### 2. JWT (JSON Web Token)
- "Es un token que prueba tu identidad"
- "Se genera en login"
- "Se envía en cada solicitud protegida"
- "Expira en 7 días"

### 3. Autenticación vs Autorización
- Autenticación = "¿Quién eres?" (login con email/contraseña)
- Autorización = "¿Qué puedes hacer?" (roles ADMIN/USER)

### 4. Base de Datos In-Memory
- "Es temporal, se pierde al reiniciar"
- "En producción usarías MongoDB, PostgreSQL, etc."
- "Aquí demuestra cómo funciona el concepto"

---

## 💬 RESPUESTAS A PREGUNTAS COMUNES

**P: ¿Qué es el backend?**
A: Es el servidor que maneja la lógica, seguridad y datos. El frontend se comunica con él.

**P: ¿Por qué Node.js?**
A: Porque es JavaScript en servidor. Es rápido, escalable y usa eventos.

**P: ¿Qué es Express?**
A: Un framework (librería) que simplifica hacer servidores en Node.js.

**P: ¿Por qué JWT y no solo contraseña?**
A: Porque JWT es más seguro. No envías contraseña en cada solicitud, solo el token.

**P: ¿Por qué la BD es in-memory?**
A: Para demostración. En producción usarías una BD real (MongoDB, PostgreSQL, etc.).

**P: ¿Se pierde la data al reiniciar?**
A: Sí, es normal en in-memory. Es temporal.

**P: ¿Cuántos endpoints tienes?**
A: 15 endpoints en total (3 autenticación, 5 productos, 7 pedidos).

---

## 🎯 RESUMEN EJECUTIVO (30 SEGUNDOS)

Si solo tienes 30 segundos:

> "Mi aplicación tiene frontend (React) y backend (Node.js). El backend es un servidor que corre en puerto 3001 con 15 endpoints REST. Usa JWT para seguridad y tiene autorización por roles. Aquí pueden ver que:
> 
> 1. El backend está corriendo
> 2. GET /api/productos devuelve los 6 productos
> 3. POST /api/auth/login genera un token JWT
> 4. Los endpoints están protegidos por rol
> 
> Esto es una arquitectura full-stack real."

---

## ⏱️ TIMINGS SUGERIDOS

| Parte | Tiempo | Qué | 
|-------|--------|-----|
| Setup | 2 min | Backend corriendo |
| Demo API | 3 min | 3 tests (productos, login, pedidos) |
| Mostrar código | 2 min | Explicar server-demo.js |
| Arquitectura | 2 min | Dibujar diagrama cliente-servidor |
| Preguntas | 5 min | Responder dudas |
| **TOTAL** | **~14 min** | Presentación completa |

---

## 🚨 CONTINGENCIA (Si algo falla)

**Si el backend no inicia:**
1. Presiona Ctrl+C para matar cualquier proceso
2. Verifica: `lsof -i :3001` (si hay algo usando el puerto)
3. Reinicia: `node server-demo.js`
4. Si sigue fallando, muestra el código en VS Code y explica qué hace

**Si curl no funciona:**
1. Verifica que estés en la carpeta correcta
2. Verifica que backend esté corriendo
3. Prueba: `curl http://localhost:3001/api/productos` (sin pipes)
4. Si falla, usa navegador: `http://localhost:3001/api/productos`

**Si Python no está instalado:**
1. Omite el `| python3 -m json.tool`
2. Verás el JSON sin formato, pero igual funciona
3. O usa online JSON formatter

---

## ✅ ÚLTIMO CHECKLIST ANTES DE PRESENTAR

```
PREPARACIÓN:
- [ ] Backend compilado y corriendo
- [ ] Terminal mostrando "Servidor escuchando en puerto 3001"
- [ ] Segundo terminal listo para curl
- [ ] Frontend corriendo en http://localhost:3000
- [ ] Credenciales anotadas o en clipboard

CONOCIMIENTO:
- [ ] Entiendo qué es REST
- [ ] Entiendo qué es JWT
- [ ] Entiendo autenticación vs autorización
- [ ] Puedo explicar flujo request-response
- [ ] Puedo explicar qué hace cada endpoint

PRESENTACIÓN:
- [ ] Mostraré backend corriendo (terminal)
- [ ] Haré 3 tests (productos, login, pedidos)
- [ ] Mostraré código de server-demo.js
- [ ] Explicaré arquitectura con diagrama
- [ ] Responderé preguntas confiadamente
```

---

## 🎉 ¡LISTO!

Sigues este checklist y la presentación del backend será excelente. 

**Key points:**
✅ Muestra backend corriendo
✅ Demuestra API funcionando
✅ Explica código
✅ Explica arquitectura
✅ Responde preguntas

**¡Éxito en la evaluación! 🚀**

