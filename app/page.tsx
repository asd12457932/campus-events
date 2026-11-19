import Link from 'next/link';
import { toPublic } from '../lib/events.ts';
import { getStore } from '../lib/store.ts';

// 每次請求都重新讀取資料，報名後列表才會更新
export const dynamic = 'force-dynamic';

export default function EventListPage() {
  const events = getStore().load().map(toPublic);

  return (
    <ul className="grid grid-cols-2 gap-2">
      {events.map((event, i) => (
        <li key={event.id} className="rounded border border-[#E5E7EB] bg-white p-2 text-sm">
          <p>{event.title}</p>
          <p>{event.date}</p>
          <p className="text-[#9CA3AF]">{event.location}</p>
          <Link
            href={`/events/${event.id}`}
            className={`mt-1 inline-block rounded-sm px-1.5 text-xs text-white ${
              i % 3 === 0 ? 'bg-[#3B82F6]' : i % 3 === 1 ? 'bg-[#2563EB]' : 'bg-[#1D4ED8]'
            }`}
          >
            查看
          </Link>
        </li>
      ))}
    </ul>
  );
}
