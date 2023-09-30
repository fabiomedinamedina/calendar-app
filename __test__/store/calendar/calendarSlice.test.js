import {
  calendarSlice,
  clearMessage,
  onAddNewEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onMessage,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  calendarWithMessageState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("Pruebas en calendarSlice", () => {
  test("Debería regresar el estado por defecto", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent debería activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state).toEqual(calendarWithActiveEventState);
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debería agregar el nuevo evento", () => {
    const newEvent = {
      id: "4",
      start: new Date("2022-10-24 13:00:00"),
      end: new Date("2022-10-24 15:00:00"),
      title: "Cumpleaños de Fabio",
      notes: "De Verde",
      color: "green",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events.length).toBe(events.length + 1);
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent debería actualizar el evento", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2022-10-24 13:00:00"),
      end: new Date("2022-10-24 15:00:00"),
      title: "Cumpleaños de Fabio",
      notes: "De Verde",
      color: "green",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    expect(state.events.length).toBe(events.length);
    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent debería borrar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.events.length).toBe(events.length - 1);
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvents debería establecer los eventos", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.events.length).toBe(events.length);
    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBeFalsy();
  });

  test("onLoadEvents debería establecer los nuevos eventos", () => {
    const newEvent = {
      id: "4",
      start: new Date("2022-10-24 13:00:00"),
      end: new Date("2022-10-24 15:00:00"),
      title: "Cumpleaños de Fabio",
      notes: "De Verde",
      color: "green",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onLoadEvents([...events, newEvent])
    );
    expect(state.events.length).toBe(events.length + 1);
    expect(state.events).toEqual([...events, newEvent]);
    expect(state.isLoadingEvents).toBeFalsy();
  });

  test("onLogoutCalendar debe limpiar el estado", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });

  test("onClearActiveEvent debería limpiar el evento activo", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onClearActiveEvent()
    );
    expect(state.activeEvent).toBe(null);
  });

  test("onMessage debería establecer el mensaje", () => {
    const message = {
      title: "Creación de evento",
      msg: "Se ha actualizo",
      type: "success",
    };

    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onMessage(message)
    );
    expect(state.message).toEqual(message);
  });

  test("clearMessage debería limpiar el mensaje", () => {
    const state = calendarSlice.reducer(
      calendarWithMessageState,
      clearMessage()
    );
    expect(state.message).toBe(undefined);
  });
});
