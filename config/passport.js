var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user.model');
var config = require('../config/db');

module.exports = function (passport) {

    var opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.getUserById({ id: jwt_payload._doc._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};


// var LocalStrategy = require('passport-local').Strategy;
// var User = require('../models/user.model.js');

// module.exports = function (passport) {
//     passport.serializeUser(function (user, done) {
//         done(null, user.id);
//     });

//     passport.deserializeUser(function (id, done) {
//         User.findById(id, function (err, user) {
//             done(err, user);
//         });
//     });

//     passport.use('register', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//         function (req, email, password, done) {
//             User.findOne({ email: email }, function (err, user) {
//                 if (err) { return done(err); }
//                 if (user) {
//                     return done(null, false, req.flash('registerMessge', 'Email is ready taken.'));
//                 } else {
//                     var newUser = new User();
//                     newUser.email = email;
//                     newUser.passport = newUser.gnerateHash(password);
//                 }
//                 newUser.save(function (err) {
//                     if (err) throw err;
//                     return done(null, newUser);
//                 });
//             });
//         }
//     ));

//     passport.use('login', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//         function (req, email, password, done) {
//             User.findOne({ email: email }, function (err, user) {
//                 if (err) { return done(err); }
//                 if (!user) {
//                     return done(null, false, req.flash('loginMessge', 'Incorrect username.'));
//                 }
//                 if (!user.validPassword(password)) {
//                     return done(null, false, req.flash('loginMessge', 'Incorrect password.'));
//                 }
//                 return done(null, user);
//             });
//         }
//     ));

// };