const login = require("express").Router();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
      res.redirect("/account.html");
    } else {
      res.redirect("/account");
    }
  }
);

login.get("/", async (req, res) => {
  try {
    const email = req.session.passport.user;
    res.json(email);
  } catch (err) {
    res.json(err);
  }
});

module.exports = login;
