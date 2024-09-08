export const SET_FEEDS = 'SET_FEEDS'
export const SET_FEED = 'SET_FEED'
export const REMOVE_FEED = 'REMOVE_FEED'
export const ADD_FEED = 'ADD_FEED'
export const UPDATE_FEED = 'UPDATE_FEED'
export const ADD_FEED_MSG = 'ADD_FEED_MSG'

const initialState = {
    feeds: [],
    feed: null
}

export function feedReducer(state = initialState, action) {
    var newState = state
    var feeds
    switch (action.type) {
        case SET_FEEDS:
            newState = { ...state, feeds: action.feeds }
            break
        case SET_FEED:
            newState = { ...state, feed: action.feed }
            break
        case REMOVE_FEED:
            const lastRemovedFeed = state.feeds.find(feed => feed._id === action.feedId)
            feeds = state.feeds.filter(feed => feed._id !== action.feedId)
            newState = { ...state, feeds, lastRemovedFeed }
            break
        case ADD_FEED:
            newState = { ...state, feeds: [...state.feeds, action.feed] }
            break
        case UPDATE_FEED:
            feeds = state.feeds.map(feed => (feed._id === action.feed._id) ? action.feed : feed)
            newState = { ...state, feeds }
            break
        case ADD_FEED_MSG:
            newState = { ...state, feed: { ...state.feed, msgs: [...state.feed.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const feed1 = { _id: 'b101', vendor: 'Feed ' + parseInt(Math.random() * 10), msgs: [] }
    const feed2 = { _id: 'b102', vendor: 'Feed ' + parseInt(Math.random() * 10), msgs: [] }

    state = feedReducer(state, { type: SET_FEEDS, feeds: [feed1] })
    console.log('After SET_FEEDS:', state)

    state = feedReducer(state, { type: ADD_FEED, feed: feed2 })
    console.log('After ADD_FEED:', state)

    state = feedReducer(state, { type: UPDATE_FEED, feed: { ...feed2, vendor: 'Good' } })
    console.log('After UPDATE_FEED:', state)

    state = feedReducer(state, { type: REMOVE_FEED, feedId: feed2._id })
    console.log('After REMOVE_FEED:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = feedReducer(state, { type: ADD_FEED_MSG, feedId: feed1._id, msg })
    console.log('After ADD_FEED_MSG:', state)

    state = feedReducer(state, { type: REMOVE_FEED, feedId: feed1._id })
    console.log('After REMOVE_FEED:', state)
}

