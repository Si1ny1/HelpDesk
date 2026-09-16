const express = require('express')
const cors = require('cors')
const { initPool, query } = require('./db.js');
const app = express()
app.use(cors())
initPool()

app.get('/', async (req, res) => {
    const PersonsData = await query("SELECT * FROM persons")
    res.json({ 
        imię: PersonsData[0].FIRSTNAME,
        Nazwisko: PersonsData[0].LASTNAME
     });
});

app.listen(3000, (err) => {
    if(err) {
        console.log("Something went wrong")
    } else {
        console.log("Server working")
    }
})