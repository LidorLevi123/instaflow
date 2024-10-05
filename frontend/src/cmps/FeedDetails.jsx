import { useEffect, useState } from 'react'
import { feedService } from '../services/feed'
import { SvgIcon } from './SvgIcon'
import { AddComment } from './AddComment'
import { CommentList } from './CommentList'
import { Backdrop } from './Backdrop'
import { useSearchParams } from 'react-router-dom'

export function FeedDetails({ feedId }) {
    const [feed, setFeed] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        loadFeed()
    }, [])

    async function loadFeed() {
        try {
            const feed = await feedService.getById(feedId)
            setFeed(feed)
        } catch (err) {
            console.log('Cannot load feed', err)
            throw err
        }
    }

    function onCloseDetails() {
        searchParams.delete('feedId')
        setSearchParams(searchParams)
    }

    if (!feed) return

    const createdAt = getTimeSince(feed.createdAt)

    return (
        <>
            <Backdrop onClose={onCloseDetails}/>
            <section className="feed-details">

                <img src={feed.imgUrls[0]} alt="" className="feed-img" />

                <div className="uploader">
                    <img src={feed.by.imgUrl} alt="Uploader img" />
                    <span className="fullname">{feed.by.fullname}</span>
                    <span className="options-icon">
                        <SvgIcon iconName="options" />
                    </span>
                </div>

                <div className="info">
                    <p className="txt">
                        <span className="fullname">{feed.by.fullname}</span>
                        {feed.txt || ''}
                    </p>
                    <span className="created-at">{createdAt}</span>
                    {/* <CommentList comments={feed.comments} /> */}
                </div>

                <div className="bottom-section">
                    <section className="actions">
                        <SvgIcon iconName="heart" />
                        <SvgIcon iconName="comment" />
                        <SvgIcon iconName="share" />
                        <SvgIcon iconName="bookmark" />
                    </section>

                    <span className="likes">{feed.likedBy?.length} likes</span>
                    <span className="created-at">{createdAt} ago</span>

                    <AddComment />
                </div>

            </section>
        </>
    )
}