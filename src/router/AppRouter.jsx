import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages';
import { CalendarPage } from '../calendar/page';
import { useAuthStore } from '../hooks';
import { Loading } from '../auth/components';

export const AppRouter = () => {

  // const authStatus = 'not-authenticated';
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);
  
 
  if( status === 'checking' ) {
    return <Loading />
  }

  return (
    <Routes>

      {
        ( status ===  'not-authenticated' )
        ? (
          <>
            <Route path="/auth/*" element={ <LoginPage /> } />
            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
          </>
        )
        : (
          <>
            <Route path="/" element={ <CalendarPage /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />
          </>
        )
      }


    </Routes>
  );
};
