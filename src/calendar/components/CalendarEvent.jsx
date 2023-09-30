export const CalendarEvent = (props  ) => {
  const { title, description, user } = props.event;

  return (
    <>
      <strong>{ title }</strong><br/>
      <small>{ user.name }</small>
    </>
  );
};
