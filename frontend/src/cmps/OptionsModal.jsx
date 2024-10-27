import { useEffect, useState } from "react";
import { Backdrop } from "./Backdrop";
import { eventBus, HIDE_OPTIONS_MODAL, hideOptionsModal, SHOW_OPTIONS_MODAL } from "../services/event-bus.service";

export function OptionsModal({ children }) {

    const [isShown, setIsShown] = useState(false)

    useEffect(()=> {
        const unsubscribe1 = eventBus.on(SHOW_OPTIONS_MODAL, () => {
			setIsShown(true)
		})

        const unsubscribe2 = eventBus.on(HIDE_OPTIONS_MODAL, () => {
			setIsShown(false)
		})

		return ()=> {
            unsubscribe1()
            unsubscribe2()
        }
    })

    if(!isShown) return

    return (
        <>
            <Backdrop onClose={hideOptionsModal}/>
            <section className="options-modal">
                {children}
            </section>
        </>
    )
}