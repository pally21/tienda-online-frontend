# 🛍️ Tienda Online - Proyecto Fullstack

Aplicación web completa de Tienda Online desarrollada con **React** (Frontend) y **Node.js + Express** (Backend), implementando autenticación JWT, roles de usuario y gestión de productos.

## 📋 Descripción del Proyecto

Este proyecto integra el desarrollo de una tienda online con las siguientes funcionalidades:

✅ **Frontend (React)**
- Interfaz moderna y responsiva con Bootstrap
- Navegación intuitiva de productos
- Carrito de compras funcional
- Gestión de pedidos
- Panel de administrador para gestionar productos
- Autenticación con JWT integrada

✅ **Backend (Node.js + Express)**
- API REST con endpoints CRUD
- Autenticación JWT segura
- Roles de usuario (ADMIN, USER)
- Validaciones de datos
- Documentación Swagger/OpenAPI
- Base de datos MySQL

## 🚀 Tecnologías Utilizadas

**Frontend:**
- React 18.2+
- React Router DOM 6.0+
- Bootstrap 5.3+
- React Bootstrap 2.0+

**Backend:**
- Node.js v16+
- Express 4.18+
- MySQL 5.7+
- JWT (JSON Web Tokens)
- Swagger 3.0 (OpenAPI)
- bcryptjs (password hashing)

## 📁 Estructura del Proyecto
```
tienda-online-react/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Navbar/
│   │   ├── ProductCard/
│   │   ├── Footer/
│   │   └── BlogCard/
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Productos.jsx
│   │   ├── Registro.jsx
│   │   └── ...
│   ├── context/          # Context API
│   │   └── CarritoContext.jsx
│   ├── data/             # Datos mock
│   │   ├── productos.js
│   │   ├── blogs.js
│   │   └── regiones.js
│   ├── utils/            # Utilidades y validaciones
│   │   └── validaciones.js
│   └── App.js
├── public/
└── package.json
```

## 🎯 Funcionalidades Principales

### ✅ Catálogo de Productos
- Visualización de productos en grid responsivo
- Filtrado por categorías
- Búsqueda en tiempo real
- Información detallada de cada producto

### ✅ Carrito de Compras
- Agregar/eliminar productos
- Actualizar cantidades
- Cálculo automático de totales
- Persistencia durante la sesión (Context API)
- Badge con cantidad total en navbar

### ✅ Registro de Usuarios
- Validación de RUN chileno
- Validación de email (@duoc.cl, @profesor.duoc.cl, @gmail.com)
- Selección de región y comuna
- Contraseñas entre 4-10 caracteres
- Validación en tiempo real

### ✅ Blog Informativo
- Listado de artículos
- Vista detalle de artículos
- Categorización por temas
- Navegación entre artículos

### ✅ Diseño Responsivo
- Adaptado a móvil, tablet y desktop
- Bootstrap 5 Grid System
- Componentes responsivos

## 🧪 Pruebas Unitarias

El proyecto incluye **25 pruebas unitarias** que cubren:

- ✅ **10 pruebas** de validaciones (RUN, email, contraseñas)
- ✅ **6 pruebas** de lógica del carrito
- ✅ **4 pruebas** de componentes ProductCard
- ✅ **2 pruebas** de datos (productos)
- ✅ **2 pruebas** de componente Footer
- ✅ **1 prueba** de componente Navbar

### Ejecutar pruebas:
```bash
# Ejecutar todas las pruebas
npm test

# Ver cobertura de código
npm test -- --coverage --watchAll=false
```

### Resultados:
```
Test Suites: 6 passed, 6 total
Tests:       25 passed, 25 total
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js 14+
- npm 6+

### Pasos de instalación:
```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# 2. Entrar a la carpeta del proyecto
cd tienda-online-react

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 📦 Scripts Disponibles
```bash
npm start          # Inicia el servidor de desarrollo
npm test           # Ejecuta las pruebas
npm run build      # Crea build de producción
npm test -- --coverage  # Reporte de cobertura
```

## 🎨 Paleta de Colores

- **Primary:** #2d3e50 (Azul oscuro)
- **Secondary:** #ffb347 (Naranja)
- **Light:** #f8f9fa (Gris claro)
- **Success:** #28a745 (Verde)
- **Danger:** #e74c3c (Rojo)

## 👥 Autores

- **Equipo:** [Nombres de integrantes]
- **Asignatura:** DSY1104 - Desarrollo Fullstack II
- **Institución:** DuocUC
- **Fecha:** Octubre 2025

## 📝 Licencia

Este proyecto fue desarrollado con fines educativos para la evaluación parcial N°2 de la asignatura Desarrollo Fullstack II.

---

**© 2025 TiendaOnline - Todos los derechos reservados**