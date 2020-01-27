let changePair = document.getElementById('pairs');
document.getElementById('butBuy').onclick = function (select) {
    select = changePair;
    n = select.selectedIndex;
    if (n === 1) ajaxPostBuy("URBuy");
    if (n === 2) ajaxPostBuy("ERBuy");
    if (n === 3) ajaxPostBuy("UEBuy");
    if (n === 4) ajaxPostBuy("EUBuy");
}

document.getElementById('butSell').onclick = function (select) {
    select = changePair;
    n = select.selectedIndex;
    if (n === 1) ajaxPostSell("URSell");
    if (n === 2) ajaxPostSell("ERSell");
    if (n === 3) ajaxPostSell("UESell");
    if (n === 4) ajaxPostSell("EUSell");
}

const quantityBuy = document.getElementById('quantityBuy');
const quantitySell = document.getElementById('quantitySell');
const rateBuy = document.getElementById('rateBuy');
const rateSell = document.getElementById('rateSell');
const totalBuy = document.getElementById('totalBuy');
const bidsSell = document.getElementById('bidsSell');
const bidsBuy = document.getElementById('bidsBuy');
const rowsPriceSell = document.getElementsByClassName('rowsPriceSell');
const rowsPriceBuy = document.getElementsByClassName('rowsPriceBuy');
const rowsQuanBuy = document.getElementsByClassName('rowsQuanBuy');
const rowsQuanSell = document.getElementsByClassName('rowsQuanSell');
const rowsTotalSell = document.getElementsByClassName('rowsTotalSell');
const rowsSell = document.getElementsByClassName('rowsSell');
const rowsBuy = document.getElementsByClassName('rowsBuy');
//отправка заявки
function ajaxPostBuy(pair){
    const formData = JSON.stringify({
        rate: $("#rateBuy").val(),
        quantity: $("#quantityBuy").val(),
        total: $("#totalBuy").val(),
        type: pair
    });
    const request = new XMLHttpRequest();
    request.responseType = "json";
    request.open('POST', window.location + pair);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                const json = request.response;
                myJson(json);
                autofillSell();
            }
        }
    }
    request.send(formData);

    function myJson(arr){
        let i;
        bidsBuy.innerHTML = '';
        for(i = 0; i < arr.length; i++) {
            bidsBuy.innerHTML += '<div class="rowsBuy"><div class="rowsPriceBuy">' + arr[i].rate + '</div><div class="rowsQuanBuy">' + arr[i].quantity + '</div><div class="rowsTotalBuy">' +
                arr[i].total + '</div></div>';
            rowsBuy[i].style.display = "flex";
        }
    }

    function autofillSell(){
        for (let i = 0; i < rowsBuy.length; i++) {
            rowsBuy[i].addEventListener('click',function () {
                rateSell.innerHTML = rowsPriceBuy[i].innerHTML;
                quantitySell.value = rowsQuanBuy[i].innerHTML;
                outTotal();
            })
        }
    }
    $("#quantityBuy").val("0");
    $("#totalBuy").val("0");
}

function ajaxPostSell(pair){
    const formData = JSON.stringify({
        rate: $("#rateSell").val(),
        quantity: $("#quantitySell").val(),
        total: $("#totalSell").val(),
        type: pair
    });
    const request = new XMLHttpRequest();
    request.responseType = "json";
    request.open('POST', window.location + pair);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                const json = request.response;
                myJson(json);
                autofillBuy();
            }
        }
    }
    request.send(formData);
    let i;
    function myJson(arr){
        bidsSell.innerHTML = '';
        for(i = 0; i < arr.length; i++) {
            bidsSell.innerHTML += '<div class="rowsSell"><div class="rowsPriceSell">' + arr[i].rate + '</div><div class="rowsQuanSell">' + arr[i].quantity + '</div><div class="rowsTotalSell">' +
                arr[i].total + '</div></div>';
            rowsSell[i].style.display = "flex";
        }
    }
    function autofillBuy(){
        alert("говно");
        for (let i = 0; i < rowsSell.length; i++) {
            rowsSell[i].addEventListener('click',function () {
                rateBuy.innerHTML = rowsPriceSell[i].innerHTML;
                quantityBuy.value = rowsQuanSell[i].innerHTML;
                outTotal();
            })
        }
    }

    $("#quantitySell").val("0");
    $("#totalSell").val("0");
}

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