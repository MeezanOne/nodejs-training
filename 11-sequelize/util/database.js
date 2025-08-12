const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs',
    password:'Meezan!23$'
})

module.exports = pool.promise();