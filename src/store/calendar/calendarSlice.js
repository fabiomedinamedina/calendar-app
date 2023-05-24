import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Cumpleaños de Fabio',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new Date(), 20 ),
  bgColor: '#EEE9FF',
  color: 'purple',
  user: {
    id: '123',
    name: 'Fabio Medina'
  }
}

const initialState = {
  events: [tempEvent],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onClearActiveEvent: ( state ) => {
      state.activeEvent = null;
    },
    onSetActiveEvent: ( state, { payload } ) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: ( state, { payload } ) => {
      state.events.push( payload );
      state.activeEvent = null;
    },
    onUpdateEvent: ( state, { payload } ) => {
      state.events = state.events.map( event => {
        if( event._id === payload._id ) return payload;
        return event;
      })
    },
    onDeleteEvent: ( state ) => {
      if( state.activeEvent ){
        state.events = state.events.filter( event => event._id !== state.activeEvent._id );
        state.activeEvent = null;
      }
    },
  }
});


// Action creators are generated for each case reducer function
export const {
  onClearActiveEvent,
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
} = calendarSlice.actions;