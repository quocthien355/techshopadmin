var db = require('../config/connect.mysql.config');
const { initializeApp } = require('firebase/app')
const { ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

const { firebaseConfig, storage } = require('../config/firebase.config');

//Initialize a firebase application
initializeApp(firebaseConfig);


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

module.exports.addImage = (url, product_id) => {

    const sql = 'INSERT INTO images_products (url,product_id) VALUES(?,?); '

    return new Promise((resolve, reject) => {
        db.query(sql, [url, product_id], (error, results) => {
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

module.exports.getImageByIdProduct = (id) => {
    const sql = 'SELECT *FROM images_products WHERE product_id=?;'

    return new Promise((resolve, reject) => {
        db.query(sql, id, (error, results) => {
            if (error) { reject(error); }
            resolve(results);
        });
    });
}
module.exports.uploadImage = async (file) => {
    const time = Date.now()
    // console.log(file);
    const storageRef = ref(storage, "images/" + time + "-" + file.originalname);
    const metadata = {
        contentType: file.mimetype,
    };
    // Upload the file in the bucket storage
    // console.log('Array:', file.buffer);

    const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
    );
    // Grab the public url
    return await getDownloadURL(snapshot.ref);

}