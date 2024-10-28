import { store } from '../store'
import { ADD_FEED, SET_FEEDS, UPDATE_FEED } from '../reducers/feed.reducer'
import { feedService } from '../../services/feed'
import { commentService } from '../../services/comment'

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
            type: feed._id ? UPDATE_FEED : ADD_FEED,
            feed: savedFeed
        }
        store.dispatch(action)
        return savedFeed
    } catch (err) {
        console.log('Cannot load feeds', err)
        throw err
    }
}

export async function addComment(feedId, comment) {
    try {
        const { feed, comment: savedComment } = await commentService.save(feedId, comment)
        store.dispatch({ type: UPDATE_FEED, feed })
        return savedComment
    } catch (err) {
        console.log('Cannot load feeds', err)
        throw err
    }
}