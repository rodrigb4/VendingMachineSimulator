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

const fs = require('fs');

// cite idea to use setInterval and indicator variable (changeMode)
// cite use of handlebars - node starter guide
// cite use of readline

// MODE-SERVICE

function mode() { // onClick="mode()"... of mode toggle
    fs.writeFile('./mode-service.txt', 'toggle', (error) => {
        if (error) {
            console.error(error);
        } 
    })
}

changeMode = false;
setInterval(() => { // so that its regularly checking after mode() called from button click...
    fs.readFile('./mode-service.txt', 'utf8', (error, toggle) => {
        if (error) {
            console.error(error);
        }
        if (toggle == 'worker' || toggle == 'customer') {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question("Are you sure you would like to change mode? (yes/no) ", (answer) => {
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
                } else {
    
                }
                rl.close();
            });
        }
        fs.writeFile('./mode-service.txt', '', (error) => {
            if (error) {
                console.error(error); // to make sure this function doesn't keep testing a lingering number
            } // move these erasures to beginning? like in example?
        })
    })
}, 1000)

app.get('/', function (req, res) {
    res.render('main', {layout : 'index'})
})

app.put('/put-mode-ajax', function(req, res) {
    mode()
    const check = setInterval(() => {
        if (changeMode) {
            changeMode = false;
            clearInterval(check)
            res.send('change')
        }
    }, 200)
    // how to alter just one part and leave other parts as needed?
    // break into a bunch of parts...
})

app.listen(PORT, function () {
    console.log('Application is live on http://localhost:' + PORT)
})