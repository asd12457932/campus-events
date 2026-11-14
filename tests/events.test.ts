import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore, setStore } from '../lib/store.ts';
import type { Event } from '../lib/types.ts';
import { GET as listEvents } from '../app/api/events/route.ts';
import { GET as getEvent } from '../app/api/events/[id]/route.ts';
import { POST as register } from '../app/api/events/[id]/register/route.ts';

// 每個測試都用一份全新的記憶體資料，不會動到 data/events.json。
const fixture: Event[] = [
  { id: 1, title: '講座', date: '2026-11-20', location: 'A101', registrations: [] },
  {
    id: 2,
    title: '分享會',
    date: '2026-12-02',
    location: 'B201',
    registrations: [{ name: '王小明', studentId: '410000001', email: 'a@example.edu' }],
  },
];

beforeEach(() => {
  setStore(createMemoryStore(fixture));
});

// 呼叫 route handler 的小工具
const ctx = (id: number | string) => ({ params: Promise.resolve({ id: String(id) }) });
const post = (body: unknown) =>
  new Request('http://localhost/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

const student = { name: '陳同學', studentId: '410000009', email: 'c@example.edu' };

describe('GET /api/events', () => {
  it('lists events with registration counts but no personal data', async () => {
    const res = listEvents();
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.length, 2);
    assert.equal(body[1].registeredCount, 1);
    assert.equal(body[1].registrations, undefined);
  });

  it('returns 404 for an unknown event', async () => {
    const res = await getEvent(new Request('http://localhost/api'), ctx(999));
    assert.equal(res.status, 404);
    assert.deepEqual(await res.json(), { error: 'Event not found' });
  });
});

describe('POST /api/events/:id/register', () => {
  it('registers a student', async () => {
    const res = await register(post(student), ctx(1));
    assert.equal(res.status, 201);
    assert.equal((await res.json()).registeredCount, 1);
  });

  it('rejects missing fields with 400', async () => {
    const res = await register(post({ name: '陳同學' }), ctx(1));
    assert.equal(res.status, 400);
    assert.equal(typeof (await res.json()).error, 'string');
  });

  it('rejects duplicate registration with 409', async () => {
    const res = await register(post({ name: '王小明', studentId: '410000001', email: 'a@example.edu' }), ctx(2));
    assert.equal(res.status, 409);
  });
});
