import { useEffect, useState } from 'react'
import { feedService } from '../services/feed'
import { SvgIcon } from './SvgIcon'
import { AddComment } from './AddComment'

export function FeedDetails({ feedId }) {
    const [feed, setFeed] = useState(null)

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

    if (!feed) return

    const createdAt = getTimeSince(feed.createdAt)

    return (
        <section className="feed-details">
            <img src={feed.imgUrls[0]} alt="" />

            <section className="info">
                <div className="uploader">
                    <img src={feed.by.imgUrl} alt="Uploader img" />
                    <span className="fullname">{feed.by.fullname}</span>
                    <span className="options-icon">
                        <SvgIcon iconName="options" />
                    </span>
                </div>

                <div>
                    <p className="txt">
                        <span className="fullname">{feed.by.fullname}</span>
                        {feed.txt}
                    </p>
                    <span className="created-at">{createdAt}</span>
                    <ul className="comment-list">
                        {feed.comments.map(comment =>
                            <li className="comment-preview" key={comment.id}>
                                <img src={comment.by.imgUrl} alt="" />
                                <div>
                                    <span className="fullname">{comment.by.fullname}</span>
                                    <span className="txt">{comment.txt}</span>
                                </div>
                                <div>
                                    <span className="created-at">{comment.createdAt}</span>
                                    <span className="likes">{comment.likedBy?.length} likes</span>
                                    <span className="btn-reply">Reply</span>
                                </div>
                            </li>)}
                    </ul>
                </div>

                <div>
                    <section className="actions">
                        <SvgIcon iconName="heart" />
                        <SvgIcon iconName="comment" />
                        <SvgIcon iconName="share" />
                        <SvgIcon iconName="bookmark" />
                    </section>

                    <span className="likes">{feed.likedBy?.length} likes</span>
                    <span className="created-at">{createdAt} ago</span>

                    <hr />

                    <AddComment />
                </div>

            </section>

        </section>
    )
}