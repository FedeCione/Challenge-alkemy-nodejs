let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let methodOverride = require("method-override");
let dotenv = require('dotenv');
dotenv.config()

// Routers
let indexRouter = require('./routes/indexRoutes');
let charactersRouter = require('./routes/charactersRoutes');
let genresRouter = require('./routes/genresRoutes');
let moviesRouter = require('./routes/moviesRoutes');
let usersRouter = require('./routes/usersRoutes');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride('_method'));

// Index
app.use('/', indexRouter);

// Users
app.use('/auth', usersRouter);

// Characters
app.use('/characters', charactersRouter);

// Movies
app.use('/movies', moviesRouter);

// Genres
app.use('/genres', genresRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
