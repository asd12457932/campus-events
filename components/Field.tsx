import type { InputHTMLAttributes } from 'react';

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

// 一個輸入欄位：label、提示、錯誤訊息都綁在同一個 input 上，錯誤就出現在欄位旁邊
export default function Field({ id, label, hint, error, ...input }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-caption font-semibold text-text">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={`min-h-11 rounded-control border bg-surface px-3 text-body text-text focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-primary ${
          error ? 'border-danger' : 'border-line'
        }`}
        {...input}
      />
      {hint && !error && (
        <p id={hintId} className="text-caption text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption font-semibold text-danger">
          ✕ {error}
        </p>
      )}
    </div>
  );
}
