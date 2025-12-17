# ⚙️ GUÍA DE CONFIGURACIÓN E INSTALACIÓN

## 📌 Índice
1. [Requisitos del Sistema](#requisitos)
2. [Instalación Backend](#backend)
3. [Instalación Frontend](#frontend)
4. [Ejecutar la Aplicación](#ejecución)
5. [Pruebas](#pruebas)
6. [Troubleshooting](#troubleshooting)

---

## 📋 Requisitos del Sistema {#requisitos}

### Software necesario:
- **Node.js** v16 o superior ([descargar](https://nodejs.org/))
- **MySQL** v5.7 o superior ([descargar](https://www.mysql.com/downloads/))
- **Git** (opcional, para clonar)
- **npm** (viene con Node.js)

### Verificar instalación:
```bash
node --version      # Debería mostrar v16+
npm --version       # Debería mostrar v7+
mysql --version     # Debería mostrar v5.7+
```

---

## 🔧 Instalación Backend {#backend}

### Paso 1: Navegar a la carpeta backend

```bash
cd tienda-online-react/backend
```

### Paso 2: Instalar dependencias

```bash
npm install
```

Esto instalará:
- express (framework web)
- cors (cross-origin)
- dotenv (variables de entorno)
- jsonwebtoken (JWT)
- bcryptjs (password hashing)
- mysql2 (base de datos)
- swagger-ui-express (documentación API)

### Paso 3: Configurar variables de entorno

Crear archivo `.env` en la carpeta `backend/`:

```bash
# Abre un editor de texto y crea .env con esto:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=tienda_online

JWT_SECRET=secreto_tienda_online_2025
JWT_EXPIRE=7d

PORT=3001
NODE_ENV=development
```

**⚠️ Notas:**
- Si tu MySQL tiene contraseña, actualiza `DB_PASSWORD`
- El `JWT_SECRET` debe ser muy largo en producción
- `PORT=3001` es donde correrá el backend

### Paso 4: Crear la base de datos

Primero, **asegúrate que MySQL está ejecutándose:**

**En macOS:**
```bash
# Si lo instalaste con Homebrew
brew services start mysql
# O manualmente
mysql.server start
```

**En Windows:**
- MySQL debería estar como servicio Windows corriendo
- O ejecuta desde cmd: `mysqld`

**En Linux:**
```bash
sudo systemctl start mysql
```

Luego, crear la BD:

```bash
node crear-bd.js
```

Deberías ver esto:
```
📦 Creando base de datos...
✅ Tabla usuarios creada
✅ Tabla productos creada
✅ Tabla pedidos creada
✅ Tabla detalle_pedidos creada
✅ Usuario admin creado (email: admin@tienda.com, password: admin123)
✅ Productos de ejemplo insertados

✨ Base de datos creada exitosamente
```

---

## 🎨 Instalación Frontend {#frontend}

### Paso 1: Navegar a la carpeta raíz

```bash
cd tienda-online-react
```

(Si vienes del backend, haz `cd ..`)

### Paso 2: Instalar dependencias React

```bash
npm install
```

Esto puede tardar 2-5 minutos la primera vez.

Instalará:
- react & react-dom
- react-router-dom
- react-bootstrap & bootstrap
- axios (cliente HTTP)

### Paso 3: Verificar estructura

Asegúrate de que existen estos archivos (deberían estar creados):

```
src/
├── context/
│   └── AuthContext.jsx        ✅ Nuevo
├── components/
│   └── ProtectedRoute.jsx     ✅ Nuevo
└── utils/
    └── api.js                 ✅ Actualizado
```

Si faltan, avisa al docente.

---

## 🚀 Ejecutar la Aplicación {#ejecución}

### Opción 1: Dos terminales (Recomendado)

**Terminal 1 - Backend:**

```bash
cd tienda-online-react/backend
npm start
```

Debería mostrar:
```
🚀 Servidor ejecutándose en http://localhost:3001
📚 Documentación Swagger: http://localhost:3001/api-docs
```

**Terminal 2 - Frontend:**

```bash
cd tienda-online-react
npm start
```

Debería abrir automáticamente el navegador en `http://localhost:3000`

### Opción 2: Una sola terminal (Menos práctico)

```bash
# Inicial backend en background
cd backend && npm start &

# Luego frontend
cd .. && npm start
```

---

## ✅ Pruebas {#pruebas}

### 1. Verificar Backend

Abre navegador y ve a:
```
http://localhost:3001/api
```

Deberías ver:
```json
{
  "message": "API Tienda Online funcionando ✅"
}
```

### 2. Ver Documentación API

Ve a:
```
http://localhost:3001/api-docs
```

Aquí puedes probar todos los endpoints.

### 3. Login como Admin

En la aplicación:
- Ve a `/login`
- Email: `admin@tienda.com`
- Contraseña: `admin123`
- Click en "Ingresar"

Deberías ver el navbar actualizado con tu nombre y opción de "Admin".

### 4. Acceder al Panel Admin

- Después de login, haz click en "⚙️ Admin"
- Deberías ver la tabla de productos
- Intenta agregar un producto nuevo

### 5. Crear usuario nuevo

- Haz logout (botón rojo)
- Ve a `/registro`
- Completa el formulario
- Deberías loguear automáticamente

---

## 🐛 Troubleshooting {#troubleshooting}

### ❌ Error: "ECONNREFUSED - Connection refused"

**Causa:** MySQL no está ejecutándose

**Solución:**
```bash
# macOS
mysql.server start

# Windows
# Verifica que el servicio MySQL está en Servicios

# Linux
sudo systemctl start mysql
```

### ❌ Error: "ER_ACCESS_DENIED_FOR_USER"

**Causa:** Contraseña incorrecta en MySQL

**Solución:**
1. Abre MySQL y logúeate con tu contraseña real
2. Actualiza `DB_PASSWORD` en `backend/.env`
3. Ejecuta `node crear-bd.js` de nuevo

### ❌ Error: "Cannot find module 'express'"

**Causa:** Dependencias no instaladas

**Solución:**
```bash
cd backend
npm install
```

### ❌ Error: "Port 3001 already in use"

**Causa:** Otra aplicación usa el puerto 3001

**Solución 1 - Cambiar puerto:**
```
# En backend/.env, cambia:
PORT=3002
```

**Solución 2 - Liberar puerto (macOS/Linux):**
```bash
# Encuentra qué proceso usa puerto 3001
lsof -i :3001

# Mata el proceso
kill -9 <PID>
```

### ❌ Error: "Token inválido o expirado"

**Causa:** El token JWT expiró (después de 7 días)

**Solución:** Haz logout y login de nuevo

### ❌ Frontend no conecta con Backend

**Causa:** URL incorrecto o CORS problem

**Verifica:**
1. Backend está ejecutándose en `http://localhost:3001` ✅
2. Frontend intenta conectar a `http://localhost:3001/api` ✅
3. Revisa la consola del navegador (F12 → Console)

### ❌ "Acceso denegado - Solo administradores"

**Causa:** Intentas acceder a `/admin` sin ser ADMIN

**Solución:**
1. Logout
2. Login con `admin@tienda.com` / `admin123`
3. O crea un usuario ADMIN directamente en BD:

```sql
UPDATE usuarios SET role = 'ADMIN' WHERE email = 'tu_email@test.com';
```

### ❌ "Cannot GET /api/productos"

**Causa:** Backend no está ejecutándose

**Solución:**
```bash
cd backend
npm start
```

---

## 📚 Endpoints para Pruebas Rápidas

### Con cURL

**Obtener productos:**
```bash
curl http://localhost:3001/api/productos
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}'
```

Recibirás un token. Úsalo para:

**Crear producto (como ADMIN):**
```bash
curl -X POST http://localhost:3001/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "nombre":"Mi Producto",
    "precio":99.99,
    "descripcion":"Test",
    "stock":5,
    "categoria":"Test",
    "imagen":"http://..."
  }'
```

---

## 📞 Soporte

Si algo no funciona:

1. **Revisa los logs** en la terminal
2. **Verifica que MySQL está activo:** `mysql -u root -p` (enter si sin contraseña)
3. **Borra node_modules y reinstala:** `npm install`
4. **Revisa el .env** en backend/
5. **Reinicia ambas aplicaciones**

---

**¡Ya debería funcionar! 🎉**

Si hay problemas, contacta al docente con la captura de la terminal con el error.
