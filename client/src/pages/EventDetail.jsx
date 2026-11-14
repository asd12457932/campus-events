import { useEffect, useState } from 'react';
import { getEvent } from '../api.js';
import RegisterForm from './RegisterForm.jsx';

export default function EventDetail({ id, onBack }) {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getEvent(id).then(setEvent).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="message error">{error}</p>;
  if (!event) return <p className="meta">載入中…</p>;

  return (
    <section className="card detail">
      <button className="link" onClick={onBack}>
        ← 回到列表
      </button>
      <h2>{event.title}</h2>
      <p className="meta">日期：{event.date}</p>
      <p className="meta">地點：{event.location}</p>
      <p className="meta">已報名 {event.registeredCount} 人</p>
      <RegisterForm eventId={event.id} onRegistered={setEvent} />
    </section>
  );
}
