import Link from 'next/link';
import { notFound } from 'next/navigation';
import CancelForm from '../../../components/CancelForm.tsx';
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
    <section className="rounded-card border border-line bg-surface p-4 text-body">
      <Link href="/" className="text-caption text-primary">
        ← 回到列表
      </Link>
      <h1 className="mt-2 text-title font-bold">{event.title}</h1>
      <p className="text-muted">日期：{event.date}</p>
      <p className="text-muted">地點：{event.location}</p>
      <p className="text-muted">
        名額：{event.registeredCount} / {event.capacity ?? '不限'}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <RegisterForm eventId={event.id} disabled={full} />
        <CancelForm eventId={event.id} />
      </div>
    </section>
  );
}
