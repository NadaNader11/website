const express = require('express');
const bodyparser = require('body-parser');
const sqlite = require('sqlite3');
const path = require('path');
const url = require('url');
const cors = require('cors');
const app = express();
const port = 3000;

// Database setup
const db = new sqlite.Database(path.join(__dirname, 'booking.db'), sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    console.log('Connected to the database.');
});

// SQL statements for creating tables, inserting data, and creating views
const createDoctorsTable = `CREATE TABLE IF NOT EXISTS Doctors (
    DoctorID INTEGER PRIMARY KEY AUTOINCREMENT,
    DoctorName TEXT NOT NULL,
    email TEXT NOT NULL,
    SpecialtyID INTEGER NOT NULL,
    DegreeID INTEGER NOT NULL,
    MobileNo TEXT
)`;

const createDatesTable = `CREATE TABLE IF NOT EXISTS Dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    BDate TEXT NOT NULL
)`;

const createTimesTable = `CREATE TABLE IF NOT EXISTS Times (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    BTime TEXT NOT NULL
)`;

const createSpecialtyTable = `CREATE TABLE IF NOT EXISTS Specialty (
    SpecialtyID INTEGER PRIMARY KEY AUTOINCREMENT,
    SpecialtyName TEXT NOT NULL
)`;

const createDegreeTable = `CREATE TABLE IF NOT EXISTS Degree (
    DegreeID INTEGER PRIMARY KEY AUTOINCREMENT,
    DegreeName TEXT NOT NULL
)`;

const createBookingTable = `CREATE TABLE IF NOT EXISTS Booking (
    BookingID INTEGER PRIMARY KEY AUTOINCREMENT,
    DoctorID INTEGER NOT NULL,
    BookingDate TEXT NOT NULL,
    BookingTime TEXT,
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
)`;

const insertDegreeData = `INSERT INTO Degree (DegreeName) VALUES 
    ("Practitioner"),
    ("Specialist"),
    ("Consultant")`;

const insertSpecialtyData = `INSERT INTO Specialty (SpecialtyName) VALUES 
    ("Dermatology"),
    ("Cardiologist"),
    ("General practitioner"),
    ("Internal medicine"),
    ("Neurologist"),
    ("General surgery")`;

const insertDoctorsData = `INSERT INTO Doctors (DoctorName, email, SpecialtyID, DegreeID, MobileNo) VALUES 
    ("Mohamed Ahmed Mahmoud", "m.mahmoud@clinic.com", 1, 1, "0122756433"),
    ("Tamer Ahmed Mahmoud", "t.mahmoud@clinic.com", 2, 1, "0123756433"),
    ("Ayman Osama Mohamed", "a.osama@clinic.com", 3, 1, "0122756253"),
    ("Ahmed Mahmoud", "a.mahmoud@clinic.com", 1, 1, "0123356433"),
    ("Dina Ahmed Mahmoud", "a.ahmed@clinic.com", 2, 2, "0122826433"),
    ("Hussein Aly Mahmoud", "h.aly@clinic.com", 3, 3, "0122556433"),
    ("Hazem Ahmed Gamal", "h.ahmed@clinic.com", 1, 1, "0122767433"),
    ("Magdy Saif Sherif", "m.saif@clinic.com", 2, 3, "0124456433"),
    ("Samy Aly Karem", "s.Aly@clinic.com", 1, 1, "0122326433")`;

const insertBookingData = `INSERT INTO Booking (DoctorID, BookingDate, BookingTime) VALUES 
    (1, "2024-12-07", "11:00"),
    (1, "2024-12-07", "12:00"),
    (1, "2024-12-07", "13:00"),
    (2, "2024-12-07", "13:00"),
    (2, "2024-12-07", "14:00"),
    (2, "2024-12-07", "14:30")`;

const insertDatesData = `INSERT INTO Dates (BDate) VALUES 
    ("2024-12-07"),
    ("2024-12-08"),
    ("2024-12-09"),
    ("2024-12-10"),
    ("2024-12-11"),
    ("2024-12-12"),
    ("2024-12-13"),
    ("2024-12-14"),
    ("2024-12-15"),
    ("2024-12-16"),
    ("2024-12-17"),
    ("2024-12-18"),
    ("2024-12-19"),
    ("2024-12-20"),
    ("2024-12-21"),
    ("2024-12-22")`;

const insertTimesData = `INSERT INTO Times (BTime) VALUES 
    ("11:00"), 
    ("11:30"), 
    ("12:00"), 
    ("12:30"), 
    ("13:00"),
    ("13:30"),
    ("14:00"),
    ("14:30"),
    ("15:00"),
    ("15:30"),
    ("16:00"),
    ("16:30"),
    ("17:00"),
    ("17:30"),
    ("18:00"),
    ("18:30")`;

const createBookingsView = `CREATE VIEW IF NOT EXISTS GetBookings AS 
    SELECT Doctors.DoctorID, DoctorName, BDate, BTime, SpecialtyName, DegreeName 
    FROM Doctors 
    INNER JOIN Specialty ON Doctors.SpecialtyID = Specialty.SpecialtyID 
    INNER JOIN Degree ON Doctors.DegreeID = Degree.DegreeID 
    CROSS JOIN Dates 
    CROSS JOIN Times 
    WHERE NOT EXISTS (SELECT 1 FROM Booking WHERE Booking.BookingDate = Dates.BDate AND Booking.BookingTime = Times.BTime)`;

// Create tables and insert initial data
const createTablesAndInsertData = () => {
    db.serialize(() => {
        // Create tables
        db.run(createDoctorsTable);
        db.run(createDatesTable);
        db.run(createTimesTable);
        db.run(createSpecialtyTable);
        db.run(createDegreeTable);
        db.run(createBookingTable);

        // Insert initial data
        db.run(insertDegreeData);
        db.run(insertSpecialtyData);
        db.run(insertDoctorsData);
        db.run(insertBookingData);
        db.run(insertDatesData);
        db.run(insertTimesData);

        // Create view for bookings
        db.run(createBookingsView);
    });
};

createTablesAndInsertData();  // Call function to set up the tables

// Enable CORS for all routes
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Middleware
app.use(bodyparser.json());

// GET request for bookings
app.get('/api/Bookings', (req, res) => {
    let sql = "SELECT * FROM GetBookings";
    console.log(req.url);
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.field && queryObject.type) {
        sql += ` WHERE ${queryObject.field} = '${queryObject.type}'`;
    }
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// Start the server
app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Server is running on port ${port}`);
});




