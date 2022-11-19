const getOnlyCurrentEvents = (events) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return events.filter((event) => !event.isCanceled && event.date >= weekAgo);
};

function LastWeekActiveEventsList() {
  const { events } = useEvents();

  return (
    <ul>
      {getOnlyCurrentEvents(events).map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}
