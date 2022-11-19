function EventItem({ event }) {
  return (
    <li key={event.id}>
      <img src={event.image} />
      <p>{event.name}</p>
      <small>{event.date}</small>
    </li>
  );
}

function ActiveUsersList() {
  const { events } = useEvents();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return (
    <ul>
      {events
        .filter((event) => !event.isCanceled && event.date >= weekAgo)
        .map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
    </ul>
  );
}
