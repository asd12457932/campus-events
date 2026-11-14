import Link from 'next/link';
import { notFound } from 'next/navigation';
import RegisterForm from '../../../components/RegisterForm.tsx';
import { findEvent, toPublic } from '../../../lib/events.ts';
import { getStore } from '../../../lib/store.ts';

export const dynamic = 'force-dynamic';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findEvent(getStore().load(), id);
  if (!found) notFound();
  const event = toPublic(found);
  const full = event.remainingSeats === 0;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← 回到列表
      </Link>
      <h2 className="mt-3 text-xl font-semibold">{event.title}</h2>
      <p className="mt-2 text-slate-500">日期：{event.date}</p>
      <p className="text-slate-500">地點：{event.location}</p>
      <p className="text-slate-500">已報名 {event.registeredCount} 人</p>
      {event.capacity != null &&
        (full ? (
          <p className="mt-2 font-semibold text-red-600">已額滿</p>
        ) : (
          <p className="mt-2 text-slate-700">
            剩餘名額 {event.remainingSeats} / {event.capacity}
          </p>
        ))}
      <RegisterForm eventId={event.id} disabled={full} />
    </section>
  );
}
