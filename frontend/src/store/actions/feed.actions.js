import { feedService } from '../../services/feed'
import { store } from '../store'
import { ADD_FEED, REMOVE_FEED, SET_FEEDS, SET_FEED, UPDATE_FEED, ADD_FEED_MSG } from '../reducers/feed.reducer'

export async function loadFeeds(filterBy) {
    try {
        const feeds = await feedService.query(filterBy)
        store.dispatch(getCmdSetFeeds(feeds))
    } catch (err) {
        console.log('Cannot load feeds', err)
        throw err
    }
}

export async function loadFeed(feedId) {
    try {
        const feed = await feedService.getById(feedId)
        store.dispatch(getCmdSetFeed(feed))
    } catch (err) {
        console.log('Cannot load feed', err)
        throw err
    }
}

export async function removeFeed(feedId) {
    try {
        await feedService.remove(feedId)
        store.dispatch(getCmdRemoveFeed(feedId))
    } catch (err) {
        console.log('Cannot remove feed', err)
        throw err
    }
}

export async function addFeed(feed) {
    try {
        const savedFeed = await feedService.save(feed)
        store.dispatch(getCmdAddFeed(savedFeed))
        return savedFeed
    } catch (err) {
        console.log('Cannot add feed', err)
        throw err
    }
}

export async function updateFeed(feed) {
    try {
        const savedFeed = await feedService.save(feed)
        store.dispatch(getCmdUpdateFeed(savedFeed))
        return savedFeed
    } catch (err) {
        console.log('Cannot save feed', err)
        throw err
    }
}

export async function addFeedMsg(feedId, txt) {
    try {
        const msg = await feedService.addFeedMsg(feedId, txt)
        store.dispatch(getCmdAddFeedMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add feed msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetFeeds(feeds) {
    return {
        type: SET_FEEDS,
        feeds
    }
}
function getCmdSetFeed(feed) {
    return {
        type: SET_FEED,
        feed
    }
}
function getCmdRemoveFeed(feedId) {
    return {
        type: REMOVE_FEED,
        feedId
    }
}
function getCmdAddFeed(feed) {
    return {
        type: ADD_FEED,
        feed
    }
}
function getCmdUpdateFeed(feed) {
    return {
        type: UPDATE_FEED,
        feed
    }
}
function getCmdAddFeedMsg(msg) {
    return {
        type: ADD_FEED_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadFeeds()
    await addFeed(feedService.getEmptyFeed())
    await updateFeed({
        _id: 'm1oC7',
        title: 'Feed-Good',
    })
    await removeFeed('m1oC7')
    // TODO unit test addFeedMsg
}
