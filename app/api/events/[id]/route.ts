import { errorResponse, findEvent, toPublic } from '../../../../lib/events.ts';
import { getStore } from '../../../../lib/store.ts';

export const dynamic = 'force-dynamic';

type Context = { params: Promise<{ id: string }> };

// GET /api/events/:id — 單一活動
export async function GET(_req: Request, { params }: Context): Promise<Response> {
  const { id } = await params;
  const event = findEvent(getStore().load(), id);
  if (!event) return errorResponse(404, 'Event not found');
  return Response.json(toPublic(event));
}
