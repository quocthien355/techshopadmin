const productService = require('../services/product.service');
const imageService = require('../services/image.service');
const { getAllCategory } = require('../services/category.service');
const { getAllBrand } = require('../services/brand.service');

module.exports.getAllProduct = async (req, res, next) => {
    try {
        let products = await productService.getAllProduct();
        products = await JSON.parse(JSON.stringify(products));
        let images = await imageService.getAllImage();
        images = await JSON.parse(JSON.stringify(images));

        const list_product = []
        let count = 1;
        products.forEach(p => {
            const list_image = [];
            images.forEach(i => {
                if (p.product_id == i.product_id) {
                    list_image.push(i.url + "")

                }
            });
            list_product.push({ product: p, images: list_image })
            // console.log(count + ":::::" + list_image);
            count++;

        });

        if (products) {
            res.json({
                status: true,
                message: 'Get ok!!',
                data: {
                    list_product
                }
                ,
            });
        } else {
            res.json({
                status: false,
                message: 'Get fail!!',
                data: {

                }
                ,
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            status: false,
            message: 'Get fail!!',
            data: {

            }
            ,
        });
    }
}
module.exports.showListProducts = async (req, res, next) => {
    try {
        let products = await productService.getAllProduct();
        products = await JSON.parse(JSON.stringify(products));

        if (products) {
            res.render('list_products', { layout: 'main.hbs', products })
        } else {
            res.render('list_products', { layout: 'main.hbs' })
        }
    } catch (error) {
        console.log(error.message);
        res.render('list_products', { layout: 'main.hbs' })
    }
}
module.exports.showFormAddproduct = async (req, res, next) => {
    const categories = await getAllCategory();
    const brands = await getAllBrand();
    res.render('add_product', { layout: 'main.hbs', brands, categories })
}