var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
var isAuth = AuthMiddleware.isAuth

router.get('/list-product-categories', (req, res, next) => {
  res.render('list_product_categories')
})
router.get('/add-product-category', (req, res, next) => {
  res.render('add_product_category')
})

module.exports = router;
