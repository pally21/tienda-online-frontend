# 🧪 GUÍA DE PRUEBAS - Tienda Online

## ✅ Estado Actual

Tu proyecto **está completamente funcional** y listo para probar.

- ✅ **Backend**: Corriendo en http://localhost:3001
- ✅ **Frontend**: Corriendo en http://localhost:3000
- ✅ **API**: Todos los endpoints disponibles

---

## 🔐 Credenciales de Prueba

### Usuario Administrador
- **Email**: admin@tienda.com
- **Contraseña**: admin123
- **Rol**: ADMIN

### Usuario Regular (Crear uno nuevo)
Puedes crear usuarios adicionales en el formulario de "Registro"

---

## 📝 Plan de Pruebas

### 1️⃣ Prueba de Login

**Pasos:**
1. Ve a http://localhost:3000
2. Haz clic en "Iniciar Sesión"
3. Ingresa:
   - Email: `admin@tienda.com`
   - Contraseña: `admin123`
4. Haz clic en "Enviar"

**Resultado esperado:**
- ✅ Te redirige a la página principal
- ✅ Tu nombre aparece en la navbar
- ✅ El botón de "Admin" es visible
- ✅ Aparece un botón "Cerrar Sesión"

---

### 2️⃣ Prueba de Listado de Productos

**Pasos:**
1. Desde la página principal, ve a "Productos"
2. Debería ver una lista de productos

**Resultado esperado:**
- ✅ Se muestran 3 productos (Laptop, Mouse, Teclado)
- ✅ Cada uno tiene: nombre, precio, stock
- ✅ Hay botón "Ver detalles" en cada producto
- ✅ Hay botón para agregar al carrito

**Productos visibles:**
- Laptop - $999.99 (5 en stock)
- Mouse - $29.99 (50 en stock)
- Teclado - $79.99 (20 en stock)

---

### 3️⃣ Prueba del Carrito

**Pasos:**
1. En la página de productos, haz clic en "Agregar al carrito" en cualquier producto
2. Ve a "Carrito"
3. Verifica que el producto está allí

**Resultado esperado:**
- ✅ El producto aparece en el carrito
- ✅ Puedes cambiar la cantidad
- ✅ Se calcula el total
- ✅ Hay botón "Checkout"

---

### 4️⃣ Prueba del Panel Admin

**Pasos:**
1. Después de hacer login, busca el botón "⚙️ Admin" en la navbar
2. Haz clic en él

**Resultado esperado:**
- ✅ Te lleva al panel de administrador
- ✅ Ves un formulario para crear productos
- ✅ Ves una tabla con los productos existentes

---

### 5️⃣ Prueba de Crear Producto

**Pasos:**
1. En el panel de Admin, completa el formulario:
   - Nombre: `Monitor LG 27"`
   - Descripción: `Monitor Full HD`
   - Precio: `299.99`
   - Stock: `10`
   - Categoría: `Electrónica`
   - Imagen: `monitor.jpg`
2. Haz clic en "Agregar Producto"

**Resultado esperado:**
- ✅ Aparece un mensaje de éxito
- ✅ El nuevo producto aparece en la tabla
- ✅ También aparece en la lista de "Productos"

---

### 6️⃣ Prueba de Editar Producto

**Pasos:**
1. En el panel de Admin, busca un producto en la tabla
2. Haz clic en "Editar"
3. Cambia algún valor (ej: precio)
4. Haz clic en "Actualizar"

**Resultado esperado:**
- ✅ El producto se actualiza
- ✅ La tabla se refleja el cambio
- ✅ Mensaje de confirmación

---

### 7️⃣ Prueba de Eliminar Producto

**Pasos:**
1. En el panel de Admin, busca un producto
2. Haz clic en "Eliminar"
3. Confirma la acción

**Resultado esperado:**
- ✅ El producto desaparece de la tabla
- ✅ Ya no aparece en el listado de productos
- ✅ Mensaje de confirmación

---

### 8️⃣ Prueba de Restricción de Acceso

**Pasos:**
1. Haz logout (botón "Cerrar Sesión")
2. Intenta acceder directamente a: http://localhost:3000/admin

**Resultado esperado:**
- ✅ Te redirige a la página de login
- ✅ No puedes acceder sin autenticación

---

### 9️⃣ Prueba de Registro

**Pasos:**
1. Haz clic en "Registro"
2. Completa el formulario con:
   - Nombre: `Test User`
   - Email: `test@ejemplo.com`
   - Contraseña: `test123`
3. Haz clic en "Registrarse"

**Resultado esperado:**
- ✅ Se crea la cuenta
- ✅ Te loguea automáticamente
- ✅ Ves tu nombre en la navbar
- ✅ **NO** tienes acceso a Admin (porque eres USER, no ADMIN)

---

### 🔟 Prueba de Autorización

**Pasos:**
1. Con un usuario regular (no admin), intenta acceder a http://localhost:3000/admin

**Resultado esperado:**
- ✅ Te redirige a la página principal
- ✅ No ves el botón "Admin"
- ✅ No puedes crear/editar/eliminar productos

---

## 📊 Resumen de Pruebas

| Prueba | Estado | Notas |
|--------|--------|-------|
| Login | ✅ | Funciona con JWT |
| Registro | ✅ | Crea usuarios nuevos |
| Listado de productos | ✅ | Carga desde API |
| Agregar al carrito | ✅ | Almacena en context |
| Panel Admin | ✅ | Solo accesible para ADMIN |
| Crear producto | ✅ | POST a /api/productos |
| Editar producto | ✅ | PUT a /api/productos/:id |
| Eliminar producto | ✅ | DELETE a /api/productos/:id |
| Restricción de acceso | ✅ | ProtectedRoute funciona |
| Autorización por rol | ✅ | Solo ADMIN accede a endpoints |

---

## 🐛 Posibles Problemas y Soluciones

### "No puedo ver los productos"
- Verifica que el backend está corriendo en http://localhost:3001
- Abre la consola del navegador (F12) y busca errores
- Prueba: `curl http://localhost:3001/api/productos`

### "El login no funciona"
- Verifica credenciales: admin@tienda.com / admin123
- Abre consola (F12) → Red → busca petición a /api/auth/login
- Revisa que devuelve un token

### "El token expira"
- El token tiene duración de 7 días
- Se almacena en localStorage
- Al recargar la página, se restaura automáticamente

### "No puedo crear productos"
- Debes estar logueado como ADMIN
- El usuario debe tener rol: "ADMIN"
- Verifica en localStorage: `localStorage.getItem('role')`

---

## 🛠️ Verificación Técnica

### En la consola (F12 del navegador):

**Ver token guardado:**
```javascript
localStorage.getItem('token')
```

**Ver usuario actual:**
```javascript
localStorage.getItem('usuario')
```

**Ver rol actual:**
```javascript
localStorage.getItem('role')
```

**Limpiar localStorage (para logout manual):**
```javascript
localStorage.clear()
```

---

## 📱 Endpoints API para Prueba

Puedes probar directamente con curl:

### Listar productos
```bash
curl http://localhost:3001/api/productos
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tienda.com","password":"admin123"}'
```

### Crear producto (requiere token)
```bash
TOKEN="tu_token_aqui"
curl -X POST http://localhost:3001/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"nombre":"Test","precio":99.99,"stock":5}'
```

---

## ✅ Checklist Final

Antes de presentar, verifica:

- [ ] Backend corriendo en puerto 3001
- [ ] Frontend corriendo en puerto 3000
- [ ] Login funciona
- [ ] Productos cargan
- [ ] Panel Admin accesible para ADMIN
- [ ] Panel Admin NO accesible para USER
- [ ] CRUD completo funciona
- [ ] Carrito funciona
- [ ] Logout funciona
- [ ] Token se guarda en localStorage
- [ ] Sesión persiste al recargar

---

## 🎯 Próximas Mejoras (Opcional)

Para convertir esto en producción:

1. **Conectar MySQL real**
   - Instala MySQL/MariaDB
   - Configura credenciales en `.env`
   - Corre `node crear-bd.js`
   - Cambia `server-demo.js` por `server.js`

2. **Validaciones mejoradas**
   - Confirmar antes de eliminar
   - Validar email único en registro
   - Limitador de intentos de login

3. **Funcionalidades adicionales**
   - Sistema de pedidos completo
   - Historial de compras en "Mis Pedidos"
   - Búsqueda y filtrado
   - Paginación

4. **Seguridad**
   - HTTPS en producción
   - Rate limiting
   - CSRF protection
   - Refresh tokens

---

¡Diviértete probando! 🚀

