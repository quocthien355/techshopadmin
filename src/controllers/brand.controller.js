const e = require("express");
const { addBrand, getAllBrand, updateBrand, getBrandById } = require("../services/brand.service");


module.exports.addBrand = async (req, res, next) => {
    try {
        const { brand_name } = req.body;
        if (brand_name) {
            const result = await addBrand(brand_name);
            if (result) {
                return res.json({
                    status: true,
                    message: 'Create brand success!!',

                });
            } else {
                return res.json({
                    status: false,
                    message: 'Create brand fail !!',

                });
            }
        } else {
            return res.json({
                status: false,
                message: 'Field brand_name  is null !!',

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
        const { brand_name } = req.body;
        const { id } = req.params;
        let result = await updateBrand(id, brand_name)
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