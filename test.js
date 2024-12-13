const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db_access = require('./database.js');
const db = db_access.db;
const cookieParser = require('cookie-parser');
const server = express();
const port = 3000;
const secret_key = 'nsnsnsnsnsn';

server.use(cors({ 
    origin: "http://localhost:3000",
    credentials: true
}));
server.use(express.json());
server.use(cookieParser());

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, secret_key, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('unauthorized');
    
    jwt.verify(token, secret_key, (err, details) => {
        if (err) return res.status(403).send('invalid or expired token');
        req.userDetails = details;
        next();
    });
};

server.post('/user/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.get(`SELECT * FROM Doctors WHERE EMAIL = ?`, [email], (err, row) => {
        if (err || !row) return res.status(401).send('Invalid credentials');

        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) return res.status(500).send('Error comparing password.');
            if (!isMatch) return res.status(401).send('Invalid credentials');

            const token = generateToken(row.ID, row.ISADMIN);
            res.cookie('authToken', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expiresIn: '1h'
            });
            return res.status(200).json({ id: row.ID, admin: row.ISADMIN });
        });
    });
});

server.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing password');

        db.run(`INSERT INTO Doctors (NAME, EMAIL, PASSWORD, ISADMIN) VALUES (?, ?, ?, ?)`, [name, email, hashedPassword, 0], (err) => {
            if (err) return res.status(401).send(err);
            return res.status(200).send('Registration successful');
        });
    });
});

server.post('/appointments/book', verifyToken, (req, res) => {
    const { doctorID, date, time } = req.body;
    const userID = req.userDetails.id;

    db.run(`INSERT INTO Booking (USER_ID, DOCTOR_ID, DATE, TIME) VALUES (?, ?, ?, ?)`, [userID, doctorID, date, time], (err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send('Appointment booked successfully');
    });
});

server.get('/Bookings', verifyToken, (req, res) => {
    const userID = req.userDetails.id;

    db.all(`SELECT * FROM Booking WHERE USER_ID = ?`, [userID], (err, rows) => {
        if (err) return res.status(500).send(err);
        return res.json(rows);
    });
});
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db_access = require('./database.js');
const db = db_access.db;
const cookieParser = require('cookie-parser');
const server = express();
const port = 3000;
const secret_key = 'nsnsnsnsnsn';

server.use(cors({ 
    origin: "http://localhost:3000",
    credentials: true
}));
server.use(express.json());
server.use(cookieParser());

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, secret_key, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('unauthorized');
    
    jwt.verify(token, secret_key, (err, details) => {
        if (err) return res.status(403).send('invalid or expired token');
        req.userDetails = details;
        next();
    });
};

server.post('/user/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.get(`SELECT * FROM Doctors WHERE EMAIL = ?`, [email], (err, row) => {
        if (err || !row) return res.status(401).send('Invalid credentials');

        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) return res.status(500).send('Error comparing password.');
            if (!isMatch) return res.status(401).send('Invalid credentials');

            const token = generateToken(row.ID, row.ISADMIN);
            res.cookie('authToken', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expiresIn: '1h'
            });
            return res.status(200).json({ id: row.ID, admin: row.ISADMIN });
        });
    });
});

server.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing password');

        db.run(`INSERT INTO Doctors (NAME, EMAIL, PASSWORD, ISADMIN) VALUES (?, ?, ?, ?)`, [name, email, hashedPassword, 0], (err) => {
            if (err) return res.status(401).send(err);
            return res.status(200).send('Registration successful');
        });
    });
});

server.post('/appointments/book', verifyToken, (req, res) => {
    const { doctorID, date, time } = req.body;
    const userID = req.userDetails.id;

    db.run(`INSERT INTO Booking (USER_ID, DOCTOR_ID, DATE, TIME) VALUES (?, ?, ?, ?)`, [userID, doctorID, date, time], (err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send('Appointment booked successfully');
    });
});

server.get('/appointments', verifyToken, (req, res) => {
    const userID = req.userDetails.id;

    db.all(`SELECT * FROM Booking WHERE USER_ID = ?`, [userID], (err, rows) => {
        if (err) return res.status(500).send(err);
        return res.json(rows);
    });
});
server.get('/Bookings', (req, res) => {
    var sql = "SELECT * FROM GetBookings";
    console.log(req.url);
    const queryObject = url.parse(req.url, true).query;
    if (queryObject.field && queryObject.type)
        sql += ` where ${queryObject.field}= '${queryObject.type}'`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});
server.get('/doctors', (req, res) => {
    db.all(`SELECT * FROM Doctors`, (err, rows) => {
        if (err) return res.status(500).send(err);
        return res.json(rows);
    });
});

server.listen(port, () => {
    const port = 3000;
    console.log(`Server started at port ${port}`);
    db.serialize(() => {
        db.run(db_access.createDoctorsTable, (err) => {
            if (err) console.log('Error creating Doctors table:', err);
        });
        db.run(db_access.createBookingTable, (err) => {
            if (err) console.log('Error creating Booking table:', err);
        });
    });
});


   

server.get('/doctors', (req, res) => {
    db.all(`SELECT * FROM Doctors`, (err, rows) => {
        if (err) return res.status(500).send(err);
        return res.json(rows);
    });
});

server.listen(port, () => {
    const port = 3000;
    console.log(`Server started at port ${port}`);
    db.serialize(() => {
        db.run(db_access.createDoctorsTable, (err) => {
            if (err) console.log('Error creating Doctors table:', err);
        });
        db.run(db_access.createBookingTable, (err) => {
            if (err) console.log('Error creating Booking table:', err);
        });
    });
});


   
