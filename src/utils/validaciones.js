/**
 * Valida un RUN chileno (formato flexible)
 * Acepta: 12345678K, 12.345.678-K, 12345678
 */
export function validarRUN(run) {
  if (!run || typeof run !== 'string') {
    return false;
  }
  
  // Limpiar: eliminar puntos, guiones y espacios
  const runLimpio = run.replace(/[.\-\s]/g, '').toUpperCase();
  
  // Validar: debe tener entre 7-11 caracteres (números + opcionalmente una letra al final)
  // Formatos válidos: 1234567, 12345678K, 1234567K, etc.
  const esValido = /^[0-9]{7,11}[K0-9]?$/.test(runLimpio);
  
  return esValido;
}

/**
 * Valida email básico
 */
export function validarEmail(email) {
  // Validación simple: debe tener @ y un dominio
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida contraseña entre 4 y 10 caracteres
 */
export function validarPassword(password) {
  return password.length >= 4 && password.length <= 10;
}

/**
 * Verifica que las contraseñas coincidan
 */
export function validarPasswordsCoinciden(p1, p2) {
  return p1 === p2;
}

/**
 * Valida longitud de texto
 */
export function validarLongitud(texto, min, max) {
  return texto.length >= min && texto.length <= max;
}
