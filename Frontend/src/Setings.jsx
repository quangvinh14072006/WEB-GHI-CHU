import React, { useState, useEffect } from "react";
function Settings() {
  const [profile, setProfile] = useState({
    displayName: "",
    theme: "light",
    password: "",
  });
  //Lấy dữ liệu khi vừa load trang
  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        //Đổi tạm thời
        document.body.style.backgroundColor =
          data.theme === "dark" ? "#333" : "#fff";
        document.body.style.color = data.theme === "dark" ? "#fff" : "#000";
      });
  }, []);
  //Hàm xử lý khi gõ input
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  //Hàm xử lý lưu thay đổi
  const handleSave = () => {
    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/jon" },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Lưu thành công!");
        //Áp dụng màu nền ngay lập tức
        document.body.style.backgroundColor =
          profile.theme === "dark" ? "#333" : "#fff";
        document.body.style.color = profile.theme === "dark" ? "#fff" : "#000";
      });
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Tên hiển thị:</h2>
      <input
        type="text"
        name="displayName"
        value={profile.displayName}
        onChange={handleChange}
      />
      <div style={{ marginTop: "10px" }}>
        <label>Giao diện:</label>
        <select name="theme" id="">
          <option value="light">Sáng</option>
          <option value="dark">Tối</option>
        </select>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Mật khẩu vùng kín:</label>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Lưu thay đổi
      </button>
    </div>
  );
}
