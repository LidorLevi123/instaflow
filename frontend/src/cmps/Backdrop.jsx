import { SvgIcon } from "./SvgIcon";

export function Backdrop({ onClose }) {
    return (
        <>
            <div className="backdrop" onClick={onClose}>
                <SvgIcon iconName="close" />
            </div>
        </>
    )
}