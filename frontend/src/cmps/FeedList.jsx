import { FeedPreview } from './FeedPreview'

export function FeedList({ feeds, onRemoveFeed, onUpdateFeed }) {

    return <section>
        <ul className="list">
            {feeds.map(feed =>
                <li key={feed._id}>
                    <FeedPreview feed={feed}/>
                    <div className="actions">
                        <button onClick={() => onUpdateFeed(feed)}>Edit</button>
                        <button onClick={() => onRemoveFeed(feed._id)}>x</button>
                    </div>
                </li>)
            }
        </ul>
    </section>
}