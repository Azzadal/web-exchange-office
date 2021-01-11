let chekedPair;
const rateBuyUR = document.getElementById('rateBuyUR');
const rateBuyER = document.getElementById('rateBuyER');
const rateBuyUE = document.getElementById('rateBuyUE');
const rateBuyEU = document.getElementById('rateBuyEU');
const rateSellUR = document.getElementById('rateSellUR');
const rateSellER = document.getElementById('rateSellER');
const rateSellUE = document.getElementById('rateSellUE');
const rateSellEU = document.getElementById('rateSellEU');

const data = {
    series: [
        [],
        []
    ]
};
const rate = {
    gr (pair) {
        if (pair === chekedPair) {
            if (pair === "rateUR") {
                getRate(rateURObj, rateBuyUR, rateSellUR);
            } else if (pair === "rateER") {
                getRate(rateERObj, rateBuyER, rateSellER);
            } else if (pair === "rateUE") {
                getRate(rateUEObj, rateBuyUE, rateSellUE);
            } else {
                getRate(rateEUObj, rateBuyEU, rateSellEU);
            }

            function getRate(json, fieldBuy, fieldSell) {
                if (json !== undefined) {
                    for (let i = 0; i < json.length; i++) {
                        data.series[0].push(json[i].rateBuy);
                        data.series[1].push(json[i].rateSell);
                        fieldBuy.innerHTML = json[i].rateBuy;
                        fieldSell.innerHTML = json[i].rateSell;
                        outTotal();
                        if (data.series[0].length === 40) {
                            data.series[0].shift();
                            data.series[1].shift();
                        }
                    }
                    new Chartist.Line('.ct-chart', data);
                } else {
                    console.log('Ожидание данных...')
                }
            }
        }
        else console.log('не сошлось', pair + ' ' + chekedPair)
    }
}

function outTotal() {
    let rateBuy, rateSell;
    switch (chekedPair) {
        case 'rateUR':
            rateBuy = rateBuyUR.innerHTML;
            rateSell = rateSellUR.innerHTML;
            break;
        case 'rateER':
            rateBuy = rateBuyER.innerHTML;
            rateSell = rateSellER.innerHTML;
            break;
        case 'rateUE':
            rateBuy = rateBuyUE.innerHTML;
            rateSell = rateSellUE.innerHTML;
            break;
        case 'rateEU':
            rateBuy = rateBuyEU.innerHTML;
            rateSell = rateSellEU.innerHTML;
            break;
    }
    totalBuy.value = parseFloat(rateBuy) * parseInt(quantityBuy.value).toFixed(2);
    totalSell.value = parseFloat(rateSell) * parseInt(quantitySell.value).toFixed(2);
}

window.onload = function () {
    tableComplit();
    connect();
    const xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.open('GET', window.location + "count");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let count = xhr.response;
            console.log("записей " + count)
        }
    };
    xhr.send();

    const bidsBuy = document.getElementById('bidsBuy');
    const rowsBuy = document.getElementsByClassName('rowsBuy');

    let timerId = null;

    changePair.addEventListener("DOMSubtreeModified", function () {

        let n = changePair.innerText;

        let arg1, arg2, choice;
        if (n === 'USD/RUR') {
            choice = "rateUR";
            arg1 = "URBuy";
            arg2 = "URSell";

        }
        if (n === 'EUR/RUR') {
            choice = "rateER";
            arg1 = "ERBuy";
            arg2 = "ERSell";
            // chekedPair = 'ER';
        }
        if (n === 'USD/EUR') {
            choice = "rateUE";
            arg1 = "UEBuy";
            arg2 = "UESell";
            // chekedPair = 'UE';
        }
        if (n === 'EUR/USD') {
            choice = "rateEU";
            arg1 = "EUBuy";
            arg2 = "EUSell";
            // chekedPair = 'EU';
        }
        tableBuy(arg1);
        tableSell(arg2);
        clearInterval(timerId);

        rate.gr(choice);
        chekedPair = choice;
    });
    const quantityBuy = document.getElementById('quantityBuy'),
        quantitySell = document.getElementById('quantitySell'),
        totalBuy = document.getElementById('totalBuy'),
        totalSell = document.getElementById('totalSell');
    quantitySell.oninput = function () {
        outTotal();
    };
    quantityBuy.oninput = function () {
        console.log('Работает инпут')
        outTotal();
    };
    rateBuy.oninput = function () {
        outTotal();
    }
};