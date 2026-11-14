import fs from 'node:fs';

// 資料存取層。正式執行用檔案，測試用記憶體，兩者介面相同：load() / save(events)。

export function createFileStore(file) {
  return {
    load: () => JSON.parse(fs.readFileSync(file, 'utf8')),
    save: (events) => fs.writeFileSync(file, JSON.stringify(events, null, 2) + '\n'),
  };
}

export function createMemoryStore(initial) {
  let data = structuredClone(initial);
  return {
    load: () => structuredClone(data),
    save: (events) => {
      data = structuredClone(events);
    },
  };
}
