let x = document.getElementById('pairs');
let panels = document.getElementsByClassName('panels');
let g = document.getElementsByClassName('select__pair__item');
let lPanelTitle = document.getElementsByClassName('l__panel__title');
let rPanelTitle = document.getElementsByClassName('r__panel__title');
let schedule = document.getElementById('schedule');
let mainHeader = document.getElementsByClassName('main__header');
let pivotTable = document.getElementsByClassName('pivot_table');
let select = function(){
    let selectItem = document.querySelectorAll('.select__pair__item');

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoice)
    });

    function selectChoice(){
        current.innerText = this.innerText;
        x.classList.remove('show');
        panels[0].style.zIndex = '0';
        schedule.style.zIndex = '0';
        lPanelTitle[0].style.zIndex = '0';
        rPanelTitle[0].style.zIndex = '0';
        mainHeader[0].style.zIndex = '0';
        pivotTable[0].style.zIndex = '0';
    }
    let current = document.getElementById('current');
}
select();

document.getElementById('current').addEventListener('click', function(event){
    event.preventDefault();
    if (!x.classList.contains('show')) {
    
        panels[0].style.zIndex = '-1';
        lPanelTitle[0].style.zIndex = '-1';
        rPanelTitle[0].style.zIndex = '-1';
        mainHeader[0].style.zIndex = '-1';
        pivotTable[0].style.zIndex = '-1';
        x.classList.add('show');
        x.style.height = 'auto';
        schedule.style.zIndex = '-1';
        var height = x.clientHeight + 'px';

        x.style.height = '0px';

        setTimeout(function () {
            x.style.height = height;
        }, 0);
    } else {
        x.style.height = '0px';
        panels[0].style.zIndex = '0';
        schedule.style.zIndex = '0';
        lPanelTitle[0].style.zIndex = '0';
        rPanelTitle[0].style.zIndex = '0';
        mainHeader[0].style.zIndex = '0';
        pivotTable[0].style.zIndex = '0';
        
        x.addEventListener('transitionend', 
            function () {
                
                x.classList.remove('show');
            }, {
                once: true
                });
    }
});