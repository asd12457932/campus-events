// 前端呼叫後端 API 的唯一入口。失敗時丟出 Error，message 為後端回傳的 error 字串。

async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
  return body;
}

export const getEvents = () => request('/api/events');

export const getEvent = (id) => request(`/api/events/${id}`);

export const register = (id, data) =>
  request(`/api/events/${id}/register`, { method: 'POST', body: JSON.stringify(data) });
