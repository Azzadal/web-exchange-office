base.modal = function (options) {
    function _createModal(options) {
        const modal = document.createElement('div')
        modal.classList.add('vmodal')
        modal.insertAdjacentHTML('afterbegin', `
            <div class="modal-overlay" data-close="true">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">${options.title}</span>
                    <span class="modal-close" data-close="true">&times;</span>
                </div>
                <div class="modal-body">
                    ${options.content}
                </div>
                <div class="modal-footer">
                    <button data-ok="true">Ok</button>
                    <button data-close="true">Cancel</button>
                </div>
            </div>
        </div>
        `
        )
        document.body.prepend(modal)
        return modal
    }

    let closing = false
    let destroyed = false
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)

    const modal = {
        open() {
            if (destroyed) return console.log('Modal is destroyed')
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        }
    }

    const listener = event => {
        if (event.target.dataset.close){
            modal.close()
            setTimeout(modal.destroy, 300)
        }
        if (event.target.dataset.ok){
            options.execute()
            modal.close()
            setTimeout(modal.destroy, 300)
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy(){
            $modal.remove()
            $modal.removeEventListener('click', listener)
            destroyed = true
        }
    })
}