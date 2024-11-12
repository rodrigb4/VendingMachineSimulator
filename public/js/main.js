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
// get rid of toggleMode here and in html and replace html onclick with mode() when fully implement?
function toggleMode() {
    if (document.getElementById('customer').style.display == 'block') {
        modeDisplay('worker')
    }
    else {
        modeDisplay('customer')
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
    document.getElementById("uncollected-display").innerHTML = vending_total
    document.getElementById("collected-display").innerHTML = collected_total
}
// cite 340 for above? or https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp ?
// cite node starter code for below
const modeImage = document.getElementById("mode");

modeImage.addEventListener("click", function(e) {
    e.preventDefault();

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-mode-ajax", true);
    xhttp.setRequestHeader("Content-type", "text/plain;charset=UTF-8");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.response === 'change') {
                toggleMode()
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("An error occurred.")
        }
    }
    xhttp.send('');
})

let item_code = ''

function itemCode(code) { // onClick of individual buttons, sets value of item_code...
    item_code = code;
}

const buyImage = document.getElementById("buy");

buyImage.addEventListener("click", function(e) {
    e.preventDefault();

    document.getElementById('keypad-price').innerHTML = ''

    let data = {
        itemCode: item_code
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-bank-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //parsed = JSON.parse(xhttp.response)
            //console.log(parsed)
            console.log(xhttp.response)
            if (!isNaN(xhttp.response)) {
                item_code = ''
                vending_total += Number(xhttp.response)
                
                document.getElementById("uncollected-display").innerHTML = vending_total
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("An error occurred.")
        }
    }
    xhttp.send(JSON.stringify(data));
})