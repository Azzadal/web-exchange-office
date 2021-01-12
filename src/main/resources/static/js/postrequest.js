const quantityBuy = document.getElementById('quantityBuy'),
    idBuy = document.getElementsByClassName('idBuy'),
    idSell = document.getElementsByClassName('idSell'),
    quantitySell = document.getElementById('quantitySell'),
    rateBuy = document.getElementById('rateBuy'),
    rateSell = document.getElementById('rateSell'),
    totalBuy = document.getElementById('totalBuy'),
    totalSell = document.getElementById('totalSell'),
    bidsSell = document.getElementById('bidsSell'),
    bidsBuy = document.getElementById('bidsBuy'),
    bidsHistory = document.getElementById('bidsHistory'),
    complBid = document.getElementById('complBid'),
    rowsPriceSell = document.getElementsByClassName('rowsPriceSell'),
    rowsPriceBuy = document.getElementsByClassName('rowsPriceBuy'),
    rowsQuanBuy = document.getElementsByClassName('rowsQuanBuy'),
    rowsQuanSell = document.getElementsByClassName('rowsQuanSell'),
    rowsTotalSell = document.getElementsByClassName('rowsTotalSell'),
    rowsTotalBuy = document.getElementsByClassName('rowsTotalBuy'),
    rowsSell = document.getElementsByClassName('rowsSell'),
    rowsHistory = document.getElementsByClassName('rowsHistory'),
    rowsBuy = document.getElementsByClassName('rowsBuy');
let stompClient = null;
let rateURObj;
let rateERObj;
let rateUEObj;
let rateEUObj;
let changePair = document.getElementById('current');

//первоначальный вывод данных
function tableSell(arg) {
    const req = new XMLHttpRequest();
    req.responseType = "json";
    req.open('GET', window.location + arg);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let json = req.response;
            let i;
            bidsSell.innerHTML = '';
            for(i = 0; i < json.length; i++) {
                bidsSell.innerHTML += '<tr class="rowsSell"><td class="col-4 idSell" style="display: none;">' + json[i].id + '</td><td class="rowsPriceSell">'
                    + json[i].rate +
                    '</td><td class="rowsQuanSell">' + json[i].quantity + '</td><td class="rowsTotalSell">' +
                    json[i].total + '</td></tr>';
            }
        }
            autofillBuy();
    };
    console.log('tableSell(arg)', arg)
    req.send();
}

//первоначальный вывод данных
function tableBuy(arg) {
    const req = new XMLHttpRequest();
    req.responseType = "json";
    req.open('GET', window.location + arg);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let json = req.response;
            let i;
            bidsBuy.innerHTML = '';
            for(i = 0; i < json.length; i++) {
                bidsBuy.innerHTML += '<tr class="rowsBuy"><td class="col-4 idBuy" style="display: none;">' + json[i].id + '</td><td class="rowsPriceBuy">'
                    + json[i].rate +
                    '</td><td class="rowsQuanBuy">' + json[i].quantity + '</td><td class="rowsTotalBuy">' +
                    json[i].total + '</td></tr>';
            }
        }
            autofillSell();
    };
    console.log('tableBuy(arg)', arg)
    req.send();
}

//первоначальный вывод данных
function tableComplit() {
    const req = new XMLHttpRequest();
    req.responseType = "json";
    req.open('GET', window.location + "tab_compl");
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let json = req.response;
            let i;
            bidsHistory.innerHTML = '';
            for (i = 0; i < json.length; i++) {
                let date = moment(json[i].date).format('DD-MM-YYYY'+ '<br>'+ 'HH:mm:ss');
                bidsHistory.innerHTML += '<tr><td class="col-4 idBuy" style="display: none;">' + json[i].id + '</td><td>' + date + '</td><td>'
                    + json[i].rate +
                    '</td><td>' + json[i].quantity + '</td><td">' +
                    json[i].total + '</td></tr>';
            }
        }
    };
    req.send();
}

function connect() {
    let socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/buys', function (e) {
            let gvn = JSON.parse(e.body);
            bidsBuy.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                bidsBuy.innerHTML += '<tr class="rowsBuy"><td class="col-4 idBuy" style="display: none;">' + gvn[i].id +
                    '</td><td class="text-center rowsPriceBuy">' + gvn[i].rate +
                    '</td><td class="text-center rowsQuanBuy">' + gvn[i].quantity + '</td><td class="text-center rowsTotalBuy">' +
                    gvn[i].total + '</td></tr>';
            }
                autofillSell();
        });
        stompClient.subscribe('/topic/sells', function (e) {
            let gvn = JSON.parse(e.body);
            bidsSell.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                bidsSell.innerHTML += '<tr class="rowsSell"><td class="col-4 idSell" style="display: none;">' + gvn[i].id + '</td>' +
                    '<td class="rowsPriceSell">' + gvn[i].rate +
                    '</td><td class="rowsQuanSell">' + gvn[i].quantity + '</td><td class="rowsTotalSell">' +
                    gvn[i].total + '</td></tr>';
            }
                autofillBuy();
        });

//table history
        stompClient.subscribe('/topic/ids', function (e) {
            let gvn = JSON.parse(e.body);
            bidsHistory.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                let date = moment(gvn[i].date).format('DD-MM-YYYY'+ '<br>'+ 'HH:mm:ss');
                bidsHistory.innerHTML += '<tr><td class="col-4" style="display: none;">' + gvn[i].id + '</td><td>' + date + '</td><td>'
                    + gvn[i].rate +
                    '</td><td>' + gvn[i].quantity + '</td><td>' +
                    gvn[i].total + '</td><td>' + gvn[i].type + '</td></tr>';
            }
        });
        stompClient.subscribe('/topic/rateUR', function (e) {
            rateURObj = JSON.parse(e.body);
            rateBuyUR.innerHTML = rateURObj[0].rateBuy;
            rateSellUR.innerHTML = rateURObj[0].rateSell;
            rate.gr('rateUR')
        });
        stompClient.subscribe('/topic/rateER', function (e) {
            rateERObj = JSON.parse(e.body);
            rateBuyER.innerHTML = rateERObj[0].rateBuy;
            rateSellER.innerHTML = rateERObj[0].rateSell;
            rate.gr('rateER')
        });
        stompClient.subscribe('/topic/rateUE', function (e) {
            rateUEObj = JSON.parse(e.body);
            rateBuyUE.innerHTML = rateUEObj[0].rateBuy;
            rateSellUE.innerHTML = rateUEObj[0].rateSell;
            rate.gr('rateUE')
        });
        stompClient.subscribe('/topic/rateEU', function (e) {
            rateEUObj = JSON.parse(e.body);
            rateBuyEU.innerHTML = rateEUObj[0].rateBuy;
            rateSellEU.innerHTML = rateEUObj[0].rateSell;
            rate.gr('rateEU')
        });
    });
}
function checkBuy(pair1, pair2, rateBuy) {
    let date = new Date();
    let flag;
    let q;
    if (rowsSell.length <= 0) flag = 1;
    for (let i = 0; i < rowsSell.length; i++) {
        if (rateBuy === rowsPriceSell[i].innerHTML) {
            flag = 0;
            q = i;
            break;
        }
        else {
            flag = 1;
        }
    }
    if(flag === 0) {
        stompClient.send("/app/id", {}, JSON.stringify({
            'id': idSell[q].innerHTML,
            'rate': rowsPriceSell[q].innerHTML,
            'quantity': rowsQuanSell[q].innerHTML,
            'total': rowsTotalSell[q].innerHTML,
            'type': pair2,
            'status': 'done',
            'date': date
        }));
        rowsSell[q].remove();
        setTimeout(tableSell, 1000, pair2);
    } else addBidsBuy(pair1, rateBuy);
}

function checkSell(pair1, pair2) {
    let date = new Date();
    let flag;
    let q;
    if (rowsBuy.length <= 0) flag = 1;
    for (let i = 0; i < rowsBuy.length; i++) {
        if (rateSell.value === rowsPriceBuy[i].innerHTML) {
            flag = 0;
            q = i;
            break;
        }
        else {
            flag = 1;
        }
    }
    if(flag === 0) {
        stompClient.send("/app/id", {}, JSON.stringify({
            'id': idBuy[q].innerHTML,
            'rate': rowsPriceBuy[q].innerHTML,
            'quantity': rowsQuanBuy[q].innerHTML,
            'total': rowsTotalBuy[q].innerHTML,
            'type': pair2,
            'status': 'done',
            'date': date
        }));
        rowsBuy[q].remove();
        setTimeout(tableBuy, 1000, pair2);
    } else addBidsSell(pair1);
}

function addBidsBuy(pair, rateBuy) {

        // if (pair === "rateUR") rateBuy = parseFloat(rateBuyUR.innerHTML);
        // if (pair === "rateER") rateBuy = parseFloat(rateBuyER.innerHTML);
        // if (pair === "rateUE") rateBuy = parseFloat(rateBuyUE.innerHTML);
        // if (pair === "rateEU") rateBuy = parseFloat(rateBuyEU.innerHTML);

        stompClient.send("/app/" + pair, {}, JSON.stringify({
            'rate': rateBuy,
            'quantity': quantityBuy.value,
            'total': totalBuy.value,
            'type': pair,
            'status': 'not_done',
            'date': null
        }));

        $("#quantityBuy").val("0");
        $("#totalBuy").val("0");

}

function addBidsSell(pair) {
    stompClient.send("/app/" + pair, {}, JSON.stringify({
        'rate':rateSell.value,
        'quantity':quantitySell.value,
        'total':totalSell.value,
        'type':pair,
        'status':'not_done',
        'date': null
    }));

    $("#quantitySell").val("0");
    $("#totalSell").val("0");
}

document.getElementById('butBuy').onclick = e => {
    let rateBuy;
    e.preventDefault();
    let n = changePair.innerText;

    if (n === 'USD/RUR'){
        rateBuy = parseFloat(rateBuyUR.innerHTML);
        checkBuy("URBuy", "URSell", rateBuy);
    }
    if (n === 'EUR/RUR'){
        rateBuy = parseFloat(rateBuyER.innerHTML);
        checkBuy("ERBuy", "ERSell", rateBuy);
    }
    if (n === 'USD/EUR'){
        rateBuy = parseFloat(rateBuyUE.innerHTML);
        checkBuy("UEBuy", "UESell", rateBuy);
    }
    if (n === 'EUR/USD'){
        rateBuy = parseFloat(rateBuyEU.innerHTML);
        checkBuy("EUBuy", "EUSell", rateBuy);
    }
};

document.getElementById('butSell').onclick = e => {
    let rateSell;
    e.preventDefault();
    let n = changePair.innerText;

    if (n === 'USD/RUR'){
        rateSell = parseFloat(rateSellUR.innerHTML);
        checkSell("URSell", "URBuy", rateSell);
    }
    if (n === 'EUR/RUR'){
        rateSell = parseFloat(rateSellER.innerHTML);
        checkSell("ERSell", "ERBuy", rateSell);
    }
    if (n === 'USD/EUR'){
        rateSell = parseFloat(rateSellUE.innerHTML);
        checkSell("UESell", "UEBuy", rateSell);
    }
    if (n === 'EUR/USD'){
        rateSell = parseFloat(rateSellEU.innerHTML);
        checkSell("EUSell", "EUBuy", rateSell);
    }
};

//автозаполнение формы продажи
function autofillSell(){
        for (let i = 0; i <= rowsBuy.length - 1; i++) {
            rowsBuy[i].addEventListener('click', function () {
                rateSell.innerHTML = rowsPriceBuy[i].innerHTML;
                quantitySell.value = rowsQuanBuy[i].innerHTML;
                outTotal();
            })
        }
}

//автозаполнение формы покупки
function autofillBuy(){
        for (let i = 0; i <= rowsSell.length - 1; i++) {
            rowsSell[i].addEventListener('click', function () {
                rateBuy.innerHTML = rowsPriceSell[i].innerHTML;
                quantityBuy.value = rowsQuanSell[i].innerHTML;
                outTotal();
            })
        }
}