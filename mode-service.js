const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

PORT = 8422;

app.use(express.static('public'))

// keeps track of current mode
let current_mode = 'customer';

app.get('/', (req, res) => {
    if (current_mode == 'customer') {
        current_mode = 'worker';
        res.send(current_mode)
    } else if (current_mode == 'worker') {
        current_mode = 'customer';
        res.send(current_mode)
    }
})

app.listen(PORT, function () {
    console.log('Mode Service is live on http://localhost:' + PORT)
})