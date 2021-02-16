const express = require("express")
const app = express()
const cors = require("cors");
const pool = require('./db')
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

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



app.listen(PORT, ()=> {
    console.log(`server has started on port ${PORT}`)
})