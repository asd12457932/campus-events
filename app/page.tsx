import EventCard from '../components/EventCard.tsx';
import { toPublic } from '../lib/events.ts';
import { getStore } from '../lib/store.ts';

// 每次請求都重新讀取資料，報名後列表才會更新
export const dynamic = 'force-dynamic';

export default function EventListPage() {
  const events = getStore().load().map(toPublic);

  return (
    <>
      <h1 className="mb-4 text-heading font-bold">近期活動</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </>
  );
}
