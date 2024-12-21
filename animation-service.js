const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

PORT = 8425;

app.use(express.static('public'))

app.post('/', (req, res) => {

    let data = req.body
    let item_code = data.itemCode
    let animation_data = {}

    if (item_code == 'A1') {
        animation_data = {snack_id: 'yel-chips', row_num: 1};
    }
    else if (item_code == 'A2') {
        animation_data = {snack_id: 'hot-chips', row_num: 1};
    }
    else if (item_code == 'A3') {
        animation_data = {snack_id: 'chz-chips', row_num: 1};
    }
    else if (item_code == 'B1') {
        animation_data = {snack_id: 'red-soda', row_num: 2};
    }
    else if (item_code == 'B2') {
        animation_data = {snack_id: 'grn-soda', row_num: 2};
    }
    else if (item_code == 'B3') {
        animation_data = {snack_id: 'blu-soda', row_num: 2};
    }
    else if (item_code == 'C1') {
        animation_data = {snack_id: 'brn-choc', row_num: 3};
    }
    else if (item_code == 'C2') {
        animation_data = {snack_id: 'prp-choc', row_num: 3};
    }
    else if (item_code == 'C3') {
        animation_data = {snack_id: 'mnt-choc', row_num: 3};
    }
    
    res.send(animation_data)
})

app.listen(PORT, function () {
    console.log('Animation Service is live on http://localhost:' + PORT)
})