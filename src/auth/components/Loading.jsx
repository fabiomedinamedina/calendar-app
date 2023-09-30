import logoCalendar from '../../assets/logo-calendar-app.svg';


export const Loading = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="spinner-content d-flex align-items-center flex-column">
        <img src={ logoCalendar } alt="Logo Calendar App" width={200} className='mb-3'/>
        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}></div>
        <strong className='mt-1'>Cargando...</strong>
      </div>
    </div>
  );
};
