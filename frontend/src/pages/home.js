
import React, { useState } from 'react';
import './home1.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3005/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                setMessage('Login successful');
                console.log('Logged in:', data);
            } else {
                const errorText = await response.text();
                setError(`Login failed: ${errorText}`);
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    const handleRegister = async (e) => { 
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3005/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            if (response.ok) { 
                setMessage('Registration successful! Please log in.');
            } else {
                const errorText = await response.text();
                setError(`Registration failed: ${errorText}`);
            }
        } catch (err) {
            setError('An error occurred during registration');
        }
    }; 

    return (
        <div className="auth-page">
            <main className="main-content">
                <h2>Welcome to Med Pulse</h2>
                <p>Your trusted partner for health and well-being.</p>

                <div className="auth-container">
                    {isLogin ? (
                       
                        <form className="auth-form" onSubmit={handleLogin}>
                            <h3>Login</h3>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <button type="submit" className="auth-button">
                                Login
                            </button>
                        </form>
                    ) : (
                       
                        <form className="auth-form" onSubmit={handleRegister}>
                            <h3>Register</h3>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <button type="submit" className="auth-button">
                                Register
                            </button>
                        </form>
                    )}

                    {/* Error and Success Messages */}
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}

                    {/* Toggle Between Forms */}
                    <div className="toggle-container">
                        {isLogin ? (
                            <p>
                                New to Med Pulse?{' '}
                                <button className="toggle-button" onClick={() => setIsLogin(false)}>
                                    Register
                                </button>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <button className="toggle-button" onClick={() => setIsLogin(true)}>
                                    Login
                                </button>
                            </p>
                        )}
                    </div>
                </div>

                <Link to="/user" className="booking-link">
                    Go to Booking Page
                </Link>
            </main>

            <footer className="footer">
                <p>&copy; 2024 Med Pulse. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
