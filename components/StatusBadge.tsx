import type { Status } from '../lib/status.ts';

// 狀態不只靠顏色：每個狀態都有符號和文字
const badge: Record<Status, { label: string; className: string }> = {
  open: { label: '● 可報名', className: 'bg-success-soft text-success' },
  few: { label: '! 即將額滿', className: 'bg-warning-soft text-warning' },
  full: { label: '✕ 已額滿', className: 'bg-danger-soft text-danger' },
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-caption font-semibold ${badge[status].className}`}>
      {badge[status].label}
    </span>
  );
}
