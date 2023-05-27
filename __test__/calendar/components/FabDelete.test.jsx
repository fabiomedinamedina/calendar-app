import { render } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';

describe('Pruebas en componente <FabDelete />', () => {

  test('Debería mostrar el componente correctamente', () => {
    
    render(
      <FabDelete />
    );

  });
  
})