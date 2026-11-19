'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Field from './Field.tsx';

type Message = { type: 'success' | 'error'; text: string };

export default function CancelForm({ eventId }: { eventId: number }) {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setMessage(null);
    if (!/^\d{9}$/.test(studentId.trim())) {
      setError('學號是 9 位數字');
      return;
    }
    setError(undefined);

    setSubmitting(true);
    try {
      const res = await fetch(`/api/events/${eventId}/registrations/${encodeURIComponent(studentId.trim())}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        setMessage({
          type: 'error',
          text: res.status === 404 ? '找不到這個學號的報名紀錄。' : '沒有取消成功，請再試一次。',
        });
        return;
      }
      setMessage({ type: 'success', text: '已取消報名，名額已釋出給其他同學。' });
      setStudentId('');
      router.refresh();
    } catch {
      setMessage({ type: 'error', text: '網路好像斷了，沒有取消成功，請再試一次。' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-3 grid gap-3">
      <Field
        id="cancel-studentId"
        label="報名時填的學號"
        inputMode="numeric"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        error={error}
      />
      <button
        type="submit"
        disabled={submitting}
        className="min-h-11 rounded-control border border-danger px-4 text-body font-semibold text-danger hover:bg-danger-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-danger disabled:cursor-wait disabled:border-line disabled:text-muted"
      >
        {submitting ? '取消中…' : '確認取消報名'}
      </button>
      <div role="status" aria-live="polite">
        {message && (
          <p
            className={`rounded-control p-3 text-body ${
              message.type === 'error' ? 'bg-danger-soft text-danger' : 'bg-success-soft text-success'
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
