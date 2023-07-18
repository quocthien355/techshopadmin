var db = require('../config/connect.mysql.config');

// create table customer
var sqlImageProduct = "CREATE TABLE if not EXISTS images_products (" +
    " image_id INT  PRIMARY KEY AUTO_INCREMENT NOT NULL," +
    " url VARCHAR(255) NOT NULL," +
    " product_id INT NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
    " FOREIGN KEY (product_id) REFERENCES products(product_id));"

db.query(sqlImageProduct, function (error, results, fields) {
    if (error) {
        console.log(error.message);
    } else {
        // console.log(results);

    }
})

module.exports.addImages = (images) => {

    const sql = 'INSERT INTO customers SET ? '

    return new Promise((resolve, reject) => {
        db.query(sql, images, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.getAllImage = () => {
    const sql = 'SELECT*FROM images_products;'

    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}