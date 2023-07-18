var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../../middlewares/auth.middleware');
var isAuth = AuthMiddleware.isAuth

/* GET home page. */
router.get('/', isAuth, function (req, res, next) {
  var user = req.cookies.user
  res.render('home', { user })
});

module.exports = router;
