import { feedService } from '../../services/feed'
import { store } from '../store'
import { SET_FEEDS } from '../reducers/feed.reducer'

export async function loadFeeds(filterBy = {}) {
    try {
        const feeds = await feedService.query(filterBy)
        store.dispatch({ type: SET_FEEDS, feeds })
    } catch (err) {
        console.log('Cannot load feeds', err)
        throw err
    }
}