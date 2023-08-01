var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListCategory, addCategory, updateCategory } = require('../../controllers/category.controller');
var isAuth = AuthMiddleware.isAuth

router.get('/list-product-categories',showListCategory);
router.post('/add-product-category/:name',addCategory);

router.post('/edit-product-category/:id/:name',updateCategory)

module.exports = router;
