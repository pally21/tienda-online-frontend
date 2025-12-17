# ESPECIFICACIÓN DE REQUISITOS DEL SOFTWARE (ERS)

**Proyecto:** Tienda Online React  
**Versión:** 1.0  
**Fecha:** 16 de Diciembre de 2025  
**Asignatura:** DSY1104  
**Estado:** Finalizado

---

## 1. INTRODUCCIÓN

### 1.1 Propósito del Documento
Este documento especifica los requisitos funcionales y no funcionales del sistema **Tienda Online React**, una aplicación web de comercio electrónico que permite a usuarios comprar productos y a administradores gestionar el catálogo y pedidos.

### 1.2 Alcance del Proyecto
La aplicación incluye:
- Sistema de autenticación y autorización
- Catálogo de productos con CRUD completo
- Carrito de compras
- Sistema de checkout y pedidos
- Panel de administración
- Gestión de estados de pedidos

### 1.3 Referencias
- DSY1104 - Evaluación de Proyecto Final
- Formato de precios en CLP (Pesos Chilenos)
- Especificación REST API

---

## 2. DESCRIPCIÓN GENERAL DEL SISTEMA

### 2.1 Perspectiva del Producto
Una plataforma de comercio electrónico completa con separación clara entre:
- **Frontend:** Interfaz de usuario React
- **Backend:** API REST Node.js + Express
- **Base de datos:** In-memory (temporal)

### 2.2 Características Principales
1. Autenticación segura con JWT
2. CRUD completo de productos
3. Carrito de compras funcional
4. Sistema de pedidos con seguimiento
5. Panel administrativo
6. Sincronización en tiempo real (5 segundos)

### 2.3 Usuarios Target
- **Clientes:** Usuarios que compran productos
- **Administradores:** Gestión de productos y pedidos
- **Evaluadores:** Verificación del sistema

---

## 3. REQUISITOS FUNCIONALES

### RF-01: Autenticación de Usuario
**Descripción:** El sistema debe permitir a usuarios registrarse y hacer login
- Registro con email, contraseña, nombre, RUT
- Login con email y contraseña
- Validación de credenciales
- Generación de JWT token (7 días expiración)
- Logout/cerrar sesión

### RF-02: Gestión de Roles
**Descripción:** El sistema debe diferencias permisos por rol
- Rol ADMIN: acceso a panel administrativo
- Rol USER: acceso a compras
- Protección de rutas por rol

### RF-03: Listar Productos
**Descripción:** Ver catálogo de productos disponibles
- Mostrar 6 productos predefinidos
- Datos: nombre, descripción, precio, imagen, stock
- Filtrado por categoría (opcional)
- Paginación (opcional)

### RF-04: Ver Detalle de Producto
**Descripción:** Ver información completa de un producto
- Mostrar todos los datos del producto
- Botón para agregar al carrito
- Cantidad disponible en stock

### RF-05: Crear Producto (ADMIN)
**Descripción:** Crear nuevos productos en el catálogo
- Formulario con: nombre, descripción, precio, stock, imagen, categoría
- Validación de datos
- Solo usuarios ADMIN pueden acceder
- Acceso: POST /api/productos

### RF-06: Actualizar Producto (ADMIN)
**Descripción:** Modificar datos de productos existentes
- Editar todos los campos
- Validación de datos
- Cambios reflejados en tiempo real
- Acceso: PUT /api/productos/:id

### RF-07: Eliminar Producto (ADMIN)
**Descripción:** Remover productos del catálogo
- Confirmación modal antes de eliminar
- Solo ADMIN puede eliminar
- Sincronización automática (5 segundos)
- Acceso: DELETE /api/productos/:id

### RF-08: Agregar al Carrito
**Descripción:** Agregar productos al carrito de compras
- Seleccionar cantidad
- Validar stock disponible
- Mostrar feedback visual
- Guardar en estado local

### RF-09: Ver Carrito
**Descripción:** Ver productos agregados al carrito
- Listado de items
- Cantidad y precio unitario
- Total de compra
- Botón para proceder al checkout

### RF-10: Modificar Cantidad en Carrito
**Descripción:** Cambiar cantidad de items en carrito
- Aumentar/disminuir cantidad
- Validar stock
- Actualizar total automáticamente

### RF-11: Eliminar del Carrito
**Descripción:** Remover items del carrito
- Confirmar eliminación
- Actualizar total

### RF-12: Checkout/Proceso de Compra
**Descripción:** Formulario de compra con datos de envío
- Campos: nombre, email, teléfono, dirección, ciudad, región
- Seleccionar método de pago (tarjeta, transferencia, contra entrega)
- Validación de todos los campos
- Botón deshabilitado durante procesamiento

### RF-13: Crear Pedido
**Descripción:** Procesar la compra y crear pedido
- POST /api/pedidos
- Validar token JWT
- Generar número de seguimiento único
- Guardar datos de envío
- Limpiar carrito
- Acceso: POST /api/pedidos

### RF-14: Ver Mis Pedidos
**Descripción:** Ver historial de compras del usuario
- Listado de pedidos realizados
- Estado actual (Pendiente, Procesando, Enviado, Entregado, Cancelado)
- Número de seguimiento
- Fecha de compra
- Total
- Acceso: GET /api/pedidos

### RF-15: Página de Confirmación
**Descripción:** Mostrar detalles después de compra exitosa
- Número de seguimiento
- Datos de envío
- Productos comprados
- Método de pago
- Total pagado

### RF-16: Panel Admin - Ver Todos los Pedidos
**Descripción:** Administrador ve todos los pedidos de clientes
- Tabla con todos los pedidos
- Información del cliente
- Estado actual
- Total
- Acceso: GET /api/pedidos/admin/todas

### RF-17: Panel Admin - Cambiar Estado Pedido
**Descripción:** Administrador cambia estado de pedidos
- Estados: Pendiente → Procesando → Enviado → Entregado → Cancelado
- Modal para seleccionar nuevo estado
- Actualización inmediata
- Acceso: PUT /api/pedidos/:id/estado

### RF-18: Panel Admin - Gestión de Productos
**Descripción:** Interfaz para CRUD de productos
- Tabla de productos
- Botones: crear, editar, eliminar
- Modal para editar
- Confirmación para eliminar

### RF-19: Sincronización en Tiempo Real
**Descripción:** Los cambios en admin se reflejan en comprador
- Auto-refresh cada 5 segundos
- Productos nuevos aparecen automáticamente
- Productos eliminados desaparecen automáticamente

### RF-20: Página de Inicio
**Descripción:** Página principal con información general
- Bienvenida
- Navegación principal
- Destacados o promociones (opcional)
- Links a productos y blogs

### RF-21: Página de Nosotros
**Descripción:** Información sobre la tienda
- Misión y visión
- Historia de la empresa

### RF-22: Página de Contacto
**Descripción:** Formulario de contacto
- Email, teléfono, dirección
- Formulario de consultas

### RF-23: Blog/Artículos
**Descripción:** Sección de blog (opcional)
- Listado de artículos
- Vista detallada de artículo

---

## 4. REQUISITOS NO FUNCIONALES

### RNF-01: Seguridad
- Contraseñas hasheadas con bcryptjs
- JWT tokens con expiración
- Validación de roles en cada endpoint
- CORS habilitado
- Validación de entrada en formularios

### RNF-02: Usabilidad
- Interfaz intuitiva
- Feedback visual para acciones
- Mensajes de error claros
- Navegación clara

### RNF-03: Rendimiento
- Sincronización cada 5 segundos
- Carga de página rápida
- Manejo eficiente de estado

### RNF-04: Escalabilidad
- Arquitectura cliente-servidor
- API REST modular
- Fácil de migrar a BD real

### RNF-05: Confiabilidad
- Validación de datos
- Manejo de errores
- Sincronización de datos

### RNF-06: Compatibilidad
- Navegadores modernos
- Responsive design
- Mobile-friendly

### RNF-07: Mantenibilidad
- Código organizado
- Componentes reutilizables
- Documentación completa

---

## 5. CASOS DE USO

### CU-01: Registrarse
**Actor:** Usuario no autenticado
**Flujo:**
1. Va a /registro
2. Llena formulario (nombre, RUT, email, contraseña)
3. Sistema valida datos
4. Crea usuario en backend
5. Redirige a /login
6. Usuario puede hacer login

### CU-02: Hacer Login
**Actor:** Usuario registrado
**Flujo:**
1. Va a /login
2. Ingresa email y contraseña
3. Sistema valida credenciales
4. Backend genera JWT token
5. Frontend guarda token
6. Redirige a /productos
7. Usuario puede comprar

### CU-03: Ver Productos
**Actor:** Cualquier usuario
**Flujo:**
1. Va a /productos
2. Frontend hace GET /api/productos
3. Backend devuelve 6 productos
4. Se muestran cards con foto, nombre, precio
5. Usuario puede ver detalle o agregar al carrito

### CU-04: Agregar al Carrito
**Actor:** Usuario autenticado
**Flujo:**
1. Ve un producto
2. Selecciona cantidad
3. Hace click en "Agregar al carrito"
4. Sistema valida stock
5. Agrega a carrito (estado local)
6. Muestra confirmación "✅ Agregado"

### CU-05: Hacer Compra
**Actor:** Usuario autenticado
**Flujo:**
1. Va al carrito
2. Revisa items
3. Hace click "Proceder al checkout"
4. Llena datos de envío
5. Selecciona método de pago
6. Sistema valida datos
7. Hace POST /api/pedidos
8. Backend crea pedido y genera número
9. Frontend redirige a confirmación
10. Muestra número de seguimiento

### CU-06: Ver Mis Pedidos
**Actor:** Usuario autenticado
**Flujo:**
1. Va a /mis-pedidos
2. Frontend hace GET /api/pedidos
3. Backend devuelve pedidos del usuario
4. Se muestran en tabla
5. Puede ver estado, número de seguimiento

### CU-07: Admin - Crear Producto
**Actor:** Usuario ADMIN
**Flujo:**
1. Va a /admin
2. Hace click "Crear producto"
3. Llena formulario
4. Hace POST /api/productos
5. Backend guarda producto
6. Aparece en catálogo automáticamente (5 seg)

### CU-08: Admin - Editar Producto
**Actor:** Usuario ADMIN
**Flujo:**
1. Va a /admin
2. Selecciona producto
3. Hace click "Editar"
4. Modifica datos
5. Hace PUT /api/productos/:id
6. Cambios reflejados automáticamente

### CU-09: Admin - Eliminar Producto
**Actor:** Usuario ADMIN
**Flujo:**
1. Va a /admin
2. Selecciona producto
3. Hace click "Eliminar"
4. Confirma en modal
5. Hace DELETE /api/productos/:id
6. Producto desaparece automáticamente

### CU-10: Admin - Ver Pedidos
**Actor:** Usuario ADMIN
**Flujo:**
1. Va a /admin/pedidos
2. Ve tabla con todos los pedidos
3. Puede ver detalles
4. Puede cambiar estado

### CU-11: Admin - Cambiar Estado Pedido
**Actor:** Usuario ADMIN
**Flujo:**
1. Va a /admin/pedidos
2. Selecciona un pedido
3. Hace click "Cambiar estado"
4. Abre modal con opciones
5. Selecciona nuevo estado
6. Hace PUT /api/pedidos/:id/estado
7. Estado actualiza inmediatamente

---

## 6. RESTRICCIONES

### Técnicas
- Frontend: React 18+
- Backend: Node.js + Express
- BD: In-memory (arrays)
- Autenticación: JWT

### Funcionales
- Solo se pueden crear 6 productos en demo
- Pedidos se pierden al reiniciar servidor
- No hay pago real (solo selección de método)
- No hay envío real

### Seguridad
- Contraseñas mínimo 6 caracteres
- Email único por usuario
- RUT validado
- Tokens expiran en 7 días

---

## 7. DEPENDENCIAS

### Frontend
- react 18.2.0
- react-router-dom 6.x
- react-bootstrap 2.x
- axios (para API calls)

### Backend
- express 4.x
- cors 2.x
- bcryptjs (para contraseñas)
- jsonwebtoken (para JWT)
- nodemon (desarrollo)

---

## 8. CRITERIOS DE ACEPTACIÓN

### Aceptación General
- ✅ Sistema compila sin errores
- ✅ Todos los 15 requisitos funcionales implementados
- ✅ 15 endpoints API funcionando
- ✅ Autenticación JWT funcional
- ✅ CRUD completo de productos
- ✅ Carrito y checkout funcionales
- ✅ Panel admin operativo
- ✅ Sincronización en tiempo real
- ✅ Documentación completa

### Aceptación por Módulo

**Autenticación:**
- Login exitoso genera token JWT
- Logout elimina token
- Token con expiración funciona
- Roles protegen endpoints

**Productos:**
- CRUD completo funciona
- 6 productos predefinidos
- Imágenes cargan correctamente
- Precios en formato CLP
- Sincronización cada 5 segundos

**Carrito:**
- Agregar al carrito funciona
- Cantidad modifiable
- Total calcula correctamente
- Vacía al confirmar compra

**Pedidos:**
- Crear pedido genera número de seguimiento
- Usuario ve sus pedidos
- Admin ve todos los pedidos
- Estado de pedido cambiar
- Confirmación muestra datos correctos

**UI/UX:**
- Interfaz responsive
- Navegación clara
- Feedback visual en acciones
- Mensajes de error descriptivos

---

## 9. DATOS DE PRUEBA

### Productos Predefinidos
```
1. Camisa Casual - $49.990 CLP
2. Zapatos Deportivos - $89.990 CLP
3. Mochila Ejecutiva - $79.990 CLP
4. Reloj Inteligente - $199.990 CLP
5. Lentes de Sol - $69.990 CLP
6. Cinturón Premium - $59.990 CLP
```

### Credenciales de Prueba
```
Admin:
  Email: admin@tienda.com
  Contraseña: admin123

Usuario Normal:
  Registro: /registro
  Datos: cualquier nombre, RUT 12345678K, email, contraseña
```

---

## 10. GLOSARIO

| Término | Definición |
|---------|-----------|
| JWT | JSON Web Token - método de autenticación seguro |
| CRUD | Create, Read, Update, Delete - operaciones básicas |
| API REST | Interfaz de programación basada en HTTP |
| Token | Credencial digital que prueba identidad |
| Endpoint | URL del backend que responde a solicitudes |
| Modal | Ventana emergente en la UI |
| CLP | Pesos Chilenos - moneda |
| Hash | Función criptográfica para contraseñas |
| CORS | Control de acceso entre dominios |

---

## 11. HISTORIALES DE CAMBIOS

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 16/12/2025 | Versión inicial |

---

## APROBACIÓN

**Preparado por:** Desarrollador  
**Fecha:** 16 de Diciembre de 2025  
**Estado:** Aprobado para evaluación

