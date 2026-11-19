import Link from 'next/link';
import { getStatus, seatsText } from '../lib/status.ts';
import type { PublicEvent } from '../lib/types.ts';
import StatusBadge from './StatusBadge.tsx';

// 整張卡片就是一個連結：手指點哪裡都可以，Tab 也只要按一次
export default function EventCard({ event }: { event: PublicEvent }) {
  const status = getStatus(event);
  const full = status === 'full';

  return (
    <Link
      href={`/events/${event.id}`}
      className="flex h-full flex-col gap-2 rounded-card border border-line bg-surface p-4 transition hover:border-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-title font-bold text-text">{event.title}</h2>
        <StatusBadge status={status} />
      </div>
      <p className="text-caption text-muted">
        {event.date} · {event.location}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <span className={`text-caption font-semibold ${full ? 'text-danger' : 'text-text'}`}>{seatsText(event)}</span>
        <span
          aria-hidden="true"
          className={`inline-flex min-h-11 items-center rounded-control px-4 text-body font-semibold ${
            full ? 'bg-disabled text-muted' : 'bg-primary text-white'
          }`}
        >
          {full ? '查看詳情' : '立即報名'}
        </span>
      </div>
    </Link>
  );
}
