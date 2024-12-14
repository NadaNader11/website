// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // <Link to="/">Back to Homepage</Link>

// // const User = () => {
// //   const [specialty, setSpecialty] = useState('');
// //   const [doctorList, setDoctorList] = useState([]);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     doctor: '',
// //     date: '',
// //     time: '',
// //   });

// //   const doctors = {
// //     Dermatology: [
// //       { name: 'Mohamed Ahmed Mahmoud', email: 'm.mahmoud@clinic.com' },
// //       { name: 'Hazem Ahmed Gamal', email: 'h.ahmed@clinic.com' },
// //     ],
// //     Cardiologist: [
// //       { name: 'Tamer Ahmed Mahmoud', email: 't.mahmoud@clinic.com' },
// //       { name: 'Dina Ahmed Mahmoud', email: 'a.ahmed@clinic.com' },
// //     ],
// //     'General practitioner': [
// //       { name: 'Ayman Osama Mohamed', email: 'a.osama@clinic.com' },
// //       { name: 'Samy Aly Karem', email: 's.Aly@clinic.com' },
// //     ],
// //     'Internal medicine': [{ name: 'Ahmed Mahmoud', email: 'a.mahmoud@clinic.com' }],
// //     Neurologist: [{ name: 'Hussein Aly Mahmoud', email: 'h.aly@clinic.com' }],
// //     'General surgery': [{ name: 'Magdy Saif Sherif', email: 'm.saif@clinic.com' }],
// //   };

// //   useEffect(() => {
// //     setDoctorList(doctors[specialty] || []);
// //   }, [specialty]);

// //   const handleInputChange = (e) => {
// //     const { id, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [id]: value }));
// //   };

// //   const handleSubmit = () => {
// //     alert(`Appointment Details:\n${JSON.stringify(formData, null, 2)}`);
// //   };

// //   return (
// //     <div>
// //       <h1>Book an Appointment</h1>
// //       <form>
// //         <label>Full Name:</label>
// //         <input
// //           type="text"
// //           id="name"
// //           placeholder="Enter your full name"
// //           value={formData.name}
// //           onChange={handleInputChange}
// //           required
// //         />
// //         <label>Email:</label>
// //         <input
// //           type="email"
// //           id="email"
// //           placeholder="Enter your email"
// //           value={formData.email}
// //           onChange={handleInputChange}
// //           required
// //         />
// //         <label>Phone Number:</label>
// //         <input
// //           type="tel"
// //           id="phone"
// //           placeholder="Enter your phone number"
// //           value={formData.phone}
// //           onChange={handleInputChange}
// //           required
// //         />
// //         <label>Specialty:</label>
// //         <select id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required>
// //           <option value="">Select Specialty</option>
// //           {Object.keys(doctors).map((key) => (
// //             <option key={key} value={key}>
// //               {key}
// //             </option>
// //           ))}
// //         </select>
// //         <label>Doctor:</label>
// //         <select id="doctor" value={formData.doctor} onChange={handleInputChange} required>
// //           <option value="">Select Doctor</option>
// //           {doctorList.map((doctor, index) => (
// //             <option key={index} value={doctor.email}>
// //               {doctor.name}
// //             </option>
// //           ))}
// //         </select>
// //         <label>Preferred Date:</label>
// //         <input
// //           type="date"
// //           id="date"
// //           value={formData.date}
// //           onChange={handleInputChange}
// //           required
// //         />
// //         <label>Preferred Time:</label>
// //         <input
// //           type="time"
// //           id="time"
// //           value={formData.time}
// //           onChange={handleInputChange}
// //           required
// //         />
// //         <button type="button" onClick={handleSubmit}>
// //           Confirm Appointment
// //         </button>
// //       </form>
// //       <Link to="/">Back to Homepage</Link>
// //     </div>
// //   );
// // };

// // export default User;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./user.css"; // Add a CSS file for styling

// const User = () => {
//   const [specialty, setSpecialty] = useState("");
//   const [doctorList, setDoctorList] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     doctor: "",
//     date: "",
//     time: "",
//   });

//   const doctors = {
//     Dermatology: [
//       { name: "Mohamed Ahmed Mahmoud", email: "m.mahmoud@clinic.com" },
//       { name: "Hazem Ahmed Gamal", email: "h.ahmed@clinic.com" },
//     ],
//     Cardiologist: [
//       { name: "Tamer Ahmed Mahmoud", email: "t.mahmoud@clinic.com" },
//       { name: "Dina Ahmed Mahmoud", email: "a.ahmed@clinic.com" },
//     ],
//     "General practitioner": [
//       { name: "Ayman Osama Mohamed", email: "a.osama@clinic.com" },
//       { name: "Samy Aly Karem", email: "s.Aly@clinic.com" },
//     ],
//     "Internal medicine": [
//       { name: "Ahmed Mahmoud", email: "a.mahmoud@clinic.com" },
//     ],
//     Neurologist: [
//       { name: "Hussein Aly Mahmoud", email: "h.aly@clinic.com" },
//     ],
//     "General surgery": [
//       { name: "Magdy Saif Sherif", email: "m.saif@clinic.com" },
//     ],
//   };

//   useEffect(() => {
//     setDoctorList(doctors[specialty] || []);
//   }, [specialty]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = () => {
//     alert(`Appointment Details:\n${JSON.stringify(formData, null, 2)}`);
//   };

//   return (
//     <div className="booking-page">
//       <header>
//         <h1>Med Pulse</h1>
//         <h2>Register for Appointment</h2>
//       </header>

//       <main>
//         <form className="booking-form">
//           <label htmlFor="name">Full Name:</label>
//           <input
//             type="text"
//             id="name"
//             placeholder="Enter your full name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="phone">Phone Number:</label>
//           <input
//             type="tel"
//             id="phone"
//             placeholder="Enter your phone number"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="specialty">Specialty:</label>
//           <select
//             id="specialty"
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value)}
//             required
//           >
//             <option value="">Select Specialty</option>
//             {Object.keys(doctors).map((key) => (
//               <option key={key} value={key}>
//                 {key}
//               </option>
//             ))}
//           </select>

//           <label htmlFor="doctor">Doctor:</label>
//           <select
//             id="doctor"
//             value={formData.doctor}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Doctor</option>
//             {doctorList.map((doctor, index) => (
//               <option key={index} value={doctor.email}>
//                 {doctor.name}
//               </option>
//             ))}
//           </select>

//           <label htmlFor="date">Preferred Date:</label>
//           <input
//             type="date"
//             id="date"
//             value={formData.date}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="time">Preferred Time:</label>
//           <input
//             type="time"
//             id="time"
//             value={formData.time}
//             onChange={handleInputChange}
//             required
//           />

//           <button type="button" className="confirm-button" onClick={handleSubmit}>
//             Confirm Appointment
//           </button>
//         </form>

//         <Link to="/" className="back-link">
//           Back to Homepage
//         </Link>
//       </main>
//     </div>
//   );
// };

// export default User;






// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./user.css"; 

// const User = () => {
//   const [specialty, setSpecialty] = useState("");
//   const [doctorList, setDoctorList] = useState([]);
//   const [formData, setFormData] = useState({
//   const [USER_ID, setUSER_ID] = useState('');
//   const [DOCTORID, setDOCTORID] = useState('');
//   const [BookingDate, setBookingDate] = useState('');
//   const [BookingTime, setBookingTime] = useState('');
    
//     name: "",
//     email: "",
//     phone: "",
//     doctor: "",
//     date: "",
//     time: "",
//   });

//   // Define fixed time slots
//   const timeSlots = [
//     "11:00",
//     "11:30",
//     "12:00",
//     "12:30",
//     "13:00",
//     "13:30",
//     "14:00",
//     "14:30",
//     "15:00",
//     "15:30",
//     "16:00",
//     "16:30",
//     "17:00",
//     "17:30",
//     "18:00",
//     "18:30",
//   ];

//   const doctors = {
//     Dermatology: [
//       { name: "Mohamed Ahmed Mahmoud", email: "m.mahmoud@clinic.com" },
//       { name: "Hazem Ahmed Gamal", email: "h.ahmed@clinic.com" },
//     ],
//     Cardiologist: [
//       { name: "Tamer Ahmed Mahmoud", email: "t.mahmoud@clinic.com" },
//       { name: "Dina Ahmed Mahmoud", email: "a.ahmed@clinic.com" },
//     ],
//     "General practitioner": [
//       { name: "Ayman Osama Mohamed", email: "a.osama@clinic.com" },
//       { name: "Samy Aly Karem", email: "s.Aly@clinic.com" },
//     ],
//     "Internal medicine": [
//       { name: "Ahmed Mahmoud", email: "a.mahmoud@clinic.com" },
//     ],
//     Neurologist: [
//       { name: "Hussein Aly Mahmoud", email: "h.aly@clinic.com" },
//     ],
//     "General surgery": [
//       { name: "Magdy Saif Sherif", email: "m.saif@clinic.com" },
//     ],
//   };

//   useEffect(() => {
//     setDoctorList(doctors[specialty] || []);
//     setFormData((prev) => ({ ...prev, doctor: "", time: "" }));
//   }, [specialty]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = () => {
//     alert(`Appointment Details:\n${JSON.stringify(formData, null, 2)}`);
//   };

//   return (
//     <div className="booking-page">
//       <header>
//         <h1>Med Pulse</h1>
//         <h2>Register for Appointment</h2>
//       </header>

//       <main>
//         <form className="booking-form">
//           <label htmlFor="name">Full Name:</label>
//           <input
//             type="text"
//             id="name"
//             placeholder="Enter your full name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="phone">Phone Number:</label>
//           <input
//             type="tel"
//             id="phone"
//             placeholder="Enter your phone number"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="specialty">Specialty:</label>
//           <select
//             id="specialty"
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value)}
//             required
//           >
//             <option value="">Select Specialty</option>
//             {Object.keys(doctors).map((key) => (
//               <option key={key} value={key}>
//                 {key}
//               </option>
//             ))}
//           </select>

//           <label htmlFor="doctor">Doctor:</label>
//           <select
//             id="doctor"
//             value={formData.doctor}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Doctor</option>
//             {doctorList.map((doctor, index) => (
//               <option key={index} value={doctor.email}>
//                 {doctor.name}
//               </option>
//             ))}
//           </select>

//           <label htmlFor="date">Preferred Date:</label>
//           <input
//             type="date"
//             id="date"
//             value={formData.date}
//             onChange={handleInputChange}
//             required
//           />

//           <label htmlFor="time">Preferred Time:</label>
//           <select
//             id="time"
//             value={formData.time}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Time</option>
//             {timeSlots.map((time, index) => (
//               <option key={index} value={time}>
//                 {time}
//               </option>
//             ))}
//           </select>
// const handleBooking = async (e) => { 
//         e.preventDefault();
//         try {   
//             const response = await fetch('http://localhost:3005/appointments/book', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ USER_ID, DOCTORID, BookingDate, BookingTime }),
//             });
//             if (response.ok) { 
//                 setMessage('Booking Successful.');
//             } else {
//                 const errorText = await response.text();
//                 setError(`Booking failed: ${errorText}`);
//             }
//         } catch (err) {
//             setError('An error occurred during Booking');
//         }
//     };

//           <button
//             type="button"
//             className="confirm-button"
//             onClick={handleBooking}
//           >
//             Confirm Appointment
//           </button>
//         </form>

//         <Link to="/" className="back-link">
//           Back to Homepage
//         </Link>
//       </main>
//     </div>
//   );
// };

// export default User;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./user.css";

const User = () => {
  const [specialty, setSpecialty] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState(""); 
  const [formData, setFormData] = useState({
    User_Id: "", 
    Doctor_Id: "", 
    name: "",
    email: "",
    phone: "",
    BookingDate: "", 
    BookingTime: "", 
  });

  
  const timeSlots = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ];

  const doctors = {
    Dermatology: [
      { name: "Mohamed Ahmed Mahmoud", email: "m.mahmoud@clinic.com" },
      { name: "Hazem Ahmed Gamal", email: "h.ahmed@clinic.com" },
    ],
    Cardiologist: [
      { name: "Tamer Ahmed Mahmoud", email: "t.mahmoud@clinic.com" },
      { name: "Dina Ahmed Mahmoud", email: "a.ahmed@clinic.com" },
    ],
    "General practitioner": [
      { name: "Ayman Osama Mohamed", email: "a.osama@clinic.com" },
      { name: "Samy Aly Karem", email: "s.Aly@clinic.com" },
    ],
    "Internal medicine": [
      { name: "Ahmed Mahmoud", email: "a.mahmoud@clinic.com" },
    ],
    Neurologist: [
      { name: "Hussein Aly Mahmoud", email: "h.aly@clinic.com" },
    ],
    "General surgery": [
      { name: "Magdy Saif Sherif", email: "m.saif@clinic.com" },
    ],
  };

  // Update doctor list based on specialty
  useEffect(() => {
    setDoctorList(doctors[specialty] || []);
    setFormData((prev) => ({ ...prev, doctorId: "", time: "" }));
  }, [specialty]);

  // Handle input changes for form data
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission for booking
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3005/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        //   USER_ID: formData.USER_ID,
          DOCTORID: formData.DOCTORID,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          BookingDate: formData.BookingData,
          BookingTime: formData.BookingTime,
        }),
      });

      if (response.ok) {
        setMessage("Booking Successful.");
        setError("Error Booking");
      } else {
        const errorText = await response.text();
        setError(`Booking failed: ${errorText}`);
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred during Booking");
      setMessage("");
    }
  };

  return (
    <div className="booking-page">
      <header>
        <h1>Med Pulse</h1>
        <h2>Register for Appointment</h2>
      </header>

      <main>
        
         <form className="booking-form" onSubmit={handleBooking}>
          {/* <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            placeholder="Enter your User ID"
            value={formData.userId}
            onChange={handleInputChange}
            required  */}
          
          

          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="specialty">Specialty:</label>
          <select
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          >
            <option value="">Select Specialty</option>
            {Object.keys(doctors).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          <label htmlFor="doctorId">Doctor:</label>
          <select
            id="doctorId"
            value={formData.doctorId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctorList.map((doctor, index) => (
              <option key={index} value={doctor.email}>
                {doctor.name}
              </option>
            ))}
          </select>

          <label htmlFor="date">Preferred Date:</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="time">Preferred Time:</label>
          <select
            id="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Time</option>
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>

          <button type="submit" className="confirm-button">
            Confirm Appointment
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <Link to="/" className="back-link">
          Back to Homepage
        </Link>
      </main>
    </div>
  );
};

export default User;
