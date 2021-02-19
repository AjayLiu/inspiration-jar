const express = require("express")
const app = express()
const cors = require("cors");
const pool = require('./db')
const PORT = process.env.PORT || 5000;
const path = require("path");

//force https
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}


//middleware
const allowlist = 
// []; 
['inspirationjar.herokuapp.com', 'locahost:3000', 'localhost:5000'];

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = allowlist.indexOf(req.header('Host')) !== -1;
    // console.log(req.header('Host'))
    // console.log(isDomainAllowed)

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate));
// app.use(cors())
app.use(express.json())


app.use(express.static(path.join(__dirname, "client/out")));


//Routes//
const apiPrefix = '/api'
app.post(apiPrefix+"/quotes", async(req, res) => {
    try {
        const { quote_content } = req.body;
        const newQuote = await pool.query(
            "INSERT INTO quotes (quote_content) VALUES ($1) RETURNING *;",
            [quote_content]
        )
        
        res.json(newQuote.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})
 
app.get(apiPrefix+"/quotes", async(req, res) => {
    try{
        const allQuotes = await pool.query(
            "SELECT * FROM quotes;"
        )
        res.json(allQuotes.rows);
    } catch (err){
        console.error(err.message);
    }
})

app.get(apiPrefix+"/quotes/:id", async (req, res)=> {
    try{
        const {id} = req.params;
        const quote = await pool.query(
            "SELECT * FROM quotes WHERE quote_id = $1",
            [id]
        )
        res.json(quote.rows[0]);
    } catch (err){
        console.error(err.message);
    }
})

app.put(apiPrefix+"/quotes/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {quote_content} = req.body;
        const updateQuote = await pool.query(
            "UPDATE quotes SET quote_content = $1 WHERE quote_id = $2;",
            [quote_content, id]
        )
        res.json(`Quote ${id} was changed to: ${quote_content}`)
    } catch (err){
        console.error(err.message)
    }
})

app.delete(apiPrefix+"/quotes/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const deleteQuote = await pool.query(
            "DELETE FROM quotes WHERE quote_id = $1;",
            [id]
        )
        res.json("quote deleted!")
    } catch (err){
        console.error(err.message);
    }
})

app.listen(PORT, ()=> {
    console.log(`server has started on port ${PORT}`)
})