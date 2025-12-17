# ✅ CHECKLIST DE INICIO RÁPIDO

## 🚀 Inicio en 5 Minutos

### Paso 1: Backend
```bash
cd tienda-online-react/backend
npm install
node crear-bd.js
npm start
```

✅ Deberías ver:
```
🚀 Servidor ejecutándose en http://localhost:3001
📚 Documentación Swagger: http://localhost:3001/api-docs
```

### Paso 2: Frontend (nueva terminal)
```bash
cd tienda-online-react
npm start
```

✅ Navegador abrirá automáticamente en http://localhost:3000

---

## 🔑 Credenciales de Prueba

**Admin:**
```
Email: admin@tienda.com
Password: admin123
```

**Demo Usuario:**
- Ve a `/registro`
- Completa con cualquier email/password
- Automáticamente hace login

---

## 🧪 Pruebas Rápidas

### 1. Verificar Backend
```bash
curl http://localhost:3001/api
# Debería retornar JSON
```

### 2. Verificar BD
```bash
mysql -u root tienda_online
SELECT COUNT(*) FROM usuarios;
# Debería retornar 1 (el admin)
```

### 3. Probar Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}'
# Debería retornar un token JWT
```

---

## 📋 Requisitos Cumplidos

| Requisito | Estado | Demo |
|-----------|--------|------|
| IE3.1.1 - Backend + BD | ✅ | `backend/` con MySQL |
| IE3.2.1 - API REST + Swagger | ✅ | `http://localhost:3001/api-docs` |
| IE3.2.2 - Integración Frontend-Backend | ✅ | React ↔ Node.js funcionando |
| IE3.3.1 - Autenticación JWT + Roles | ✅ | Login con roles ADMIN/USER |
| IE3.3.2 - Sesiones Persistentes | ✅ | AuthContext + localStorage |
| IE3.3.3 - Restricciones de Acceso | ✅ | ProtectedRoute + Navbar dinámico |

---

## 📚 Archivos Clave

**Backend:**
- `backend/server.js` - App principal
- `backend/src/controllers/` - Lógica CRUD
- `backend/src/middleware/auth.js` - JWT + roles

**Frontend:**
- `src/context/AuthContext.jsx` - Autenticación
- `src/components/ProtectedRoute.jsx` - Rutas protegidas
- `src/pages/Login.jsx` - Login integrado

**Documentación:**
- `SETUP.md` - Guía instalación paso a paso
- `RESUMEN.md` - Resumen técnico
- `PRESENTACION.md` - Guía para presentar
- `backend/README.md` - Docs backend
- `README.md` - Docs proyecto

---

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Connection refused" | Inicia MySQL: `mysql.server start` |
| "Cannot find module" | `npm install` en la carpeta |
| "Port already in use" | Cambia `PORT=3002` en `.env` |
| "Invalid token" | Haz logout y login de nuevo |
| "Acceso denegado" | Usa cuenta admin para `/admin` |

---

## 📊 Estructura Final

```
tienda-online-react/
├── src/ (FRONTEND REACT)
├── backend/ (BACKEND NODE.JS)
├── README.md ← Leer primero
├── SETUP.md ← Si hay problemas
├── RESUMEN.md ← Resumen técnico
├── PRESENTACION.md ← Para presentar
└── QUICK-START.md ← Este archivo
```

---

## 🎯 Comandos Más Usados

```bash
# Backend
cd backend && npm start
npm run dev              # Con nodemon

# Frontend
npm start
npm run build           # Para producción

# Base de datos
node crear-bd.js        # Crear BD
mysql -u root           # Conectar a MySQL

# Documentación
http://localhost:3001/api-docs  # Ver Swagger
```

---

## ✨ Resumen en Blanco y Negro

✅ Backend API REST Node.js  
✅ Frontend React con autenticación  
✅ Base de datos MySQL relacional  
✅ JWT tokens para seguridad  
✅ Roles de usuario (ADMIN/USER)  
✅ ProtectedRoutes en frontend  
✅ Swagger documentation  
✅ CRUD completo funcionando  

---

**¡Listo para comenzar! 🎉**
