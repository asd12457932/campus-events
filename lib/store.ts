import fs from 'node:fs';
import path from 'node:path';
import type { Event } from './types.ts';

// 資料存取層。正式執行讀寫 data/events.json；測試改用記憶體，不會動到檔案。
export type Store = {
  load(): Event[];
  save(events: Event[]): void;
};

export function createFileStore(file: string): Store {
  return {
    load: () => JSON.parse(fs.readFileSync(file, 'utf8')) as Event[],
    save: (events) => fs.writeFileSync(file, JSON.stringify(events, null, 2) + '\n'),
  };
}

export function createMemoryStore(initial: Event[]): Store {
  let data = structuredClone(initial);
  return {
    load: () => structuredClone(data),
    save: (events) => {
      data = structuredClone(events);
    },
  };
}

let current: Store = createFileStore(path.join(process.cwd(), 'data', 'events.json'));

export function getStore(): Store {
  return current;
}

// 只給測試用：換成記憶體資料
export function setStore(store: Store): void {
  current = store;
}
