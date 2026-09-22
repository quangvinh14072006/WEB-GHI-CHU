import { Routes, Route, Link } from 'react-router-dom';
import Notes from './Notes';
import PrivateNotes from './PrivateNotes';
import Settings from './Settings';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Navigation */}
      <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc', minHeight: '100vh' }}>
        <h3>Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/">Ghi chú</Link></li>
          <li><Link to="/private">Vùng kín</Link></li>
          <li><Link to="/settings">Cài đặt</Link></li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/private" element={<PrivateNotes />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;