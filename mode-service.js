const fs = require('fs');

// cite use of fs
// cite idea to use setInterval
// change console log message to be more original?
console.log('Mode Service listening on mode-service.txt')

let current_mode = 'customer';

function wait() {
    fs.readFile('./mode-service.txt', 'utf8', (error, toggle) => {
        if (error) {
            console.error(error);
        }
        if (toggle == 'toggle' && current_mode == 'customer') {
            current_mode = 'worker';
            fs.writeFile('./mode-service.txt', current_mode, (error) => {
                if (error) {
                    console.error(error)
                } // ALSO erase file after read by UI? or fine
            })
        } else if (toggle == 'toggle' && current_mode == 'worker') {
            current_mode = 'customer';
            fs.writeFile('./mode-service.txt', current_mode, (error) => {
                if (error) {
                    console.error(error)
                } // ALSO erase file after read by UI? or fine
            })
        }
    })
}

setInterval(() => {
    wait();
}, 1000) // add own delay time? example puts 3000...