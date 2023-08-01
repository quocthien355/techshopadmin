var db = require('../config/connect.mysql.config');

// create table categories
var sqlCategory = "CREATE TABLE IF NOT EXISTS categories ( " +
    "category_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL," +
    "category_name VARCHAR(50) NOT NULL );"

db.query(sqlCategory, function (error, results, fields) {
    if (error) {
        console.log(error.message);
    } else {
        // console.log(results);

    }
})

module.exports.getAllCategory = () => {
    const sql = "SELECT category_id,category_name FROM categories "
    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}

module.exports.addCategory = (category_name) => {

    const sql = "INSERT INTO categories  ( category_name) values ( ? );"

    return new Promise((resolve, reject) => {
        db.query(sql, category_name, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.getCategoryById = (id) => {

    const sql = "SELECT * FROM categories WHERE category_id = " + id

    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.updateCategory = (id, category_name) => {

    const sql = "UPDATE  categories SET category_name= ? WHERE category_id = " + id

    return new Promise((resolve, reject) => {
        db.query(sql, category_name, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
