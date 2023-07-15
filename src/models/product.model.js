var db = require('../config/connect.mysql.config');

// create table customer
var sqlProduct = "CREATE TABLE IF not EXISTS products (" +
    "  product_id INT  PRIMARY KEY AUTO_INCREMENT NOT NULL," +
    "  product_name VARCHAR(255) NOT NULL," +
    " price FLOAT NOT NULL," +
    " description VARCHAR(255) ," +
    " quantity INT NOT NULL," +
    " category_id INT NOT NULL," +
    " brand_id INT NOT NULL," +
    " created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
    " FOREIGN KEY (category_id) REFERENCES categories(category_id)," +
    " FOREIGN KEY (brand_id) REFERENCES brands(brand_id) );"

db.query(sqlProduct, function (error, results, fields) {
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
module.exports.getAllProduct=()=>{
    const sql= "SELECT product_id,product_name,price,quantity,category_name,brand_name,description FROM products,categories,brands WHERE products.brand_id=brands.brand_id AND products.category_id=categories.category_id"
    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });}
