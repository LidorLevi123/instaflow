import { useSearchParams } from "react-router-dom"
import { getTimeSince } from "../services/util.service"
import { SvgIcon } from "./SvgIcon"
import { AddComment } from "./AddComment"

export function FeedPreview({ feed }) {
    const [searchParams, setSearchParams] = useSearchParams()
    console.log('feed:', feed)
    const likeCount = feed.likedBy.length.toLocaleString('en-US')
    const createdAt = getTimeSince(feed.createdAt)

    function addSearchParam(feedId) {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('feedId', feedId)
        setSearchParams(newParams)
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
                <span className="options-icon">
                    <SvgIcon iconName="options" />
                </span>
            </section>

            <img className="feed-img" src={feed.imgUrls[0]} alt="" />

            <section className="actions">
                <SvgIcon iconName="heart" />
                <span onClick={()=> addSearchParam(feed._id)}>
                    <SvgIcon iconName="comment" />
                </span>
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