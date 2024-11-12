const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

PORT = 8423;

app.use(express.static('public'))

// rename to price service?
app.post('/', (req, res) => { // change back to post? let me test req.data issue

    let data = req.body
    let item_code = data.itemCode
    //console.log(item_code) // showing correct code now
    let price = 0;
    
    if (item_code == 'A1') {
        price = 1.00;
    }
    else if (item_code == 'A2') {
        price = 1.50;
    }
    else if (item_code == 'A3') {
        price = 1.25;
    }
    else if (item_code == 'B1') {
        price = 1.50;
    }
    else if (item_code == 'B2') {
        price = 1.75;
    }
    else if (item_code == 'B3') {
        price = 2.00;
    }
    else if (item_code == 'C1') {
        price = 2.25;
    }
    else if (item_code == 'C2') {
        price = 2.50;
    }
    else if (item_code == 'C3') {
        price = 2.00;
    }
    //console.log(price) // showing correct price
    res.send(String(price))
})

app.listen(PORT, function () {
    console.log('Bank Service is live on http://localhost:' + PORT)
})