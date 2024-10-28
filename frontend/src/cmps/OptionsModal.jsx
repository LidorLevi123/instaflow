import { Backdrop } from "./Backdrop";

export function OptionsModal({ children, onClose }) {
    return (
        <>
            <Backdrop onClose={onClose}/>
            <section className="options-modal">
                {children}
            </section>
        </>
    )
}