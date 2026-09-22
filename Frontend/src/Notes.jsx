import { useState, useEffect } from 'react';

function Notes() {
  /* ==========================================================
   | VÙNG 1: KHỞI TẠO STATE (Trạng thái dữ liệu)
   ========================================================== */
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Học tập');
  const [filter, setFilter] = useState('Tất cả');

  /* ==========================================================
   | VÙNG 2: GỌI API / EFFECTS (Tải dữ liệu từ server)
   ========================================================== */
  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, []);

  /* ==========================================================
   | VÙNG 3: XỬ LÝ SỰ KIỆN (Handlers)
   ========================================================== */
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNote = { title, content, category };
    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes([...notes, data]);
        setTitle('');
        setContent('');
      });
  };

  // Lọc danh sách ghi chú theo chủ đề đang chọn
  const filteredNotes = filter === 'Tất cả' 
    ? notes 
    : notes.filter(n => n.category === filter);

  /* ==========================================================
   | VÙNG 4: GIAO DIỆN (Render JSX)
   ========================================================== */
  return (
    <div>
      <h1 className="page-title">Ghi chú Công khai</h1>

      {/* Bộ lọc ghi chú theo chủ đề */}
      <div className="card">
        <div className="form-group">
          <label className="form-label">Lọc theo chủ đề:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="Tất cả">Tất cả</option>
            <option value="Học tập">Học tập</option>
            <option value="Công việc">Công việc</option>
            <option value="Cá nhân">Cá nhân</option>
          </select>
        </div>
      </div>

      {/* Form tạo mới ghi chú */}
      <div className="card">
        <h3 className="card-title">Thêm ghi chú mới</h3>
        <form onSubmit={handleAddNote}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Tiêu đề ghi chú..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              rows="3"
              placeholder="Nội dung ghi chú..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Chủ đề:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Học tập">Học tập</option>
              <option value="Công việc">Công việc</option>
              <option value="Cá nhân">Cá nhân</option>
            </select>
          </div>
          <button type="submit" className="btn">Thêm mới</button>
        </form>
      </div>

      {/* Hiển thị danh sách thẻ ghi chú dạng lưới (Grid) */}
      <h3 className="card-title">Danh sách ghi chú</h3>
      {filteredNotes.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>Chưa có ghi chú nào.</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div key={note.id || Math.random()} className="note-card">
              <div>
                <div className="note-header">{note.title}</div>
                <div className="note-content">{note.content}</div>
              </div>
              <div className="note-footer">
                <span className="tag">{note.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;