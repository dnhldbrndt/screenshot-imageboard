var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const port = 5000;
const session = require('express-session')




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var modsRouter = require('./routes/mods');
var imagesRouter = require('./routes/images');
var app = express();


// uploads path
const uploadPath = '/upload/'

// Verify jwt
const Blacklist = require('../models/blacklist');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    fileUpload({
		createParentPath: true,
        limits: {
            fileSize: 5000000, // Around 5MB
        },
        abortOnLimit: true,
    })
);

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/image', imagesRouter);

// auth routes
app.use("/mod",session({secret:"fingerprint_auth",resave: true, saveUninitialized: true}))
app.use("/mod/auth/*", function auth(req,res,next){
    if (req.session.authorization) {
		token = req.session.authorization['accessToken'];
		
		const checkBlackList = Blacklist.findOne({token: token});
		console.log(typeof(checkBlackList));
 
		if (checkBlackList.token !== undefined) { return res.status(401).json({message: "Session expired." }); }

        jwt.verify(token, "access", (err,user)=> {
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({message: "User not authenticated"})
            }
        });
    } else {
        return res.status(403).json({message: "User not logged in"})
    }
});
app.use('/mod', modsRouter);


// test routes
app.get('/ass', (req, res) => {
  res.json({ message: "Hello from Express!", cookie: "I tell him to eat the cookie because it's good form."});
});

app.post('/uploadtest', (req, res) => {
	console.log(req.files);
    // Get the file that was set to our field named "image"
    const img = req.files.image;
    if (!img) return res.sendStatus(400);
    img.mv(__dirname + uploadPath + img.name);

	data = req.body;
	const newid = 4;
	const fullfilename = uploadPath + img.name;
	const Screenshot = new Screenshots ({
		"id": newid,
		"title": data['title'],
		"film": data['film'],
		"imgsrc": fullfilename,
	});
	console.log(Screenshot.title);
	console.log(Screenshot.film);
	console.log(Screenshot.imgsrc);
    res.sendStatus(200);
});

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

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


module.exports = app;
