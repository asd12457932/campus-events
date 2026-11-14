import { useEffect, useState } from 'react';
import { getEvents } from '../api.js';

export default function EventList({ onSelect }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getEvents().then(setEvents).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="message error">{error}</p>;

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id} className="card" onClick={() => onSelect(event.id)}>
          <h2>{event.title}</h2>
          <p className="meta">
            {event.date} · {event.location}
          </p>
          <p className="meta">已報名 {event.registeredCount} 人</p>
        </li>
      ))}
    </ul>
  );
}
