import { Outlet } from 'react-router'
import { NavBar } from '../cmps/NavBar'
import { useSearchParams } from 'react-router-dom'
import { FeedDetails } from '../cmps/FeedDetails'
import { FeedEdit } from '../cmps/FeedEdit'
import { useState } from 'react'

export function FeedIndex() {
    const [isFeedEditOpen, setIsFeedEditOpen] = useState(false)
    const [searchParams] = useSearchParams()
    const feedId = searchParams.get('feedId')

    function onOpenModal() {
        setIsFeedEditOpen(true)
        document.title = 'Create new post • Instaflow'
    }

    function onCloseModal() {
        setIsFeedEditOpen(false)
        document.title = 'Instaflow'
    }

    return (
        <section className="feed-index main-layout">
            <NavBar onOpenModal={onOpenModal}/>
            <Outlet />
            {feedId && <FeedDetails feedId={feedId} />}
            {isFeedEditOpen && <FeedEdit onClose={onCloseModal}/>}
        </section>
    )
}