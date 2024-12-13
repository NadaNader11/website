const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const sqlite = require('sqlite3').verbose();
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
const cors = require('cors');
const secret_key = 'BhbsfvihobsiofbidhbfidsbfipsN';
const url = require('url');

const db = new sqlite.Database("./booking.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    console.log('Connected to the database.');
});

app.use(bodyparser.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ error: 'Invalid JSON payload' });
    }
    next();
});

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
    if (!token) return res.status(401).send('Unauthorized');
    jwt.verify(token, secret_key, (err, details) => {
        if (err) return res.status(403).send('Invalid or expired token');
        req.userDetails = details;
        next();
    });
};

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running and cookie-parser is working!' });
});

app.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM USER WHERE EMAIL=?`, [email], (err, row) => {
        if (err || !row) return res.status(401).send('Invalid credentials');
        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) return res.status(500).send('Error comparing password.');
            if (!isMatch) return res.status(401).send('Invalid credentials');
            const userID = row.ID;
            const isAdmin = row.ISADMIN;
            const token = generateToken(userID, isAdmin);

            res.cookie('authToken', token, {
                httpOnly: true,
                sameSite: 'lax', 
                secure: false, 
                maxAge: 3600000 
            });
            return res.status(200).json({ id: userID, admin: isAdmin, token });
        });
    });
});

app.get('/api/Bookings', (req, res) => {
    let sql = "SELECT * FROM GetBookings";
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.field && queryObject.type)
        sql += ` WHERE ${queryObject.field} = ?`;
    db.all(sql, [queryObject.type], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.get('/api/GetSpecialties', (req, res) => {
    const sql = "SELECT * FROM Specialty ORDER BY SpecialtyName";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.post('/api/AddDoctor', (req, res) => {
    const { DoctorName, email, SpecialtyID, DegreeID, MobileNo } = req.body;
    if (!DoctorName || !email || !SpecialtyID || !DegreeID || !MobileNo) {
        return res.status(400).send('Required field is missing');
    }
    const sql = `INSERT INTO Doctors (DoctorName, email, SpecialtyID, DegreeID, MobileNo) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [DoctorName, email, SpecialtyID, DegreeID, MobileNo], function (err) {
        if (err) return res.status(500).send(err.message);
        res.send('Doctor inserted successfully!');
    });
});

app.post('/api/AddSpecialty', (req, res) => {
    const { SpecialtyName } = req.body;
    if (!SpecialtyName) {
        return res.status(400).send('Specialty Name is required');
    }
    const sql = `INSERT INTO Specialty (SpecialtyName) VALUES (?)`;
    db.run(sql, [SpecialtyName], function (err) {
        if (err) return res.status(500).send(err.message);
        res.send('Specialty inserted successfully!');
    });
});

app.post('/api/AddDegree', (req, res) => {
    const { DegreeName } = req.body;
    if (!DegreeName) {
        return res.status(400).send('Degree Name is required');
    }
    const sql = `INSERT INTO Degree (DegreeName) VALUES (?)`;
    db.run(sql, [DegreeName], function (err) {
        if (err) return res.status(500).send(err.message);
        res.send('Degree inserted successfully!');
    });
});

console.log('App created.');
app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Server is running on port ${port}`);
});
