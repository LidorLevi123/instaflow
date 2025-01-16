export function FeedExploreList({ feeds }) {
    return (
        <ul className="feed-explore-list">
            {
                feeds.map(feed =>
                    <li key={feed._id}>
                        <img src={feed.imgUrls[0]} alt="Post preview" />
                    </li>)
            }
        </ul>
    )
}