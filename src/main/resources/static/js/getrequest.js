function outTotal() {
    totalBuy.value = parseFloat(rateBuy.value) * parseInt(quantityBuy.value).toFixed(2);
    totalSell.value = parseFloat(rateSell.value) * parseInt(quantitySell.value).toFixed(2);
}

window.onload = function () {
    tableComplit();

    connect();
    const changePair = document.getElementById('pairs');
    const rateBuy = document.getElementById('rateBuy');
    const rateSell = document.getElementById('rateSell');
    document.getElementById('clearBD').onclick = function (e) {
        e.preventDefault();
        clearBD();
        location.reload();
    };
    document.getElementById('clearBD1').onclick = function (e) {
        e.preventDefault();
        clearBD1();
        location.reload();
    }
    const data = {
        series: [
            [],
            []
        ]
    };

    function clearBD() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.open('GET', window.location + "clear_bid");
        xhr.send();
    }
    function clearBD1() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.open('GET', window.location + "clear_rate");
        xhr.send();
    }

    function testIpReq() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.open('GET', window.location + "ip");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.response)
                document.getElementById('ip').innerHTML = xhr.response;
            }
        }
        xhr.send();
    }

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

    let timerId = null;

    changePair.onchange = function () {
        n = this.selectedIndex;
        let arg1, arg2, choice;
        if (n === 1) {
            choice = "rateUR";
            arg1 = "URBuy";
            arg2 = "URSell";
        }
        if (n === 2) {
            choice = "rateER";
            arg1 = "ERBuy";
            arg2 = "ERSell";
        }
        if (n === 3) {
            choice = "rateUE";
            arg1 = "UEBuy";
            arg2 = "UESell";
        }
        if (n === 4) {
            choice = "rateEU";
            arg1 = "EUBuy";
            arg2 = "EUSell";
        }
        tableBuy(arg1);
        tableSell(arg2);


        clearInterval(timerId);
        timerId = setInterval(function () {
            getAjax(choice);
        }, 5000);
    }
    const quantityBuy = document.getElementById('quantityBuy'),
        quantitySell = document.getElementById('quantitySell'),
        totalBuy = document.getElementById('totalBuy'),
        totalSell = document.getElementById('totalSell');
    quantitySell.oninput = function () {
        outTotal();
    }
    quantityBuy.oninput = function () {
        outTotal();
    }
}