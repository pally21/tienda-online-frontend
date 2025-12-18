# 📖 MANUAL DE USUARIO - TIENDA ONLINE

**Versión:** 2.0  
**Fecha:** 17 de Diciembre de 2025  
**Última actualización:** Diciembre 2025

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación y Setup](#instalación-y-setup)
4. [Guía de Uso - Cliente](#guía-de-uso---cliente)
5. [Guía de Uso - Administrador](#guía-de-uso---administrador)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Introducción

**Tienda Online** es una plataforma completa de comercio electrónico que permite a usuarios navegar productos, hacer compras y gestionar sus pedidos. Los administradores pueden gestionar el inventario y los pedidos de todos los clientes.

### Características principales:
- ✅ Registro e inicio de sesión seguro
- ✅ Catálogo de 5 productos disponibles
- ✅ Carrito de compras funcional
- ✅ Proceso de checkout con información de envío
- ✅ Historial de pedidos y seguimiento
- ✅ Panel de administrador para gestión
- ✅ Datos persistentes en MongoDB

---

## 💻 Requisitos del Sistema

### Hardware:
- Computadora con al menos 4GB RAM
- Conexión a Internet estable

### Software:
- **Node.js:** v16.0.0 o superior
- **npm:** v7.0.0 o superior
- **Git:** para clonar repositorio
- **Navegador moderno:** Chrome, Firefox, Safari o Edge

### Verificar instalación:
```bash
node --version    # v18.x.x o superior
npm --version     # 9.x.x o superior
git --version     # git version 2.x.x
```

---

## 🚀 Instalación y Setup

### Paso 1: Clonar Repositorios

**Frontend:**
```bash
git clone https://github.com/usuario/tienda-online-react.git
cd tienda-online-react
npm install
```

**Backend:**
```bash
git clone https://github.com/usuario/tienda-online-backend.git
cd tienda-online-backend
npm install
```

### Paso 2: Configurar Variables de Entorno

**Backend (.env):**
```
MONGODB_URI=mongodb+srv://admin_tienda:todos.2025@tiendaonline.laj7uso.mongodb.net/tienda_online?appName=tiendaonline
JWT_SECRET=secreto_tienda_online_2025
JWT_EXPIRE=7d
PORT=3002
NODE_ENV=development
```

**Frontend (.env - opcional):**
```
REACT_APP_API_URL=http://localhost:3002/api
```

### Paso 3: Ejecutar la Aplicación

**Terminal 1 - Backend:**
```bash
cd tienda-online-backend
npm start
# Debería ver: ✅ Servidor escuchando en puerto 3002
# ✅ Conectado a MongoDB Atlas
```

**Terminal 2 - Frontend:**
```bash
cd tienda-online-react
npm start
# Automáticamente abre http://localhost:3000
```

### Paso 4: Verificar que todo funciona

Abre tu navegador en: `http://localhost:3000`

Deberías ver:
- Página de inicio con navbar
- 5 productos en el catálogo
- Botones para registrarse o hacer login

---

## 👥 Guía de Uso - Cliente

### Sección 1: Registro e Inicio de Sesión

#### Crear una cuenta nueva

1. **Haz clic en "Registro"** en la barra de navegación
   
2. **Completa el formulario:**
   - Nombre completo (ej: Juan Pérez García)
   - Email (ej: juan@ejemplo.com)
   - Contraseña (mínimo 6 caracteres)
   - RUT (ej: 12345678-9) [opcional]

3. **Haz clic en "Registrarse"**
   
4. **Serás redirigido automáticamente a iniciar sesión**

#### Iniciar sesión

1. **Haz clic en "Login"** en la barra de navegación
   
2. **Ingresa tus credenciales:**
   - Email registrado
   - Contraseña

3. **Haz clic en "Ingresar"**

4. **¡Bienvenido!** Serás redirigido a la página de inicio

### Sección 2: Explorar Productos

#### Ver catálogo de productos

1. **Desde la página de inicio**, verás una lista con los 5 productos disponibles:
   - Camisa Casual ($49.990)
   - Zapatos Deportivos ($89.990)
   - Mochila Ejecutiva ($79.990)
   - Reloj Inteligente ($199.990)
   - Lentes de Sol ($69.990)

2. **Cada producto muestra:**
   - Imagen del producto
   - Nombre
   - Descripción breve
   - Precio en CLP
   - Botón "Agregar al Carrito"

#### Ver detalle de un producto

1. **Haz clic en la imagen o nombre del producto**

2. **Verás la página de detalle con:**
   - Foto grande del producto
   - Descripción completa
   - Precio
   - Stock disponible
   - Recomendaciones de otros productos

3. **Desde aquí puedes agregar al carrito**

### Sección 3: Carrito de Compras

#### Agregar productos

1. **Desde cualquier pantalla**, haz clic en **"Agregar al Carrito"**
   
2. **Se mostrará una confirmación visual** ✅

3. **El contador del carrito se incrementará** (esquina superior derecha)

#### Ver carrito

1. **Haz clic en el icono del carrito** (o "Carrito" en el menú)

2. **Verás una tabla con:**
   - Productos agregados
   - Cantidad de cada uno
   - Precio unitario
   - Total por producto
   - Total general

#### Modificar carrito

1. **Para aumentar cantidad:**
   - Haz clic en el botón **"+"**

2. **Para disminuir cantidad:**
   - Haz clic en el botón **"-"**

3. **Para eliminar producto:**
   - Haz clic en la **"X"** o **"Eliminar"**

4. **Los cambios se aplicarán automáticamente**

#### Aplicar cupón (si está disponible)

1. Ingresa el código en el campo "Código de descuento"
2. Haz clic en "Aplicar"
3. El descuento se restarará del total

### Sección 4: Checkout

#### Completar compra

1. **Desde el carrito**, haz clic en **"Proceder al Pago"**

2. **Completa el formulario de envío:**
   ```
   ┌─────────────────────────┐
   │ INFORMACIÓN DE ENVÍO    │
   ├─────────────────────────┤
   │ Nombre: Juan Pérez      │
   │ Email: juan@ejemplo.com │
   │ Teléfono: +5691234567  │
   │ Región: ▼ Metropolitana │
   │ Comuna: ▼ Santiago      │
   │ Dirección: Calle xxx 123│
   └─────────────────────────┘
   ```

3. **Verifica el resumen de compra:**
   - Productos
   - Cantidades
   - Total a pagar

4. **Haz clic en "Confirmar Compra"**

5. **Serás redirigido a la página de confirmación**

### Sección 5: Mis Pedidos

#### Ver historial de compras

1. **Haz clic en "Mis Pedidos"** en el menú (requiere login)

2. **Verás todos tus pedidos anteriores:**
   - Número de pedido (ID)
   - Fecha de compra
   - Total
   - Estado actual

#### Ver detalle de un pedido

1. **Haz clic en el número de pedido**

2. **Podrás ver:**
   - Información del cliente
   - Lista de productos comprados
   - Cantidad y precio de cada uno
   - Dirección de envío
   - Estado del pedido (Pendiente, Procesando, Enviado, etc.)

#### Estados de un pedido

- 🟡 **Pendiente:** Pedido recibido, en espera de procesamiento
- 🔵 **Procesando:** Se está preparando el envío
- 🟢 **Enviado:** El pedido está en transporte
- ✅ **Entregado:** Has recibido tu pedido
- ❌ **Cancelado:** El pedido fue cancelado

---

## 👨‍💼 Guía de Uso - Administrador

### Sección 1: Acceder al Panel Admin

#### Requiere credenciales de Admin

Por defecto, la cuenta admin es:
- **Email:** admin@tienda.com
- **Contraseña:** admin123

#### Acceder al panel

1. **Haz login** con credenciales de administrador

2. **Haz clic en "Admin"** en el menú de navegación

3. **Verás el panel de control** con las opciones:
   - 👥 Gestión de Usuarios
   - 📦 Gestión de Productos
   - 📋 Gestión de Pedidos

### Sección 2: Gestión de Usuarios

#### Ver lista de usuarios

1. **En el panel Admin**, haz clic en **"Usuarios"**

2. **Verás una tabla con todos los usuarios registrados:**
   - Nombre
   - Email
   - Rol (USER/ADMIN)
   - Estado (Activo/Suspendido)
   - Fecha de registro
   - Última compra

#### Cambiar estado de usuario

1. **Selecciona un usuario** de la lista

2. **Haz clic en "Cambiar Estado"**

3. **Selecciona nuevo estado:**
   - ✅ Activo (puede comprar)
   - ⏸️ Suspendido (no puede comprar)
   - 🗑️ Inactivo (cuenta cerrada)

4. **Confirma el cambio**

#### Eliminar usuario

1. **Selecciona un usuario**

2. **Haz clic en "Eliminar"**

3. **Confirma la acción** (no se puede deshacer)

4. **El usuario será eliminado de la base de datos**

### Sección 3: Gestión de Productos

#### Ver lista de productos

1. **En el panel Admin**, haz clic en **"Productos"**

2. **Verás una tabla con:**
   - Imagen del producto
   - Nombre
   - Precio
   - Stock disponible
   - Categoría
   - Estado (Activo/Inactivo)

#### Crear nuevo producto

1. **Haz clic en "Agregar Nuevo Producto"**

2. **Completa el formulario:**
   ```
   Nombre: Camiseta Premium
   Descripción: Camiseta 100% algodón
   Precio: 34990
   Categoría: Ropa
   Stock: 50
   URL de Imagen: https://ejemplo.com/imagen.jpg
   Activo: ✅ Sí
   ```

3. **Haz clic en "Guardar"**

4. **El producto aparecerá en el catálogo**

#### Editar producto

1. **Haz clic en "Editar"** junto al producto

2. **Modifica los campos que necesites**

3. **Haz clic en "Actualizar"**

4. **Los cambios se reflejarán inmediatamente**

#### Eliminar producto

1. **Haz clic en "Eliminar"** junto al producto

2. **Confirma la acción**

3. **El producto será removido del catálogo**

#### Desactivar producto temporalmente

1. **En lugar de eliminar**, puedes marcar el producto como **"Inactivo"**

2. **El producto NO aparecerá en el catálogo de clientes**

3. **Pero los datos se conservan en la base de datos**

### Sección 4: Gestión de Pedidos

#### Ver lista de pedidos

1. **En el panel Admin**, haz clic en **"Pedidos"**

2. **Verás todos los pedidos del sistema:**
   - ID del pedido
   - Cliente
   - Total
   - Estado
   - Fecha de compra

#### Ver detalle de pedido

1. **Haz clic en el ID del pedido**

2. **Verás información completa:**
   - Datos del cliente
   - Productos comprados
   - Dirección de envío
   - Historial de cambios de estado

#### Actualizar estado de pedido

1. **Haz clic en "Cambiar Estado"**

2. **Selecciona el nuevo estado:**
   - 🟡 Pendiente
   - 🔵 Procesando
   - 🟢 Enviado
   - ✅ Entregado
   - ❌ Cancelado

3. **Haz clic en "Actualizar"**

4. **El cliente recibirá notificación del cambio** (si está implementado)

#### Ejemplo de flujo típico:

```
Pedido #12345 creado por Juan Pérez
└─ Estado: Pendiente (cuando llega el pedido)
   └─ Cambiar a: Procesando (cuando se prepara)
      └─ Cambiar a: Enviado (cuando se envía)
         └─ Cambiar a: Entregado (cuando se confirma entrega)
```

---

## 🔧 Troubleshooting

### Problema: "No se pudieron cargar los productos"

**Causa:** Backend no está ejecutándose

**Solución:**
```bash
# Terminal 1: Inicia el backend
cd tienda-online-backend
npm start
# Debe decir: ✅ Servidor escuchando en puerto 3002
```

---

### Problema: "Error de conexión a la base de datos"

**Causa:** MongoDB Atlas no está accesible

**Solución:**
1. Verifica tu conexión a Internet
2. Verifica que el URI de MongoDB es correcto en `.env`
3. Verifica IP whitelist en MongoDB Atlas:
   - Ve a https://cloud.mongodb.com
   - Selecciona tu cluster
   - Network Access
   - Asegúrate que tu IP está permitida (o "Allow Access From Anywhere")

---

### Problema: "Email ya está registrado"

**Causa:** Ya existe una cuenta con ese email

**Solución:**
- Usa un email diferente
- O haz login si ya tienes cuenta

---

### Problema: "Token expirado"

**Causa:** Tu sesión expiró (después de 7 días)

**Solución:**
- Haz logout
- Haz login nuevamente

---

### Problema: "Acceso denegado al panel admin"

**Causa:** Tu usuario no tiene rol ADMIN

**Solución:**
- Solo administradores pueden acceder al panel
- Solicita a un admin que cambie tu rol

---

### Problema: "Las imágenes de productos no se cargan"

**Causa:** Las URLs de imagen son incorrectas

**Solución:**
1. Verifica que las URLs sean públicas
2. Intenta con una imagen de otro sitio (ej: unsplash.com)
3. Asegúrate que la URL comienza con `https://`

---

### Problema: "El carrito se vacía al recargar la página"

**Causa:** El carrito se almacena en memoria del navegador

**Solución:**
- Esto es normal. Se recomienda no recargar durante la compra
- Los pedidos sí se guardan en MongoDB cuando se confirman

---

### Problema: "No puedo cambiar el estado de un producto"

**Causa:** No tienes permisos de administrador

**Solución:**
- Solo ADMIN pueden editar productos
- Solicita permisos al administrador

---

## 📞 Soporte

Si encuentras problemas:

1. **Verifica la consola del navegador** (F12 → Console)
2. **Verifica los logs del backend** (terminal donde ejecutas npm start)
3. **Intenta limpiar caché y cookies**
4. **Reinicia el servidor** (Ctrl+C y npm start nuevamente)

---

## 📱 Acceso Rápido

| Acción | URL | Requiere Login |
|--------|-----|---|
| Home | http://localhost:3000 | No |
| Productos | http://localhost:3000/productos | No |
| Carrito | http://localhost:3000/carrito | Sí |
| Mis Pedidos | http://localhost:3000/mis-pedidos | Sí |
| Admin Panel | http://localhost:3000/admin | Sí (ADMIN role) |
| API Docs | http://localhost:3002/api-docs | No |

---

## 🎓 Tips y Trucos

### Para Clientes:
- 💾 Tu carrito se guarda en el navegador
- 🔔 Verifica tu email para confirmaciones de pedidos (si está implementado)
- 🖼️ Haz clic en las imágenes para ver detalles del producto

### Para Administradores:
- 🔐 Nunca compartas tus credenciales de admin
- 📊 Revisa regularmente los pedidos y cambia sus estados
- 🛒 Mantén el stock actualizado de los productos
- 👥 Supervisa usuarios suspendidos o inactivos

---

**¡Gracias por usar Tienda Online! 🎉**

