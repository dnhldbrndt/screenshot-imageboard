var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const port = 5000;
const session = require('express-session');

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var modsRouter = require('./routes/mods');
var imagesRouter = require('./routes/images');
var app = express();

// Uploads path
const uploadPath = '/upload/';

// Verify jwt
const Blacklist = require('./models/blacklist');

// View engine setup
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

// Session middleware
app.use(session({ secret: 'fingerprint_auth', resave: true, saveUninitialized: true }));

// Auth middleware
app.use("/mod/auth/*", async function auth(req, res, next) {
  console.log("Auth middleware executed");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Token received:", token);

  if (!token) {
    console.log("No token found");
    return res.status(403).json({ message: "User not logged in" });
  }

  try {
    const checkBlackList = await Blacklist.findOne({ token: token });
    console.log("Checked blacklist:", checkBlackList);

    if (checkBlackList) {
      console.log("Token is blacklisted");
      return res.status(401).json({ message: "Session expired." });
    }

    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        console.log("Token verified successfully", user);
        next();
      } else {
        console.log("Token verification failed", err);
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/image', imagesRouter);
app.use('/mod', modsRouter);

// Test routes
app.get('/ass', (req, res) => {
    res.json({ message: "Hello from Express!", cookie: "I tell him to eat the cookie because it's good form." });
});

app.post('/uploadtest', (req, res) => {
    console.log(req.files);
    const img = req.files.image;
    if (!img) return res.sendStatus(400);
    img.mv(__dirname + uploadPath + img.name);

    const data = req.body;
    const newid = 4;
    const fullfilename = uploadPath + img.name;
    const Screenshot = new Screenshots({
        id: newid,
        title: data['title'],
        film: data['film'],
        imgsrc: fullfilename,
    });
    console.log(Screenshot.title);
    console.log(Screenshot.film);
    console.log(Screenshot.imgsrc);
    res.sendStatus(200);
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;