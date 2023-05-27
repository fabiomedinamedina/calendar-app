
import calendarApi from "../../src/api/calendarApi";

describe('Pruebas en el calendarApi', () => {

  test('Debería tener la configuración por defecto', () => {
    
    expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );

  });

  test('Debería tener el x-token en el header de todas las peticiones', async() => {
    
    const token = 'ABC-123-XYZ';
    const userLogin = {
      email: "test@test.com",
      password: "Test123"
    }

    localStorage.setItem('token', token);

    const res = await calendarApi.post('/auth', userLogin );
    expect( res.config.headers['x-token'] ).toBe( token );


  });

})