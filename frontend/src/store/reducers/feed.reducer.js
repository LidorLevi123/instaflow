export const SET_FEEDS = 'SET_FEEDS'
export const ADD_FEED = 'ADD_FEED'

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
        default:
            return state;
    }
}