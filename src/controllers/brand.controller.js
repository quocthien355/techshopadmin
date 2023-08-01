const e = require("express");
const { addBrand, getAllBrand, updateBrand, getBrandById } = require("../services/brand.service");


module.exports.addBrand = async (req, res, next) => {
    try {
        const { name } = req.params;
        if (name) {
            const result = await addBrand(name);
            if (result) {
                return res.json({
                    status: true,
                    message: 'Create brand success!!',
                    data: {
                        brand_id: result.insertId
                    }

                });
            } else {
                return res.json({
                    status: false,
                    message: 'Create brand fail !!',

                });
            }
        } else {
            return    res.status(400).json({
                status: false,
                message: 'Field brand_name  is null !!',

            });
        }
    } catch (error) {
        console.log(error);
        return    res.status(500).json({
            status: false,
            message: error.message,

        });
    }

}
module.exports.getAllBrand = async (req, res, next) => {
    try {
        let brands = await getAllBrand();
        if (brands) {
            brands = await JSON.parse(JSON.stringify(brands));

            res.json({
                status: true,
                message: 'Get ok!!',
                data: {
                    brands
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

module.exports.updateBrand = async (req, res, next) => {
    try {
        const { id,name } = req.params;
        let result = await updateBrand(id, name)
        if (result) {
            const brand = await getBrandById(id);

            res.json({
                status: true,
                message: ' Update ok !!',
                data: {
                    brand
                }
                ,
            });
        } else {
            res.status(400).json({
                status: false,
                message: 'Update fail !!',

            });
        }
    } catch (error) {
        console.log(error);
        return    res.status(500).json({
            status: false,
            message: error.message,

        });
    }

}
module.exports.showListBrand = async (req, res, next) => {
    try {
        const brands = await getAllBrand();
        res.render('list_product_brands', { brands })
    } catch (error) {
        console.log(error.message);
        res.render('list_product_brands')
    }
}