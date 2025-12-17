# 🎤 GUÍA PARA LA PRESENTACIÓN

## 📋 Estructura de la Presentación (15-20 minutos)

### 1. Introducción (2 min)
- "Esta es una aplicación Tienda Online fullstack"
- "Usa React en frontend, Node.js en backend, MySQL en BD"
- "Implementa autenticación JWT con roles de usuario"

### 2. Demo Funcional (10 min)

**2.1 Mostrar la aplicación funcionando (3 min)**
- Abre navegador: `http://localhost:3000`
- Navega por home, productos
- Muestra el carrito funcionando

**2.2 Login/Autenticación (3 min)**
- Click en "Iniciar Sesión"
- Login con `admin@tienda.com` / `admin123`
- Muestra cómo el navbar cambia (aparece nombre, botón Admin)
- Explica que el token JWT se guarda en localStorage

**2.3 Panel Admin (2 min)**
- Click en "Admin"
- Muestra la tabla de productos
- Crea un nuevo producto (llenar formulario)
- Edita un producto
- Borra un producto
- Explica validaciones

**2.4 Autenticación Usuario Regular (2 min)**
- Logout
- Registra nuevo usuario
- Login con ese usuario
- Muestra que NO aparece "Admin" en navbar
- Intenta acceder a `/admin` → se redirecciona

### 3. Documentación Técnica (5 min)

**3.1 Arquitectura (2 min)**
```
Frontend (React) → API REST → Backend (Node.js) → MySQL
```
- Explain:
  - Frontend hace requests HTTP
  - Backend valida y procesa
  - BD persiste datos

**3.2 Autenticación JWT (2 min)**
```
1. Usuario ingresa email/password en /login
2. Backend hashea password y verifica en BD
3. Si correcto, genera JWT token
4. Token se envía al frontend
5. Frontend lo guarda en localStorage
6. En cada request, se envía en header Authorization
```

**3.3 Documentación API (1 min)**
- Abre `http://localhost:3001/api-docs`
- Muestra endpoints en Swagger
- Explica que cada endpoint está documentado

### 4. Código Relevante (3 min)

**Muestra rápidamente estos archivos:**

**4.1 Login en Frontend:**
```jsx
// src/pages/Login.jsx
const { login } = useAuth();
await login(email, password);
// Token se guarda automáticamente
```

**4.2 Login en Backend:**
```javascript
// backend/src/controllers/authController.js
const token = generateToken(usuario);
res.json({ token, usuario });
```

**4.3 Middleware de Autenticación:**
```javascript
// backend/src/middleware/auth.js
const authorize = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ message: 'No autorizado' });
    }
  };
};
```

### 5. Requisitos Cumplidos (3 min)

Enumera cada requisito del curso:

✅ **IE3.1.1 - Backend con BD**
- "Backend Node.js + Express"
- "BD MySQL con 4 tablas: usuarios, productos, pedidos, detalle_pedidos"
- "Lógica de negocio completa para CRUD"

✅ **IE3.2.1 - API REST + Swagger**
- "11 endpoints CRUD documentados"
- "Swagger en /api-docs"
- "GET, POST, PUT, DELETE implementados"

✅ **IE3.2.2 - Integración Frontend-Backend**
- "React consume API Node.js"
- "Productos se cargan desde BD"
- "Admin crea/edita/borra productos"

✅ **IE3.3.1 - Autenticación JWT + Roles**
- "Login/Register con JWT"
- "Roles ADMIN y USER"
- "Endpoints protegidos en backend"

✅ **IE3.3.2 - Sesiones Persistentes**
- "AuthContext mantiene estado"
- "Token en localStorage"
- "Sesión persiste en recarga"

✅ **IE3.3.3 - Restricciones Frontend**
- "ProtectedRoute bloquea acceso"
- "Navbar dinámico"
- "Admin solo visible para ADMIN"

---

## 💬 Preguntas Frecuentes que Podrían Hacer

### P: ¿Por qué usaste Node.js en lugar de Spring Boot?
R: "Node.js es más simple para desarrollar rápido, usa JavaScript en front y back, y es suficiente para este caso de uso. Spring Boot sería mejor para aplicaciones con millones de usuarios."

### P: ¿Dónde se guarda el token?
R: "En localStorage del navegador. Se envía automáticamente en el header Authorization de cada request. Es seguro porque el servidor valida que sea válido."

### P: ¿Qué pasa si el token expira?
R: "El usuario recibe error 403 'Token inválido'. Debe hacer logout y login de nuevo para obtener un nuevo token."

### P: ¿Cómo protegiste los passwords?
R: "Usé bcryptjs. Los passwords nunca se guardan en texto plano. Se hashean con 10 salt rounds. En login, comparo el hash guardado con el que el usuario ingresa."

### P: ¿Qué bases de datos soporta?
R: "Actualmente MySQL. Pero como uso mysql2 de npm, funciona con MariaDB también. Podría adaptarse a PostgreSQL sin muchos cambios."

### P: ¿Puede un usuario normal acceder al panel admin?
R: "No. El ProtectedRoute valida el rol ADMIN. Si intenta, se redirecciona a /. Además en el backend, el middleware authorize verifica el rol."

### P: ¿Cómo escalarías la aplicación?
R: "Podría agregar: cache con Redis, colas de trabajo con Bull, real-time con WebSockets, búsqueda con Elasticsearch, CDN para imágenes, etc."

---

## 📸 Screenshots para Mostrar

### 1. Home Page
- Muestra productos en grid
- Navbar con opciones

### 2. Login Page
- Formulario limpio
- Con credenciales de demo

### 3. Navbar Autenticado
- Muestra nombre del usuario
- Aparece botón "Admin" (si es ADMIN)
- Botón "Cerrar Sesión"

### 4. Panel Admin
- Tabla con productos
- Botones Editar/Eliminar
- Modal para crear producto

### 5. Swagger UI
- Muestra todos los endpoints
- Permite probar sin código

---

## 🎯 Puntos Fuertes a Resaltar

1. **Seguridad:**
   - Contraseñas hasheadas
   - JWT tokens
   - Validación de roles

2. **Funcionalidad:**
   - CRUD completo funcionando
   - Integración frontend-backend perfecta
   - Persistencia de sesiones

3. **Documentación:**
   - README.md detallado
   - SETUP.md paso a paso
   - Swagger documentado
   - Código comentado

4. **Escalabilidad:**
   - Arquitectura separada (Frontend/Backend)
   - Estructura modular
   - Fácil de agregar nuevas features

5. **Tecnologías Modernas:**
   - React hooks (useAuth, useContext)
   - JWT estándar de la industria
   - Express práctico
   - MySQL relacional

---

## ⚠️ Cosas a Verificar Antes

Checklist 24 horas antes de la presentación:

- [ ] MySQL está instalado y funciona
- [ ] Backend npm install completó exitosamente
- [ ] Frontend npm install completó exitosamente
- [ ] `node crear-bd.js` crea la BD sin errores
- [ ] Backend inicia en http://localhost:3001
- [ ] Frontend inicia en http://localhost:3000
- [ ] Login con admin@tienda.com funciona
- [ ] Panel Admin es accesible
- [ ] Swagger está en http://localhost:3001/api-docs
- [ ] Puedo crear/editar/borrar productos
- [ ] Logout funciona
- [ ] Registro de nuevo usuario funciona

---

## 📝 Script de Presentación (Borrador)

**Introducción:**
"Buenos días. Mi proyecto es una tienda online fullstack que implementa autenticación JWT con roles. El frontend está en React, el backend en Node.js, y usa MySQL como base de datos."

**Demo:**
"Déjenme mostrar cómo funciona. Primero, aquí está la página de inicio con los productos cargados desde la BD..."

"Ahora voy a hacer login como administrador. Veo que el navbar cambió y aparece un botón 'Admin'..."

"En el panel admin puedo crear, editar y eliminar productos. Aquí creo uno nuevo..."

"Si hago logout y me registro como usuario normal, veo que el botón Admin desaparece..."

**Tecnología:**
"El frontend comunica con el backend a través de una API REST. Cuando me logueo, recibo un JWT token que se guarda en localStorage. En cada request, envío ese token en el header..."

"El backend valida el token con un middleware. Si el token es válido pero el rol no tiene permisos, retorna 403. Así protejo los endpoints..."

**Requisitos:**
"Cumplí los 6 requisitos del proyecto:
1. Backend con BD y modelos de datos
2. API REST documentada en Swagger  
3. Integración frontend-backend funcionando
4. Autenticación JWT con roles
5. Sesiones persistentes en React
6. Restricciones de acceso en UI"

---

## 🚀 Consejos Generales

1. **Práctica:** Ensaya la presentación 2-3 veces antes
2. **Timing:** Mantén el tiempo (15-20 min máximo)
3. **Claridad:** Habla lentamente, usa lenguaje técnico pero simple
4. **Ejemplos:** Muestra código específico, no todo de una
5. **Énfasis:** Destaca la seguridad (JWT, hashing, roles)
6. **Preguntas:** Anticipa preguntas y prepara respuestas
7. **Contingencia:** Ten un plan B si algo falla en vivo

---

¡Mucho éxito en la presentación! 🎉
