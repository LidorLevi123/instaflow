import { feedService } from '../../services/feed'
import { store } from '../store'
import { ADD_FEED, SET_FEEDS } from '../reducers/feed.reducer'

export async function loadFeeds(filterBy = {}) {
    try {
        const feeds = await feedService.query(filterBy)
        store.dispatch({ type: SET_FEEDS, feeds })
    } catch (err) {
        console.log('Cannot load feeds', err)
        throw err
    }
}

export async function saveFeed(feed) {
    try {
        const savedFeed = await feedService.save(feed)
        const action = {
            type: ADD_FEED,
            feed: savedFeed
        }
        store.dispatch(action)
    } catch (err) {
        console.log('Cannot load feeds', err)
        throw err
    }
}