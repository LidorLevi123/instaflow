import { useEffect, useRef, useState } from 'react'
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
import { useSearchParams } from 'react-router-dom'

const CONTENT_UPLOAD = 0
const CROP = 1
const EDIT = 2
const CREATE = 3

export function FeedEdit({ onClose, user }) {
    const [editStage, setEditStage] = useState(CONTENT_UPLOAD)
    const [localImgUrl, setLocalImgUrl] = useState(null)
    const [isFilterList, setIsFilterList] = useState(true)
    const [selectedFilter, setSelectedFilter] = useState('Original')
    const [adjustments, setAdjustments] = useState(appService.getImgAdjustments())
    const [feed, setFeed, handleChange] = useForm(feedService.getEmptyFeed())
    const [searchParams, setSearchParams] = useSearchParams()
    const imgEvRef = useRef()

    const isCreateNew = searchParams.get('create') === 'new'

    useEffect(() => {
        loadFeed()
    }, [])

    function handleAdjustmentsChange() { }

    async function loadFeed() {
        try {
            if (isCreateNew) return

            const feedId = searchParams.get('create')
            const feed = await feedService.getById(feedId)
            setFeed(feed)
            setEditStage(CREATE)
            setLocalImgUrl(feed.imgUrls[0])
        } catch (err) {
            console.log(err, 'Could not load feed')
        }
    }

    async function onSaveFeed() {
        try {
            if(isCreateNew) {
                const { secure_url: imgUrl } = await uploadService.uploadImg(imgEvRef.current)
                feed.imgUrls.push(imgUrl)
            }
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

        if (editStage === CONTENT_UPLOAD || editStage === CREATE) title = 'Create new post'
        else if (editStage === CROP) title = 'Crop'
        else if (editStage === EDIT) title = 'Edit'

        if(!isCreateNew) title = 'Edit info'

        return title
    }

    function Title() {
        const title = getTitleTxt()

        if (editStage === 0) {
            return <h2 className="title">{title}</h2>
        } else {

            var btnTxt = (editStage === CREATE) ? 'Share' : 'Next'
            btnTxt = !isCreateNew ? 'Done' : btnTxt
            const btnClickEvent = editStage === CREATE ? onSaveFeed : () => { setEditStage(prev => prev + 1) }

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
        feedTxt: feed.txt,
        MAX_LENGTH: 2200
    }

    const cmpClass = editStage >= 2 ? 'feed-edit expanded' : 'feed-edit'

    return (
        <>
            <Backdrop onClose={onClose} />
            <section className={cmpClass}>
                <Title />
                {editStage === CONTENT_UPLOAD && <ContentUploadContainer onUploaded={onUploaded} />}
                {editStage === CROP && <CropContainer localImgUrl={localImgUrl} />}
                {editStage === EDIT && <EditContainer {...editProps} />}
                {editStage === CREATE && <CreateContainer {...createProps} />}
            </section>
        </>
    )
}