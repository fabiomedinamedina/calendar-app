import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar, FooterCalendar, CalendarEvent, CalendarModal } from '../components';
import { localizer, getMessagesES } from '../../helpers';
import { addHours } from 'date-fns';
import { useState } from 'react';


const events = [
  {
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours( new Date(), 20 ),
    bgColor: '#EEE9FF',
    color: '#7751D9',
    user: {
      id: '123',
      name: 'Fabio Medina'
    }
  }
]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('viewCalendar') || 'week' );
  

  const getStyleEvent = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.bgColor,
      color: event.color,
      borderRadius: '7px',
      border: '0',
    }

    return {style}
  }

  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event });
  }

  const onSelect = ( event ) => {
    console.log({ click: event });
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('viewCalendar', event);
  }

  return (
    <>
      <NavBar />
      <div className="row m-4 container-calendar">
        <div className="col-12 bg-white shadow-sm p-4 p-md-5 rounded-3">
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
        </div>
      </div>
      <FooterCalendar />
    </>
  );
};
