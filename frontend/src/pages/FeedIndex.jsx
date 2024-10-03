import { Outlet } from 'react-router'
import { NavBar } from '../cmps/NavBar'
import { useSearchParams } from 'react-router-dom'
import { FeedDetails } from '../cmps/FeedDetails'

export function FeedIndex() {
    const [searchParams] = useSearchParams()
    const feedId = searchParams.get('feedId')

    return (
        <section className="feed-index main-layout">
            <NavBar />
            <Outlet />
            {feedId && <FeedDetails feedId={feedId} />}
        </section>
    )
}