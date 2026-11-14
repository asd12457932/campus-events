import Link from 'next/link';
import { toPublic } from '../lib/events.ts';
import { getStore } from '../lib/store.ts';

// 每次請求都重新讀取資料，報名後列表才會更新
export const dynamic = 'force-dynamic';

export default function EventListPage() {
  const events = getStore().load().map(toPublic);

  return (
    <ul className="grid gap-4">
      {events.map((event) => (
        <li key={event.id}>
          <Link
            href={`/events/${event.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-500"
          >
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {event.date} · {event.location}
            </p>
            <p className="mt-1 text-sm text-slate-500">已報名 {event.registeredCount} 人</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
