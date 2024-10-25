import { FeedPreview } from './FeedPreview'

export function FeedList({ feeds, onToggleLike, loggedinUser, onAddComment }) {

    const previewProps = {
        loggedinUser,
        onToggleLike,
        onAddComment
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