import { Link } from 'react-router-dom'

export function FeedPreview({ feed }) {
    return <article className="preview">
        <header>
            <Link to={`/feed/${feed._id}`}>{feed.vendor}</Link>
        </header>

        <p>Speed: <span>{feed.speed.toLocaleString()} Km/h</span></p>
        {feed.owner && <p>Owner: <span>{feed.owner.fullname}</span></p>}
        
    </article>
}