var express = require('express');
const { getAllImage } = require('../../controllers/image.controller');
const upload = require('../../middlewares/upload.middeware');
var router = express.Router();


router.get('/get-list-images', getAllImage);
router.post('/upload', [upload.array('image', 3)], async (req, res, next) => {
    try {
        const { files } = req;
        console.log(files);
        let image_urls = [];
        files.forEach(file => {
            const image = file ? file.filename : "";
            const url = image ? "http://localhost:3000/uploads/" + image : "";
            image_urls.push({ url: url });
        });

        res.json({
            message: "uploaded !!!",
            images: image_urls
        })
    } catch (error) {
        console.log(error.message);
    }
});
module.exports = router
