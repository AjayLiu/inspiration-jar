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
    }
    console.error(err);
  }
});

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

quotes.get("/vote", loggedIn, async (req, res) => {
  try {
    const email = req.session.passport.user;
    const votes = await pool.query(
      "SELECT * FROM votes WHERE vote_email = $1;",
      [email]
    );
    res.json(votes.rows);
  } catch (err) {
    console.error(err);
  }
});

quotes.post("/vote", loggedIn, async (req, res) => {
  try {
    const email = req.session.passport.user;
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
  }
});

// quotes.put("/:id", loggedIn, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quote_content } = req.body;
//     const updateQuote = await pool.query(
//       "UPDATE quotes SET quote_content = $1 WHERE quote_id = $2;",
//       [quote_content, id]
//     );
//     res.json(`Quote ${id} was changed to: ${quote_content}`);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// quotes.delete("/:id", loggedIn, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteQuote = await pool.query(
//       "DELETE FROM quotes WHERE quote_id = $1;",
//       [id]
//     );
//     res.json("quote deleted!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });
quotes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await pool.query(
      "SELECT * FROM quotes WHERE quote_id = $1 AND approved = TRUE;",
      [id]
    );
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
    res.json(allQuotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = quotes;