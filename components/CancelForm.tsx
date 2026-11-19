'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CancelForm({ eventId }: { eventId: number }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/events/${eventId}/registrations/${encodeURIComponent(studentId)}`, {
      method: 'DELETE',
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(body.error ?? `Error ${res.status}`);
      return;
    }
    setMessage('OK');
    setStudentId('');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-1 rounded border border-[#E5E7EB] p-2">
      <p>取消報名</p>
      <label className="grid text-xs text-[#9CA3AF]">
        學號
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="rounded-sm border border-[#E5E7EB] px-1 py-0.5 text-xs"
        />
      </label>
      <button type="submit" className="rounded-sm bg-[#3B82F6] px-2 py-0.5 text-xs text-white">
        送出
      </button>
      {message && <p className="text-xs text-[#9CA3AF]">{message}</p>}
    </form>
  );
}
