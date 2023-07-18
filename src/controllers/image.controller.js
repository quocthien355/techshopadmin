const { getAllImage } = require("../services/image.service")

module.exports.getAllImage = async (req, res, next) => {
    try {
        let images = await getAllImage();
        images = await JSON.parse(JSON.stringify(images));
        res.json({
            status: true,
            message: 'Get ok!!',
            data: {
                images
            }
            ,
        });
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