const express = require("express")
const app = express()
const cors = require("cors");
const pool = require('./db')
const PORT = process.env.PORT || 5000;
const path = require("path");

//middleware
app.use(cors())
app.use(express.json())


app.use(express.static(path.join(__dirname, "client/out")));


//Routes//
app.post("/quotes", async(req, res) => {
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
 
app.get("/quotes", async(req, res) => {
    try{
        const allQuotes = await pool.query(
            "SELECT * FROM quotes;"
        )
        res.json(allQuotes.rows);
    } catch (err){
        console.error(err.message);
    }
})

app.get("/quotes/:id", async (req, res)=> {
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

app.put("/quotes/:id", async (req, res) => {
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

app.delete("/quotes/:id", async (req, res) => {
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