import { Outlet } from 'react-router'
import { NavBar } from '../cmps/NavBar'
import { useSearchParams } from 'react-router-dom'
import { FeedDetails } from '../cmps/FeedDetails'
import { FeedEdit } from '../cmps/FeedEdit'

export function FeedIndex() {
    const [searchParams] = useSearchParams()
    const feedId = searchParams.get('feedId')

    function onOpenModal() {
        document.body.classList.add('feed-edit-active', 'backdrop-active')
        document.title = 'Create new post • Instaflow'
    }

    function onCloseModal() {
        document.body.classList.remove('feed-edit-active', 'backdrop-active')
        document.title = 'Instaflow'
    }

    return (
        <section className="feed-index main-layout">
            <NavBar onOpenModal={onOpenModal}/>
            <Outlet />
            {feedId && <FeedDetails feedId={feedId} />}
            <FeedEdit onClose={onCloseModal}/>
        </section>
    )
}