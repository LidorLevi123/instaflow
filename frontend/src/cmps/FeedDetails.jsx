import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { feedService } from '../services/feed'
import { getTimeSince } from '../services/util.service'

import { SvgIcon } from './SvgIcon'
import { AddComment } from './AddComment'
import { CommentList } from './CommentList'
import { Backdrop } from './Backdrop'
import { loggedInUser } from '../services/feed/feed.service.local'

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

    async function onToggleLike() {
        try {
            const feedToSave = {
                ...feed,
                likedBy: [...feed.likedBy, loggedInUser]
            }
            if(feed.likedBy.some(user => user.username === loggedInUser.username)) {
                feedToSave.likedBy = feedToSave.likedBy.filter(user => user.username !== loggedInUser.username)
            }
            const savedFeed = await feedService.save(feedToSave)
            setFeed(prevFeed => ({ ...prevFeed, likedBy: savedFeed.likedBy }))
        } catch (err) {
            console.log(err, 'Could not like feed')
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
            <Backdrop onClose={onCloseDetails} />
            <section className="feed-details">

                <img src={feed.imgUrls[0]} alt="" className="feed-img" />

                <div className="uploader">
                    <img src={feed.by.imgUrl} alt="Uploader img" />
                    <span className="btn fullname">{feed.by.fullname}</span>
                    <span className="options-icon">
                        <SvgIcon iconName="options" />
                    </span>
                </div>

                <div className="info">
                    <div>
                        <img src={feed.by.imgUrl} alt="Uploader img" />
                        <div>
                            <span className="btn fullname">{feed.by.fullname}</span>
                            <span className="txt">{feed.txt || ''}</span>
                        </div>
                        <span className="created-at">{createdAt}</span>
                    </div>
                    <CommentList comments={feed.comments} />
                </div>

                <div className="bottom-section">
                    <section className="actions">
                        <span onClick={onToggleLike}><SvgIcon iconName="heart" /></span>
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