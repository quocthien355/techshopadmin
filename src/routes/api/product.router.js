var express=require('express');
const { getAllProduct, getProductById } = require('../../controllers/product.controller');
var router=express.Router();


router.get('/get-list-products',getAllProduct);

router.get('/get-product-by-id/:id',getProductById)
module.exports=router
