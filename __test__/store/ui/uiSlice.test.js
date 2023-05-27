import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";

describe('Pruebas en el uiSlice', () => {
  
  test('Debería regresar el estado por defecto', () => {

    const initialState = { isDateModalOpen: false }

    expect( uiSlice.getInitialState() ).toEqual( initialState );

  });

  test('Debería cambiar el isDateModalOpen', () => {
    
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer( state, onOpenDateModal() );
    expect( state.isDateModalOpen ).toBeTruthy();

    state = uiSlice.reducer( state, onCloseDateModal() );
    expect( state.isDateModalOpen ).toBeFalsy();


  });

})