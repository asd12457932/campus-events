import Link from 'next/link';
import { toPublic } from '../lib/events.ts';
import { getStore } from '../lib/store.ts';
import type { PublicEvent } from '../lib/types.ts';

// 每次請求都重新讀取資料，報名後列表才會更新
export const dynamic = 'force-dynamic';

type Status = 'open' | 'few' | 'full';

// 剩 5 個名額以內算「即將額滿」；不限名額的活動一律可報名
function getStatus(event: PublicEvent): Status {
  if (event.remainingSeats === null) return 'open';
  if (event.remainingSeats === 0) return 'full';
  return event.remainingSeats <= 5 ? 'few' : 'open';
}

const badge: Record<Status, { label: string; className: string }> = {
  open: { label: '● 可報名', className: 'bg-success-soft text-success' },
  few: { label: '! 即將額滿', className: 'bg-warning-soft text-warning' },
  full: { label: '✕ 已額滿', className: 'bg-danger-soft text-danger' },
};

function seatsText(event: PublicEvent): string {
  if (event.remainingSeats === null) return '不限名額';
  if (event.remainingSeats === 0) return `名額 ${event.capacity} 人已滿`;
  return `剩 ${event.remainingSeats} 個名額`;
}

export default function EventListPage() {
  const events = getStore().load().map(toPublic);

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {events.map((event) => {
        const status = getStatus(event);
        return (
          <li key={event.id} className="flex flex-col gap-2 rounded-card border border-line bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-title font-bold text-text">{event.title}</h2>
              <span className={`shrink-0 rounded-full px-3 py-1 text-caption font-semibold ${badge[status].className}`}>
                {badge[status].label}
              </span>
            </div>
            <p className="text-caption text-muted">
              {event.date} · {event.location}
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className={`text-caption font-semibold ${status === 'full' ? 'text-danger' : 'text-text'}`}>
                {seatsText(event)}
              </span>
              <Link
                href={`/events/${event.id}`}
                className={`inline-flex min-h-11 items-center rounded-control px-4 text-body font-semibold ${
                  status === 'full' ? 'bg-disabled text-muted' : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                {status === 'full' ? '查看詳情' : '立即報名'}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
