import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en authSlice', () => {
  
  test('Debería regresar el estado inicial', () => {
    
    expect( authSlice.getInitialState() ).toEqual( initialState );

  });

  test('Debería realizar el checking inicial', () => {

    const state = authSlice.reducer( authenticatedState, onChecking() );
    expect( state ).toEqual( initialState );
    
  });

  test('Debería  de realizar el login', () => {

    const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
    expect( state ).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    });
    
  });

  test('Debería  de realizar el logout', () => {

    const state = authSlice.reducer( authenticatedState, onLogout() );
    expect( state ).toEqual(notAuthenticatedState);
    
  });

  test('Debería  de realizar el logout con error', () => {

    const errorMessage = {
      title: 'Error',
      msg: 'Ha ocurrido un error',
      type: 'error'
    }

    const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
    expect( state ).toEqual({
      ...notAuthenticatedState,
      errorMessage: errorMessage
    });
    
  });

  test('Debería  limpiar el errorMessage', () => {

    const errorMessage = {
      title: 'Error',
      msg: 'Ha ocurrido un error',
      type: 'error'
    }

    let state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
    state = authSlice.reducer( state, clearErrorMessage() );
    expect( state ).toEqual( notAuthenticatedState );
    expect( state.errorMessage ).toBe( undefined );
    
  });

})