const { getAllImage, addImage, uploadImage, getImageByIdProduct } = require("../models/image.model")

module.exports.getAllImage = () => {
    return getAllImage();
}

module.exports.addImage = (url, product_id) => {
    return addImage(url, product_id);
}
module.exports.uploadImage = (file) => {
    return uploadImage(file);

}
module.exports.getImageByIdProduct=(id)=>{
    return getImageByIdProduct(id);
}