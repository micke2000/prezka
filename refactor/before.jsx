function LastWeekActiveEventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const response = await fetch("/some-event-api");
      const data = await response.json();
      setEvents(data);
    };
    loadEvents();
  }, []);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return (
    <ul>
      {events
        .filter((event) => !event.isCanceled && event.date >= weekAgo)
        .map((event) => (
          <li key={event.id}>
            <img src={event.image} />
            <p>{event.name}</p>
            <small>{event.date}</small>
          </li>
        ))}
    </ul>
  );
}
