import { errorResponse, findEvent, toPublic } from '../../../../../../lib/events.ts';
import { getStore } from '../../../../../../lib/store.ts';

type Context = { params: Promise<{ id: string; studentId: string }> };

// DELETE /api/events/:id/registrations/:studentId — 取消報名
export async function DELETE(_req: Request, { params }: Context): Promise<Response> {
  const { id, studentId } = await params;
  const store = getStore();
  const events = store.load();
  const event = findEvent(events, id);
  if (!event) return errorResponse(404, 'Event not found');

  const index = event.registrations.findIndex((r) => r.studentId === studentId);
  if (index === -1) return errorResponse(404, 'Registration not found');

  event.registrations.splice(index, 1);
  store.save(events);
  return Response.json(toPublic(event));
}
