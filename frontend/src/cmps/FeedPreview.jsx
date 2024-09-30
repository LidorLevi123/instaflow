import { useRef } from "react"
import { getTimeSince } from "../services/util.service"
import { SvgIcon } from "./SvgIcon"

export function FeedPreview({ feed }) {
    const textRef = useRef()

    function onResize() {
        const elText = textRef.current
        const maxHeight = 18 * 4

        if (!elText) return
        if (!elText.value) {
            elText.style.height = '18px'
            return
        }

        elText.style.height = 'auto'
        const contentHeight = elText.scrollHeight

        let newHeight = Math.min(contentHeight, maxHeight)
        elText.style.height = newHeight + 'px'

        if (contentHeight > maxHeight) {
            elText.style.overflowY = 'auto'
        } else {
            elText.style.overflowY = 'hidden'
        }
    }

    console.log('feed:', feed)
    return (
        <article className="feed-preview">
            <section className="uploader">
                <img src={feed.by.imgUrl} alt="Uploader img" />
                <span className="fullname">{feed.by.fullname}</span>
                <span className="dot">•</span>
                <span className="created-at">{getTimeSince(feed.createdAt)}</span>
                <span className="dot">•</span>
                <span className="follow">Follow</span>
                <span className="options-icon">
                    <SvgIcon iconName="options" />
                </span>
            </section>

            <img className="feed-img" src={feed.imgUrls[0]} alt="" />

            <section className="actions">
                <SvgIcon iconName="heart" />
                <SvgIcon iconName="comment" />
                <SvgIcon iconName="share" />
                <SvgIcon iconName="bookmark" />
            </section>

            <section className="details">
                <span className="likes">{feed.likedBy.length} likes</span>
                <p className="txt">
                    <span className="fullname">{feed.by.fullname}</span>
                    {feed.txt}
                </p>
                <span className="view-comments">View all {feed.comments.length} comments</span>
                <div className="add-comment-container">
                    <textarea placeholder="Add a comment..." ref={textRef} onInput={onResize}></textarea>
                    <span className="btn-post">Post</span>
                    <SvgIcon iconName="emoji"></SvgIcon>
                </div>
            </section>
        </article>
    )
}