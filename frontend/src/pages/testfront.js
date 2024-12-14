import React, { useState } from 'react';
import './home1.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Track login state

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:3002/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      if (response.ok) {
        setMessage('Login successful');
        setUserLoggedIn(true); // Mark user as logged in
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Error connecting to the server');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerData = { name, email, password };

    try {
      const response = await fetch('http://localhost:3002/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        setMessage('Registration successful');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Error connecting to the server');
    }
  };

  return (
    <div className="auth-page">
      <main className="main-content">
        <h2>Welcome to Med Pulse</h2>
        <p>Your trusted partner for health and well-being.</p>

        <div className="auth-container">
          {isLogin ? (
            // Login Form
            <form className="auth-form" onSubmit={handleLogin}>
              <h3>Login</h3>
              <label htmlFor="email">Email</label>
              <input
                type="text"
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
            // Registration Form
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

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

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
      </main>
      <footer className="footer">
        <p>&copy; 2024 Med Pulse. All rights reserved.</p>
      </footer>

      {/* Conditionally render the booking page after login */}
      {userLoggedIn && <BookingPage />}
    </div>
  );
};

const BookingPage = () => {
  const doctors = {
    "Dermatology": [
      { name: "Mohamed Ahmed Mahmoud", email: "m.mahmoud@clinic.com" },
      { name: "Hazem Ahmed Gamal", email: "h.ahmed@clinic.com" }
    ],
    "Cardiologist": [
      { name: "Tamer Ahmed Mahmoud", email: "t.mahmoud@clinic.com" },
      { name: "Dina Ahmed Mahmoud", email: "a.ahmed@clinic.com" }
    ],
    // Add other specialties as needed...
  };

  const [specialty, setSpecialty] = useState('');
  const [doctor, setDoctor] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
    setDoctor(''); // Reset doctor selection
  };

  const handleDoctorChange = (e) => {
    setDoctor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment details: \nName: ${name} \nSpecialty: ${specialty} \nDoctor: ${doctor} \nDate: ${date} \nTime: ${time}`);
  };

  return (
    <div>
      <h3>Book an Appointment</h3>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Phone Number</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>Specialty</label>
        <select value={specialty} onChange={handleSpecialtyChange} required>
          <option value="Dermatology">Dermatology</option>
          <option value="Cardiologist">Cardiologist</option>
          {/* Add other specialties as options */}
        </select>

        <label>Doctor</label>
        <select value={doctor} onChange={handleDoctorChange} required>
          {doctors[specialty]?.map((doctor, index) => (
            <option key={index} value={doctor.email}>
              {doctor.name}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Time</label>
        <select value={time} onChange={(e) => setTime(e.target.value)} required>
          <option value="11:00">11:00</option>
          {/* Add other time slots */}
        </select>

        <button type="submit">Confirm Appointment</button>
      </form>
    </div>
  );
};

export default AuthPage;
