var express = require('express');
const { addBrand, getAllBrand, updateBrand } = require('../../controllers/brand.controller');
var router = express.Router();

router.post('/add-brand', addBrand)
router.get('/get-all-brand', getAllBrand)
router.put('/update-brand/:id',updateBrand)

module.exports = router