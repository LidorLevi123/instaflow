import { FeedPreview } from './FeedPreview'

export function FeedList({ feeds }) {

    return <section>
        <ul className="feed-list">
            {feeds.map(feed =>
                <li key={feed._id}>
                    <FeedPreview feed={feed}/>
                </li>)
            }
        </ul>
    </section>
}