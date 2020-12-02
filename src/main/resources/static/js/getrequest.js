function outTotal() {
    totalBuy.value = parseFloat(rateBuy.value) * parseInt(quantityBuy.value).toFixed(2);
    totalSell.value = parseFloat(rateSell.value) * parseInt(quantitySell.value).toFixed(2);
}


window.onload = function () {
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


    const changePair = document.getElementById('pairs');
    const rateBuy = document.getElementById('rateBuy');
    const rateSell = document.getElementById('rateSell');
    const data = {
        series: [
            [],
            []
        ]
    };

    function getRateFromDb(pair) {

        if (pair === "rateUR"){
            getRate(rateURObj);
        }
        else if (pair === "rateER") {
            getRate(rateERObj);
        }
        else if (pair === "rateUE") {
            getRate(rateUEObj);
        }
        else {
            getRate(rateEUObj);
        }


        function getRate(json){
            for(let i = 0; i < json.length; i++) {
                data.series[0].push(json[i].rateBuy);
                data.series[1].push(json[i].rateSell);
                rateBuy.innerHTML = json[i].rateBuy;
                rateSell.innerHTML = json[i].rateSell;
                outTotal();
                if (data.series[0].length === 40) {
                    data.series[0].shift();
                    data.series[1].shift();
                }
            }
            new Chartist.Line('.ct-chart', data);
        }

        // stompClient.unsubscribe("myTopicId");
        // stompClient.subscribe('/topic/' + pair, function (e) {
        //     let json = JSON.parse(e.body);
        //     for(let i = 0; i < json.length; i++) {
        //         data.series[0].push(json[i].rateBuy);
        //         data.series[1].push(json[i].rateSell);
        //         rateBuy.innerHTML = json[i].rateBuy;
        //         rateSell.innerHTML = json[i].rateSell;
        //         outTotal();
        //         if (data.series[0].length === 40) {
        //             data.series[0].shift();
        //             data.series[1].shift();
        //         }
        //     }
        //     new Chartist.Line('.ct-chart', data);
        // }, { id: "myTopicId"});
    }

    const bidsBuy = document.getElementById('bidsBuy');
    const rowsBuy = document.getElementsByClassName('rowsBuy');

    let timerId = null;

    changePair.onchange = function () {
        let n = this.selectedIndex;
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
        getRateFromDb(choice);
    };
    const quantityBuy = document.getElementById('quantityBuy'),
        quantitySell = document.getElementById('quantitySell'),
        totalBuy = document.getElementById('totalBuy'),
        totalSell = document.getElementById('totalSell');
    quantitySell.oninput = function () {
        outTotal();
    };
    quantityBuy.oninput = function () {
        outTotal();
    };
    rateBuy.oninput = function () {
        outTotal();
    }
};