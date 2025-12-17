# MANUAL DE USUARIO - TIENDA ONLINE REACT

**Versión:** 1.0  
**Fecha:** 16 de Diciembre de 2025  
**Asignatura:** DSY1104

---

## TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Primeros Pasos](#primeros-pasos)
5. [Funciones de Usuario](#funciones-de-usuario)
6. [Funciones de Administrador](#funciones-de-administrador)
7. [Preguntas Frecuentes](#preguntas-frecuentes)
8. [Troubleshooting](#troubleshooting)

---

## INTRODUCCIÓN

Bienvenido a **Tienda Online React**, una plataforma de comercio electrónico moderna y fácil de usar. Este manual te guiará paso a paso en cómo usar todas las funcionalidades de la aplicación.

### ¿Qué es Tienda Online?
Es una tienda virtual donde puedes:
- 👥 Registrarte como usuario
- 🛍️ Ver y comprar productos
- 🛒 Agregar productos al carrito
- 💳 Realizar compras seguras
- 📦 Rastrear tus pedidos
- ⚙️ (Si eres admin) Gestionar productos y pedidos

### Características Principales
- ✅ Interfaz intuitiva y responsive
- ✅ Autenticación segura con contraseña
- ✅ Catálogo de 6 productos
- ✅ Carrito de compras
- ✅ Sistema de pedidos con número de seguimiento
- ✅ Panel de administración
- ✅ Sincronización en tiempo real

---

## REQUISITOS PREVIOS

### Navegador Web
- **Mínimo:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Recomendado:** Última versión de tu navegador
- **Verificar:** JavaScript habilitado
- **Conexión:** Internet estable

### Acceso a la Aplicación
- URL: `http://localhost:3000` (local)
- Conexión de red: LAN o internet
- Puertos: 3000 (frontend), 3001 (backend)

### Sistema Operativo
- Windows 10+
- macOS 10.14+
- Linux (cualquier distribución moderna)

---

## INSTALACIÓN

### Opción 1: Ejecución Local (Desarrollo)

#### Paso 1: Descargar o Clonar el Proyecto
```bash
# Opción A: Clonar desde GitHub
git clone https://github.com/tu-usuario/tienda-online-react.git
cd tienda-online-react

# Opción B: Descomprimir archivo .zip
# 1. Descarga tienda-online-react.zip
# 2. Descomprime la carpeta
# 3. Abre terminal en la carpeta
```

#### Paso 2: Instalar Dependencias
```bash
# Instalar paquetes del frontend
npm install

# Instalar paquetes del backend (en otra terminal)
cd backend
npm install
```

#### Paso 3: Iniciar el Backend
```bash
cd backend
node server-demo.js
```

**Resultado esperado:**
```
✅ Servidor escuchando en puerto 3001
```

#### Paso 4: Iniciar el Frontend (Nueva Terminal)
```bash
npm start
```

**Resultado esperado:**
```
Compiled successfully!
You can now view tienda-online in the browser.
  Local: http://localhost:3000
```

#### Paso 5: Abrir en Navegador
```
http://localhost:3000
```

### Opción 2: Acceso en Red Local
Si ejecutas en otra máquina:
```
http://[tu-ip]:3000
Ejemplo: http://192.168.1.100:3000
```

---

## PRIMEROS PASOS

### Pantalla de Inicio
Cuando abres la aplicación, verás:
- Navbar con navegación
- Home page con bienvenida
- Links a Productos, Blogs, Contacto
- Botón de Login/Registro en la esquina

### Navegación Principal
```
Home        → Página principal
Productos   → Catálogo de 6 productos
Blogs       → Artículos informativos
Contacto    → Formulario de contacto
Nosotros    → Información de la tienda
Login       → Acceder a tu cuenta
```

---

## FUNCIONES DE USUARIO

### 1. REGISTRARSE (Crear Cuenta)

#### Paso 1: Ir a Registro
- Click en el botón **"Registro"** en la navbar
- O ir a: `http://localhost:3000/registro`

#### Paso 2: Llenar el Formulario
Complete los siguientes campos:

| Campo | Ejemplo | Requisitos |
|-------|---------|-----------|
| **Nombre Completo** | Juan García | Mínimo 3 caracteres |
| **RUT** | 12345678K | Formato flexible (ej: 12345678-K, 12345678K) |
| **Email** | juan@email.com | Email válido, único |
| **Contraseña** | MiPass123! | Mínimo 6 caracteres |
| **Confirmar Contraseña** | MiPass123! | Debe coincidir con contraseña |

#### Paso 3: Validación
El sistema valida automáticamente:
- ✅ Email válido y único
- ✅ RUT válido
- ✅ Contraseña mínimo 6 caracteres
- ✅ Contraseñas coinciden

**Si hay error:** Se muestra mensaje rojo explicando el problema

#### Paso 4: Confirmar Registro
- Click en botón **"Registrarse"**
- Espera confirmación: "✅ Registro exitoso"
- Se redirige automáticamente a **Login**

#### Paso 5: Hacer Login
Ya puedes usar el email y contraseña para entrar

---

### 2. LOGIN (Acceder a tu Cuenta)

#### Paso 1: Ir a Login
- Click en **"Login"** en la navbar
- O ir a: `http://localhost:3000/login`

#### Paso 2: Ingresar Credenciales
```
Email: tu-email@email.com
Contraseña: tu-contraseña
```

#### Paso 3: Enviar Formulario
- Click en **"Iniciar Sesión"**
- Sistema valida credenciales
- Si es correcto: se redirige a **Productos**
- Si es incorrecto: muestra error

#### Credenciales de Prueba
```
Email: admin@tienda.com
Contraseña: admin123
```

**Nota:** Este usuario es ADMIN y tiene permisos especiales

---

### 3. VER PRODUCTOS

#### Opción A: Desde la Navbar
- Click en **"Productos"**

#### Opción B: Desde el Home
- Click en el botón "Ver Productos"

#### En la Página de Productos
Verás una grilla con 6 productos:
- 📷 Foto del producto
- 📝 Nombre
- 💰 Precio en CLP
- 📦 Stock disponible

**Acciones disponibles:**
- 🔍 Click en producto para ver detalles
- 🛒 Agregar al carrito

---

### 4. VER DETALLE DE PRODUCTO

#### Abrir Detalle
- Click en cualquier producto de la lista
- O click en el botón **"Ver más"**

#### En la Página de Detalle Verás:
- 🖼️ Foto grande del producto
- 📝 Nombre completo
- 📄 Descripción detallada
- 💰 Precio (en CLP)
- 📊 Stock disponible
- 🏷️ Categoría
- 🛒 Botón "Agregar al carrito"
- ◀️ Botón "Volver"

#### Agregar al Carrito
1. Selecciona la **cantidad** (si aplica)
2. Click en **"Agregar al carrito"**
3. Verás confirmación: **"✅ Agregado al carrito"**
4. Puedes seguir comprando o ir al carrito

---

### 5. CARRITO DE COMPRAS

#### Abrir el Carrito
- Click en ícono 🛒 en la navbar
- O ir a: `http://localhost:3000/carrito`

#### Ver Contenido del Carrito
Tabla con:
| Columna | Ejemplo |
|---------|---------|
| Producto | Camisa Casual |
| Cantidad | 2 |
| Precio Unitario | $49.990 |
| Subtotal | $99.980 |

#### Acciones en Carrito

**Modificar Cantidad:**
1. Click en campo de cantidad
2. Cambia el número
3. Total se actualiza automáticamente

**Eliminar Producto:**
1. Click en botón 🗑️ (basura)
2. Se elimina de la lista
3. Total se actualiza

**Ver Total:**
```
Subtotal:    $149.970
Total:       $149.970
```

#### Proceder al Checkout
1. Revisa que todo esté correcto
2. Click en botón **"Proceder al Checkout"**
3. Se abre formulario de compra

---

### 6. CHECKOUT (Proceso de Compra)

#### Formulario de Envío
Completa los siguientes datos:

| Campo | Tipo | Ejemplo |
|-------|------|---------|
| **Nombre** | Texto | Juan García |
| **Email** | Email | juan@email.com |
| **Teléfono** | Teléfono | +56912345678 |
| **Dirección** | Texto | Calle 123, Depto 456 |
| **Ciudad** | Texto | Santiago |
| **Región** | Dropdown | Metropolitana |

#### Método de Pago
Selecciona uno:
- 💳 Tarjeta de Crédito/Débito
- 🏦 Transferencia Bancaria
- 📦 Contra Entrega (Pago al recibir)

#### Confirmar Compra
1. Verifica todos los datos
2. Click en **"Confirmar Pedido"**
3. Botón se desactiva: "⏳ Procesando..."
4. Espera confirmación
5. Se redirige a página de **confirmación**

#### En caso de Error
- Mensaje rojo explica el problema
- Llena el campo nuevamente
- Intenta de nuevo

---

### 7. CONFIRMACIÓN DE COMPRA

#### Página de Éxito
Después de comprar, verás:

**Información del Pedido:**
```
✅ PEDIDO CONFIRMADO

Número de Seguimiento: TRK10RYAYXKJ
Fecha: 16/12/2025 18:45
Total: $149.970

Datos de Envío:
Nombre: Juan García
Email: juan@email.com
Teléfono: +56912345678
Dirección: Calle 123, Depto 456
Ciudad: Santiago
Región: Metropolitana

Método de Pago: Tarjeta de Crédito

Productos:
- Camisa Casual x2 = $99.980
- Zapatos x1 = $89.990
```

#### Próximos Pasos
1. Guarda el **número de seguimiento** (TRK...)
2. Recibirás confirmación por email
3. Tu pedido está siendo procesado
4. Puedes rastrear el estado en **"Mis Pedidos"**

---

### 8. MIS PEDIDOS (Historial de Compras)

#### Acceder a Mis Pedidos
- Click en **"Mis Pedidos"** en la navbar (si estás logueado)
- O ir a: `http://localhost:3000/mis-pedidos`

#### Ver Listado de Pedidos
Tabla con tus compras:

| Columna | Ejemplo |
|---------|---------|
| Número | TRK10RYAYXKJ |
| Fecha | 16/12/2025 |
| Total | $149.970 |
| Estado | Pendiente |
| Acción | Ver Detalle |

#### Estados Posibles
- 🔵 **Pendiente** - Orden creada, esperando procesamiento
- 🟡 **Procesando** - Se está preparando
- 🟠 **Enviado** - En camino
- 🟢 **Entregado** - Recibido
- ⚫ **Cancelado** - Orden cancelada

#### Ver Detalle del Pedido
Click en **"Ver Detalle"** para:
- Ver todos los productos
- Cantidad de cada producto
- Precio total
- Datos de envío
- Método de pago
- Estado actual

---

## FUNCIONES DE ADMINISTRADOR

**Acceso requerido:** Role ADMIN  
**Credenciales:** admin@tienda.com / admin123

### 1. IR AL PANEL ADMIN

#### Opción A: Desde la Navbar
- Click en ⚙️ **"Admin"** (solo visible si eres ADMIN)

#### Opción B: URL Directa
```
http://localhost:3000/admin
```

#### Si NO eres admin
- Verás error: "Acceso denegado"
- No puedes acceder sin ser ADMIN

---

### 2. CREAR PRODUCTO

#### En el Panel Admin
1. Click en botón **"Crear Nuevo Producto"**
2. Se abre formulario

#### Completar Formulario

| Campo | Tipo | Ejemplo | Requerido |
|-------|------|---------|-----------|
| **Nombre** | Texto | Camisa Casual | ✅ |
| **Descripción** | Textarea | Camisa cómoda... | ✅ |
| **Precio** | Número | 49990 | ✅ |
| **Stock** | Número | 25 | ✅ |
| **Categoría** | Texto | Ropa | ✅ |
| **Imagen URL** | URL | https://... | ✅ |

#### Validación
Sistema valida:
- Todos los campos completos
- Precio > 0
- Stock > 0
- URL válida para imagen

#### Crear Producto
1. Click en **"Crear Producto"**
2. Se guarda en backend
3. Aparece en catálogo **automáticamente** (5 segundos)
4. Se muestra confirmación: "✅ Producto creado"

---

### 3. EDITAR PRODUCTO

#### En el Panel Admin
1. Click en botón **"Editar"** del producto
2. Se abre modal con formulario

#### Modificar Datos
- Cambia los campos que deseas
- Los demás quedan igual

#### Guardar Cambios
1. Click en **"Guardar"**
2. Se actualiza en backend
3. Cambios visibles **inmediatamente** en tienda
4. Confirmación: "✅ Producto actualizado"

---

### 4. ELIMINAR PRODUCTO

#### Paso 1: Seleccionar Producto
En el panel admin, encuentra el producto

#### Paso 2: Click en "Eliminar"
Aparece **confirmación modal**

#### Paso 3: Confirmar Eliminación
Modal muestra:
```
¿Estás seguro de eliminar este producto?

[Cancelar] [Eliminar]
```

Click en **"Eliminar"**

#### Resultado
1. Producto se elimina del backend
2. **Desaparece de la tienda automáticamente** (5 seg)
3. Usuarios no pueden verlo ni comprarlo
4. Confirmación: "✅ Producto eliminado"

**Nota:** Esta acción es permanente

---

### 5. VER TODOS LOS PEDIDOS (ADMIN)

#### Acceder a Pedidos Admin
- Click en 📦 **"Pedidos"** en la navbar (si eres ADMIN)
- O ir a: `http://localhost:3000/admin/pedidos`

#### Tabla de Pedidos
Verás todos los pedidos de clientes:

| Columna | Ejemplo |
|---------|---------|
| Número | TRK10RYAYXKJ |
| Cliente | Juan García |
| Email | juan@email.com |
| Fecha | 16/12/2025 |
| Total | $149.970 |
| Estado | Pendiente |
| Acción | Ver Detalle / Cambiar Estado |

---

### 6. CAMBIAR ESTADO DEL PEDIDO

#### Paso 1: Ver Pedido
En tabla de pedidos, click en **"Cambiar Estado"**

#### Paso 2: Modal de Estado
Aparece ventana emergente:

```
Estado Actual: Pendiente

Nuevo Estado:
[Pendiente]
[Procesando]
[Enviado]
[Entregado]
[Cancelado]

[Cancelar] [Guardar]
```

#### Paso 3: Seleccionar Nuevo Estado
1. Click en una de las opciones
2. Las transiciones permitidas son:
   - Pendiente → Procesando
   - Procesando → Enviado
   - Enviado → Entregado
   - Cualquiera → Cancelado

#### Paso 4: Guardar
1. Click en **"Guardar"**
2. Estado se actualiza **inmediatamente**
3. Cliente ve el cambio en "Mis Pedidos"
4. Confirmación: "✅ Estado actualizado"

---

### 7. VER DETALLE DEL PEDIDO

#### En tabla de pedidos
Click en **"Ver Detalle"**

#### Información Mostrada
```
PEDIDO: TRK10RYAYXKJ

Cliente:
  Nombre: Juan García
  Email: juan@email.com
  Teléfono: +56912345678

Envío:
  Dirección: Calle 123, Depto 456
  Ciudad: Santiago
  Región: Metropolitana

Productos:
  - Camisa Casual x2 = $99.980
  - Zapatos x1 = $89.990

Resumen:
  Subtotal: $189.970
  Total: $189.970

Método de Pago: Tarjeta

Estado: Pendiente
```

---

## PREGUNTAS FRECUENTES

### P: ¿Olvidé mi contraseña?
**R:** Actualmente no hay recuperación. Contacta al soporte (email de la tienda) o registrate nuevamente con otro email.

### P: ¿Cómo cambio mis datos de perfil?
**R:** Actualmente no hay página de perfil. Los datos se usan en el checkout.

### P: ¿Puedo cancelar un pedido?
**R:** Solo los admins pueden cambiar estado a "Cancelado". Contacta al soporte.

### P: ¿Cuánto tarda la entrega?
**R:** Depende del método de envío seleccionado. Ver términos y condiciones.

### P: ¿Cuáles son los métodos de pago?
**R:** 
- Tarjeta de Crédito/Débito
- Transferencia Bancaria
- Contra Entrega

### P: ¿Cómo rastreo mi pedido?
**R:** Ve a "Mis Pedidos" y busca el número de seguimiento. Allí verás el estado actual.

### P: ¿Puedo modificar un pedido después de confirmado?
**R:** No, debes cancelarlo y crear uno nuevo.

### P: ¿Hay ofertas o descuentos?
**R:** Ver sección "Promociones" o contacta al soporte.

### P: ¿Es seguro usar la plataforma?
**R:** Sí, usamos:
- Contraseñas hasheadas
- JWT tokens seguros
- HTTPS (en producción)
- Validación de datos

---

## TROUBLESHOOTING

### Error: "Página en blanco"

**Causa:** Frontend no está corriendo

**Solución:**
1. Abre terminal en carpeta del proyecto
2. Ejecuta: `npm start`
3. Espera a compilar
4. Actualiza navegador (F5 o Cmd+R)

---

### Error: "No se conecta al backend"

**Causa:** Backend no está corriendo

**Solución:**
1. Abre otra terminal
2. Ve a carpeta: `cd backend`
3. Ejecuta: `node server-demo.js`
4. Verifica: "Servidor escuchando en puerto 3001"
5. Actualiza navegador

---

### Error: "Email ya existe"

**Causa:** Email ya registrado

**Solución:**
- Usa otro email
- O haz login si ya tienes cuenta
- O contacta soporte si olvidaste credenciales

---

### Error: "RUT inválido"

**Causa:** Formato de RUT incorrecto

**Solución:**
Acepta formatos:
- `12345678K` (sin separadores)
- `12345678-K` (con guion)
- `12.345.678-K` (con puntos y guion)

---

### Error: "Contraseña incorrecta"

**Causa:** Email o contraseña wrong

**Solución:**
1. Verifica que escribiste correcto
2. Mayúsculas/minúsculas importan
3. Copia-pega si estás seguro de credenciales
4. Si registraste con otro email, prueba ese

---

### Error: "El producto ya no está disponible"

**Causa:** Producto fue eliminado por admin

**Solución:**
1. Remueve del carrito
2. Ve a productos
3. Elige otro producto
4. Intenta comprar de nuevo

---

### Error: "Datos de envío incompletos"

**Causa:** Falta llenar un campo requerido

**Solución:**
1. Verifica formulario
2. Todos los campos marcados con * son obligatorios
3. Llena cada campo
4. Intenta de nuevo

---

### Carrito no se actualiza

**Causa:** Estado local no actualizado

**Solución:**
1. Actualiza página (F5)
2. Agrega producto nuevamente
3. Si problema persiste, reinicia navegador

---

### Producto no aparece después de crear

**Causa:** Sincronización cada 5 segundos

**Solución:**
1. Espera 5 segundos
2. Recarga página (F5)
3. Si aún no aparece, contacta soporte

---

### "Acceso Denegado" en panel admin

**Causa:** No eres usuario ADMIN

**Solución:**
1. Logout (click en profile)
2. Login con: admin@tienda.com / admin123
3. Intenta acceder a /admin de nuevo

---

## CONTACTO Y SOPORTE

### Email
`soporte@tienda-online.com`

### Teléfono
`+56 9 1234 5678`

### Dirección
`Calle Principal 123, Santiago, Chile`

### Horario
Lunes a Viernes: 9:00 - 18:00  
Sábados: 10:00 - 14:00

### Redes Sociales
- Instagram: @tienda-online-react
- Facebook: Tienda Online React
- Twitter: @tienda_online

---

## GLOSARIO

| Término | Significado |
|---------|-------------|
| **JWT** | Método seguro de autenticación |
| **Token** | Credencial digital de acceso |
| **Admin** | Administrador con permisos especiales |
| **Carrito** | Lugar donde se guardan productos antes de comprar |
| **Checkout** | Proceso de compra |
| **Seguimiento** | Número para rastrear pedido |
| **Sincronización** | Actualización automática de datos |
| **CLP** | Pesos Chilenos (moneda) |

---

**Versión:** 1.0  
**Última actualización:** 16 de Diciembre de 2025  
**Siguiente revisión:** 31 de Diciembre de 2025

