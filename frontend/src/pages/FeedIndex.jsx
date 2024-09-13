import { Outlet } from 'react-router'
import { NavBar } from '../cmps/NavBar'

export function FeedIndex() {

    return (
        <section className="feed-index main-layout">
            <NavBar />
            <Outlet />
        </section>
    )
}