'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type Message = { type: 'success' | 'error'; text: string };

export default function CancelForm({ eventId }: { eventId: number }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState<Message | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/events/${eventId}/registrations/${encodeURIComponent(studentId)}`, {
      method: 'DELETE',
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage({ type: 'error', text: body.error ?? `取消失敗（${res.status}）` });
      return;
    }
    setMessage({ type: 'success', text: '已取消報名' });
    setStudentId('');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-3 border-t border-slate-200 pt-5">
      <h3 className="font-semibold">取消報名</h3>
      <label className="grid gap-1 text-sm text-slate-600">
        學號
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900"
        />
      </label>
      <button
        type="submit"
        disabled={!studentId}
        className="rounded-lg border border-red-600 px-4 py-2 font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
      >
        取消報名
      </button>
      {message && <p className={message.type === 'error' ? 'text-red-600' : 'text-green-600'}>{message.text}</p>}
    </form>
  );
}
