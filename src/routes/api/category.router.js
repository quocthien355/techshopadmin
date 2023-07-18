var express = require('express');
const { addCategory, getAllCategory, updateCategory } = require('../../controllers/category.controller');
var router = express.Router();

router.post('/add-category', addCategory)
router.get('/get-all-category', getAllCategory)
router.put('/update-category/:id', updateCategory)

module.exports = router