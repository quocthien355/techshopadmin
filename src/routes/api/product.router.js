var express=require('express');
const { getAllProduct } = require('../../controllers/product.controller');
var router=express.Router();


router.get('/get-list-products',getAllProduct)
module.exports=router
