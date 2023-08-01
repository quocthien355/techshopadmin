var express = require('express');
const { getAllImage } = require('../../controllers/image.controller');
const upload = require('../../middlewares/upload.middeware');
const { uploadImage } = require('../../services/image.service');
var router = express.Router();


router.get('/get-list-images', getAllImage);
router.post('/upload', [upload.array('image')], async (req, res, next) => {
    try {
        const { files } = req;   
       if(files.length>0){
        let imageUrls = []
        for await (const file of files) {
            imageUrls.push({ url: await uploadImage(file) });
        }

        console.log('File successfully uploaded.');
        return res.json({
            message: "uploaded !!!",
            urls: imageUrls
        })
       }else{
        return res.json({
            message: "upload fail : no file",
         
        })
       }




    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "upload fail !!!",

        })
    }
});

module.exports = router
