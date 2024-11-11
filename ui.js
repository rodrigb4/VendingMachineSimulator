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
const fs = require('fs');

// cite idea to use setInterval and indicator variable (changeMode)
// cite use of handlebars - node starter guide
// cite use of readline

// MODE-SERVICE

async function modeService() {
    try {
        const response = await axios.get('http://localhost:8422');
        //return response.data
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

changeMode = false;


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

app.listen(PORT, function () {
    console.log('Application is live on http://localhost:' + PORT)
})