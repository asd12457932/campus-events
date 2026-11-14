import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';
import { createFileStore } from './store.js';

const dataFile = fileURLToPath(new URL('./data/events.json', import.meta.url));
const port = Number(process.env.PORT) || 3001;

createApp(createFileStore(dataFile)).listen(port, () => {
  console.log(`API server: http://localhost:${port}/api/events`);
});
