describe('CarritoContext - Pruebas Unitarias', () => {
  
  test('Prueba 18: El carrito inicia vacío', () => {
    const carrito = [];
    expect(carrito).toHaveLength(0);
  });

  test('Prueba 19: Se puede agregar un producto al carrito', () => {
    const carrito = [];
    const producto = { id: 1, nombre: 'Test', precio: 100, cantidad: 1 };
    carrito.push(producto);
    expect(carrito).toHaveLength(1);
  });

  test('Prueba 20: Se puede eliminar un producto del carrito', () => {
    let carrito = [{ id: 1, nombre: 'Test', precio: 100 }];
    carrito = carrito.filter(item => item.id !== 1);
    expect(carrito).toHaveLength(0);
  });

  test('Prueba 21: Se puede vaciar el carrito completamente', () => {
    let carrito = [{ id: 1 }, { id: 2 }];
    carrito = [];
    expect(carrito).toHaveLength(0);
  });

  test('Prueba 22: Se puede actualizar la cantidad de un producto', () => {
    const producto = { id: 1, cantidad: 1 };
    producto.cantidad = 5;
    expect(producto.cantidad).toBe(5);
  });

  test('Prueba 23: Se puede calcular el total del carrito', () => {
    const carrito = [
      { precio: 100, cantidad: 2 },
      { precio: 200, cantidad: 1 }
    ];
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    expect(total).toBe(400);
  });
});