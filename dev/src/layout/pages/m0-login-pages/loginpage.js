// LoginScreen.js
import React, { useState } from 'react';
import './loginpage.css'; // Import file CSS
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/userSlice';

export function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đăng nhập thất bại");
      }

      const data = await response.json();
      localStorage.setItem("User", data.data.username);
      dispatch(login(data.data.username))
      navigate("/recipe");
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <div className="input-group">
          <label className="input-label">Tên người dùng</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên người dùng"
            className="input-field-login"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            className="input-field-login"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
