import { useState } from 'react';
import { register } from '../api.js';

const empty = { name: '', studentId: '', email: '' };

export default function RegisterForm({ eventId, onRegistered }) {
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState(null);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const event = await register(eventId, form);
      setMessage({ type: 'success', text: '報名成功！' });
      setForm(empty);
      onRegistered(event);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h3>報名</h3>
      <label>
        姓名
        <input value={form.name} onChange={update('name')} />
      </label>
      <label>
        學號
        <input value={form.studentId} onChange={update('studentId')} />
      </label>
      <label>
        Email
        <input value={form.email} onChange={update('email')} />
      </label>
      <button type="submit" className="primary">
        送出報名
      </button>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}
    </form>
  );
}
