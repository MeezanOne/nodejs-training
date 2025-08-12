// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'nodejs',
//     password:'Meezan!23$'
// })

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs','root','Meezan!23$', {dialect: 'mysql',host:'localhost'});

module.exports = sequelize;