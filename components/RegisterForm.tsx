'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Field from './Field.tsx';

const empty = { name: '', studentId: '', email: '' };
type Form = typeof empty;
type Errors = Partial<Record<keyof Form, string>>;
type Message = { type: 'success' | 'error'; text: string };

// 送出前先在畫面上檢查，錯誤直接標在欄位旁
function validate(form: Form): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = '請填寫姓名';
  if (!/^\d{9}$/.test(form.studentId.trim())) errors.studentId = '學號是 9 位數字';
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Email 格式不正確，例如 name@school.edu';
  return errors;
}

// API 回傳的英文錯誤，翻成使用者看得懂、知道下一步的話
function apiErrorText(status: number, error?: string): string {
  if (error === 'Event is full') return '這個活動剛額滿，可以回到列表看看其他活動。';
  if (error === 'Already registered') return '這個學號已經報名過了，不用再報一次。';
  if (status === 404) return '找不到這個活動，可能已經下架。';
  return '沒有送出成功，請再試一次。';
}

export default function RegisterForm({ eventId }: { eventId: number }) {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const update = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setMessage(null);

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          studentId: form.studentId.trim(),
          email: form.email.trim(),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ type: 'error', text: apiErrorText(res.status, body.error) });
        return;
      }
      setMessage({ type: 'success', text: '報名成功！名額已經保留給你。' });
      setForm(empty);
      router.refresh(); // 重新讀取伺服器資料，更新剩餘名額
    } catch {
      setMessage({ type: 'error', text: '網路好像斷了，沒有送出成功，請再試一次。' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <h2 className="text-title font-bold">報名這個活動</h2>
      <Field id="name" label="姓名" autoComplete="name" value={form.name} onChange={update('name')} error={errors.name} />
      <Field
        id="studentId"
        label="學號"
        inputMode="numeric"
        hint="9 位數字"
        value={form.studentId}
        onChange={update('studentId')}
        error={errors.studentId}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={update('email')}
        error={errors.email}
      />
      <button
        type="submit"
        disabled={submitting}
        className="min-h-12 rounded-control bg-primary px-4 text-body font-semibold text-white hover:bg-primary-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:bg-disabled disabled:text-muted"
      >
        {submitting ? '送出中…' : '送出報名'}
      </button>
      <div role="status" aria-live="polite">
        {message && (
          <p
            className={`rounded-control p-3 text-body ${
              message.type === 'error' ? 'bg-danger-soft text-danger' : 'bg-success-soft text-success'
            }`}
          >
            {message.type === 'error' ? '✕ ' : '✓ '}
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
