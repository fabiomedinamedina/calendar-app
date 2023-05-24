import { useState } from 'react';
import { useAuthStore, useForm } from '../../hooks';

const formData = {
  name: '',
  email: '',
  password: ''
}

const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const formValidations = {
  name: [(value) => value.length >= 2 , 'El nombre es obligatorio'],
  email: [(value) => emailValidation.test(value) , 'Escribe un correo valido correo@example.com'],
  password: [(value) => passwordValidation.test(value) , 'La contraseña debe tener más de 6 caracteres y por lo menos una mayúscula y un número'],
}

export const RegisterForm = () => {

  const [formSubmited, setFormSubmited] = useState(false);
  const { startRegister } = useAuthStore();
  
  const {
    name, email, password, onInputChange,
    isFormValid, nameValid, emailValid, passwordValid,
  } = useForm( formData, formValidations )

  const onSubmit = (event) => {
    
    event.preventDefault();
    setFormSubmited(true);
    
    if( !isFormValid ) return;

    startRegister({ name, email, password }) 

  }

  
  return (
    <form onSubmit={ onSubmit }>
      <div className="input-group has-validation mb-3">
        <input
          type="text"
          className={`form-control rounded-2 ${ formSubmited ? 'is': '' }-${ !nameValid ? 'valid': 'invalid' }`}
          placeholder="Nombre completo"
          onChange={ onInputChange }
          name="name"
          value={ name }
        />
        <div className="invalid-feedback">{ nameValid }</div> 
      </div>
      <div className="input-group has-validation mb-3">
        <input
          type="email"
          className={`form-control rounded-2 ${ formSubmited ? 'is': '' }-${ !emailValid ? 'valid': 'invalid' }`}
          placeholder="Correo electrónico"
          onChange={ onInputChange }
          name="email"
          value={ email }
        />
        <div className="invalid-feedback">{ emailValid }</div> 
      </div>
      <div className="input-group has-validation mb-0">
        <input
          type="password"
          className={`form-control rounded-2 ${ formSubmited ? 'is': '' }-${ !passwordValid ? 'valid': 'invalid' }`}
          placeholder="Contraseña"
          onChange={ onInputChange }
          name="password"
          value={ password }
        />
        <div className="invalid-feedback">{ passwordValid }</div> 
       
      </div>
      <div className="form-text mb-3">
          Nunca compartas tu contraseña con alguien más
        </div>
      <button type="submit" className="btn btn-primary col-12 mx-auto d-grid">
        Registrarme
      </button>
    </form>
  );
};
