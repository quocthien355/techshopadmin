var express=require('express');
const { getAllImage } = require('../../controllers/image.controller');
var router=express.Router();


router.get('/get-list-images',getAllImage)
module.exports=router
