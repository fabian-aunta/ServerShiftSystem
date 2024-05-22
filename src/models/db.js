const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'sistur',
    password: 'sistur_pwd',
    database: 'sistema_turnos'
});

module.exports = connection;