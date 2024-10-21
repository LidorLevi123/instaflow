import { SvgIcon } from "./SvgIcon";

export function ContentUploadContainer({ onUploaded }) {

    return (
        <section className="content-upload-container">
            <SvgIcon iconName="media" />
            <p>Drag photos and videos here</p>

            <label htmlFor="file-input" className="btn-select">Select from computer</label>
            <input type="file" id="file-input" onChange={onUploaded} />
        </section>
    )
}