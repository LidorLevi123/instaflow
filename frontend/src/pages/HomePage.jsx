import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadFeeds } from '../store/actions/feed.actions'
import { FeedList } from '../cmps/FeedList'
import { useOutletContext } from 'react-router'
import { Loader } from '../cmps/Loader'

export function HomePage() {
    const feeds = useSelector(storeState => storeState.feedModule.feeds)
    const { onToggleLike, onAddComment, onRemoveFeed, loggedinUser } = useOutletContext()

    useEffect(() => {
        loadFeeds()
    }, [])

    if (!feeds || !feeds.length) return <Loader />

    const listProps = {
        feeds,
        loggedinUser,
        onToggleLike,
        onAddComment,
        onRemoveFeed
    }

    return (
        <section className="home-page">
            <FeedList {...listProps}></FeedList>
        </section>
    )
}