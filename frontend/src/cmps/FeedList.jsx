import { FeedPreview } from './FeedPreview'

export function FeedList({ feeds, onToggleLike, loggedinUser }) {

    return (
        <ul className="feed-list">
            {feeds.map(feed =>
                <li key={feed._id}>
                    <FeedPreview feed={feed} onToggleLike={onToggleLike} loggedinUser={loggedinUser}/>
                </li>)
            }
        </ul>
    )
}