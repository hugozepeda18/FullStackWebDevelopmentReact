const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var FacebookTokenStrategy = require('passport-facebook-token')

var config = require('./config')

exports.local = passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600})
}

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secretKey

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('JWT payload: ', jwt_payload)
    User.findOne( {id: jwt_payload._id}, (err, user) => {
        if(err) {
            return done(err, false)
        }
        else if (user) {
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt', {session: false})

exports.verifyAdmin =  (req, res, next) => {
    if (req.user.admin) {
      next();
    } else {
      let err = new Error(
        `You are not authorized to perform this operation [${req.method}]!`
      );
      err.status = 403; // not authorized
      next(err);
    }
};

exports.FacebookTokenStrategy = passport.use(new FacebookTokenStrategy({
    clientId: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    })
}
))