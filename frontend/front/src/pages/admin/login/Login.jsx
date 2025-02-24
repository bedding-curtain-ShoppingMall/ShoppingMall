import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { token } from "../../../api/AdminAPI";
import "./Login.css";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await token(new URLSearchParams({
                username,
                password,
            }));
            localStorage.setItem("token", response.data.access_token);
            onLogin(); // 로그인 상태 업데이트
            navigate("/admin");
            window.location.reload();
        } catch (err) {
            alert("로그인 실패: 아이디나 비밀번호가 틀렸습니다.");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
