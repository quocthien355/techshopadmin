const { getAllBrand, addBrand, updateBrand, getBrandById } = require("../models/brand.model")


module.exports.getAllBrand=()=>{
    return getAllBrand()
}
module.exports.addBrand=(brand_name)=>{
    return addBrand(brand_name)
}

module.exports.updateBrand=(id,brand_name)=>{
    return updateBrand(id,brand_name)
}

module.exports.getBrandById=(id)=>{
    return getBrandById(id);
}