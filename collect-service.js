const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

PORT = 8424;

app.use(express.static('public'))

let total_collected = 0

app.post('/', (req, res) => { // change back to post? let me test req.data issue

    let data = req.body
    let vending_total = data.vendingTotal
    
    if (!isNaN(vending_total)) {
        total_collected += vending_total   
    }
    res.send(String(total_collected))
})

app.listen(PORT, function () {
    console.log('Collect Service is live on http://localhost:' + PORT)
})