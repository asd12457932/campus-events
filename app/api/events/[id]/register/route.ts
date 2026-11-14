import { errorResponse, findEvent, toPublic } from '../../../../../lib/events.ts';
import { getStore } from '../../../../../lib/store.ts';

type Context = { params: Promise<{ id: string }> };

// POST /api/events/:id/register — 報名
export async function POST(req: Request, { params }: Context): Promise<Response> {
  const { id } = await params;
  const store = getStore();
  const events = store.load();
  const event = findEvent(events, id);
  if (!event) return errorResponse(404, 'Event not found');

  const body = await req.json().catch(() => ({}));
  const { name, studentId, email } = body ?? {};
  if (!name || !studentId || !email) {
    return errorResponse(400, 'name, studentId and email are required');
  }
  if (event.registrations.some((r) => r.studentId === studentId)) {
    return errorResponse(409, 'Already registered');
  }

  event.registrations.push({ name, studentId, email });
  store.save(events);
  return Response.json(toPublic(event), { status: 201 });
}
