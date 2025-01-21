import { useSearchParams } from "react-router-dom"

export function FeedExploreList({ feeds }) {
    const [searchParams, setSearchParams] = useSearchParams()

    function onOpenFeedDetails(feedId) {
        searchParams.set('feedId', feedId)
        setSearchParams(searchParams)
    }

    return (
        <ul className="feed-explore-list">
            {
                feeds.map(feed =>
                    <li key={feed._id} onClick={() => onOpenFeedDetails(feed._id)}>
                        <img src={feed.imgUrls[0]} alt="Post preview" />
                        <div className="info">
                            <img src="/img/heart.png" alt="" />
                            <span>{feed.likedBy?.length || 0}</span>

                            <img src="/img/comment.png" alt="" />
                            <span>{feed.comments?.length || 0}</span>
                        </div>
                    </li>)
            }
        </ul>
    )
}