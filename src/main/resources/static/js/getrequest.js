window.onload = function () {
    let changePair = document.getElementById('pairs');
    const rateBuy = document.getElementById('rateBuy');
    const rateSell = document.getElementById('rateSell');
    const data = {

        //labels: ["1"],

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
                console.log(json)
                myJson2(json);//обработка ответа
            }
        }
        req.send();
        //new Chartist.Line('.ct-chart', data);
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
        console.log(data)
    }

    let timerId = null;

    changePair.onchange = function () {
        n = this.selectedIndex;
        if (n === 1) choice = "rateUR";
        if (n === 2) choice = "rateER";
        if (n === 3) choice = "rateUE";
        if (n === 4) choice = "rateEU";
        clearInterval(timerId);
        timerId = setInterval(function () {
            getAjax(choice);
        }, 3000);
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
    function outTotal() {
        totalBuy.value = parseFloat(rateBuy.value) * parseInt(quantityBuy.value).toFixed(2);
        totalSell.value = parseFloat(rateSell.value) * parseInt(quantitySell.value).toFixed(2);
    }
}
