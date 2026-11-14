export type Registration = {
  name: string;
  studentId: string;
  email: string;
};

// 存在 data/events.json 的完整資料（含報名者個資）
export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  registrations: Registration[];
};

// 對外（API、頁面）公開的資料：只有報名人數，沒有個資
export type PublicEvent = Omit<Event, 'registrations'> & {
  registeredCount: number;
};
