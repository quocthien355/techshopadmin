var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListBrand, addBrand, updateBrand } = require('../../controllers/brand.controller');
var isAuth = AuthMiddleware.isAuth

router.get('/list-product-brands',showListBrand)
router.post('/add-product-brand/:name', addBrand)

router.post('/edit-product-brand/:id/:name', updateBrand)

module.exports = router;
