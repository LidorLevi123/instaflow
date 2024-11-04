import { useSearchParams } from "react-router-dom"

export function UserFeedList({ feeds }) {
    const [searchParams, setSearchParams] = useSearchParams()

    function onOpenDetails(feedId) {
        searchParams.set('feedId', feedId)
        setSearchParams(searchParams)
    }

    return (
        <ul className="user-feed-list">
            {
                feeds.map(feed =>
                    <li key={feed._id} onClick={() => onOpenDetails(feed._id)}>
                        <img className="feed-img" src={feed.imgUrls[0]} alt="" />
                        <div className="info">
                            <img src="/img/heart.png" alt="" />
                            <span>{feed.likedBy.length}</span>
                            
                            <img src="/img/comment.png" alt="" />
                            <span>{feed.comments.length}</span>
                        </div>
                    </li>)
            }
        </ul>
    )
}