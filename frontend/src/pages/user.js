
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
      { name: "Mohamed Ahmed Mahmoud", email: "m.mahmoud@clinic.com",doctorId: "1" },
      { name: "Hazem Ahmed Gamal", email: "h.ahmed@clinic.com",doctorId: "2" },
    ],
    Cardiologist: [
      { name: "Tamer Ahmed Mahmoud", email: "t.mahmoud@clinic.com",doctorId: "3" },
      { name: "Dina Ahmed Mahmoud", email: "a.ahmed@clinic.com",doctorId: "4" },
    ],
    "General practitioner": [
      { name: "Ayman Osama Mohamed", email: "a.osama@clinic.com",doctorId: "5" },
      { name: "Samy Aly Karem", email: "s.Aly@clinic.com" ,doctorId: "6"},
    ],
    "Internal medicine": [
      { name: "Ahmed Mahmoud", email: "a.mahmoud@clinic.com",doctorId: "7" },
    ],
    Neurologist: [
      { name: "Hussein Aly Mahmoud", email: "h.aly@clinic.com",doctorId: "8" },
    ],
    "General surgery": [
      { name: "Magdy Saif Sherif", email: "m.saif@clinic.com",doctorId: "9" },
    ],
  };

  
  useEffect(() => {
    setDoctorList(doctors[specialty] || []);
    setFormData((prev) => ({ ...prev, doctorId: "", time: "" }));
  }, [specialty]);

  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3005/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          USER_ID: 1,  
          DOCTOR_ID: formData.doctorId, 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          BookingDate: formData.date,  
          BookingTime: formData.time,  
        }),
      });
  
      if (response.ok) {
        setMessage("Booking Successful.");
        setError(""); 
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
              <option key={index} value={doctor.doctorId}>
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
