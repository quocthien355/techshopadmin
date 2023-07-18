var express = require('express');
var router = express.Router();
var CustomerController=require("../../controllers/customer.controller")

/* GET home page. */
router.get('/login', function(req, res, next) {

  res.render('login', {layout:'other', error: req.cookies.error });
  res.clearCookie("error")
});
router.post('/login',CustomerController.loginWebAdmin)

module.exports = router;
