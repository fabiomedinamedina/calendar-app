import { useEffect, useMemo, useState } from 'react';
import { differenceInMinutes } from 'date-fns';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import { useCalendarStore, useForm, useUiStore } from '../../hooks';

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
  start: '',
  end: '',
  color: 'green'
}

const formValidations = {
  title: [(value) => value.length >= 4 , 'Es obligatorio y debe tener más de 4 carácteres '],
  notes: [(value) => value.length >= 2 , 'Es obligatorio y debe tener más de 2 carácteres '],
}


export const CalendarModal = () => {
  
  const [formSubmited, setFormSubmited] = useState(false);
  const { isDateModalOpen, toggleDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, setClearActiveEvent } = useCalendarStore();

  const { 
    formState ,title, notes, start, end, color,
    isFormValid, titleValid, notesValid, colorValid,
    onInputChange, onDateChange, setFormState, onResetForm
  } = useForm( formData, formValidations );

  const endClass = useMemo( () => {
    if( !formSubmited ) return '';

    const difference = differenceInMinutes( end, start );
    const validationDate = {
      class: '',
      message: 'La fecha fin debe ser mayor a la de inicio'
    };
    if( isNaN( difference ) || difference <= 15 ){
      validationDate.class = 'is-invalid';
    }else{
      validationDate.class = 'is-valid';
    }
    
    return validationDate;

  }, [start, end, formSubmited ]);

  useEffect(() => {
    if( activeEvent !== null ){
      setFormState( { ...activeEvent } );
    }
  
  }, [ activeEvent ]);
  
  const handleCloseModal = () => {
    toggleDateModal();
    setFormSubmited(false);
    setClearActiveEvent();
  }

  const onSubmitForm = async ( event ) => {

    event.preventDefault(); 
    setFormSubmited(true);
    if( !isFormValid ) return;
    if( endClass?.class === "is-invalid" ) return;

    await startSavingEvent( formState );
    toggleDateModal();
    setFormSubmited(false);
    setClearActiveEvent();

  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={handleCloseModal}
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
          value={ color }
          onChange={ onInputChange }
          name="color"
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
