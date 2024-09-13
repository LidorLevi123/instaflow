export const SET_FEEDS = 'SET_FEEDS'

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
        default:
            return state;
    }
}