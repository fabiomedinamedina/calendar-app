import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth';
import { onLogoutCalendar } from '../store/calendar';



export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {

    dispatch( onChecking() );

    try {
      
      const { data } = await calendarApi.post('/auth', {email, password});
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( onLogin({ name: data.name, uid: data.uid }) );
    
    } catch (error) {
      dispatch( onLogout({ title: 'Error de autenticación', msg: error.response.data?.msg }));
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 30);
      
    }

  }

  const startRegister = async({ name, email, password }) => {

    dispatch( onChecking() );
    

    try {

      const { data } = await calendarApi.post('/auth/new', { name, email, password });
      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch (error) {

      const { response } = error;
      dispatch( onLogout({ title: 'Error de registro', msg: response.data?.msg || 'Error en el registro' }));
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 30);
      
    }

  }

  const checkAuthToken = async() => {
    
    const token = localStorage.getItem('token');
    if( !token ) return dispatch( onLogout() );

    try {
      const { data } = await calendarApi.get('auth/renew')
      localStorage.setItem( 'token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( onLogin({ name: data.name, uid: data.uid }) );
    } catch (error) {
      localStorage.clear();
      dispatch( onLogout({ title: 'Error de autenticación', msg: 'Tu sesión ha expirado' }));
    }

  }

  const startLogout = () => {
    localStorage.clear();
    dispatch( onLogout());
    dispatch( onLogoutCalendar() );
  }



  return {
    //* Properties
    status,
    user,
    errorMessage,

    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }

}