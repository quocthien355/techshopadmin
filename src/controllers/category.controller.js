const e = require("express");
const { addCategory, getAllCategory, updateCategory, getCategoryById } = require("../services/category.service");


module.exports.addCategory = async (req, res, next) => {
    try {
        const {name} = req.params;
        console.log(":::::::::::::::::::"+name);
        if (name) {
            const result = await addCategory(name);
            if (result) {
                return res.json({
                    status: true,
                    message: 'Create category success!!',

                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Create category fail !!',

                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: 'Field category_name  is null !!',

            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: error.message,

        });
    }

}
module.exports.getAllCategory = async (req, res, next) => {
    try {
        let categories = await getAllCategory();
        if (categories) {
            categories = await JSON.parse(JSON.stringify(categories));

            res.json({
                status: true,
                message: 'Get ok!!',
                data: {
                    categories
                }
                ,
            });
        } else {
            res.json({
                status: false,
                message: 'Get fail !!',
                data: {

                }
                ,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            message: error.message,

        });
    }

}

module.exports.updateCategory = async (req, res, next) => {
    try {
        const { name ,id} = req.params;
        let result = await updateCategory(id,name)
        if (result) {
            const category = await getCategoryById(id);

            res.json({
                status: true,
                message: ' Update ok !!',
                data: {
                    category
                }
                ,
            });
        } else {
            res.json({
                status: false,
                message: 'Update fail !!',

            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            message: error.message,

        });
    }

}
module.exports.showListCategory = async (req, res, next) => {
    try {
        const categories = await getAllCategory();
        res.render('list_product_categories', { categories });
    } catch (error) {
        console.log(error.message);
        res.render('list_product_categories');
    }
}