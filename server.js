const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const sqlite = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors'); 
const url = require('url'); 
const app = express();
const port = 3005;
const secret_key = process.env.SECRET_KEY || 'BhbsfvihobsiofbidhbfidsbfipsN'; 

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
}));
app.use(bodyparser.json());
app.use(cookieParser());

const db = new sqlite.Database('./booking.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err); // Enhanced error logging
        return;
    }
    console.log('Connected to the database.');
});

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, secret_key, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('Unauthorized');
    jwt.verify(token, secret_key, (err, details) => {
        if (err) return res.status(403).send('Invalid or expired token');
        req.userDetails = details;
        next();
    });
};

app.get('/api/Bookings', (req, res) => {
    let sql = "SELECT * FROM GetBookings";
    const queryObject = req.query;
    if (queryObject.field && queryObject.type) {
        sql += ` WHERE ${queryObject.field} = ?`;
    }
    db.all(sql, [queryObject.type], (err, rows) => { // Parameterized query to prevent SQL injection
        if (err) {
            console.error("Error fetching bookings:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

app.get('/api/GetSpecialties', (req, res) => {
    const sql = "SELECT * FROM Specialty ORDER BY SpecialtyName";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error fetching specialties:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});
       
app.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM USERS WHERE email = ?`, [email], (err, user) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send('Server error');
        }

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                console.error("Password comparison error:", err);
                return res.status(500).send('Server error');
            }

            if (!isMatch) {
                return res.status(401).send('Invalid email or password');
            }

            const token = generateToken(user.UserID, user.isadmin);

            res.cookie('authToken', token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production', 
                maxAge: 3600000,
            });

            return res.status(200).json({ id: user.UserID, admin: user.isadmin });
        });
    });
});

app.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;
    db.get(`SELECT * FROM USERS WHERE email = ?`, [email], (err, user) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send('Server error');
        }

        if (user) {
            return res.status(409).send('User already exists');
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send('Error hashing password');
            }

            db.run(
                `INSERT INTO USERS (UserName, email, password, isadmin) VALUES (?, ?, ?, ?)`,
                [name, email, hashedPassword, 0],
                (err) => {
                    if (err) {
                        console.error("Error creating user:", err);
                        return res.status(500).send('Error creating user');
                    }
                    res.status(200).send('Registration successful');
                }
            );
        });
    });
});

app.post('/appointments/book', verifyToken, (req, res) => {
    const { doctorID, date, time, userID } = req.body;
    //const userID = req.userDetails.id;

    db.run(`INSERT INTO Booking ( USER_ID, DOCTORID, BookingDate, BookingTime) VALUES (? , ?, ?, ?)`, [ userID ,doctorID, date, time], (err) => {
        if (err) {
            console.log("err:" + err);
            return res.status(500).send(err);
        }
        return res.status(200).send('Appointment booked successfully');
    });
}); 

app.delete('/user/:id', verifyToken, (req, res) => {
    const userId = req.params.id;

    if (req.userDetails.id !== parseInt(userId) && !req.userDetails.isAdmin) {
        return res.status(403).send('Forbidden: You are not authorized to delete this user');
    }

    db.run(`DELETE FROM USERS WHERE UserID = ?`, [userId], function (err) {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).send('Error deleting user');
        }

        if (this.changes === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(`User with ID ${userId} deleted successfully`);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
 
