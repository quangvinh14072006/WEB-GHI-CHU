import { useState, useEffect } from 'react';

function PrivateNotes() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Xử lý mở khóa
  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === '123456') { // Mật khẩu mặc định là 123456
      setIsUnlocked(true);
    } else {
      alert('Mật khẩu không đúng! (Gợi ý: 123456)');
    }
  };

  // Tải danh sách ghi chú riêng tư khi đã mở khóa
  useEffect(() => {
    if (isUnlocked) {
      fetch('http://localhost:5000/api/private-notes')
        .then((res) => res.json())
        .then((data) => setNotes(Array.isArray(data) ? data : []))
        .catch((err) => console.error(err));
    }
  }, [isUnlocked]);

  // Thêm ghi chú riêng tư mới
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNote = { title, content };
    fetch('http://localhost:5000/api/private-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes([...notes, data]);
        setTitle('');
        setContent('');
      })
      .catch((err) => console.error(err));
  };

  // 1. Màn hình khóa khi chưa đăng nhập
  if (!isUnlocked) {
    return (
      <div className="card" style={{ maxWidth: '400px', margin: '60px auto', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '12px', fontSize: '20px', color: '#1e1b4b' }}>🔒 Vùng Kín Bảo Mật</h2>
        <p style={{ marginBottom: '20px', color: '#64748b', fontSize: '14px' }}>
          Vui lòng nhập mật khẩu để truy cập
        </p>
        <form onSubmit={handleUnlock}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Mật khẩu (mặc định: 123456)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Mở khóa
          </button>
        </form>
      </div>
    );
  }

  // 2. Màn hình hiển thị sau khi mở khóa thành công
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Ghi chú Vùng Kín 🔒</h1>
        <button className="btn btn-danger" onClick={() => setIsUnlocked(false)}>
          Khóa lại
        </button>
      </div>

      {/* Form thêm ghi chú mới */}
      <div className="card">
        <h3 className="card-title">Thêm ghi chú bí mật mới</h3>
        <form onSubmit={handleAddNote}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Tiêu đề bí mật..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              rows="3"
              placeholder="Nội dung bí mật..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">Thêm mới</button>
        </form>
      </div>

      {/* Danh sách ghi chú riêng tư */}
      <h3 className="card-title">Danh sách ghi chú bí mật</h3>
      {notes.length === 0 ? (
        <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Chưa có ghi chú bí mật nào.</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div 
              key={note.id || Math.random()} 
              className="note-card" 
              style={{ backgroundColor: '#fef2f2', borderLeftColor: '#ef4444' }}
            >
              <div>
                <div className="note-header" style={{ color: '#991b1b' }}>{note.title}</div>
                <div className="note-content" style={{ color: '#7f1d1d' }}>{note.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PrivateNotes;