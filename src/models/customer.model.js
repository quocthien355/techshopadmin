var db = require('../config/connect.mysql.config');

// create table customer
var sqlCustomer = "CREATE TABLE IF NOT EXISTS customers (  " +
    "_phone_number VARCHAR ( 10 ) PRIMARY KEY NOT NULL," +
    "gender VARCHAR ( 12 ) NOT NULL, " +
    "_password VARCHAR ( 255 ) NOT NULL," +
    "image VARCHAR ( 255 )," +
    "role VARCHAR ( 10 ) NOT NULL ," +
    "refresh_token VARCHAR ( 255 )  ," +
    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"

db.query(sqlCustomer, function (error, results, fields) {
    if (error) {
        console.log(error.message);
    } else {
        // console.log(results);

    }
})

module.exports.addCustomer = (customer) => {

    const sql = 'INSERT INTO customers SET ? '

    return new Promise((resolve, reject) => {
        db.query(sql, customer, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.getCustomer = (phone_number) => {
    const sql = 'SELECT*FROM customers WHERE _phone_number = ? '

    return new Promise((resolve, reject) => {
        db.query(sql, phone_number, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}
module.exports.updateRefreshToken = (refresh_token, phone_number) => {
    const sql = 'UPDATE  customers SET refresh_token =? WHERE  _phone_number = ?'

    return new Promise((resolve, reject) => {
        db.query(sql,[refresh_token, phone_number], (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}
