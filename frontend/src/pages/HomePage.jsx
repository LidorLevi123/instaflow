import { FeedGallery } from '../cmps/FeedGallery'
import { useOutletContext } from 'react-router'

export function HomePage() {
    const { onToggleLike, onAddComment, onRemoveFeed, onOpenCreateModal, loggedinUser, feeds } = useOutletContext()

    const listProps = {
        feeds,
        loggedinUser,
        onToggleLike,
        onAddComment,
        onRemoveFeed,
        onOpenCreateModal
    }

    return (
        <section className="home-page">
            <FeedGallery type="list" {...listProps} ></FeedGallery>
        </section>
    )
}