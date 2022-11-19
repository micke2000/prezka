const getOnlyCurrentEvents = (events) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const isNotCanceled = !event.isCanceled;
  const lessThanOneWeekOld = event.date >= weekAgo;
  const isCurrent = isNotCancelled && isNotCancelled;
  
  return events.filter((event) => isCurrent);
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
