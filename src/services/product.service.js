var productModel = require('../models/product.model');

module.exports.getAllProduct = () => {
  return productModel.getAllProduct();
}
module.exports.addProduct = (product_name, price, description, quantity, category_id, brand_id) => {
  return productModel.addProduct(product_name, price, description, quantity, category_id, brand_id)
}
module.exports.getProductById = (product_id) => {
  return productModel.getProductById(product_id);

}
module.exports.editProduct = (product_name, price, description, quantity, category_id, brand_id, product_id) => {
  return productModel.editProduct(product_name, price, description, quantity, category_id, brand_id, product_id);
}