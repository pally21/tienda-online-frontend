// Guardar esto en un archivo: /Users/usuario/tienda-online-react/public/debug.js
// O ejecuta directamente en la consola del navegador (F12)

console.log("=== DIAGNÓSTICO DE TIENDA ONLINE ===\n");

// 1. Verificar API Backend
console.log("1. Probando conexión con Backend...");
fetch('http://localhost:3001/api/productos')
  .then(r => r.json())
  .then(data => {
    console.log("✅ Backend funciona. Productos:", data);
  })
  .catch(e => {
    console.error("❌ Backend NO responde:", e.message);
    console.log("   Solución: Asegúrate que backend está corriendo en puerto 3001");
  });

// 2. Verificar localStorage
console.log("\n2. Estado de localStorage:");
console.log("   Token:", localStorage.getItem('token') ? "✅ Guardado" : "❌ No guardado");
console.log("   Usuario:", localStorage.getItem('usuario') ? "✅ Guardado" : "❌ No guardado");
console.log("   Role:", localStorage.getItem('role') || "❌ No guardado");

// 3. Verificar React
console.log("\n3. Verificando React...");
if (typeof React !== 'undefined') {
  console.log("✅ React cargado correctamente");
} else {
  console.error("❌ React NO está cargado");
}

// 4. Verificar ReactDOM
console.log("\n4. Verificando ReactDOM...");
if (typeof ReactDOM !== 'undefined') {
  console.log("✅ ReactDOM cargado correctamente");
} else {
  console.error("❌ ReactDOM NO está cargado");
}

// 5. Intentar login de prueba
console.log("\n5. Probando login...");
fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@tienda.com',
    password: 'admin123'
  })
})
  .then(r => r.json())
  .then(data => {
    console.log("✅ Login funciona. Token generado:", data.token?.substring(0, 20) + "...");
  })
  .catch(e => {
    console.error("❌ Login fallió:", e.message);
  });

console.log("\n=== FIN DEL DIAGNÓSTICO ===\n");
