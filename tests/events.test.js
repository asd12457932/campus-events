import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../server/app.js';
import { createMemoryStore } from '../server/store.js';

// 每個測試都用一份全新的記憶體資料，不會動到 server/data/events.json。
const fixture = [
  { id: 1, title: '講座', date: '2026-11-20', location: 'A101', registrations: [] },
  {
    id: 2,
    title: '分享會',
    date: '2026-12-02',
    location: 'B201',
    registrations: [{ name: '王小明', studentId: '410000001', email: 'a@example.edu' }],
  },
];

let app;
beforeEach(() => {
  app = createApp(createMemoryStore(fixture));
});

const student = { name: '陳同學', studentId: '410000009', email: 'c@example.edu' };

describe('GET /api/events', () => {
  it('lists events with registration counts but no personal data', async () => {
    const res = await request(app).get('/api/events');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[1].registeredCount).toBe(1);
    expect(res.body[1].registrations).toBeUndefined();
  });

  it('returns 404 for an unknown event', async () => {
    const res = await request(app).get('/api/events/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Event not found' });
  });
});

describe('POST /api/events/:id/register', () => {
  it('registers a student', async () => {
    const res = await request(app).post('/api/events/1/register').send(student);
    expect(res.status).toBe(201);
    expect(res.body.registeredCount).toBe(1);
  });

  it('rejects missing fields with 400', async () => {
    const res = await request(app).post('/api/events/1/register').send({ name: '陳同學' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTypeOf('string');
  });

  it('rejects duplicate registration with 409', async () => {
    const res = await request(app)
      .post('/api/events/2/register')
      .send({ name: '王小明', studentId: '410000001', email: 'a@example.edu' });
    expect(res.status).toBe(409);
  });
});
