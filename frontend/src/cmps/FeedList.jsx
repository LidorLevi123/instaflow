import { FeedPreview } from './FeedPreview'

export function FeedList({ feeds }) {

    return (
            <ul className="feed-list">
                {feeds.map(feed =>
                    <li key={feed._id}>
                        <FeedPreview feed={feed} />
                    </li>)
                }
            </ul>
    )
}