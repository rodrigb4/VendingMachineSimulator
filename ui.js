const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

PORT = 8421;

const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(express.static('public'))

const axios = require('axios');

/*
Citation for use of Handlebars templating
Date Retrieved: 10/15/2024
Derived from CS340 NodeJS Starter App code
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/


// MODE-SERVICE

async function modeService() {
    try {
        const response = await axios.get('http://localhost:8422');
        const potential_new_mode = response.data

        return potential_new_mode
    } catch (error) {
        console.error('Error occurred: ', error);
    }
}

async function priceService(item_code) {
    try {
        let data = {
            itemCode: item_code
        } 
        const response = await axios.post('http://localhost:8423', data);
        const item_price = response.data

        if (!isNaN(item_price)) {
            return item_price
        } 
    } catch (error) {
        console.error('Error occurred: ', error);
    }
}

async function collectService(vending_total) {
    try {
        let data = {
            vendingTotal: vending_total
        } 
        const response = await axios.post('http://localhost:8424', data);
        const new_total_collected = response.data

        if (!isNaN(new_total_collected)) {
            return new_total_collected
        } 
    } catch (error) {
        console.error('Error occurred: ', error);
    }
}

async function animationService(item_code) {
    try {
        let data = {
            itemCode: item_code
        } 
        const response = await axios.post('http://127.0.0.1:5000', data); // was http://localhost:8425
        //const animation_num = response.data // 5000
        const anim_data = response.data
        const animation_num = anim_data['animation_code']

        if (!isNaN(animation_num)) {
            return animation_num
        } 
    } catch (error) {
        console.error('Error occurred: ', error);
    }
}

app.get('/', function (req, res) {
    res.render('main', {layout : 'index'})
})

app.put('/put-mode-ajax', function(req, res) {
    modeService().then(new_mode => {
        res.send(new_mode)
    }).catch(e => {
        console.log(e)
    })
})

app.put('/put-price-ajax', function(req, res) {
    let data = req.body
    let item_code = data.itemCode

    priceService(item_code).then(val => {
        res.send(String(val)) 
    }).catch(e => {
        console.log(e)
    })
})

app.put('/put-collect-ajax', function(req, res) {
    let data = req.body
    let vending_total = data.vendingTotal

    collectService(vending_total).then(val => {
        res.send(String(val)) 
    }).catch(e => {
        console.log(e)
    })
})

app.put('/put-keypad-ajax', function(req, res) {
    let data = req.body
    let item_code = data.itemCode

    priceService(item_code).then(val => {
        res.send(String(val)) 
    }).catch(e => {
        console.log(e)
    })
})

app.put('/put-animation-ajax', function(req, res) {
    let data = req.body
    let item_code = data.itemCode

    animationService(item_code).then(val => {
        res.send(String(val)) 
    }).catch(e => {
        console.log(e)
    })
})

app.listen(PORT, function () {
    console.log('Vending Machine Simulator is live on http://localhost:' + PORT)
})

