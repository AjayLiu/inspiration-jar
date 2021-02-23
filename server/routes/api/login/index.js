const login = require('express').Router();
// const pool = require('../../../db')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require("dotenv").config()
const {
    SESS_NAME,
    SESS_SECRET,
} = process.env;

const session = require('express-session')
login.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV==="production",
        maxAge: 1000 * 60 * 60 * 24 * 30 //30 days
    }
}))

login.use(passport.initialize())
login.use(passport.session())


passport.serializeUser((userInfo, done) => {
    done(null, userInfo);
})

passport.deserializeUser((obj, done) => {
    done(null, obj);
})

let user = {};

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.NODE_ENV === "production" ? 
            "https://inspirationjar.herokuapp.com/api/login/google/callback" : 
            "http://localhost:5000/api/login/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        user = {...profile}
        cb(null, profile)
    }
))

login.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email']})
);

login.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // req.session.inspiration_sid = 123;
        // res.end('Logged in!')
        res.redirect('/api/login/user')
    }
);


login.get("/user", (req, res) => {
    console.log("getting user data!");
    res.send(user);
});

login.get("/", async(req, res) => {
    // res.json(user);
})

module.exports = login;