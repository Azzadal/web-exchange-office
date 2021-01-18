let chekedPair;
const rateBuyUR = document.getElementById('rateBuyUR');
const rateBuyER = document.getElementById('rateBuyER');
const rateBuyUE = document.getElementById('rateBuyUE');
const rateBuyEU = document.getElementById('rateBuyEU');
const rateSellUR = document.getElementById('rateSellUR');
const rateSellER = document.getElementById('rateSellER');
const rateSellUE = document.getElementById('rateSellUE');
const rateSellEU = document.getElementById('rateSellEU');
const rateBuyAll = document.getElementsByClassName('rate_buy');
const rateSellAll = document.getElementsByClassName('rate_sell');
const datastatus = document.getElementById('data_status');

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
                getRate(rateURObj);
            } else if (pair === "rateER") {
                getRate(rateERObj);
            } else if (pair === "rateUE") {
                getRate(rateUEObj);
            } else {
                getRate(rateEUObj);
            }

            function getRate(json) {
                if (json !== undefined) {
                    for (let i = json.length-1; i >= 0; i--) {
                        data.series[0].push(json[i].rateBuy);
                        data.series[1].push(json[i].rateSell);
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
};

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

let screenWidth = screen.width;
let screenHeight = screen.height;

window.onload = function () {
    if (rateURObj === undefined || rateERObj === undefined || rateUEObj === undefined || rateEUObj === undefined) datastatus.insertAdjacentHTML('afterBegin', 'Ожидание данных...');
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

    console.log(`Размеры экрана ${screenWidth} ${screenHeight}`)

    const bidsBuy = document.getElementById('bidsBuy');
    const rowsBuy = document.getElementsByClassName('rowsBuy');

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(mutation => {

            let n = mutation.addedNodes[0].data;
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
            }
            if (n === 'USD/EUR') {
                choice = "rateUE";
                arg1 = "UEBuy";
                arg2 = "UESell";
            }
            if (n === 'EUR/USD') {
                choice = "rateEU";
                arg1 = "EUBuy";
                arg2 = "EUSell";
            }
            chekedPair = choice;
            tableBuy(arg1);
            tableSell(arg2);
            rate.gr(choice);

            console.log('произошла смена select')
        });
    });
    observer.observe(
        changePair,
        {
            childList: true,
            attributes: true,
            subtree: true,
            characterData: true
        }
    );

    const quantityBuy = document.getElementById('quantityBuy'),
        quantitySell = document.getElementById('quantitySell');

    quantitySell.oninput = function () {
        outTotal();
    };

    quantityBuy.oninput = function () {
        outTotal();
    };

    for (let i = 0; i < rateBuyAll.length; i++){
        rateBuyAll[i].addEventListener('DOMSubtreeModified', () => {
            outTotal();
        });
        rateSellAll[i].addEventListener('DOMSubtreeModified', () => {
            outTotal();
        });
    }
};