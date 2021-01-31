let lContent = document.getElementById('l_content');
let rContent = document.getElementById('r_content');


document.getElementById('lp_title').addEventListener('click', event => {
    if (selectChoice){
        event.preventDefault();
        if (!lContent.classList.contains('show')) {
            lContent.classList.add('show');
             lContent.style.height = '0px';

            setTimeout(() => {
                lContent.style.height = '58vh';
            }, 0);
        } else {
            lContent.style.height = '0px';

            lContent.addEventListener('transitionend',
                () => {
                    lContent.classList.remove('show');
                }, {
                    once: true
                });
        }
    } else {
        modal = base.modal({
            title: 'Внимание!',
            content: 'сначала выберите пару',
        });
        setTimeout(modal.open, 1)
    }
});
document.getElementById('rp_title').addEventListener('click', event => {
    if (selectChoice){
        event.preventDefault();
        if (!rContent.classList.contains('show')) {
            rContent.classList.add('show');
            rContent.style.height = '0px';

            setTimeout(() => {
                rContent.style.height = '58vh';
            }, 0);
        } else {
            rContent.style.height = '0px';

            rContent.addEventListener('transitionend',
                () => {
                    rContent.classList.remove('show');
                }, {
                    once: true
                });
        }
    } else {
        modal = base.modal({
            title: 'Внимание!',
            content: 'сначала выберите пару',
        });
        setTimeout(modal.open, 1)
    }
});