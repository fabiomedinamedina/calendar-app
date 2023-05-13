import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onClearActiveEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar';

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector( state => state.calendar );
  const dispatch = useDispatch();

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) )
  }

  const setClearActiveEvent = () => {
    dispatch( onClearActiveEvent() );
  }

  const startSavingEvent = async( calendarEvent ) => {
    // TODO: llegar al backend y recibir información

    if( calendarEvent._id ){
      dispatch( onUpdateEvent( { ...calendarEvent } ));
    }else{
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
    }
  }

  const startDeletingEvent = () => {
    dispatch( onDeleteEvent() );
  }
  
  

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    setClearActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
  
}