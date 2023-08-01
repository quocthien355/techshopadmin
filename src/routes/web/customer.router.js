var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListCustomer } = require('../../controllers/customer.controller');
var isAuth = AuthMiddleware.isAuth

router.get('/list-customers',showListCustomer)

module.exports = router;
