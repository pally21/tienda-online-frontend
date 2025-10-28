import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer - Pruebas Unitarias', () => {
  
  test('Prueba 24: Debe mostrar el texto de copyright correctamente', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 TiendaOnline/i)).toBeInTheDocument();
  });

  test('Prueba 25: Debe mostrar el texto sobre las tecnologías usadas', () => {
    render(<Footer />);
    expect(screen.getByText(/Desarrollado con React y Bootstrap/i)).toBeInTheDocument();
  });
});