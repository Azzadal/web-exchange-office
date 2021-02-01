let lContent = document.getElementById('l_content');
let lpTitle = document.getElementById('lp_title');
let rContent = document.getElementById('r_content');
let rpTitle = document.getElementById('rp_title');

const listener = (body) => {
        if (selectChoice){
            if (!body.classList.contains('show')) {
                body.classList.add('show');
                body.style.height = 'auto';
                let height = body.clientHeight + 'px';
                body.style.height = '0px';

                setTimeout(() => {
                    body.style.height = height;
                }, 0);
            } else {
                body.style.height = '0px';

                body.addEventListener('transitionend',
                    () => {
                        body.classList.remove('show');
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