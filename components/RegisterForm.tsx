'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const empty = { name: '', studentId: '', email: '' };

export default function RegisterForm({ eventId, disabled = false }: { eventId: number; disabled?: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState('');

  const update = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(body.error ?? `Error ${res.status}`);
      return;
    }
    setMessage('OK');
    setForm(empty);
    router.refresh(); // 重新讀取伺服器資料，更新報名人數
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-1 rounded-card border border-line p-2">
      <p>報名</p>
      <label className="grid text-caption text-muted">
        姓名
        <input value={form.name} onChange={update('name')} className="rounded-control border border-line px-1 py-0.5 text-body" />
      </label>
      <label className="grid text-caption text-muted">
        學號
        <input value={form.studentId} onChange={update('studentId')} className="rounded-control border border-line px-1 py-0.5 text-body" />
      </label>
      <label className="grid text-caption text-muted">
        Email
        <input value={form.email} onChange={update('email')} className="rounded-control border border-line px-1 py-0.5 text-body" />
      </label>
      <button type="submit" disabled={disabled} className="rounded-control bg-primary px-2 py-0.5 text-body text-white disabled:bg-disabled disabled:text-muted">
        送出
      </button>
      {message && <p className="text-caption text-muted">{message}</p>}
    </form>
  );
}
