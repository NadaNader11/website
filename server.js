const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;
const sqlite = require('sqlite3').verbose();
var url = require('url');
const db = new sqlite.Database("./booking.db",sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    console.log('Connected to the database.');
}) ;
const cors = require('cors');
app.use(cors());
app.use(bodyparser.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));  

app.get('/api/Bookings', (req, res) => {
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
app.get('/api/GetSpecialties', (req, res) => {
    var sql = "SELECT * FROM Specialty order by SpecialtyName";
    console.log(req.url);
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});


app.post('/api/AddDoctor', (req, res) => {
    const data = req.body;
    console.log("Body=" + req.body);
    console.log(data);
    if (data.DoctorName == undefined || data.email == undefined || data.SpecialtyID == undefined || data.DegreeID == undefined || data.DegreeID == undefined) {
        res.status(400).send('Required field is missing');
    } else {

    }
    var sql = "INSERT INTO Doctors (DoctorName,email,SpecialtyID,DegreeID,MobileNo) VALUES('" + data.DoctorName + "','" + data.email + "'," + data.SpecialtyID + "," + data.DegreeID + "," + data.MobileNo + ");";
    console.log(sql);
    db.run(sql, function (err, result) {
        if (err) throw err;
        console.log("Doctor inserted successfully");
        // Send a response
        res.send('Doctor inserted successfully!');
     });
  });


  app.post('/api/AddSpecialty', (req, res) => {
    const data = req.body;
    console.log("Body=" + req.body);
    console.log(data);
    if (data.SpecialtyName == undefined) {
        res.status(400).send('Specialty Name is required');
    } else {
        var sql = "INSERT INTO Specialty (SpecialtyName) VALUES('" + data.SpecialtyName + "');";
        console.log(req.url);
        db.run(sql, function (err, result) {
            if (err) throw err;
            // Send a response
            console.log("Specialty inserted successfully");
            res.send('Specialty received successfully!');
         });
    }
     
    
  });
  app.post('/api/AddDegree', (req, res) => {
    const data = req.body;
    console.log("Body=" + req.body);
    console.log(data);  
    if (data.DegreeName == undefined) {
        res.status(400).send('Degree Name is required');
    } else {
        
        var sql = "INSERT INTO Degree (DegreeName) VALUES('" + data.DegreeName + "');";
        
        db.run(sql, function (err, result) {
            if (err) throw err;
            console.log("Degree inserted successfully");
            // Send a response
            res.send('Degree inserted successfully!');
        });      
    }
  });
console.log('App created.');
app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Server is running on port ${port}`);
}) ;

