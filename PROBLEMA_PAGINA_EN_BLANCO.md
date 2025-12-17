# 🔧 Solución: Página en Blanco

Si ves una página blanca en http://localhost:3000, sigue estos pasos:

## Paso 1: Abre la Consola
Presiona: **F12** o **Cmd + Option + I** (Mac)

Debería abrirse una ventana de desarrollo abajo o a un lado.

## Paso 2: Busca Mensajes de Error
- Haz clic en la pestaña **Console** (Consola)
- Busca texto **ROJO** - esos son los errores
- **COPIAR el error exacto y dímelo**

## Paso 3: Verifica el Backend
En una terminal nueva, ejecuta:
```bash
curl http://localhost:3001/api/productos
```

Si devuelve JSON con productos → Backend ✅
Si devuelve error → Backend ❌

## Paso 4: Reinicia el Frontend
1. En el navegador, presiona: **Ctrl+Shift+R** (Windows) o **Cmd+Shift+R** (Mac)
   (Esto recarga ignorando el caché)

2. Si sigue en blanco, ve a terminal y busca errores de npm

## Paso 5: Ejecuta el Script de Diagnóstico
En la consola (F12), pega esto:

```javascript
console.log("=== PROBANDO BACKEND ===");
fetch('http://localhost:3001/api/productos')
  .then(r => r.json())
  .then(d => console.log("✅ Backend OK:", d))
  .catch(e => console.error("❌ Backend ERROR:", e));

console.log("=== VERIFICANDO localStorage ===");
console.log("Token:", localStorage.getItem('token'));
console.log("Usuario:", localStorage.getItem('usuario'));
```

Luego presiona Enter.

## Paso 6: Si Nada Funciona
Reinicia TODO:

```bash
# Terminal 1 - Termina el backend
# (Si lo iniciaste con nohup)
pkill -f "node server-demo.js"

# Espera 3 segundos

# Inicia el backend de nuevo
cd /Users/usuario/tienda-online-react/backend
nohup node server-demo.js > server.log 2>&1 &

# Terminal 2 - Termina el frontend
# (Presiona Ctrl+C en la terminal donde está npm start)

# Inicia el frontend
cd /Users/usuario/tienda-online-react
npm start
```

## Soluciones Rápidas

### ❌ "Cannot GET /api"
Backend no está corriendo:
```bash
cd /Users/usuario/tienda-online-react/backend && nohup node server-demo.js > server.log 2>&1 &
```

### ❌ "Failed to fetch"
CORS problema o backend caído. Verifica que localhost:3001 responde:
```bash
curl http://localhost:3001/api-docs
```

### ❌ "TypeError: Cannot read property 'children'"
Problema en React. Abre consola (F12) y copia el error exacto.

### ❌ Spinner infinito
Cargando demasiado tiempo. Presiona Ctrl+Shift+R en navegador.

## ¿Dime exactamente?

Para ayudarte mejor, incluye:
1. El error exacto de la consola (F12 → Console)
2. Resultado de: `curl http://localhost:3001/api/productos`
3. Qué ves en pantalla (blanca, spinner, error, etc.)

