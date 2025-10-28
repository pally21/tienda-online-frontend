import { 
  validarRUN, 
  validarEmail, 
  validarPassword,
  validarPasswordsCoinciden
} from './validaciones';

describe('Validaciones - Pruebas Unitarias', () => {
  
  test('Prueba 1: Debe validar correctamente un RUN válido', () => {
    const runValido = '11111111-1';  // RUN válido conocido
    expect(validarRUN(runValido.replace('-', ''))).toBe(true);
  });

  test('Prueba 2: Debe rechazar un RUN inválido', () => {
    const runInvalido = '12345678-9';  // RUN inválido
    expect(validarRUN(runInvalido.replace('-', ''))).toBe(false);
  });

  test('Prueba 3: Debe rechazar RUN con formato incorrecto', () => {
    const runFormato = 'ABCD1234';
    expect(validarRUN(runFormato)).toBe(false);
  });

  test('Prueba 4: Debe aceptar email con dominio @duoc.cl', () => {
    const emailValido = 'estudiante@duoc.cl';
    expect(validarEmail(emailValido)).toBe(true);
  });

  test('Prueba 5: Debe aceptar email con dominio @gmail.com', () => {
    const emailGmail = 'usuario@gmail.com';
    expect(validarEmail(emailGmail)).toBe(true);
  });

  test('Prueba 6: Debe rechazar email con dominio no permitido', () => {
    const emailInvalido = 'usuario@hotmail.com';
    expect(validarEmail(emailInvalido)).toBe(false);
  });

  test('Prueba 7: Debe aceptar contraseña con longitud válida (4-10 caracteres)', () => {
    const passwordValida = 'Pass123';
    expect(validarPassword(passwordValida)).toBe(true);
  });

  test('Prueba 8: Debe rechazar contraseña menor a 4 caracteres', () => {
    const passwordCorta = 'Ab1';
    expect(validarPassword(passwordCorta)).toBe(false);
  });

  test('Prueba 9: Debe validar que dos contraseñas coincidan', () => {
    const pass1 = 'MiPass123';
    const pass2 = 'MiPass123';
    expect(validarPasswordsCoinciden(pass1, pass2)).toBe(true);
  });

  test('Prueba 10: Debe detectar cuando dos contraseñas no coinciden', () => {
    const pass1 = 'MiPass123';
    const pass2 = 'OtraPass456';
    expect(validarPasswordsCoinciden(pass1, pass2)).toBe(false);
  });
});