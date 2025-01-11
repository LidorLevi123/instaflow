import { httpService } from '../http.service'

const BASE_URL = 'feed/'

export const feedService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(feedId) {
    return httpService.get(BASE_URL + feedId)
}

async function remove(feedId) {
    return httpService.delete(BASE_URL + feedId)
}
async function save(feed) {
    var savedFeed
    if (feed._id) {
        savedFeed = await httpService.put(BASE_URL + feed._id, feed)
    } else {
        savedFeed = await httpService.post(BASE_URL, feed)
    }
    return savedFeed
}