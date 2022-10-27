const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user:'student',
    password: 'bootcamp',
    database: 'business'
},
console.log('Connected to database'));

module.exports = db;