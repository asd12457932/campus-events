import { Router } from 'express';

// 對外只回傳活動資訊與報名人數，不回傳其他人的個資。
function toPublic(event) {
  const { registrations, ...info } = event;
  return { ...info, registeredCount: registrations.length };
}

export function eventsRouter(store) {
  const router = Router();

  function findEvent(events, id) {
    return events.find((e) => e.id === Number(id));
  }

  // GET /api/events — 活動列表
  router.get('/', (req, res) => {
    res.json(store.load().map(toPublic));
  });

  // GET /api/events/:id — 單一活動
  router.get('/:id', (req, res) => {
    const event = findEvent(store.load(), req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(toPublic(event));
  });

  // POST /api/events/:id/register — 報名
  router.post('/:id/register', (req, res) => {
    const events = store.load();
    const event = findEvent(events, req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const { name, studentId, email } = req.body ?? {};
    if (!name || !studentId || !email) {
      return res.status(400).json({ error: 'name, studentId and email are required' });
    }
    if (event.registrations.some((r) => r.studentId === studentId)) {
      return res.status(409).json({ error: 'Already registered' });
    }

    event.registrations.push({ name, studentId, email });
    store.save(events);
    res.status(201).json(toPublic(event));
  });

  return router;
}
