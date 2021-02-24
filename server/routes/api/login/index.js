const login = require("express").Router();
const pgPool = require("../../../db");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();
const { SESS_NAME, SESS_SECRET } = process.env;

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

login.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: "session",
    }),
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
    },
  })
);

login.use(passport.initialize());

passport.serializeUser((userInfo, done) => {
  console.log(userInfo._json.email);
  done(null, userInfo._json.email);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://inspirationjar.herokuapp.com/api/login/google/callback"
          : "http://localhost:5000/api/login/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

login.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

login.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    if (process.env.NODE_ENV === "production") {
      res.redirect("/api/login");
    } else {
      res.redirect("http://localhost:3000/api/login");
    }
  }
);

login.get("/", async (req, res) => {
  try {
    const email = req.session.passport.user;
    res.json(req.session.passport.user);
  } catch (err) {
    res.json(err);
  }
});

module.exports = login;
