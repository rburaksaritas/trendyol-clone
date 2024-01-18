import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                setMessage(`Giriş Başarısız: ${errorMessage}.`);
                return;
            }

            const data = await response.json();
            const token = data.token;
            const userId = data.userId;
            const userName = data.username;
            setMessage('Giriş Başarılı. Yönlendiriliyorsunuz...');
            localStorage.setItem('token', token);
            localStorage.setItem('userid', userId);
            localStorage.setItem('username', userName);
            setTimeout(() => {
                onLoginSuccess();
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Merhaba,</h2>
                <p>Trendyol Clone’a <strong>giriş yap</strong>, indirimleri kaçırma!</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Kullanıcı Adı"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Şifre"
                        required
                    />
                    <button type="submit" className="login-button">GİRİŞ YAP</button>
                    {message && <div className="message">{message}</div>}
                </form>
                <div className="login-footer">
                    <p>Üye değil misin?</p>
                    <button onClick={() => navigate('/register')} className="footer-signup-button">
                        Hemen Üye Ol
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
