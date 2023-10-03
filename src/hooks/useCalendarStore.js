import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, onAddNewEvent, onClearActiveEvent, onDeleteEvent, onLoadEvents, onMessage, onSetActiveEvent, onUpdateEvent } from '../store/calendar';
import { calendarApi } from '../api';
import { convertEventsToDateEvent } from '../helpers';

export const useCalendarStore = () => {

  const { events, activeEvent, message, isLoadingEvents } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const startLoadingEvents = async() => {
    try {
      
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvent( data.events );
      dispatch( onLoadEvents( events ) );

    } catch (error) {
      console.log(error);
      dispatch( onMessage({
        title: 'Carga de eventos',
        msg: 'No se han podido cargar los eventos correctamente, actualiza la página',
        type: 'error'
      }));
      setTimeout(() => {
        dispatch( clearMessage() );
      }, 30);
    }
  }

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) )
  }

  const setClearActiveEvent = () => {
    dispatch( onClearActiveEvent() );
  }

  const startSavingEvent = async( calendarEvent ) => {

    try {

      if( calendarEvent.id ){

        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent );
        dispatch( onUpdateEvent( { ...calendarEvent, user } ));
        dispatch( onMessage({
          title: 'Actualización de evento',
          msg: 'El evento se ha actualizado exitosamente',
          type: 'success'
        }));
        setTimeout(() => {
          dispatch( clearMessage() );
        }, 30);
        return;
  
      }
  
      // CREACIÓN
  
      const { data } = await calendarApi.post('/events/new', calendarEvent);
      // console.log(data);
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
      dispatch( onMessage({
        title: 'Creación de evento',
        msg: 'El evento se ha creado exitosamente',
        type: 'success'
      }));
      setTimeout(() => {
        dispatch( clearMessage() );
      }, 30);
      
      
    } catch (error) {
      dispatch( onMessage({
        title: 'Error en evento',
        msg: error.response?.data?.msg,
        type: 'error'
      }));
      setTimeout(() => {
        dispatch( clearMessage() );
      }, 30);
    }
  }

  const startDeletingEvent = async() => {

    try {

      await calendarApi.delete(`/events/${activeEvent.id}` );
      dispatch( onDeleteEvent() );
      dispatch( onMessage({
        title: 'Eliminación de evento',
        msg: 'El evento se ha eliminado exitosamente',
        type: 'success'
      }));
      setTimeout(() => {
        dispatch( clearMessage() );
      }, 30);

    } catch (error) {
      dispatch( onMessage({
        title: 'Eliminación de evento',
        msg: error.response.data?.msg,
        type: 'error'
      }));

      setTimeout(() => {
        dispatch( clearMessage() );
      }, 30);
    }
  }
  
  

  return {
    //* Properties
    events,
    activeEvent,
    message,
    isLoadingEvents,
    hasEventSelected: !!activeEvent,

    //* Methods
    startLoadingEvents,
    setActiveEvent,
    setClearActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
  
}