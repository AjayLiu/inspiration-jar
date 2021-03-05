require("dotenv").config();
const { SESS_NAME, SESS_SECRET } = process.env;

const session = require("express-session");
const pgPool = require("./db");
const pgSession = require("connect-pg-simple")(session);

const sessionConfig = session({
  store: new pgSession({
    pool: pgPool,
    tableName: "session",
    pruneSessionInterval: 0.001,
  }),
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    httpOnly: true,
    sameSite: true,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
});

// module.exports = sessionConfig;
export = sessionConfig;
