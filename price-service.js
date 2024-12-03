const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

PORT = 8423;

app.use(express.static('public'))

app.post('/', (req, res) => {

    let data = req.body
    let item_code = data.itemCode

    prices = {
        'A1': '1.00', 
        'A2': '1.50', 
        'A3': '1.25', 
        'B1': '1.50', 
        'B2': '1.75', 
        'B3': '2.00', 
        'C1': '2.25', 
        'C2': '2.50', 
        'C3': '2.00'};

    res.send(prices[item_code])
})

app.listen(PORT, function () {
    console.log('Price Service is live on http://localhost:' + PORT)
})