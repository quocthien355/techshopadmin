var productModel = require('../models/product.model');

module.exports.getAllProduct = () => {
  return productModel.getAllProduct();
}
module.exports.addProduct = (product_name, price, description, quantity, category_id, brand_id) => {
  return productModel.addProduct(product_name, price, description, quantity, category_id, brand_id)
}