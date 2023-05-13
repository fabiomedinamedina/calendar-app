import { useMemo, useState } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import { useForm } from '../../hooks/useForm';

import 'react-datepicker/dist/react-datepicker.css';


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

registerLocale( 'es', es );

Modal.setAppElement("#root");

const formData = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  color: 'green'

}

const formValidations = {
  title: [(value) => value.length >= 4 , 'Es obligatorio y debe tener más de 4 carácteres '],
  notes: [(value) => value.length >= 2 , 'Es obligatorio y debe tener más de 2 carácteres '],
}


export const CalendarModal = () => {
  
  const [isOpen, setIsOpen] = useState(true);
  const [formSubmited, setFormSubmited] = useState(false);

  const { 
    title, notes, start, end, color,
    isFormValid, titleValid, notesValid, colorValid,
    onInputChange, onDateChange
  } = useForm( formData, formValidations );

  const endClass = useMemo( () => {
    if( !formSubmited ) return '';

    const difference = differenceInMinutes( end, start );
    const validationDate = {
      class: '',
      message: 'La fecha fin debe ser mayor a la de inicio'
    };
    if( isNaN( difference ) || difference <= 0 ){
      validationDate.class = 'is-invalid';
    }else{
      validationDate.class = 'is-valid';
    }
    
    return validationDate;

  }, [start, end, formSubmited ])

  const onCloseModal = () => {
    console.log("cerrando");
    setIsOpen(false);
  };

  const onSubmitForm = (event) => {
    
    event.preventDefault(); 
    setFormSubmited(true);
    if( !isFormValid ) return;
    if( endClass?.class === "is-invalid" ) return;
    
    console.log('paso todo los filtros');

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-overlay"
      closeTimeoutMS={200}
    >
      <h3 className="fw-bold text-primary text-center position-relative">Nuevo evento</h3>
      <form onSubmit={ onSubmitForm }>
      <div className="divider">
        <div className="divider-text">Datos de fecha</div>
      </div>
        <div className="input-group has-validation mb-2">
          <span className="input-group-text label-date">Inicio</span>
          <DatePicker
            locale="es"
            minDate={ new Date() }
            selected={ start }
            onChange={ (event) => onDateChange( event, 'start' ) }
            className={`form-control input-date ${ endClass?.class }`}
            dateFormat="Pp"
            wrapperClassName='form-control'
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <div className="input-group has-validation mb-2">
        <span className="input-group-text label-date">Fin</span>
          <DatePicker
            locale="es"
            minDate={ start }
            selected={ end }
            onChange={ (event) => onDateChange( event, 'end' ) }
            className={`form-control input-date ${ endClass?.class }`}
            dateFormat="Pp"
            wrapperClassName='form-control'
            showTimeSelect
            timeCaption="Hora"
          />
          <div className="invalid-feedback" style={{display: (endClass?.class === 'is-invalid') ? 'block' : 'none' }}>{ endClass?.message }</div>
        </div>
        <div className="divider pt-3">
        <div className="divider-text">Datos adicionales</div>
      </div>
        <div className="input-group has-validation mb-2">
          <input
            type="text"
            className={`form-control ${ formSubmited ? 'is': '' }-${ !titleValid ? 'valid': 'invalid' }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ onInputChange }
            required
          />
          <div className="invalid-feedback">{ titleValid }</div>
        </div>
        <div className="input-group mb-2 has-validation">
          <textarea
            type="text"
            className={`form-control ${ formSubmited ? 'is': '' }-${ !notesValid ? 'valid': 'invalid' }`}
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ onInputChange }
            required
          ></textarea>
          <div className="invalid-feedback">{ notesValid }</div>
        </div>
        <div className="input-group mb-4">
        <span className="input-group-text" >Color</span>
        <select
          className={`form-select ${ formSubmited ? 'is': '' }-${ !colorValid ? 'valid': 'invalid' }`}
          aria-label="Select color"
          defaultValue={ color }
          onChange={ onInputChange }
          required
        >
          <option value="purple">Morado</option>
          <option value="red">Rojo</option>
          <option value="green">Verde</option>
          <option value="blue">Azul</option>
        </select>
        </div>

        <button type="submit" className="btn btn-primary col-12 mx-auto d-flex justify-content-center align-items-center ">
          <i className="far fa-save me-2"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
