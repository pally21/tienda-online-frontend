# 🚀 GUÍA RÁPIDA: CÓMO DEMOSTRAR EL BACKEND

## EN 3 PASOS SIMPLES

### PASO 1️⃣: Abre VS Code y dos terminales

**Terminal 1 (Backend):**
```bash
cd /Users/usuario/tienda-online-react/backend
node server-demo.js
```

**Verás esto:**
```
✅ Servidor escuchando en puerto 3001
```

---

### PASO 2️⃣: Abre otra terminal y prueba

**Terminal 2 (Test):**
```bash
curl http://localhost:3001/api/productos | head -20
```

**Verás JSON de los 6 productos 👍**

---

### PASO 3️⃣: Haz login para demostrar autenticación

**Terminal 2:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}' \
  http://localhost:3001/api/auth/login | python3 -m json.tool
```

**Verás JWT token 👍**

---

## LO QUE MUESTRAS EN LA EVALUACIÓN

| Paso | Qué muestras | Por qué es importante |
|------|-------------|-----------------------|
| 1 | Terminal con "Servidor escuchando en 3001" | Demuestra que el backend está corriendo |
| 2 | Respuesta JSON con 6 productos | Demuestra que la API funciona |
| 3 | Token JWT después de login | Demuestra seguridad con autenticación |

---

## EXPLICACIÓN RÁPIDA (PARA DECIR EN LA EVALUACIÓN)

> "Aquí vemos el backend de mi aplicación. Es un servidor Node.js que corre en el puerto 3001.
>
> Cuando el usuario interactúa con la tienda frontend:
> - Hace clic en 'Ver Productos' → Frontend hace `GET /api/productos`
> - Hace clic en 'Agregar al carrito' → Frontend hace `POST /api/pedidos`
> - Hace login → Frontend hace `POST /api/auth/login`
>
> El backend responde con JSON que el frontend usa para mostrar datos.
>
> Aquí vemos:
> 1. Backend corriendo (puerto 3001)
> 2. Endpoint GET /api/productos devuelve 6 productos
> 3. Endpoint POST /api/auth/login genera JWT token para seguridad
>
> Esto es una arquitectura REST real: Cliente (React) ↔ Servidor (Node.js)"

---

## ARCHIVOS IMPORTANTES

```
backend/
└── server-demo.js          ← Aquí está TODO el backend

Los archivos que puedes mostrar en VS Code:
├── Línea 1: const express = require('express')
├── Línea 15: app.listen(3001)
├── Línea 50+: GET /api/productos
├── Línea 100+: POST /api/auth/login
└── Línea 150+: POST /api/pedidos
```

---

## CHECKLIST ANTES DE PRESENTAR

- [ ] Backend compilado sin errores
- [ ] Terminal 1 ejecutando: `node server-demo.js`
- [ ] Ves mensaje: "Servidor escuchando en puerto 3001"
- [ ] Terminal 2 accesible para probar comandos curl
- [ ] Tienes archivo `server-demo.js` listo para mostrar código
- [ ] Tienes claro qué es JWT y por qué se usa
- [ ] Puedes explicar flujo request-response

---

## SI ALGO NO FUNCIONA

**Opción A: Reiniciar Backend**
```bash
pkill -f "node server-demo.js"
sleep 2
cd /Users/usuario/tienda-online-react/backend
node server-demo.js
```

**Opción B: Mostrar el código**
Si el backend no inicia:
1. Abre `backend/server-demo.js` en VS Code
2. Muestra los endpoints (línea por línea)
3. Explica qué hace cada uno
4. Di: "El backend contiene 15 endpoints que definen toda la API REST"

Esto también demuestra que entiendes backend aunque en ese momento no funcione.

---

## NOTAS IMPORTANTES

✅ **Documentación creada para ti:**
- `DEMOSTRACION_BACKEND.md` - Guía detallada
- `DEMOSTRAR_BACKEND_RAPIDO.md` - Resumen ejecutivo
- `ARQUITECTURA_SISTEMA.md` - Diagramas técnicos
- `backend/test-api.sh` - Script automático de tests

✅ **Credenciales para demo:**
- Email: `admin@tienda.com`
- Contraseña: `admin123`
- Role: `ADMIN`

✅ **Puertos:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

---

## RESPUESTAS A PREGUNTAS COMUNES

**P: ¿Qué es un Backend?**
R: Es un servidor que maneja la lógica de negocio, autenticación, y base de datos. El frontend se comunica con él mediante API REST.

**P: ¿Qué es JWT?**
R: Un token seguro que el backend genera después de login. Se usa para demostrar quién eres en solicitudes futuras sin enviar contraseña.

**P: ¿Qué es una API REST?**
R: Es un estándar de comunicación entre cliente y servidor usando HTTP (GET, POST, PUT, DELETE).

**P: ¿Por qué la BD es "in-memory"?**
R: Es para demostración. En producción usarías MongoDB, PostgreSQL, etc. Pero demuestra cómo funciona.

**P: ¿Se pierde la data al reiniciar?**
R: Sí, es normal en in-memory. En producción usarías persistencia (archivos o BD real).

---

## ÚLTIMA CHECKLIST

```
✅ Tienes 2 terminales abiertas
✅ Terminal 1: Backend corriendo
✅ Terminal 2: Listo para curl
✅ Frontend compilado (npm start)
✅ Documentación lista
✅ Sabes explicar arquitectura
✅ Credenciales memorizadas
✅ Puertos memorizado (3000/3001)
```

**¡Listo para presentar! 🎉**

