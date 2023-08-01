var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
var isAuth = AuthMiddleware.isAuth

router.get('/list-feedbacks', (req, res, next) => {
  res.render('list_feedbacks')
})
module.exports = router;
