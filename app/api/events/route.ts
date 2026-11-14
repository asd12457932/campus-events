import { toPublic } from '../../../lib/events.ts';
import { getStore } from '../../../lib/store.ts';

export const dynamic = 'force-dynamic';

// GET /api/events — 活動列表
export function GET(): Response {
  return Response.json(getStore().load().map(toPublic));
}
