let lContent = document.getElementById('l_content');
let rContent = document.getElementById('r_content');

const listener = html => {
        if (selectChoice){
            if (!html.classList.contains('show')) {
                html.classList.add('show');
                html.style.height = '0px';

                setTimeout(() => {
                    html.style.height = 'auto';
                }, 1);
            } else {
                html.style.height = '0px';

                html.addEventListener('transitionend',
                    () => {
                        html.classList.remove('show');
                    }, {
                        once: true
                    });
            }
        } else {
            modal = base.modal({
                title: 'Внимание!',
                content: 'сначала выберите пару',
                displayOk: 'none',
                displayCancel: 'none'
            });
            setTimeout(modal.open, 1);
            setTimeout(modal.close, 2000);
        }
}

document.getElementById('lp_title').addEventListener('click', event => {
    listener(lContent);
});
document.getElementById('rp_title').addEventListener('click', event => {
    listener(rContent);
});