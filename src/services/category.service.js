const { getAllCategory, addCategory, updateCategory, getCategoryById } = require("../models/category.model")



module.exports.getAllCategory=()=>{
    return getAllCategory()
}
module.exports.addCategory=(category_name)=>{
    return addCategory(category_name)
}

module.exports.updateCategory=(id,category_name)=>{
    return updateCategory(id,category_name)
}

module.exports.getCategoryById=(id)=>{
    return getCategoryById(id);
}