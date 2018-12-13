var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index.route');
var usersRoute = require('./routes/user.route');

// mongoose.connect('mongodb://localhost:27017/longinapp');
// var db = mongoose.connection;

// express init
var app = express();

// view engine
app.set('view engine', 'pug');
app.set('views', './views');

// bodyparser middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// set static foler
app.use(express.static('public'));

// express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// express vadidator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// connect flash
app.use(flash());

// global vars
app.use(function(req, res, next){
    app.locals.success_msg = req.flash('success_msg');
    app.locals.error_msg = req.flash('error_msg');
    app.locals.error = req.flash('error');
    next();
});

app.use('/', routes);
app.use('/users', usersRoute);

// set port
var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Server is runnning on port: ' + port);
});
