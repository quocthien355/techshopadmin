var db = require('../config/connect.mysql.config');

// create table customer
var sqlProduct = "CREATE TABLE IF not EXISTS products (" +
    "  product_id INT  PRIMARY KEY AUTO_INCREMENT NOT NULL," +
    "  product_name VARCHAR(255) NOT NULL," +
    " price FLOAT NOT NULL," +
    " description LONGTEXT ," +
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

module.exports.addProduct = (product_name, price, description, quantity, category_id, brand_id) => {

    const sql = 'insert into products (product_name, price, description, quantity, category_id, brand_id) values (?,?, ?, ?, ?, ?); '

    return new Promise((resolve, reject) => {
        db.query(sql, [product_name, price, description, quantity, category_id, brand_id], (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}
module.exports.getAllProduct = () => {
    const sql = "SELECT product_id,product_name,price,quantity,category_name,brand_name,description FROM products,categories,brands WHERE products.brand_id=brands.brand_id AND products.category_id=categories.category_id"
    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}
module.exports.getProductById = (product_id) => {
    const sql = "SELECT product_id,product_name,price,quantity,categories.category_id,brands.brand_id,description FROM products,categories,brands WHERE products.brand_id=brands.brand_id AND products.category_id=categories.category_id AND product_id=?"
    return new Promise((resolve, reject) => {
        db.query(sql, product_id, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}

module.exports.editProduct = (product_name, price, description, quantity, category_id, brand_id,product_id) => {

    const sql = 'UPDATE products set product_name=?, price=?, description=?, quantity=?, category_id=?, brand_id=? WHERE product_id=?'

    return new Promise((resolve, reject) => {
        db.query(sql, [product_name, price, description, quantity, category_id, brand_id,product_id], (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });

}