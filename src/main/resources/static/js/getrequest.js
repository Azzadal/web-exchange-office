function outTotal() {
    totalBuy.value = parseFloat(rateBuy.value) * parseInt(quantityBuy.value).toFixed(2);
    totalSell.value = parseFloat(rateSell.value) * parseInt(quantitySell.value).toFixed(2);
}

window.onload = function () {
    testIpReq();
    connect();
    const changePair = document.getElementById('pairs');
    const rateBuy = document.getElementById('rateBuy');
    const rateSell = document.getElementById('rateSell');
    const data = {
        series: [
            [],
            []
        ]
    };





    function testIpReq() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.open('GET', window.location + "ip");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.response)
                document.getElementById('greetings').innerHTML = xhr.response;
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
        if (n === 3) choice = "rateUE";
        if (n === 4) choice = "rateEU";
        tableBuy(arg1);
        tableSell(arg2);
        clearInterval(timerId);
        timerId = setInterval(function () {
            getAjax(choice);
        }, 5000);
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