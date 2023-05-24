import { useState } from 'react';
import { useAuthStore, useForm } from '../../hooks';

const formData = {
  email: '',
  password: ''
}

const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

const formValidations = {
  email: [(value) => emailValidation.test(value) , 'Escribe un correo valido correo@example.com'],
  password: [(value) => value.length > 2 , 'Escribe una contraseña válida'],
}


export const LoginForm = () => {

  const [formSubmited, setFormSubmited] = useState(false);
  const { startLogin } = useAuthStore();


  const {
    email, password, onInputChange,
    emailValid, passwordValid, isFormValid,
  } = useForm( formData, formValidations );

  const onSubmit = (event) => {
    
    event.preventDefault();
    setFormSubmited(true);
    
    if( !isFormValid ) return;
    
    startLogin( { email, password } );

  }

  return (
    <form onSubmit={ onSubmit }>
      <div className="input-group has-validation mb-3">
        <input
          type="email"
          className={`form-control rounded-2 ${ formSubmited ? 'is': '' }-${ !emailValid ? 'valid': 'invalid' }`}
          name="email"
          placeholder="Correo electrónico"
          value={ email }
          onChange={ onInputChange }
        />
        <div className="invalid-feedback">{ emailValid }</div>
      </div>
      <div className="input-group has-validation mb-0">
        <input
          type="password"
          name="password"
          className={`form-control rounded-2 ${ formSubmited ? 'is': '' }-${ !passwordValid ? 'valid': 'invalid' }`}
          placeholder="Contraseña"
          value={ password }
          onChange={ onInputChange }
        />
        <div className="invalid-feedback">{ passwordValid }</div> 
      </div>
      <div className="form-text mb-3">
          Nunca compartas tu contraseña con alguien más
        </div>
      <button type="submit" className="btn btn-primary col-12 mx-auto d-grid">
        Iniciar sesión
      </button>
    </form>
  );
};
