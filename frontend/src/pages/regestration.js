// import React, { useState } from 'react';
// import './home1.css';  
// import { Link } from 'react-router-dom'; 


// <div className="auth-container">
//   {/* Registration Form */}
//   <form className="auth-form" onSubmit={handleRegister}>
//     <h3>Register</h3>
//     {/* ...rest of the form */}
//   </form>

//   {/* Error message */}
//   {error && <p className="error-message">{error}</p>}
  
//   {/* Success message */}
//   {message && <p className="success-message">{message}</p>}

//   {/* Link to Login */}
//   <div className="login-container">
//     <p>Already have an account?</p>
//     <Link to="/" className="auth-button">Login</Link>
//   </div>
// </div>


// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');  

 
//   const handleRegister = async (e) => {
//     e.preventDefault();
    
   
//     const registrationData = {
//       name,
//       email,
//       password,
//     };

//     try {
      
//       const response = await fetch('http://localhost:3001/user/register', { 
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(registrationData),
//         credentials: 'include',
//       });

      
//       if (response.ok) {
//         const data = await response.json();
//         setMessage('Registration successful');
//         console.log('Registration successful:', data);
//       } else {
//         const data = await response.json();
//         setError(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       setError('Error connecting to the server');
//     }
//   };

//   return (
//     <div className="home-page">
//       <main className="main-content">
//         <h2>Create Your Account</h2>
//         <p>Join Med Pulse and take charge of your health journey.</p>

//         <div className="auth-container">
//           {/* Registration Form */}
//           <form className="auth-form" onSubmit={handleRegister}>
//             <h3>Register</h3>
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit" className="auth-button">
//               Register
//             </button>
//           </form>

//           {/* Error message */}
//           {error && <p className="error-message">{error}</p>}
          
//           {/* Success message */}
//           {message && <p className="success-message">{message}</p>}
//         </div>
//       </main>

//       {/* Footer Section */}
//       <footer className="footer">
//         <p>&copy; 2024 Med Pulse. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Register;
