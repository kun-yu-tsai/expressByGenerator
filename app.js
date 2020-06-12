var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose')

var app = express();

var mongoUrl = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// if above req keep passing with "next" (Represents not being handled.), we will enter here.
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var Schema = mongoose.Schema

var bookModel = mongoose.model('book', new Schema({
  name: String,
  author: String,
  published_date: Date
}))

var bookInstance = new bookModel({
  name: 'Book Name 5',
  author: "David",
  published_date: Date.now()
})

bookInstance.save(function (err) {
  if (err) return
  console.log("book instance saved")
})

var query = bookModel.find({ author: "David" })

query.exec(function (err, books) {
  if (err) return
  console.log(books)
})


module.exports = app
