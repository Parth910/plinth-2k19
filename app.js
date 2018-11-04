require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./authenticate');


// database connect
var DBconfig = require('./config/dbconfig')
mongoose.Promise = global.Promise;
mongoose.connect(DBconfig.url, { useMongoClient: true });
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('connected to db server successfully');
});
// done


var routes = require('./routes/index');
var user = require('./routes/user');
var ex = require('./routes/404');

var app = express();

//passport

app.use(passport.initialize());


// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');


app.use('*/js', express.static(path.join(__dirname, 'public/js')))
app.use('*/css', express.static(path.join(__dirname, 'public/css')))
app.use('*/media', express.static(path.join(__dirname, 'public/media')))
app.use('*/fonts', express.static(path.join(__dirname, 'public/fonts')))

app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public/media/fav', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', user);
app.use('/*', ex);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error_dev', {
		message: err.message,
		error: err
	  });
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		if(err.status === 401){
			res.end(err.message);
		  //   res.render('error_401', {
		  //     message: err.message,
		  //     "isLoggedIn" : isLoggedIn,
		  //   });
		}
		res.redirect('/');
	});
}

module.exports = app;