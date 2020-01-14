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
const rateBuy = document.getElementById('rateBuy');
const totalBuy = document.getElementById('totalBuy');
const bidsSell = document.getElementById('bidsSell');
const bidsBuy = document.getElementById('bidsBuy');
const rowPrice = document.getElementsByClassName('rowPrice');
const rowQuan = document.getElementsByClassName('rowQuan');
const rowTotal = document.getElementsByClassName('rowTotal');
const row = document.getElementsByClassName('row');
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
            }
        }
    }
    request.send(formData);

    function myJson(arr){
        let i;
        bidsBuy.innerHTML = '';
        for(i = 0; i < arr.length; i++) {
            bidsBuy.innerHTML += '<div class="rowSell"><div class="rowBuy">' + arr[i].rate + '</div><div class="rowBuy">' + arr[i].quantity + '</div><div class="rowBuy">' +
                arr[i].total + '</div></div>';
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
                 temp();
             }
         }
     }
     request.send(formData);

     function myJson(arr){
         let i, n = 0;
         bidsSell.innerHTML = '';
         for(i = 0; i < arr.length; i++) {
             bidsSell.innerHTML += '<div class="row"><div class="rowPrice">' + arr[i].rate + '</div><div class="rowQuan">' + arr[i].quantity + '</div><div class="rowTotal">' +
                 arr[i].total + '</div></div>';
             row[i].style.display = "flex";
         }

     }
     function temp(){
         for (let i = 0; i < row.length; i++) {
             row[i].addEventListener('click',function () {
                 rateBuy.innerHTML = rowPrice[i].innerHTML;
                 quantityBuy.value = rowQuan[i].innerHTML;
                 totalBuy.innerHTML = rowTotal[i].innerHTML;
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

