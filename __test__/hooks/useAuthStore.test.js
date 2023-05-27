import { configureStore } from '@reduxjs/toolkit';
import { authSlice, onChecking, onLogin } from '../../src/store/auth/authSlice';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { Provider } from 'react-redux';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';

const getMockStore = (initialState) => {
  return configureStore ({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: initialState
    }
  })
}

//Si quieres validar que se llame el dispatch con las funciones respectivas
// const mockUseDispatch = jest.fn();
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: () =>  mockUseDispatch,
// }));

describe('Pruebas en customHook useAuthStore', () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks()
  });

  test('Debería retornar los valores por defecto', () => {
    
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect( result.current ).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any( Function ),
      startRegister: expect.any( Function ),
      checkAuthToken: expect.any( Function ),
      startLogout: expect.any( Function ),
    });

  });

  test('startLogin debería realizar el login correctamente', async() => {
    
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });

    
    await act(async() => {
      await result.current.startLogin( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current;

    
    expect( localStorage.getItem('token') ).toEqual( expect.any( String ) );
    
    //Si quieres validar que se llame el dispatch con las funciones respectivas
    // expect( mockUseDispatch ).toHaveBeenCalledTimes(2)
    // expect( mockUseDispatch ).toHaveBeenCalledWith( onChecking() )
    // expect( mockUseDispatch ).toHaveBeenCalledWith( onLogin({
    //   name: testUserCredentials.name,
    //   uid: testUserCredentials.uid
    // }));



    // Si quieres hacer una prueba de integración con el backend, reducen y el hook.
    expect({ errorMessage, status, user }).toEqual({
      status: 'authenticated',
      user: {
        name: testUserCredentials.name,
        uid: testUserCredentials.uid
      },
      errorMessage: undefined
    });

  });

  test('startLogin debería fallar la autenticación', async() => {
    
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });

    
    await act(async() => {
      await result.current.startLogin({ email: 'test@test.com', password: '21212' });
    });

    const { errorMessage, status, user } = result.current;

    expect( errorMessage ).toEqual({ title: 'Error de autenticación', msg: expect.any(String) });
    expect( user ).toEqual( {} );
    expect( status ).toBe( 'not-authenticated' );
    expect( localStorage.getItem('token') ).toBe( null );

    await waitFor( () => {
      expect( result.current.errorMessage ).toBe( undefined );
    })

  });

  test('startRegister debería crear un usuario', async() => {
    
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
      data: {
        ok: true,
        uid: testUserCredentials.uid,
        name: testUserCredentials.name,
        token: 'asdas2slkwiwmsz3'
      }
    })

    
    await act(async() => {
      await result.current.startRegister( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current

    expect( { errorMessage, status, user } ).toEqual({
      status: 'authenticated',
      user: { name: testUserCredentials.name, uid: testUserCredentials.uid },
      errorMessage: undefined,
    });

    spy.mockRestore();

  });

  test('startRegister debería fallar en la creación de un usuario', async() => {
    
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });

     
    await act(async() => {
      await result.current.startRegister( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current;

    expect( { errorMessage, status, user } ).toEqual({
      status: 'not-authenticated',
      user: { },
      errorMessage: {
        title: 'Error de registro',
        msg: expect.any( String ),
      },
    });


  });

  test('checkAuthToken debe fallar si no hay token', async() => {
    
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });
     
    await act(async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    })
    
  });

  test('checkAuthToken debe fallar si el token no es valido', async() => {

    localStorage.setItem('token', '234jkn28cn3217bnasd');
    
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });
     
    await act(async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: {
        title: 'Error de autenticación',
        msg: expect.any(String)
      },
    })
    
  });

  test('checkAuthToken debe autenticar si el token es valido', async() => {

    const { data } = await calendarApi.post( '/auth', testUserCredentials );
    localStorage.setItem('token', data.token);
    
    const mockStore = getMockStore({ ...initialState });
    
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
    });
    
    //Si mockeamos el post
    // localStorage.setItem('token', 'asudhajh732nejwko7');
    // const spy = jest.spyOn( calendarApi, 'get' ).mockReturnValue({
    //   data: {
    //     ok: true,
    //     name: testUserCredentials.name,
    //     uid: testUserCredentials.uid,
    //     token: 'asdnfuisd8743n'
    //   }
    // });
     
    await act(async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: 'authenticated',
      user: {
        name: testUserCredentials.name,
        uid: testUserCredentials.uid
      },
      errorMessage: undefined,
    })

    // spy.mockRestore();
    
  });
  
})