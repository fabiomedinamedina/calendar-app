import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks';


jest.mock('../../../src/hooks/useCalendarStore');

describe('Pruebas en componente <FabDelete />', () => {

  const mockstartDeletingEvent = jest.fn();

  beforeEach( () => jest.clearAllMocks() );


  test('Debería mostrar el componente con visibility hidden', () => {

    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    })
    
    render(<FabDelete />);
    const btn = screen.getByLabelText( 'btn-delete' );
    
    expect( btn.style.visibility ).toBe( 'hidden' );
    expect( btn.style.opacity ).toBe( "0" );

  });

  test('Debería mostrar el componente con visibility visible', () => {


    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    
    render(<FabDelete />);
    const btn = screen.getByLabelText( 'btn-delete' );
    
    expect( btn.style.visibility ).toBe( 'visible' );
    expect( btn.style.opacity ).toBe( "1" );

  });

  test('Debería llamar startDeletingEvent', () => {

    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockstartDeletingEvent
    });
    
    render(<FabDelete />);
    const btn = screen.getByLabelText( 'btn-delete' );
    fireEvent.click( btn );

    expect( mockstartDeletingEvent ).toHaveBeenCalled();
    expect( mockstartDeletingEvent ).toHaveBeenCalledTimes(1);

  });
  
})