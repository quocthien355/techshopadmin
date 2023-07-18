var express = require('express');
var router = express.Router();
var customerController=require('../../controllers/customer.controller');

router.post('/register', customerController.register);
router.post('/login', customerController.login);
// router.delete('/delete-pc/:id', ProductCategoryController.deleteProductCategory);
// router.get('/get-all-pc', ProductCategoryController.getAllProductCategory);
module.exports=router