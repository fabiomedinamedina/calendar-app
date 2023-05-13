import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {

  const DataEmpty = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 20 ),
    bgColor: '#EEE9FF',
    color: 'red',
    user: {
      id: '123',
      name: 'Fabio Medina'
    }
}

  const { toggleDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent( DataEmpty );
    toggleDateModal();
  }

  return (
    <button
      className="btn btn-primary fab fab-add"
      onClick={ handleClickNew }
    >
      <i className="fas fa-plus" ></i>
    </button>
  );
};
