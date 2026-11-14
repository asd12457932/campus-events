import { useState } from 'react';
import EventList from './pages/EventList.jsx';
import EventDetail from './pages/EventDetail.jsx';

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={() => setSelectedId(null)}>校園活動報名</h1>
      </header>
      <main>
        {selectedId == null ? (
          <EventList onSelect={setSelectedId} />
        ) : (
          <EventDetail id={selectedId} onBack={() => setSelectedId(null)} />
        )}
      </main>
    </div>
  );
}
