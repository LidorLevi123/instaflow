import { useFeedDetails } from "../customHooks/useFeedDetails"

export function UserFeedList({ feeds }) {
    const [onOpenDetails] = useFeedDetails()

    return (
        <ul className="user-feed-list">
            {
                feeds.map(feed =>
                    <li key={feed._id} onClick={() => onOpenDetails(feed._id)}>
                        <img className="feed-img" src={feed.imgUrls[0]} alt="" />
                        <div className="info">
                            <img src="/img/heart.png" alt="" />
                            <span>{feed.likedBy?.length || 0}</span>

                            <img src="/img/comment.png" alt="" />
                            <span>{feed.commentIds?.length || 0}</span>
                        </div>
                    </li>)
            }
        </ul>
    )
}