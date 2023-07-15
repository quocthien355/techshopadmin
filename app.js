var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('hbs')
var { engine } = require('express-handlebars')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

//api router
var authAPIRouter = require('./src/routes/api/auth.router');
var productAPIRouter = require('./src/routes/api/product.router');
var imageAPIRouter = require('./src/routes/api/image.router');
// web router
var authWebRouter = require('./src/routes/web/auth.router')
var indexWebRouter = require('./src/routes/web/index.router');
var productRouter = require('./src/routes/web/product.router');
var brandRouter = require('./src/routes/web/brand.router');
var categoryRouter = require('./src/routes/web/category.router');
var customerRouter = require('./src/routes/web/customer.router');
var orderRouter = require('./src/routes/web/order.router');
var feedbackRouter = require('./src/routes/web/feedback.router');
// database
var db = require('./src/config/connect.mysql.config');

var app = express();


// view engine setup
app.engine('hbs', engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

hbs.registerPartials(__dirname + "./src/views/partials");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// API router

app.use('/api/auth', authAPIRouter)
app.use('/api/product', productAPIRouter)
app.use('/api/image', imageAPIRouter)
// Web 
app.use('/', indexWebRouter)
app.use('/auth', authWebRouter)
app.use('/product', productRouter)
app.use('/brand', brandRouter)
app.use('/category', categoryRouter)
app.use('/customer', customerRouter)
app.use('/order', orderRouter)
app.use('/feedback', feedbackRouter)





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (err.status == 404) {

    res.render('error404', { layout: 'other' });
  }
  if (err.status == 500) {

    res.render('error500', { layout: 'other' });
  }

});
var server = app.listen(process.env.PORT || '5000', () => {
  console.log('Ready on port ' + server.address().port);
})
module.exports = app;
