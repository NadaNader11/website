// const express = require('express');
// const bodyparser = require('body-parser');
// const app = express();
// const port = 3000;
// const sqlite = require('sqlite3').verbose();
// var url = require('url');
// const db = new sqlite.Database("./booking.db", sqlite.OPEN_READWRITE, (err) => {
//     if (err) return console.error(err);
//     console.log('Connected to the database.');
// });
// const cors = require('cors');

// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }));

// app.use(bodyparser.json());

// // Get request
// app.get('http://localhost:3000/Booking', (req, res) => {
//     var sql = "SELECT * FROM GetBooking";
//     console.log(req.url);
//     const queryObject = url.parse(req.url, true).query;
//     if (queryObject.field && queryObject.type)
//         sql += ` where ${queryObject.field}= '${queryObject.type}'`;
//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({ data: rows });
//     });
// });

// console.log('App created.');

// app.listen(port, (err) => {
//     if (err) return console.error(err);
//     console.log(`Server is running on port ${3000}`);
// });





