import React, { useState } from 'react';

function PrivateNotes() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });

  // 1. Xử lý đăng nhập / mở khóa
  const handleLogin = () => {
    fetch('http://localhost:5000/api/private/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsUnlocked(true);
          fetchPrivateNotes();
        } else {
          alert("Sai mật khẩu, vui lòng thử lại!");
          setPasswordInput('');
        }
      });
  };

  // 2. Lấy danh sách ghi chú kín
  const fetchPrivateNotes = () => {
    fetch('http://localhost:5000/api/private/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  };

  // 3. Thêm mới ghi chú kín
  const handleSave = () => {
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề!");
      return;
    }
    fetch('http://localhost:5000/api/private/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        fetchPrivateNotes();
        setFormData({ title: '', content: '' });
      });
  };

  // 4. Xóa ghi chú kín
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ghi chú bí mật này?")) {
      fetch(`http://localhost:5000/api/private/notes/${id}`, { method: 'DELETE' })
        .then(() => fetchPrivateNotes());
    }
  };

  // MÀN HÌNH KHÓA
  if (!isUnlocked) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>🔒 Khu vực Bảo mật</h2>
        <p>Vui lòng nhập mật khẩu để truy cập</p>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Nhập mật khẩu..."
          style={{ padding: '8px', width: '200px' }}
        />
        <button onClick={handleLogin} style={{ marginLeft: '10px', padding: '8px 15px' }}>
          Mở khóa
        </button>
      </div>
    );
  }

  // MÀN HÌNH GHI CHÚ KÍN (KHI ĐÃ MỞ KHÓA)
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff5f5' }}>
      <h2 style={{ color: '#c53030' }}>🔒 Ghi chú Riêng tư</h2>

      {/* Form nhập liệu */}
      <div style={{ border: '1px solid #feb2b2', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
        <h3>Thêm bí mật mới</h3>
        <input
          placeholder="Tiêu đề bí mật"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea
          placeholder="Nội dung bí mật"
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          style={{ display: 'block', width: '100%', height: '80px', marginBottom: '10px', padding: '8px' }}
        />
        <button onClick={handleSave} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>
          Lưu bí mật
        </button>
      </div>

      {/* Danh sách ghi chú */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {notes.length === 0 && <p>Chưa có ghi chú bí mật nào.</p>}
        {notes.map(note => (
          <div key={note.id} style={{ border: '1px solid #feb2b2', padding: '15px', borderRadius: '5px', backgroundColor: '#fff' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#9b2c2c' }}>{note.title}</h4>
            <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
            <button onClick={() => handleDelete(note.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: '10px' }}>
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivateNotes;