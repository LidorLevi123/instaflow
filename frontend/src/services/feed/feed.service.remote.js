import { httpService } from '../http.service'

export const feedService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`feed`, filterBy)
}

function getById(feedId) {
    return httpService.get(`feed/${feedId}`)
}

async function remove(feedId) {
    return httpService.delete(`feed/${feedId}`)
}
async function save(feed) {
    var savedFeed
    if (feed._id) {
        savedFeed = await httpService.put(`feed/${feed._id}`, feed)
    } else {
        savedFeed = await httpService.post('feed', feed)
    }
    return savedFeed
}