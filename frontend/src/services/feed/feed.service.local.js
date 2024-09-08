import { storageService } from '../async-storage.service'

const STORAGE_KEY = 'feed'

export const feedService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = { txt: '', price: 0 }) {
    var feeds = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        feeds = feeds.filter(feed => regex.test(feed.vendor) || regex.test(feed.description))
    }
    if (minSpeed) {
        feeds = feeds.filter(feed => feed.speed >= minSpeed)
    }
    if(sortField === 'vendor' || sortField === 'owner'){
        feeds.sort((feed1, feed2) => 
            feed1[sortField].localeCompare(feed2[sortField]) * +sortDir)
    }
    if(sortField === 'price' || sortField === 'speed'){
        feeds.sort((feed1, feed2) => 
            (feed1[sortField] - feed2[sortField]) * +sortDir)
    }
    
    feeds = feeds.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return feeds
}

function getById(feedId) {
    return storageService.get(STORAGE_KEY, feedId)
}

async function remove(feedId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, feedId)
}

async function save(feed) {
    var savedFeed
    if (feed._id) {
        const feedToSave = {
            _id: feed._id,
            price: feed.price,
            speed: feed.speed,
        }
        savedFeed = await storageService.put(STORAGE_KEY, feedToSave)
    } else {
        const feedToSave = {
            vendor: feed.vendor,
            price: feed.price,
            speed: feed.speed,
            // Later, owner is set by the backend
            msgs: []
        }
        savedFeed = await storageService.post(STORAGE_KEY, feedToSave)
    }
    return savedFeed
}