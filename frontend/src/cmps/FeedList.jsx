import { FeedPreview } from './FeedPreview'

export function FeedList({ feeds, onToggleLike, loggedinUser, onAddComment, onRemoveFeed }) {

    const previewProps = {
        loggedinUser,
        onToggleLike,
        onAddComment,
        onRemoveFeed
    }

    return (
        <ul className="feed-list">
            {feeds.map(feed =>
                <li key={feed._id}>
                    <FeedPreview feed={feed} {...previewProps} />
                </li>)
            }
        </ul>
    )
}