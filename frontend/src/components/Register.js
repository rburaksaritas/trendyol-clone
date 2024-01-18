import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                setMessage(`Kayıt Başarısız: ${errorMessage}.`);
                return;
            }

            const newUser = await response.json();
            setMessage('Kayıt Başarılı. Yönlendiriliyorsunuz...');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Merhaba,</h2>
                <p>Trendyol Clone’a <strong>üye ol</strong>, indirimleri kaçırma!</p>
                <form onSubmit={handleRegister}>
                <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
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
                    <button type="submit" className="register-button">ÜYE OL</button>
                    {message && <div className="message">{message}</div>}
                </form>
                <div className="register-footer">
                    <p>Zaten üye misin?</p>
                    <button onClick={() => navigate('/login')} className="footer-login-button">
                        Hemen Giriş Yap
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
