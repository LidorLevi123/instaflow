export const SET_FEEDS = 'SET_FEEDS'
export const ADD_FEED = 'ADD_FEED'
export const ADD_FEED_COMMENT = 'ADD_FEED_COMMENTS'
export const REMOVE_FEED_COMMENT = 'REMOVE_FEED_COMMENTS'
export const UPDATE_FEED = 'UPDATE_FEED'
export const REMOVE_FEED = 'REMOVE_FEED'

const initialState = {
    feeds: [],
}

export function feedReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FEEDS:
            return {
                ...state,
                feeds: action.feeds
            }
        case ADD_FEED:
            state.feeds.unshift(action.feed)
            return {
                ...state,
                feeds: [...state.feeds]
            }
        case UPDATE_FEED:
            return {
                ...state,
                feeds: state.feeds.map(feed => feed._id === action.feed._id ? action.feed : feed)
            }
        case REMOVE_FEED:
            return {
                ...state,
                feeds: state.feeds.filter(feed => feed._id !== action.feedId)
            }
        case ADD_FEED_COMMENT:
            return {
                ...state,
                feeds: state.feeds.map(feed => {
                    if (feed._id === action.payload.feedId) {
                        if (!feed.commentIds) feed.commentIds = [action.payload.commentId]
                        else feed.commentIds = [...feed.commentIds, action.payload.commentId]
                        return feed
                    }
                    return feed
                })
            }
        case REMOVE_FEED_COMMENT:
            return {
                ...state,
                feeds: state.feeds.map(feed => {
                    if (feed._id === action.payload.feedId) {
                        feed.commentIds = feed.commentIds.filter(commentId => commentId !== action.payload.commentId) 
                        return feed
                    }
                    return feed
                })
            }
        default:
            return state;
    }
}