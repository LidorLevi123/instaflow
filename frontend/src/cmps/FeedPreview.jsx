import { getTimeSince } from "../services/util.service"
import { SvgIcon } from "./SvgIcon"

export function FeedPreview({ feed }) {
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
                    <SvgIcon iconName="options"/>
                </span>
            </section>

            <img className="feed-img" src={feed.imgUrls[0]} alt="" />

            <section className="actions">
                <SvgIcon iconName="heart"/>
                <SvgIcon iconName="comment"/>
                <SvgIcon iconName="share"/>
                <SvgIcon iconName="bookmark"/>
            </section>

            <section className="details">

            </section>
        </article>
    )
}