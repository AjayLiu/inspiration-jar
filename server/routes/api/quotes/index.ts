const quotes = require("express").Router();
const pool = require("../../../db");

const bodyParser = require("body-parser");
quotes.use(bodyParser.urlencoded({ extended: true }));

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

quotes.post("/", loggedIn, async (req, res) => {
  try {
    const { quote } = req.body;
    const author = req.session.passport.user;

    const newQuote = await pool.query(
      "INSERT INTO quotes (quote_content, author, time) VALUES ($1, $2, NOW()) RETURNING *;",
      [quote, author]
    );
    res.json(newQuote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

quotes.get("/", async (req, res) => {
  try {
    const allQuotes = await pool.query("SELECT * FROM quotes;");
    res.json(allQuotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

quotes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await pool.query("SELECT * FROM quotes WHERE quote_id = $1", [
      id,
    ]);
    res.json(quote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

quotes.get("/from/:id", loggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.session.passport.user;
    const userQuotes = await pool.query(
      "SELECT * FROM quotes WHERE author = $1",
      [email]
    );
    res.json(userQuotes.rows);
  } catch (err) {
    console.error(err);
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

module.exports = quotes;
