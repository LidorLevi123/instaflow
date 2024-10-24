import { useRef, useState } from 'react'
import { appService } from '../services/app.service'

import { Backdrop } from './Backdrop'
import { SvgIcon } from './SvgIcon'
import { ContentUploadContainer } from './ContentUploadContainer'
import { CropContainer } from './CropContainer'
import { EditContainer } from './EditContainer'
import { CreateContainer } from './CreateContainer'
import { feedService } from '../services/feed'
import { useForm } from '../customHooks/useForm'
import { saveFeed } from '../store/actions/feed.actions'
import { uploadService } from '../services/upload.service'

export function FeedEdit({ onClose, user }) {
    const [editStage, setEditStage] = useState(0)
    const [localImgUrl, setLocalImgUrl] = useState(null)
    const [isFilterList, setIsFilterList] = useState(true)
    const [selectedFilter, setSelectedFilter] = useState('Original')
    const [adjustments, setAdjustments] = useState(appService.getImgAdjustments())
    const [feed, setFeed, handleChange] = useForm(feedService.getEmptyFeed())
    const imgEvRef = useRef()

    function handleAdjustmentsChange() {}

    async function onSaveFeed() {
        try {
            const { secure_url: imgUrl } = await uploadService.uploadImg(imgEvRef.current)
            feed.imgUrls.push(imgUrl)
            await saveFeed(feed)
            onClose()
        } catch (err) {
            console.log('Could not save feed', err)
        }
    }

    function onUploaded(ev) {
        const imgUrl = URL.createObjectURL(ev.target.files[0])
        imgEvRef.current = ev
        setLocalImgUrl(imgUrl)
        setEditStage(1)
    }

    function getTitleTxt() {
        var title = ''

        if (editStage === 0 || editStage === 3) title = 'Create new post'
        else if (editStage === 1) title = 'Crop'
        else if (editStage === 2) title = 'Edit'

        return title
    }

    function Title() {
        const title = getTitleTxt()

        if (editStage === 0) {
            return <h2 className="title">{title}</h2>
        } else {

            const btnTxt = editStage === 3 ? 'Share' : 'Next'
            const btnClickEvent = editStage === 3 ? onSaveFeed : () => { setEditStage(prev => prev + 1) }

            return (
                <div className="title-container">
                    <SvgIcon iconName="back" className="btn" onClick={() => setEditStage(prev => prev - 1)} />
                    <h2>{title}</h2>
                    <span className="btn-next" onClick={btnClickEvent}>{btnTxt}</span>
                </div>
            )
        }
    }

    const editProps = {
        localImgUrl,
        isFilterList,
        selectedFilter,
        adjustments,
        setIsFilterList,
        setSelectedFilter,
        handleAdjustmentsChange
    }

    const createProps = {
        localImgUrl,
        user,
        handleChange,
        txtCount: feed.txt.length,
        MAX_LENGTH: 2200
    }

    const cmpClass = editStage >= 2 ? 'feed-edit expanded' : 'feed-edit'

    return (
        <>
            <Backdrop onClose={onClose} />
            <section className={cmpClass}>
                <Title />
                {editStage === 0 && <ContentUploadContainer onUploaded={onUploaded} />}
                {editStage === 1 && <CropContainer localImgUrl={localImgUrl} />}
                {editStage === 2 && <EditContainer {...editProps} />}
                {editStage === 3 && <CreateContainer {...createProps} />}
            </section>
        </>
    )
}