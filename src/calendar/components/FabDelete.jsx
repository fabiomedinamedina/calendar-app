import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleClickDelete = () => {
    startDeletingEvent();
  }

  return (
    <button
      className="btn btn-warning fab fab-delete"
      onClick={ handleClickDelete }
      style={{
        opacity: (hasEventSelected) ? 1 : 0 ,
        visibility: (hasEventSelected) ? 'visible' : 'hidden'
      }}
    >
      <i className="fas fa-trash text-white" ></i>
    </button>
  );
};
