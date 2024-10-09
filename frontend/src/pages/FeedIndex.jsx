import { Outlet } from 'react-router'
import { NavBar } from '../cmps/NavBar'
import { useSearchParams } from 'react-router-dom'
import { FeedDetails } from '../cmps/FeedDetails'
import { FeedEdit } from '../cmps/FeedEdit'
import { useState } from 'react'

export function FeedIndex() {
    const [isFeedEditOpen, setIsFeedEditOpen] = useState(true)
    const [searchParams] = useSearchParams()
    const feedId = searchParams.get('feedId')

    function onOpenModal() {
        setIsFeedEditOpen(true)
    }

    function onCloseModal() {
        setIsFeedEditOpen(false)
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