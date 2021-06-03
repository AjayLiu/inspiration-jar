const login = require("express").Router();
const pool = require("../../../db");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const cookieParser = require("cookie-parser");
login.use(cookieParser());

login.use(passport.initialize());

passport.serializeUser((userInfo, done) => {
  // console.log(userInfo._json.email);
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
          ? "https://inspiration-jar.ajayliu.com/api/login/google/callback"
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
  async (req, res) => {
    //add account to accounts table
    try {
      const email = req.session.passport.user;
      await pool.query(
        "INSERT INTO accounts (email) VALUES ($1) ON CONFLICT (email) DO NOTHING;",
        [email]
      );
    } catch (err) {
      console.error(err);
    }

    if (process.env.NODE_ENV === "production") {
      res.redirect("/account.html");
    } else {
      res.redirect("http://localhost:3000/account");
    }
  }
);

login.get("/logout", async (req, res) => {
  try {
    await req.logout();
    await purge();
    res.redirect("/account");
    // res.json("successfully logged out");
  } catch (err) {
    console.error(err);
  }
});

//delete logged out sessions (it's purged but it takes up space in the db)
const purge = async () => {
  try {
    const allSessions = await pool.query("SELECT * FROM session;");
    allSessions.rows.forEach(async (object) => {
      if (object.sess.passport.user == undefined) {
        const sidToDelete = object.sid;
        await pool.query("DELETE FROM session WHERE sid = $1;", [sidToDelete]);
        // console.log(sidToDelete);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

login.get("/", async (req, res) => {
  try {
    // console.log(req);
    const email = req.session.passport.user;
    if (email == undefined) {
      res.status(400);
      res.json("login no longer valid");
    } else {
      res.json(email);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

// module.exports = login;
export = login;
