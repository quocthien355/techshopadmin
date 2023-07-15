var productModel = require('../models/product.model');

module.exports.getAllProduct = () => {
  return productModel.getAllProduct();
}
