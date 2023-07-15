var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListProducts } = require('../../controllers/product.controller');
var isAuth = AuthMiddleware.isAuth

router.get('/list-products',showListProducts)

router.get('/add-product', (req, res, next) => {
  res.render('add_product',{layout:'main.hbs'})
})

module.exports = router;
