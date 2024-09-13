import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadFeeds } from '../store/actions/feed.actions'

export function HomePage() {
    const feeds = useSelector(storeState => storeState.feedModule.feeds)
    console.log('feeds:', feeds)

    useEffect(() => {
        loadFeeds()
    }, [])

    if(!feeds) return

    return (
        <section className="home-page">
            <h1>Home page!</h1>
        </section>
    )
}