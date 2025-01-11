import { store } from '../store'
import { ADD_FEED, REMOVE_FEED, SET_FEEDS, UPDATE_FEED, ADD_FEED_COMMENT, REMOVE_FEED_COMMENT } from '../reducers/feed.reducer'
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

export async function removeFeed(feedId) {
    try {
        await feedService.remove(feedId)
        const action = {
            type: REMOVE_FEED,
            feedId
        }
        store.dispatch(action)
    } catch (err) {
        console.log('Cannot remove feed', err)
        throw err
    }
}

export async function saveComment(feedId, comment) {
    try {
        const savedComment = await commentService.save(feedId, comment)
        store.dispatch({ type: ADD_FEED_COMMENT, payload: { feedId, commentId: savedComment._id } })
        return savedComment
    } catch (err) {
        console.log('Cannot save comment', err)
        throw err
    }
}

export async function removeComment(feedId, commentId) {
    try {
        await commentService.remove(feedId, commentId)
        store.dispatch({ type: REMOVE_FEED_COMMENT, payload: { feedId, commentId } })
    } catch (err) {
        console.log('Cannot save comment', err)
        throw err
    }
}