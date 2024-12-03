/*
Citation for use of element visibility functions below
Date Retrieved: 10/15/2024
Adapted from CS340 NodeJS Starter App code
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

function displayHelp(display) {
    if (display == 'help') {
        document.getElementById('instructions').style.display = 'block';
    } 
    else {
        document.getElementById('instructions').style.display = 'none';
    }
}
function toggleHelp() {
    if (document.getElementById('instructions').style.display == 'block') {
        displayHelp('nohelp')
    }
    else {
        displayHelp('help')
    }
}
function modeDisplay (display) {
    if (display == 'customer') {
        document.getElementById('customer').style.display = 'block';
        document.getElementById('worker').style.display = 'none';
        document.getElementById('prices-but').style.display = 'inline';
        document.getElementById('keypad').style.display = 'block';
        document.getElementById('collect').style.display = 'none';
        document.getElementById('keypad-price').style.display = 'block';
        document.getElementById('a1').style.display = 'block';
        document.getElementById('a2').style.display = 'block';
        document.getElementById('a3').style.display = 'block';
        document.getElementById('b1').style.display = 'block';
        document.getElementById('b2').style.display = 'block';
        document.getElementById('b3').style.display = 'block';
        document.getElementById('c1').style.display = 'block';
        document.getElementById('c2').style.display = 'block';
        document.getElementById('c3').style.display = 'block';
        document.getElementById('buy').style.display = 'block';
    }
    else {
        document.getElementById('customer').style.display = 'none';
        document.getElementById('worker').style.display = 'block';
        document.getElementById('prices-but').style.display = 'none';
        document.getElementById('prices').style.display = 'none';
        document.getElementById('keypad').style.display = 'none';
        document.getElementById('collect').style.display = 'block';
        document.getElementById('keypad-price').style.display = 'none';
        document.getElementById('a1').style.display = 'none';
        document.getElementById('a2').style.display = 'none';
        document.getElementById('a3').style.display = 'none';
        document.getElementById('b1').style.display = 'none';
        document.getElementById('b2').style.display = 'none';
        document.getElementById('b3').style.display = 'none';
        document.getElementById('c1').style.display = 'none';
        document.getElementById('c2').style.display = 'none';
        document.getElementById('c3').style.display = 'none';
        document.getElementById('buy').style.display = 'none';
    }
}

function priceDisplay (display) {
    if (display == 'noprices') {
        document.getElementById('prices').style.display = 'none';

    }
    else {
        document.getElementById('prices').style.display = 'block';

    }
}
function togglePrices() {
    if (document.getElementById('prices').style.display == 'block') {
        priceDisplay('noprices')
    }
    else {
        priceDisplay('prices')
    }
}

let vending_total = 0.00
let collected_total = 0.00

function initial() {
    displayHelp('help')
    modeDisplay('customer')
    priceDisplay('noprices')
    document.getElementById("uncollected-display").innerHTML = vending_total.toFixed(2)
    document.getElementById("collected-display").innerHTML = collected_total.toFixed(2)
}

/*
Citation for use of XMLHttpRequest below
Date Retrieved: 10/15/2024
Adapted from CS340 NodeJS Starter App code
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Mode Service xhttp
const modeImage = document.getElementById("mode");

modeImage.addEventListener("click", function(e) {
    e.preventDefault();

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-mode-ajax", true);
    xhttp.setRequestHeader("Content-type", "text/plain;charset=UTF-8");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
    
            if (confirm("Are you sure you would like to change mode? Changing mode will alter available features, as described in the intructions.")) {
                    modeDisplay(xhttp.response) // get rid of if statement?
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("An error occurred.")
        }
    }
    xhttp.send('');
})

let item_code = ''

// Keypad Service xhttp
function keypad () {
    let data = {
        itemCode: item_code
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-keypad-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (!isNaN(xhttp.response)) {
                document.getElementById("keypad-price").innerHTML = Number(xhttp.response).toFixed(2)
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("An error occurred.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function itemCode(code) { // onClick of individual buttons, sets value of item_code...
    item_code = code;
    keypad()
}

// Animation Service xhttp
function animation () {
    let data = {
        itemCode: item_code
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-animation-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (!isNaN(xhttp.response)) {
                animation_num = xhttp.response
                let snack_id = "" // this fine to start with?
                row_num = 0
    
                if (animation_num == 1) {
                    snack_id = "yel-chips"
                    row_num = 1
                } else if (animation_num == 2) {
                    snack_id = "hot-chips"
                    row_num = 1
                } else if (animation_num == 3) {
                    snack_id = "chz-chips"
                    row_num = 1
                } else if (animation_num == 4) {
                    snack_id = "red-soda"
                    row_num = 2
                } else if (animation_num == 5) {
                    snack_id = "grn-soda"
                    row_num = 2
                } else if (animation_num == 6) {
                    snack_id = "blu-soda"
                    row_num = 2
                } else if (animation_num == 7) {
                    snack_id = "brn-choc"
                    row_num = 3
                } else if (animation_num == 8) {
                    snack_id = "prp-choc"
                    row_num = 3
                } else if (animation_num == 9) {
                    snack_id = "mnt-choc"
                    row_num = 3
                }
                document.getElementById(snack_id).style.zIndex = "13" // this or 12?
                document.querySelector('#' + snack_id).classList.add("row-" + row_num + "-anim")

                setTimeout(() => {
                    document.querySelector('#' + snack_id).classList.remove("row-" + row_num + "-anim")
                    document.getElementById(snack_id).style.zIndex = "10"
                }, 1000) // less delay?
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("An error occurred.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

// Using Price Service for Vending total xhttp
const buyImage = document.getElementById("buy");

buyImage.addEventListener("click", function(e) {
    e.preventDefault();

    document.getElementById('keypad-price').innerHTML = ''

    animation() // call to initiate animation xhttp

    let data = {
        itemCode: item_code
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-price-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            console.log(xhttp.response)
            if (!isNaN(xhttp.response)) {
                item_code = ''
                vending_total += Number(xhttp.response)
                
                document.getElementById("uncollected-display").innerHTML = vending_total.toFixed(2)
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("An error occurred.")
        }
    }
    xhttp.send(JSON.stringify(data));
})


// Collect Service xhttp
const collectImage = document.getElementById("collect-div");

collectImage.addEventListener("click", function(e) {
    e.preventDefault();

    let data = {
        vendingTotal: vending_total
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-collect-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (!isNaN(xhttp.response)) {
                vending_total = 0.00
                collected_total = Number(xhttp.response)
                
                document.getElementById("uncollected-display").innerHTML = vending_total.toFixed(2)
                document.getElementById("collected-display").innerHTML = collected_total.toFixed(2)
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("An error occurred.")
        }
    }
    xhttp.send(JSON.stringify(data));
})