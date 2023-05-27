export const events = [
  {
    id: '1',
    start: new Date('2022-10-21 13:00:00'),
    end: new Date('2022-10-21 15:00:00'),
    title: 'Cumpleaños de Pilar',
    notes: 'Comprar pudín',
    color: 'red',
  },
  {
    id: '2',
    start: new Date('2022-10-22 13:00:00'),
    end: new Date('2022-10-22 15:00:00'),
    title: 'Cumpleaños de Mariana',
    notes: 'De princisas',
    color: 'yellow',
  },
  {
    id: '3',
    start: new Date('2022-10-23 13:00:00'),
    end: new Date('2022-10-23 15:00:00'),
    title: 'Cumpleaños de Emilio',
    notes: 'De piratas',
    color: 'purple',
  }
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
  message: undefined
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: null,
  message: undefined
}

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: { ...events[0] },
  message: undefined
}

export const calendarWithMessageState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: { ...events[0] },
  message: {
    title: 'Error al actualizar',
    msg: 'No se ha podido actualizar',
    type: 'error'
  }
}


