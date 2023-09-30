import { act, renderHook } from '@testing-library/react';
import { useUiStore } from '../../src/hooks/useUiStore';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../../src/store/ui';


const getMockStore =( initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState }
    }
  })
}

describe('Pruebas en hook useUiStore', () => {
  
  test('Debería regresar los valores por defecto', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });
   
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect( result.current ).toEqual({
      isDateModalOpen: false,
      toggleDateModal: expect.any( Function )
    });


  });

  test('toggleDateModal debe cambiar el estado alterno al que tiene' , () => {
    
    const mockStore = getMockStore({ isDateModalOpen: false });
    
    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act( () => {
      result.current.toggleDateModal();
    });

    expect( result.current.isDateModalOpen ).toBeTruthy();

    act( () => {
      result.current.toggleDateModal();
    });
    
    expect( result.current.isDateModalOpen ).toBeFalsy();


  });

})