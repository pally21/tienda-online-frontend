import { productos } from './productos';

describe('Productos - Pruebas Unitarias', () => {
  
  test('Prueba 24: El array de productos existe', () => {
    expect(productos).toBeDefined();
  });

  test('Prueba 25: Hay al menos un producto en el catálogo', () => {
    expect(productos.length).toBeGreaterThan(0);
  });
});
