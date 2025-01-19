export function FeedExploreList({ feeds }) {
    return (
        <ul className="feed-explore-list">
            {
                feeds.map(feed =>
                    <li key={feed._id}>
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