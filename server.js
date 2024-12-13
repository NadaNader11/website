const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const sqlite = require('sqlite3').verbose();
const jwt = require('jsonwebtoken'); // Ensure you require jwt for token generation and verification
const bcrypt = require('bcrypt'); // Ensure bcrypt is required for password comparison
const cors = require('cors');
const secret_key = 'BhbsfvihobsiofbidhbfidsbfipsN';
const url = require('url');

const db = new sqlite.Database("./booking.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    console.log('Connected to the database.');
});

app.use(cors());
app.use(bodyparser.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(cookieParser());

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, secret_key, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token)
        return res.status(401).send('Unauthorized');
    jwt.verify(token, secret_key, (err, details) => {
        if (err)
            return res.status(403).send('Invalid or expired token');
        req.userDetails = details;
        next();
    });
};

app.get('/', (req, res) => {
    res.send('Cookie-parser is working!');
});

app.post('/user/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.get(`SELECT * FROM USER WHERE EMAIL=?`, [email], (err, row) => {
        if (err || !row) {
            return res.status(401).send('Invalid credentials');
        }
        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error comparing password.');
            }
            if (!isMatch) {
                return res.status(401).send('Invalid credentials');
            } else {
                const userID = row.ID;
                const isAdmin = row.ISADMIN;
                const token = generateToken(userID, isAdmin);

                res.cookie('authToken', token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 3600000 // 1 hour
                });
                return res.status(200).json({ id: userID, admin: isAdmin, token });
            }
        });
    });
});

app.get('/api/Bookings', (req, res) => {
    let sql = "SELECT * FROM GetBookings";
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.field && queryObject.type)
        sql += ` WHERE ${queryObject.field} = '${queryObject.type}'`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

app.get('/api/GetSpecialties', (req, res) => {
    const sql = "SELECT * FROM Specialty ORDER BY SpecialtyName";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

app.post('/api/AddDoctor', (req, res) => {
    const data = req.body;
    if (!data.DoctorName || !data.email || !data.SpecialtyID || !data.DegreeID || !data.MobileNo) {
        return res.status(400).send('Required field is missing');
    }
    const sql = `INSERT INTO Doctors (DoctorName, email, SpecialtyID, DegreeID, MobileNo) VALUES ('${data.DoctorName}', '${data.email}', ${data.SpecialtyID}, ${data.DegreeID}, ${data.MobileNo})`;
    db.run(sql, function (err) {
        if (err) throw err;
        res.send('Doctor inserted successfully!');
    });
});

app.post('/api/AddSpecialty', (req, res) => {
    const data = req.body;
    if (!data.SpecialtyName) {
        return res.status(400).send('Specialty Name is required');
    }
    const sql = `INSERT INTO Specialty (SpecialtyName) VALUES ('${data.SpecialtyName}')`;
    db.run(sql, function (err) {
        if (err) throw err;
        res.send('Specialty inserted successfully!');
    });
});

app.post('/api/AddDegree', (req, res) => {
    const data = req.body;
    if (!data.DegreeName) {
        return res.status(400).send('Degree Name is required');
    }
    const sql = `INSERT INTO Degree (DegreeName) VALUES ('${data.DegreeName}')`;
    db.run(sql, function (err) {
        if (err) throw err;
        res.send('Degree inserted successfully!');
    });
});

console.log('App created.');
app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Server is running on port ${port}`);
});


