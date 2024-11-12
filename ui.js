const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

PORT = 8421;

const { engine } = require('express-handlebars');
const readline = require("node:readline");

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(express.static('public'))

const axios = require('axios');

// cite idea to use setInterval and indicator variable (changeMode)
// cite use of handlebars - node starter guide
// cite use of readline

// MODE-SERVICE

let changeMode = false; // added let

async function modeService() {
    try {
        const response = await axios.get('http://localhost:8422');
        if (response.data == 'worker' || response.data == 'customer') {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question("Are you sure you would like to change mode? Changing mode will alter available features, as described in the intructions. (yes/no) ", (answer) => {
                answer = answer.toLowerCase();
                if (answer === 'yes') {
                    changeMode = true;
                    /*if (toggle == 'worker') {
                        modeDisplay('customer')
                    }
                    else if (toggle == 'customer') {
                        modeDisplay('worker')
                        // not moving entire code in b/c want function to be global so it can be called through onload
                    }*/
                }
                rl.close();
            });
        }
    } catch (error) {
        console.error('Error occurred: ', error);
    }
}

async function bankService(item_code) {
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

app.get('/', function (req, res) {
    res.render('main', {layout : 'index'})
})

app.put('/put-mode-ajax', function(req, res) {
    modeService()
    const check = setInterval(() => {
        if (changeMode) {
            changeMode = false;
            clearInterval(check)
            res.send('change')
        }
    }, 1500)
})

app.put('/put-bank-ajax', function(req, res) {
    let data = req.body
    let item_code = data.itemCode

    bankService(item_code).then(val => {
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

app.listen(PORT, function () {
    console.log('Vending Machine Simulator is live on http://localhost:' + PORT)
})

