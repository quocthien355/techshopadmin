var db = require('../config/connect.mysql.config');

// create table brand
var sqlBrand = "	CREATE TABLE IF NOT EXISTS  brands (" +
    "     brand_id INT  PRIMARY KEY AUTO_INCREMENT NOT NULL," +
    "    brand_name VARCHAR(50) NOT NULL    ); "

db.query(sqlBrand, function (error, results, fields) {
    if (error) {
        console.log(error.message);
    } else {
        // console.log(results);

    }
})

module.exports.addBrand = (brand_name) => {

    const sql = "INSERT INTO brands  ( brand_name) values ( ? ); " 

    return new Promise((resolve, reject) => {
        db.query(sql, brand_name, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.getBrandById = (id) => {

    const sql = "SELECT * FROM brands WHERE brand_id = " + id

    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.updateBrand = (id, brand_name) => {

    const sql = "UPDATE  brands SET brand_name= ? WHERE brand_id = " + id

    return new Promise((resolve, reject) => {
        db.query(sql, brand_name, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.getAllBrand = () => {
    const sql = 'SELECT brand_id,brand_name FROM brands '

    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}
