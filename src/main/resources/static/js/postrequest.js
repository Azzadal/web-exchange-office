const quantityBuy = document.getElementById('quantityBuy'),
    id = document.getElementsByClassName('id'),
    quantitySell = document.getElementById('quantitySell'),
    rateBuy = document.getElementById('rateBuy'),
    rateSell = document.getElementById('rateSell'),
    totalBuy = document.getElementById('totalBuy'),
    totalSell = document.getElementById('totalSell'),
    bidsSell = document.getElementById('bidsSell'),
    bidsBuy = document.getElementById('bidsBuy'),
    rowsPriceSell = document.getElementsByClassName('rowsPriceSell'),
    rowsPriceBuy = document.getElementsByClassName('rowsPriceBuy'),
    rowsQuanBuy = document.getElementsByClassName('rowsQuanBuy'),
    rowsQuanSell = document.getElementsByClassName('rowsQuanSell'),
    rowsTotalSell = document.getElementsByClassName('rowsTotalSell'),
    rowsTotalBuy = document.getElementsByClassName('rowsTotalBuy'),
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
                bidsBuy.innerHTML += '<div class="rowsBuy"><div class="id">' + gvn[i].id + '</div><div class="rowsPriceBuy">' + gvn[i].rate +
                    '</div><div class="rowsQuanBuy">' + gvn[i].quantity + '</div><div class="rowsTotalBuy">' +
                    gvn[i].total + '</div></div>';
                rowsBuy[i].style.display = "flex";
            }
            autofillSell();
        });
        stompClient.subscribe('/topic/sells',function (greeting) {
            let gvn = JSON.parse(greeting.body);
            bidsSell.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                bidsSell.innerHTML += '<div class="rowsSell"><div class="id">' + gvn[i].id + '</div><div class="rowsPriceSell">' + gvn[i].rate +
                    '</div><div class="rowsQuanSell">' + gvn[i].quantity + '</div><div class="rowsTotalSell">' +
                    gvn[i].total + '</div></div>';
                rowsSell[i].style.display = "flex";
            }
            console.log(gvn)
            autofillBuy();
        });
    });
}

function checkBuy(pair1, pair2) {
    let flag;
    let q;
    if (rowsSell.length <= 0) flag = 1;
    for (let i = 0; i < rowsSell.length; i++) {
        if (rateBuy.value === rowsPriceSell[i].innerHTML) {
            console.log(i)
            flag = 0;
            q = i;
            return;
        }
        else {
            addBidsBuy(pair1);
        }
    }


    stompClient.send("/app/id", {}, JSON.stringify({
        'id':id[q].innerHTML,
        'rate':rowsPriceSell[q].innerHTML,
        'quantity':rowsQuanSell[q].innerHTML,
        'total':rowsTotalSell[q].innerHTML,
        'type':pair2,
        'status':'done'}));

    rowsSell[q].remove();
}

function checkSell(pair1, pair2) {
    let flag;
    let q;
    if (rowsBuy.length <= 0) flag = 1;
    for (let i = 0; i < rowsBuy.length; i++) {
        if (rateSell.value === rowsPriceBuy[i].innerHTML) {
            flag = 0;
            q = i;
        } else {
            flag = 1;
        }
    }
    if (flag === 1) {
        addBidsSell(pair1);
    } else {
        //если заявка нашлась то удаяем ее из списка заявок
        console.log(q)
        stompClient.send("/app/id", {}, JSON.stringify({
            'id':id[q].innerHTML,
            'rate':rowsPriceBuy[q].innerHTML,
            'quantity':rowsQuanBuy[q].innerHTML,
            'total':rowsTotalBuy[q].innerHTML,
            'type':pair2,
            'status':'done'}));

        rowsBuy[q].remove();
    }
}

function addBidsBuy(pair) {
    stompClient.send("/app/" + pair, {}, JSON.stringify({
        'rate':rateBuy.value,
        'quantity':quantityBuy.value,
        'total':totalBuy.value,
        'type':pair,
        'status':'not_done'}));

    $("#quantityBuy").val("0");
    $("#totalBuy").val("0");
}

function addBidsSell(pair) {
    stompClient.send("/app/" + pair, {}, JSON.stringify({
        'rate':rateSell.value,
        'quantity':quantitySell.value,
        'total':totalSell.value,
        'type':pair,
        'status':'not_done'}));

    $("#quantitySell").val("0");
    $("#totalSell").val("0");
}

document.getElementById('butBuy').onclick = function (e) {
    e.preventDefault();
    n = changePair.selectedIndex;
    //if (n === 1) addBidsBuy("URBuy");
    if (n === 1) checkBuy("URBuy", "URSell");
    if (n === 2) checkBuy("ERBuy", "ERSell");
    if (n === 3) checkBuy("UEBuy", "UESell");
    if (n === 4) checkBuy("EUBuy", "EUSell");
}

document.getElementById('butSell').onclick = function (select) {
    select = changePair;
    n = select.selectedIndex;
    if (n === 1) checkSell("URSell", "URBuy")
    if (n === 2) checkSell("ERSell", "ERBuy")
    if (n === 3) checkSell("UESell", "UEBuy")
    if (n === 4) checkSell("EUSell", "EUBuy")
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