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
    <form onSubmit={handleSubmit} className="grid gap-1 rounded border border-[#E5E7EB] p-2">
      <p>報名</p>
      <label className="grid text-xs text-[#9CA3AF]">
        姓名
        <input value={form.name} onChange={update('name')} className="rounded-sm border border-[#E5E7EB] px-1 py-0.5 text-xs" />
      </label>
      <label className="grid text-xs text-[#9CA3AF]">
        學號
        <input value={form.studentId} onChange={update('studentId')} className="rounded-sm border border-[#E5E7EB] px-1 py-0.5 text-xs" />
      </label>
      <label className="grid text-xs text-[#9CA3AF]">
        Email
        <input value={form.email} onChange={update('email')} className="rounded-sm border border-[#E5E7EB] px-1 py-0.5 text-xs" />
      </label>
      <button type="submit" disabled={disabled} className="rounded-sm bg-[#2563EB] px-2 py-0.5 text-xs text-white disabled:bg-[#D1D5DB]">
        送出
      </button>
      {message && <p className="text-xs text-[#9CA3AF]">{message}</p>}
    </form>
  );
}
