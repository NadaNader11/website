// import React, { useState } from 'react';
// import './home1.css'; // Your CSS file


// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState(''); // For registration
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const loginData = { email, password };

//     try {
//       const response = await fetch('http://localhost:3002/user/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginData),
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage('Login successful');
//         console.log('Login successful:', data);
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Login failed');
//       }
//     } catch (error) {
//       setError('Error connecting to the server');
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const registerData = { name, email, password };

//     try {
//       const response = await fetch('http://localhost:3002/user/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(registerData),
//       });

//       if (response.ok) {
//         setMessage('Registration successful');
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       setError('Error connecting to the server');
//     }
//   };

//   return (
//     <div className="auth-page">
//       <main className="main-content">
//         <h2>Welcome to Med Pulse</h2>
//         <p>Your trusted partner for health and well-being.</p>

//         <div className="auth-container">
//           {isLogin ? (
//             // Login Form
//             <form className="auth-form" onSubmit={handleLogin}>
//               <h3>Login</h3>
//               <label htmlFor="email">Email</label>
//               <input
//                 type="text"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//               <button type="submit" className="auth-button">
//                 Login
//               </button>
//             </form>
//           ) : (
//             // Registration Form
//             <form className="auth-form" onSubmit={handleRegister}>
//               <h3>Register</h3>
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//                 required
//               />
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//               <button type="submit" className="auth-button">
//                 Register
//               </button>
//             </form>
//           )}

//           {/* Error and Success Messages */}
//           {error && <p className="error-message">{error}</p>}
//           {message && <p className="success-message">{message}</p>}

//           {/* Toggle Between Forms */}
//           <div className="toggle-container">
//             {isLogin ? (
//               <p>
//                 New to Med Pulse?{' '}
//                 <button className="toggle-button" onClick={() => setIsLogin(false)}>
//                   Register
//                 </button>
//               </p>
//             ) : (
//               <p>
//                 Already have an account?{' '}
//                 <button className="toggle-button" onClick={() => setIsLogin(true)}>
//                   Login
//                 </button>
//               </p>
//             )}
//           </div>
//         </div>
//       </main>

//       <footer className="footer">
//         <p>&copy; 2024 Med Pulse. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default AuthPage;

 


// import React, { useState } from 'react';
// import './home1.css';
// import { Link } from 'react-router-dom';

// const Home = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:3005/user/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include', // Allow cookies
//                 body: JSON.stringify({ email, password }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setMessage('Login successful');
//                 console.log('Logged in:', data);
//             } else {
//                 const errorText = await response.text();
//                 setError(`Login failed: ${errorText}`);
//             }
//         } catch (err) {
//             setError('An error occurred during login');
//         }
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:3005/user/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name, email, password }),
//             });
//             if (response.ok) {
//                 setMessage('Registration successful! Please log in.');
//             } else {
//                 const errorText = await response.text();
//                 setError(`Registration failed: ${errorText}`);
//             }
//         } catch (err) {
//             setError('An error occurred during registration');
//         }
//     };

//     return (
//         <div className="auth-page">
//             <h2>Welcome to Med Pulse</h2>
//             <p>Your trusted partner for health and well-being.</p>
//             <div className="auth-container">
//                 {error && <p className="error">{error}</p>}
//                 {message && <p className="message">{message}</p>}
//                 {isLogin ? (
//                     <form onSubmit={handleLogin}>
//                         <h3>Login</h3>
//                         <label>Email:</label>
//                         <input
//                             type="email"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                         <label>Password:</label>
//                         <input
//                             type="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                         <button type="submit">Login</button>
//                     </form>
//                 ) : (
//                     <form onSubmit={handleRegister}>
//                         <h3>Register</h3>
//                         <label>Name:</label>
//                         <input
//                             type="text"
//                             placeholder="Enter your name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                         <label>Email:</label>
//                         <input
//                             type="email"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                         <label>Password:</label>
//                         <input
//                             type="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                         <button type="submit">Register</button>
//                     </form>
//                 )}
//                 <button onClick={() => setIsLogin(!isLogin)}>
//                     {isLogin ? 'Switch to Register' : 'Switch to Login'}
//                 </button>
//                 <Link to="/user">Go to Booking Page</Link>
//             </div>
//         </div>
//     );
// }; 
// export default Home;

 

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
                        // Login Form
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
