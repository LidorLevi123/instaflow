import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadFeeds } from '../store/actions/feed.actions'
import { FeedList } from '../cmps/FeedList'
import { useOutletContext } from 'react-router'

export function HomePage() {
    const feeds = useSelector(storeState => storeState.feedModule.feeds)
    const { onToggleLike, loggedinUser } = useOutletContext()

    useEffect(() => {
        loadFeeds()
    }, [])

    if (!feeds) return

    return (
        <section className="home-page">
            <FeedList feeds={feeds} onToggleLike={onToggleLike} loggedinUser={loggedinUser}></FeedList>
        </section>
    )
}