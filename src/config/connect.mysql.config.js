var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USE,
    password: process.env.PASSWORD,
    database: process.env.DATABASENAME

});
connection.connect(function (err) {
    if (err) {
        console.log(err.message);
    }
    console.log('Database Connected!!!')
})

module.exports = connection;
