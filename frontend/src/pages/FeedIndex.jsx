import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadFeeds, addFeed, updateFeed, removeFeed } from '../store/actions/feed.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { feedService } from '../services/feed'

import { Outlet } from 'react-router'
import { NavBar } from '../cmps/NavBar'

export function FeedIndex() {

    const [ filterBy, setFilterBy ] = useState(feedService.getDefaultFilter())
    const feeds = useSelector(storeState => storeState.feedModule.feeds)

    useEffect(() => {
        // loadFeeds(filterBy)
    }, [filterBy])

    async function onRemoveFeed(feedId) {
        try {
            await removeFeed(feedId)
            showSuccessMsg('Feed removed')            
        } catch (err) {
            showErrorMsg('Cannot remove feed')
        }
    }

    async function onAddFeed() {
        const feed = feedService.getEmptyFeed()
        feed.vendor = prompt('Vendor?')
        try {
            const savedFeed = await addFeed(feed)
            showSuccessMsg(`Feed added (id: ${savedFeed._id})`)
        } catch (err) {
            showErrorMsg('Cannot add feed')
        }        
    }

    async function onUpdateFeed(feed) {
        const speed = +prompt('New speed?', feed.speed)
        if(speed === 0 || speed === feed.speed) return

        const feedToSave = { ...feed, speed }
        try {
            const savedFeed = await updateFeed(feedToSave)
            showSuccessMsg(`Feed updated, new speed: ${savedFeed.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update feed')
        }        
    }

    return (
        <main className="feed-index main-layout">
            <NavBar />
            <Outlet />
        </main>
    )
}