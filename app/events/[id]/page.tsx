import Link from 'next/link';
import { notFound } from 'next/navigation';
import CancelForm from '../../../components/CancelForm.tsx';
import RegisterForm from '../../../components/RegisterForm.tsx';
import StatusBadge from '../../../components/StatusBadge.tsx';
import { findEvent, toPublic } from '../../../lib/events.ts';
import { getStatus, seatsText } from '../../../lib/status.ts';
import { getStore } from '../../../lib/store.ts';

export const dynamic = 'force-dynamic';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findEvent(getStore().load(), id);
  if (!found) notFound();
  const event = toPublic(found);
  const status = getStatus(event);
  const full = status === 'full';

  return (
    <section className="flex flex-col gap-6 rounded-card border border-line bg-surface p-4 sm:p-6">
      <div>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-body text-primary hover:underline focus-visible:outline-3 focus-visible:outline-primary"
        >
          ← 回到活動列表
        </Link>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h1 className="text-heading font-bold">{event.title}</h1>
          <StatusBadge status={status} />
        </div>
        <dl className="mt-3 grid grid-cols-[4rem_1fr] gap-y-1 text-body">
          <dt className="text-muted">日期</dt>
          <dd>{event.date}</dd>
          <dt className="text-muted">地點</dt>
          <dd>{event.location}</dd>
          <dt className="text-muted">名額</dt>
          <dd className={full ? 'font-semibold text-danger' : 'font-semibold'}>{seatsText(event)}</dd>
        </dl>
      </div>

      {full ? (
        <p className="rounded-control bg-danger-soft p-4 text-body text-danger">
          這個活動已額滿，暫時無法報名。可以回到列表看看其他活動。
        </p>
      ) : (
        <RegisterForm eventId={event.id} />
      )}

      <details className="border-t border-line pt-4">
        <summary className="inline-flex min-h-11 cursor-pointer items-center text-body text-muted">
          已經報名但不能參加？取消報名
        </summary>
        <CancelForm eventId={event.id} />
      </details>
    </section>
  );
}
