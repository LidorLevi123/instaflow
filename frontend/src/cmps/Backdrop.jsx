import { SvgIcon } from "./SvgIcon";

export function Backdrop({ onClose, style = {}}) {
    return (
        <>
            <div className="backdrop" onClick={onClose} style={style}>
                <SvgIcon iconName="close" />
            </div>
        </>
    )
}