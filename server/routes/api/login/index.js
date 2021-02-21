const login = require('express').Router();
const pool = require('../../../db')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { createLogicalAnd } = require('typescript');

require("dotenv").config()

login.use(passport.initialize())

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/login/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        cb(null, profile)
    }
))

login.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email']})
);

login.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.end('Logged in!')
    }
);

// quotes.post("/", async(req, res) => {
//     try {
//         const { quote_content } = req.body;
//         const newQuote = await pool.query(
//             "INSERT INTO quotes (quote_content) VALUES ($1) RETURNING *;",
//             [quote_content]
//         )
        
//         res.json(newQuote.rows[0]);
//     } catch (err) {
//         console.error(err.message)
//     }
// })
    
login.get("/", async(req, res) => {
    res.json("Hi");
})

module.exports = login;