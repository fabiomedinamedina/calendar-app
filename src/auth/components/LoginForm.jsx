import { useState } from 'react';
import { useForm } from '../../hooks/useForm';

const formData = {
  email: '',
  password: ''
}

const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const formValidations = {
  email: [(value) => emailValidation.test(value) , 'Escribe un correo valido correo@example.com'],
  password: [(value) => passwordValidation.test(value) , 'La contraseña debe tener más de 6 caracteres y por lo menos una mayúscula y un número'],
}


export const LoginForm = () => {

  const [formSubmited, setFormSubmited] = useState(false);

  const {
    email, password, onInputChange,
    emailValid, passwordValid, isFormValid,
  } = useForm( formData, formValidations );

  const onSubmit = (event) => {
    
    event.preventDefault();
    setFormSubmited(true);
    
    if( !isFormValid ) return;

  }

  return (
    <form onSubmit={ onSubmit }>
      <div className="input-group has-validation mb-3">
        <input
          type="email"
          className={`form-control ${ formSubmited ? 'is': '' }-${ !emailValid ? 'valid': 'invalid' }`}
          name="email"
          placeholder="Correo electrónico"
          value={ email }
          onChange={ onInputChange }
        />
        <div className="invalid-feedback">{ emailValid }</div>
      </div>
      <div className="input-group has-validation mb-3">
        <input
          type="password"
          name="password"
          className={`form-control ${ formSubmited ? 'is': '' }-${ !passwordValid ? 'valid': 'invalid' }`}
          placeholder="Contraseña"
          value={ password }
          onChange={ onInputChange }
        />
        <div className="invalid-feedback">{ passwordValid }</div> 
        <div className="form-text">
          Nunca compartas tu contraseña con alguien más
        </div>
      </div>
      <button type="submit" className="btn btn-primary col-12 mx-auto d-grid">
        Iniciar sesión
      </button>
    </form>
  );
};
