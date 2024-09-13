import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadFeeds } from '../store/actions/feed.actions'
import { FeedList } from '../cmps/FeedList'

export function HomePage() {
    const feeds = useSelector(storeState => storeState.feedModule.feeds)

    useEffect(() => {
        loadFeeds()
    }, [])

    if(!feeds) return

    return (
        <section className="home-page">
            <FeedList feeds={feeds}></FeedList>
        </section>
    )
}