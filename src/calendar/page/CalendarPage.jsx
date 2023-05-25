import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';

import { NavBar, FooterCalendar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../components';
import { localizer, getMessagesES, getColors } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import Swal from 'sweetalert2';

export const CalendarPage = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('viewCalendar') || 'week' );
  const { events, message, isLoadingEvents , setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { toggleDateModal } = useUiStore();

  useEffect(() => {
    if( message !== undefined ){
      Swal.fire( message.title, message.msg, message.type );
    }
  }, [message]);
  

  const getStyleEvent = (event, start, end, isSelected) => {
    const { bgColor, color } = getColors( event.color );
    const style = {
      backgroundColor: bgColor,
      color: color,
      borderRadius: '7px',
      border: '0',
    }

    return {style}
  }

  const onDoubleClick = ( event ) => {
    toggleDateModal();
    // console.log({ doubleClick: event });
  }

  const onSelect = ( event ) => {
    // console.log(event);
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('viewCalendar', event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);
  

  return (
    <>
      <NavBar />
      <div className="row m-4 container-calendar">
        <div className="col-12 bg-white shadow-sm p-4 p-md-5 rounded-3">
          {
            isLoadingEvents
            ? (
              <div className='position-absolute top-50 start-50 translate-middle'>
                <div className="spinner-border text-primary "  role="status" style={{width: '3rem', height: '3rem'}}></div>
              </div>
            )
            : 
            <>
              <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', maxHeight: 'calc(100vh - 290px)' }}
                messages={ getMessagesES() }
                eventPropGetter={ getStyleEvent }
                components={{
                  event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }

                />
                <CalendarModal />
            </>
          }
        </div>
      </div>
      <FabAddNew />
      <FabDelete />
      <FooterCalendar />
    </>
  );
};
