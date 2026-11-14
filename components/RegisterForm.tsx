'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const empty = { name: '', studentId: '', email: '' };

type Message = { type: 'success' | 'error'; text: string };

export default function RegisterForm({ eventId }: { eventId: number }) {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState<Message | null>(null);

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
      setMessage({ type: 'error', text: body.error ?? `報名失敗（${res.status}）` });
      return;
    }
    setMessage({ type: 'success', text: '報名成功！' });
    setForm(empty);
    router.refresh(); // 重新讀取伺服器資料，更新報名人數
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3 border-t border-slate-200 pt-5">
      <h3 className="font-semibold">報名</h3>
      <label className="grid gap-1 text-sm text-slate-600">
        姓名
        <input value={form.name} onChange={update('name')} className="rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900" />
      </label>
      <label className="grid gap-1 text-sm text-slate-600">
        學號
        <input value={form.studentId} onChange={update('studentId')} className="rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900" />
      </label>
      <label className="grid gap-1 text-sm text-slate-600">
        Email
        <input value={form.email} onChange={update('email')} className="rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900" />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        送出報名
      </button>
      {message && <p className={message.type === 'error' ? 'text-red-600' : 'text-green-600'}>{message.text}</p>}
    </form>
  );
}
