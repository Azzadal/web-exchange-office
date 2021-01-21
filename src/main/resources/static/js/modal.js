base.modal = function (options) {
    function _createModal(options){
        const modal = document.createElement('div')
        modal.classList.add('vmodal')
        modal.insertAdjacentHTML('afterbegin', `
            <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">${options.title}</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    
                </div>
                <div class="modal-footer">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
        `
        )
        document.body.appendChild(modal)
        return modal
    }

    const $modal = _createModal(options)
    const ANIMATION_SPEED = 200
    let closing = false

    return{
        open(){
            !closing && $modal.classList.add('open')
        },
        close(){
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
        destroy(){}
    }
}