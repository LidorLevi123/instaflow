import { Backdrop } from "./Backdrop";

export function OptionsModal({ children, onClose }) {
    const style = {zIndex: 1}
    return (
        <>
            <Backdrop onClose={onClose} style={style}/>
            <section className="options-modal" style={style}>
                {children}
            </section>
        </>
    )
}