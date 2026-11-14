import express from 'express';
import { eventsRouter } from './routes/events.js';

export function createApp(store) {
  const app = express();
  app.use(express.json());
  app.use('/api/events', eventsRouter(store));

  // 未預期的錯誤：不把 stack trace 回給使用者
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
