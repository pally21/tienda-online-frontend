/**
 * Valida un RUN chileno
 * @param {string} run - RUN sin puntos ni guión (ej: 19011022K)
 * @returns {boolean} - true si el RUN es válido
 */
export function validarRUN(run) {
  if (!/^[0-9]+[0-9kK]{1}$/.test(run)) {
    return false;
  }
  
  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1).toUpperCase();
  
  let suma = 0;
  let multiplo = 2;
  
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  
  let dvEsperado = 11 - (suma % 11);
  const dvIngresado = dv === 'K' ? 10 : parseInt(dv);
  dvEsperado = dvEsperado === 11 ? 0 : dvEsperado === 10 ? 'K' : dvEsperado;
  
  return dvIngresado == dvEsperado;
}

/**
 * Valida un email con dominios específicos
 * @param {string} email - Email a validar
 * @returns {boolean} - true si el email es válido
 */
export function validarEmail(email) {
  const emailPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return emailPattern.test(email);
}

/**
 * Valida longitud de contraseña
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - true si la contraseña es válida (4-10 caracteres)
 */
export function validarPassword(password) {
  return password.length >= 4 && password.length <= 10;
}

/**
 * Valida que dos contraseñas coincidan
 * @param {string} password1 - Primera contraseña
 * @param {string} password2 - Segunda contraseña
 * @returns {boolean} - true si coinciden
 */
export function validarPasswordsCoinciden(password1, password2) {
  return password1 === password2;
}

/**
 * Valida longitud de texto
 * @param {string} texto - Texto a validar
 * @param {number} min - Longitud mínima
 * @param {number} max - Longitud máxima
 * @returns {boolean} - true si cumple con la longitud
 */
export function validarLongitud(texto, min, max) {
  return texto.length >= min && texto.length <= max;
}