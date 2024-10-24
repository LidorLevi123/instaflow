import { useSearchParams } from "react-router-dom"
import { getTimeSince } from "../services/util.service"
import { SvgIcon } from "./SvgIcon"
import { AddComment } from "./AddComment"
import { useRef } from "react"

export function FeedPreview({ feed, onToggleLike, loggedinUser }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const likeCount = feed.likedBy.length.toLocaleString('en-US')
    const createdAt = getTimeSince(feed.createdAt)
    const elBtnLikeRef = useRef()

    function onOpenDetails() {
        searchParams.set('feedId', feed._id)
        setSearchParams(searchParams)
    }

    function onLike() {
        onToggleLike(feed, elBtnLikeRef.current)
    }

    function isLiked() {
        return feed.likedBy.some(user => user.username === loggedinUser.username)
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
                <span style={{ lineHeight: 0.5 }} ref={elBtnLikeRef}>
                    <SvgIcon iconName={isLiked() ? 'heartRed' : 'heart'}
                        onClick={onLike} className="btn-like" />
                </span>
                <SvgIcon iconName="comment" onClick={onOpenDetails} />
                <SvgIcon iconName="share" />
                <SvgIcon iconName="bookmark" />
            </section>

            <section className="details">
                <span className="likes">{likeCount} likes</span>
                <p className="txt">
                    <span className="fullname">{feed.by.fullname}</span>
                    {feed.txt || ''}
                </p>
                <span className="view-comments" onClick={onOpenDetails}>View all {feed.comments.length} comments</span>
                <AddComment />
            </section>
        </article>
    )
}