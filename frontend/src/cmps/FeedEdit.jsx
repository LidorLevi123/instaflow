import { Backdrop } from './Backdrop'
import { SvgIcon } from './SvgIcon'

export function FeedEdit({ onClose }) {
    return (
        <>
            <Backdrop onClose={onClose}/>
            <section className="feed-edit">
                <h2 className="title">Create new post</h2>
                <div className="content-upload-container">
                    <SvgIcon iconName="media" />
                    <p>Drag photos and videos here</p>

                    <label htmlFor="file-input" className="btn-select">Select from computer</label>
                    <input type="file" id="file-input" />
                </div>
            </section>
        </>
    )
}