import { useEffect, useState } from "react"
import { eventBus } from "../services/event-bus.service.js"
import { Backdrop } from "./Backdrop.jsx"

export function DynamicModal() {
    const [modalData, setModalData] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBus.on('show-modal', modalData => {
            setModalData(modalData)
        })

        return unsubscribe
    }, [])

    function onCloseModal() {
        setModalData(null)
    }


    if (!modalData) return <></>

    const Cmp = modalData.cmp || <></>
    const props = modalData.props || null

    return (
        <>
            <Backdrop onClose={onCloseModal}></Backdrop>
            <div className="dynamic-modal">
                <Cmp {...props} />
            </div>
        </>
    )
}


