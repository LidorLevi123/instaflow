export const SHOW_MSG = 'show-msg'
export const SHOW_OPTIONS_MODAL = 'show-options-modal'
export const HIDE_OPTIONS_MODAL = 'hide-options-modal'

function createEventEmitter() {
    const listenersMap = {}
    return {
        on(evName, listener){
            listenersMap[evName] = (listenersMap[evName])? [...listenersMap[evName], listener] : [listener]
            return ()=>{
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBus = createEventEmitter()

export function showUserMsg(msg) {
    eventBus.emit(SHOW_MSG, msg)
}

export function showOptionsModal() {
    eventBus.emit(SHOW_OPTIONS_MODAL)
}

export function hideOptionsModal() {
    eventBus.emit(HIDE_OPTIONS_MODAL)
}

export function showSuccessMsg(txt) {
    showUserMsg({txt, type: 'success'})
}
export function showErrorMsg(txt) {
    showUserMsg({txt, type: 'error'})
}

window.showUserMsg = showUserMsg