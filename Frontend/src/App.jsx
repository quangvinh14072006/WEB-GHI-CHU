import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Settings from "./Setings";
import Notes from './Notes';
import PrivateNotes from './PrivateNotes';

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar điều hướng */}
      <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '15px' }}>
        <h3>Menu</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/"> 📝 Ghi chú</Link>
          <Link to="/private"> Vùng kín</Link>
          <Link to="/settings"> Cài đặt</Link>
        </nav>
      </div>

      {/* Nội dung trang */}
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