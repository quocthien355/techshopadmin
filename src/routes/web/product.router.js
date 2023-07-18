var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
const { showListProducts, showFormAddproduct } = require('../../controllers/product.controller');
const  upload  = require('../../middlewares/upload.middeware');
var isAuth = AuthMiddleware.isAuth

router.get('/list-products', showListProducts)

router.get('/add-product',showFormAddproduct)
router.post('/upload-images', [upload.array('file', 3)], async (req, res, next) => {
  try {
    const { files } = req;
    console.log(files);
    let image_urls = [];
    files.forEach(file => {
      const image = file ? file.filename : "";
      const url = image ? "http://localhost:3000/uploads/" + image : "";
      image_urls.push({ url: url });
    });

    res.json({
      message: "uploaded !!!",
      images: image_urls
    })
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
