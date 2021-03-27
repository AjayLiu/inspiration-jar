const quotes = require("express").Router();
const pool = require("../../../db");

const bodyParser = require("body-parser");
quotes.use(bodyParser.urlencoded({ extended: true }));
quotes.use(bodyParser.json());

const loggedIn = (req, res, next) => {
  try {
    const email = req.session.passport.user;
    if (email != undefined) {
      next();
    }
  } catch {
    res.redirect("/login");
  }
};

const nodeFetch = require("node-fetch");

const dayjs = require("dayjs");

quotes.post("/", loggedIn, async (req, res) => {
  try {
    const { quote } = req.body;
    if (!quote) {
      res.status(400);
      return;
    }
    const author = req.session.passport.user;

    //prevent spamming (wait a few seconds)
    const latestQuote = await pool.query(
      "SELECT time, quote_id FROM quotes WHERE author = $1 ORDER BY time DESC LIMIT 1;",
      [author]
    );
    if (latestQuote.rows.length > 0) {
      const latestTime = latestQuote.rows[0];
      const secondsPassed = dayjs().diff(dayjs(latestTime.time), "seconds");
      const WAIT_TIME = 15;
      if (secondsPassed < WAIT_TIME) {
        res.json({
          submissionStatus: "Too Fast",
          waitSeconds: WAIT_TIME - secondsPassed,
        });
        return;
      }
    }

    //check if the quote is too long
    if (quote.length > 255) {
      res.json({ submissionStatus: "Too Long" });
      return;
    }
    const newQuote = await pool.query(
      "INSERT INTO quotes (quote_content, author, time) VALUES ($1, $2, NOW());",
      [quote, author]
    );

    //send notification to discord
    nodeFetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "post",
      body: JSON.stringify({
        content: `new message: "${quote}" from ${author}`,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // .then(res => res.json())
    // .then(json => console.log(json));

    res.json({ submissionStatus: "Success" });
  } catch (err) {
    // duplicate quote
    if (err.code === "23505") {
      res.json({ submissionStatus: "Duplicate" });
    } else {
      res.json({ submissionStatus: "Failed" });
    }
    console.error(err);
  }
});

//get quotes written by user
quotes.get("/from", loggedIn, async (req, res) => {
  try {
    const email = req.session.passport.user;
    const userQuotes = await pool.query(
      "SELECT * FROM quotes WHERE author = $1;",
      [email]
    );
    res.json(userQuotes.rows);
  } catch (err) {
    console.error(err);
  }
});

//count how many votes for specific quote id
quotes.get("/vote/for/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const count = await pool.query(
      "SELECT COUNT(1) FROM votes WHERE quote_id = $1;",
      [id]
    );
    res.json(count.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//get what this user has voted on
quotes.get("/vote", async (req, res) => {
  try {
    let email;
    try {
      email = req.session.passport.user;
    } catch (error) {
      res.status(401);
      return;
    }
    const votes = await pool.query(
      "SELECT * FROM votes WHERE vote_email = $1;",
      [email]
    );
    res.json(votes.rows);
  } catch (err) {
    console.error(err);
  }
});

quotes.post("/vote", async (req, res) => {
  try {
    let email;
    try {
      email = req.session.passport.user;
    } catch (error) {
      res.json({ submissionStatus: "Not Logged In" });
      return;
    }
    const { id } = req.body;

    //check if already voted
    const check_vote = await pool.query(
      "SELECT * FROM votes WHERE quote_id = $1 AND vote_email = $2",
      [id, email]
    );
    if (check_vote.rows.length > 0) {
      res.json({ submissionStatus: "Duplicate" });
      return;
    } else {
      const votes = await pool.query(
        "INSERT INTO votes (quote_id, vote_email) VALUES ($1, $2);",
        [id, email]
      );
    }
    res.json({ submissionStatus: "Success" });
  } catch (err) {
    console.log(err);
    res.json({ submissionStatus: "Failed" });
  }
});

quotes.get("/admin", loggedIn, async (req, res) => {
  try {
    const email = req.session.passport.user;
    if (email == process.env.ADMIN_EMAIL) {
      const allQuotes = await pool.query(
        "SELECT * FROM quotes WHERE approved = FALSE;"
      );
      res.json(allQuotes.rows);
    }
  } catch (error) {
    console.error(error);
  }
});
quotes.post("/admin/approve", loggedIn, async (req, res) => {
  try {
    const { id } = req.body;
    const email = req.session.passport.user;
    if (email == process.env.ADMIN_EMAIL) {
      const postApprove = await pool.query(
        "UPDATE quotes SET approved = TRUE WHERE quote_id = $1;",
        [id]
      );
      res.json({ submissionStatus: "Success" });
    }
  } catch (error) {
    res.json({ submissionStatus: "Failed" });
  }
});

quotes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await pool.query(
      "SELECT * FROM quotes WHERE quote_id = $1 AND approved = TRUE;",
      [id]
    );
    delete quote.rows[0].author;
    res.json(quote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
quotes.get("/", async (req, res) => {
  try {
    const allQuotes = await pool.query(
      "SELECT * FROM quotes WHERE approved = TRUE;"
    );
    allQuotes.rows.forEach((row) => {
      delete row.author;
    });

    res.json(allQuotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

quotes.delete("/:id", loggedIn, async (req, res) => {
  try {
    let email;
    try {
      email = req.session.passport.user;
    } catch (error) {
      res.json({ submissionStatus: "Not Logged In" });
      return;
    }
    const { id } = req.params;

    const deleteQuery = await pool.query(
      "DELETE FROM quotes WHERE quote_id = $1 AND author = $2;",
      [id, email]
    );
    res.json({ submissionStatus: "Success" });
  } catch (error) {
    console.error(error);
    res.json({ submissionStatus: "Failed" });
  }
});

module.exports = quotes;
