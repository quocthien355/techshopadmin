var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListProducts, showFormAddProduct, addProduct, editProduct, getProductById,  } = require('../../controllers/product.controller');
const upload = require('../../middlewares/upload.middeware');
var isAuth = AuthMiddleware.isAuth

router.get('/list-products', showListProducts)

router.get('/add-product', showFormAddProduct)

router.post('/add-product', [upload.array('images', 12)], addProduct);

router.get('/edit-product/:id',editProduct );
module.exports = router;
