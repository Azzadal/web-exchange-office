const quantityBuy = document.getElementById('quantityBuy'),
    quantitySell = document.getElementById('quantitySell'),
    rateBuy = document.getElementById('rateBuy'),
    rateSell = document.getElementById('rateSell'),
    totalBuy = document.getElementById('totalBuy'),
    bidsSell = document.getElementById('bidsSell'),
    bidsBuy = document.getElementById('bidsBuy'),
    rowsPriceSell = document.getElementsByClassName('rowsPriceSell'),
    rowsPriceBuy = document.getElementsByClassName('rowsPriceBuy'),
    rowsQuanBuy = document.getElementsByClassName('rowsQuanBuy'),
    rowsQuanSell = document.getElementsByClassName('rowsQuanSell'),
    rowsSell = document.getElementsByClassName('rowsSell'),
    rowsBuy = document.getElementsByClassName('rowsBuy');
let stompClient = null;
let changePair = document.getElementById('pairs');

function connect() {
    const socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/buys',function (greeting) {
            let gvn = JSON.parse(greeting.body);
            bidsBuy.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                bidsBuy.innerHTML += '<div class="rowsBuy"><div class="rowsPriceBuy">' + gvn[i].rate + '</div><div class="rowsQuanBuy">' + gvn[i].quantity + '</div><div class="rowsTotalBuy">' +
                    gvn[i].total + '</div></div>';
                rowsBuy[i].style.display = "flex";
            }
            autofillSell();
        });
        stompClient.subscribe('/topic/sells',function (greeting) {
            let gvn = JSON.parse(greeting.body);
            bidsSell.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                bidsSell.innerHTML += '<div class="rowsSell"><div class="rowsPriceSell">' + gvn[i].rate + '</div><div class="rowsQuanSell">' + gvn[i].quantity + '</div><div class="rowsTotalSell">' +
                    gvn[i].total + '</div></div>';
                rowsSell[i].style.display = "flex";
            }
            autofillBuy();
        });
    });
}

function addBidsBuy(pair) {
    stompClient.send("/app/" + pair, {}, JSON.stringify({
        'rate':rateBuy.value,
        'quantity':quantityBuy.value,
        'total':totalBuy.value,
        'type':pair}));

    $("#quantityBuy").val("0");
    $("#totalBuy").val("0");
}

function addBidsSell(pair) {
    stompClient.send("/app/" + pair, {}, JSON.stringify({
        'rate':rateSell.value,
        'quantity':quantitySell.value,
        'total':totalSell.value,
        'type':pair}));

    $("#quantitySell").val("0");
    $("#totalSell").val("0");
}

document.getElementById('butBuy').onclick = function (e) {
    e.preventDefault();
    n = changePair.selectedIndex;
    if (n === 1) addBidsBuy("URBuy");
    if (n === 2) addBidsBuy("ERBuy");
    if (n === 3) addBidsBuy("UEBuy");
    if (n === 4) addBidsBuy("EUBuy");
}

document.getElementById('butSell').onclick = function (select) {
    select = changePair;
    n = select.selectedIndex;
    if (n === 1) addBidsSell("URSell");
    if (n === 2) addBidsSell("ERSell");
    if (n === 3) addBidsSell("UESell");
    if (n === 4) addBidsSell("EUSell");
}

//автозаполнение формы продажи
function autofillSell(){
    for (let i = 0; i < rowsBuy.length; i++) {
        rowsBuy[i].addEventListener('click',function () {
            rateSell.innerHTML = rowsPriceBuy[i].innerHTML;
            quantitySell.value = rowsQuanBuy[i].innerHTML;
            outTotal();
        })
    }
}

//автозаполнение формы покупки
function autofillBuy(){
    for (let i = 0; i < rowsSell.length; i++) {
        rowsSell[i].addEventListener('click',function () {
            rateBuy.innerHTML = rowsPriceSell[i].innerHTML;
            quantityBuy.value = rowsQuanSell[i].innerHTML;
            outTotal();
        })
    }
}

//
function ajaxRate(type) {
    const formData = JSON.stringify({
        rateBuy: $("#rateBuy").val(),
        rateSell: $("#rateSell").val(),
        type: type
    });
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open('POST', window.location + "rate");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(formData);
}