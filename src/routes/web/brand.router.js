var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
var isAuth = AuthMiddleware.isAuth

router.get('/list-product-brands', (req, res, next) => {
  res.render('list_product_brands')

})
router.get('/add-product-brand', (req, res, next) => {
  res.render('add_product_brand')
})

module.exports = router;
