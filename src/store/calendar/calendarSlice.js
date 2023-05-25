import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
  message: undefined
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
        if( event.id === payload.id ) return payload;
        return event;
      })
    },
    onDeleteEvent: ( state ) => {
      if( state.activeEvent ){
        state.events = state.events.filter( event => event.id !== state.activeEvent.id );
        state.activeEvent = null;
      }
    },
    onMessage: ( state, {payload} ) => {
      state.message = payload;
    },
    clearMessage: ( state ) => {
      state.message = undefined;
    },
    onLoadEvents: (state, {payload = []}) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach( event  => {
        const exists = state.events.some( dbEvent => dbEvent.id === event.id );
        if( !exists ){
          state.events.push( event );
        }
      })
      // state.events = payload
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents =  true;
      state.events = [];
      state.activeEvent = null;
      state.message = undefined;
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  onClearActiveEvent,
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onMessage,
  clearMessage,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;