import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addComment, loadFeeds } from '../store/actions/feed.actions'
import { FeedList } from '../cmps/FeedList'
import { useOutletContext } from 'react-router'

export function HomePage() {
    const feeds = useSelector(storeState => storeState.feedModule.feeds)
    const { onToggleLike, loggedinUser } = useOutletContext()

    useEffect(() => {
        loadFeeds()
    }, [])

    async function onAddComment(feedId, comment) {
        try {
            await addComment(feedId, comment)
        } catch (err) {
            console.log('Could not add comment', err)
        }
    }
    
    if (!feeds) return

    const listProps = {
        feeds,
        loggedinUser,
        onToggleLike,
        onAddComment,
    }

    return (
        <section className="home-page">
            <FeedList {...listProps}></FeedList>
        </section>
    )
}