function outTotal() {
    totalBuy.value = parseFloat(rateBuy.value) * parseInt(quantityBuy.value).toFixed(2);
    totalSell.value = parseFloat(rateSell.value) * parseInt(quantitySell.value).toFixed(2);
}
/*
let stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    const socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings',function (greeting) {
            let gvn = JSON.parse(greeting.body);
            for (let i = 0; i < gvn.length; i++) {
                $("#greetings").append("<tr><td>" + gvn[i].rate + "</td></tr>");
            }
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({
        'rate':$("#rateBuy").val(),
        'quantity': $("#quantityBuy").val(),
        'total':$("#totalBuy").val(),
        'type':"URBuy"}));
}

function showGreeting(message) {
    for (let i = 0; i < message.length; i++) {
    //    $("#greetings").append("<tr><td>" + message.body[i] + "</td></tr>");
        console.log(message.body.rate[i])
    }

}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

*/

window.onload = function () {
    const changePair = document.getElementById('pairs');
    const rateBuy = document.getElementById('rateBuy');
    const rateSell = document.getElementById('rateSell');
    const data = {
        series: [
            [],
            []
        ]
    };

    function getAjax(pair) {
        const xhr = new XMLHttpRequest();

        xhr.responseType = "json";

        xhr.open('GET', window.location + pair);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                rateBuy.innerHTML = xhr.response.rateBuy;
                rateSell.innerHTML = xhr.response.rateSell;
                ajaxRate(pair);//сохранение курса в БД
                getRateLib(pair);//получение курса из БД
                outTotal();
            }
        }
        xhr.send();
    }

    function getRateLib(pair) {
        const req = new XMLHttpRequest();
        req.responseType = "json";
        req.open('GET', window.location + "rate/" + pair);
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                const json = req.response;
                myJson2(json);//обработка ответа
            }
        }
        req.send();
    }

    function myJson2(response){
        for(let i = 0; i < response.length; i++) {
            data.series[0].push(response[i].rateBuy);
            data.series[1].push(response[i].rateSell);
            if (data.series[0].length === 20) {
                data.series[0].shift();
                data.series[1].shift();
            }
        }
        new Chartist.Line('.ct-chart', data);
    }

    const bidsBuy = document.getElementById('bidsBuy');
    const rowsBuy = document.getElementsByClassName('rowsBuy');
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
                    bidsBuy.innerHTML += '<div class="rowsBuy"><div class="rowsPriceBuy">' + json[i].rate + '</div><div class="rowsQuanBuy">' + json[i].quantity + '</div><div class="rowsTotalBuy">' +
                        json[i].total + '</div></div>';
                    rowsBuy[i].style.display = "flex";
                }
            }
        }
        req.send();
    }

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
                    bidsSell.innerHTML += '<div class="rowsSell"><div class="rowsPriceSell">' + json[i].rate + '</div><div class="rowsQuanSell">' + json[i].quantity + '</div><div class="rowsTotalSell">' +
                        json[i].total + '</div></div>';
                    rowsSell[i].style.display = "flex";
                }
            }
        }
        req.send();
    }

    let timerId = null;

    changePair.onchange = function () {
        n = this.selectedIndex;
        if (n === 1) {
            choice = "rateUR";
            arg1 = "URBuy";
            arg2 = "URSell";
        }
        if (n === 2) choice = "rateER";
        if (n === 3) choice = "rateUE";
        if (n === 4) choice = "rateEU";
        tableBuy(arg1);
        tableSell(arg2);
        clearInterval(timerId);
        timerId = setInterval(function () {
            getAjax(choice);
        }, 10000);
    }


    const quantityBuy = document.getElementById('quantityBuy');
    const quantitySell = document.getElementById('quantitySell');
    const totalBuy = document.getElementById('totalBuy');
    const totalSell = document.getElementById('totalSell');
    quantitySell.oninput = function () {
        outTotal();
    }
    quantityBuy.oninput = function () {
        outTotal();
    }
}