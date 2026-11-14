import type { Event, PublicEvent } from './types.ts';

export function findEvent(events: Event[], id: string | number): Event | undefined {
  return events.find((e) => e.id === Number(id));
}

// 對外只回傳活動資訊與報名人數，不回傳其他人的個資。
export function toPublic(event: Event): PublicEvent {
  const { registrations, capacity, ...info } = event;
  return {
    ...info,
    capacity: capacity ?? null,
    registeredCount: registrations.length,
    remainingSeats: capacity == null ? null : Math.max(capacity - registrations.length, 0),
  };
}

export function isFull(event: Event): boolean {
  return event.capacity != null && event.registrations.length >= event.capacity;
}

export function errorResponse(status: number, error: string): Response {
  return Response.json({ error }, { status });
}
