
const { getAllCategory } = require('../services/category.service');
const { getAllBrand } = require('../services/brand.service');
const { getAllProduct, addProduct, getProductById } = require('../services/product.service');
const { addImage, getAllImage, uploadImage, getImageByIdProduct } = require('../services/image.service');

module.exports.getAllProduct = async (req, res, next) => {
    try {
        let products = await getAllProduct();
        products = await JSON.parse(JSON.stringify(products));
        let images = await getAllImage();
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
        let products = await getAllProduct();
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
module.exports.showFormAddProduct = async (req, res, next) => {
    try {
        const categories = await getAllCategory();
        const brands = await getAllBrand();
        res.render('add_product', { layout: 'main.hbs', brands, categories })
    } catch (error) {
        console.log(error.message);
    }
}
module.exports.addProduct = async (req, res, next) => {
    try {
        //add product
        const product = await JSON.parse(JSON.stringify(req.body));
        const result = await addProduct(product.product_name, product.price, product.description, product.quantity, product.category_id, product.brand_id);
        if (result) {
            // add images
            const { files } = req;
            if (files.length > 0) {
                // console.log(files);
                let image_urls = [];
                files.forEach(async file => {
                    const url = await uploadImage(file)

                    await addImage(url, result.insertId);
                    image_urls.push({ url: url });
                });
                console.log(image_urls);
                res.status(200).json({
                    status: true,
                    message: "Add product success!!!"
                })
            }
        } else {
            res.status(400).json({
                status: false,
                message: "Add product fail!!!"
            })
        }




    } catch (error) {
        console.log(">>ERROR:::::::::" + error.message);
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
module.exports.editProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categories = await getAllCategory();
        const brands = await getAllBrand();
        let product = await getProductById(id);
        console.log(product);
        res.render('edit_product', { layout: 'main.hbs', product: product[0], brands, categories });

    } catch (error) {
        console.log(error.message);

    }
}
module.exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let product = await getProductById(id);
        product = await JSON.parse(JSON.stringify(product));
        let images = await getImageByIdProduct(id);
        images = await JSON.parse(JSON.stringify(images));

        product.push({ images: images })

        res.status(200).json({
            status: true,
            message: "Get ok!!!",
            data: {
                product
            }
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

}