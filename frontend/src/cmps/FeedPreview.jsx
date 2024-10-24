import { useSearchParams } from "react-router-dom"
import { getTimeSince } from "../services/util.service"
import { SvgIcon } from "./SvgIcon"
import { AddComment } from "./AddComment"

export function FeedPreview({ feed }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const likeCount = feed.likedBy.length.toLocaleString('en-US')
    const createdAt = getTimeSince(feed.createdAt)

    function addSearchParam(feedId) {
        searchParams.set('feedId', feedId)
        setSearchParams(searchParams)
    }

    return (
        <article className="feed-preview">
            <section className="uploader">
                <img src={feed.by.imgUrl} alt="Uploader img" />
                <span className="fullname">{feed.by.fullname}</span>
                <span className="dot">•</span>
                <span className="created-at">{createdAt}</span>
                <span className="dot">•</span>
                <span className="follow">Follow</span>
                <SvgIcon iconName="options" className="options-icon" />
            </section>

            <img className="feed-img" src={feed.imgUrls[0]} alt="" />

            <section className="actions">
                <SvgIcon iconName="heart" />
                <SvgIcon iconName="comment" onClick={() => addSearchParam(feed._id)} />
                <SvgIcon iconName="share" />
                <SvgIcon iconName="bookmark" />
            </section>

            <section className="details">
                <span className="likes">{likeCount} likes</span>
                <p className="txt">
                    <span className="fullname">{feed.by.fullname}</span>
                    {feed.txt || ''}
                </p>
                <span className="view-comments">View all {feed.comments.length} comments</span>
                <AddComment />
            </section>
        </article>
    )
}