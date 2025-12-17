// filepath: /Users/usuario/tienda-online-react/src/utils/api.js
const API_URL = "http://localhost:3001/api";

export async function fetchJson(endpoint, options = {}) {
  // Obtener token del localStorage
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
      ...(options.headers || {})
    },
    ...options
  };

  console.log(`📡 ${options.method || 'GET'} ${endpoint}`, {
    hasToken: !!token,
    headers: config.headers
  });

  const res = await fetch(API_URL + endpoint, config);

  let data = null;

  try {
    data = await res.json();
  } catch (e) {
    console.error('Error parseando JSON:', e);
    // Si la API no devuelve JSON, continuar
  }

  console.log(`Response Status: ${res.status}`, data);

  if (!res.ok) {
    const errorMessage = data?.error || data?.message || "Error en la API";
    console.error(`❌ Error ${res.status}:`, errorMessage);
    throw new Error(errorMessage);
  }

  return data;
}

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

export async function login(email, password) {
  const response = await fetchJson('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    localStorage.setItem('role', response.usuario.role);
  }

  return response;
}

export async function register(nombre, email, password) {
  const response = await fetchJson('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nombre, email, password })
  });

  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    localStorage.setItem('role', response.usuario.role);
  }

  return response;
}

export async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('role');
}

export async function getCurrentUser() {
  return await fetchJson('/auth/me', {
    method: 'GET'
  });
}
