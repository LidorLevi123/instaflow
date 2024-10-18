import { useState } from 'react'
import { Backdrop } from './Backdrop'
import { SvgIcon } from './SvgIcon'

export function FeedEdit({ onClose }) {
    const [editStage, setEditStage] = useState(0)
    const [localImgUrl, setLocalImgUrl] = useState(null)

    function getTitleTxt() {
        var title = ''

        if (editStage === 0 || editStage === 3) title = 'Create new post'
        else if (editStage === 1) title = 'Crop'
        else if (editStage === 2) title = 'Edit'

        return title
    }

    function onAddFeed() { }

    function onUploaded(ev) {
        const imgUrl = URL.createObjectURL(ev.target.files[0])
        setLocalImgUrl(imgUrl)
        setEditStage(1)
    }

    function Title() {
        const title = getTitleTxt()

        if (editStage === 0) {
            return <h2 className="title">{title}</h2>
        } else {

            const btnTxt = editStage === 3 ? 'Share' : 'Next'
            const btnClickEvent = editStage === 3 ? onAddFeed : () => { setEditStage(prev => prev + 1) }

            return (
                <>
                    <div className="title-container">
                        <SvgIcon iconName="back" className="btn" onClick={() => setEditStage(prev => prev - 1)} />
                        <h2>{title}</h2>
                        <span className="btn-next" onClick={btnClickEvent}>{btnTxt}</span>
                    </div>
                </>
            )
        }
    }

    const cmpClass = editStage >= 2 ? 'feed-edit expanded' : 'feed-edit'

    return (
        <>
            <Backdrop onClose={onClose} />

            <section className={cmpClass}>

                {editStage === 0 &&
                    <>
                        <Title />
                        <div className="content-upload-container">
                            <SvgIcon iconName="media" />
                            <p>Drag photos and videos here</p>

                            <label htmlFor="file-input" className="btn-select">Select from computer</label>
                            <input type="file" id="file-input" onChange={onUploaded} />
                        </div>
                    </>
                }

                {editStage === 1 &&
                    <>
                        <Title />
                        <div className="crop-container">
                            <img src={localImgUrl} alt="Local image" className="local-img"/>
                        </div>
                    </>
                }
            </section>
        </>
    )
}