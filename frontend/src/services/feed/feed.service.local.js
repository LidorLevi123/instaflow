import { storageService } from '../async-storage.service'
import { loadFromStorage, saveToStorage } from '../util.service'

const STORAGE_KEY = 'feed_db'

export const feedService = {
    query,
    getById,
    save,
    remove,
}

_createFeeds()

async function query(filterBy = { txt: '', price: 0 }) {
    var feeds = await storageService.query(STORAGE_KEY)
    return feeds
}

async function getById(feedId) {
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

function _createFeeds() {
    var feeds = loadFromStorage(STORAGE_KEY) || []
    if(feeds && feeds.length) return feeds

    feeds = [
        {
            _id: 's102',
            txt: 'Sunset at the beach',
            imgUrls: ['http://img1-url'],
            by: {
                _id: 'u102',
                fullname: 'Anna Smith',
                imgUrl: 'http://img1-url',
            },
            loc: {
                lat: 34.05,
                lng: -118.25,
                name: 'Los Angeles',
            },
            comments: [
                {
                    id: 'c1003',
                    by: {
                        _id: 'u107',
                        fullname: 'Mike Johnson',
                        imgUrl: 'http://img2-url',
                    },
                    txt: 'Absolutely stunning!',
                    likedBy: [
                        {
                            _id: 'u108',
                            fullname: 'Sara Lee',
                            imgUrl: 'http://img3-url',
                        },
                    ],
                    createdAt: 1652352378,
                },
            ],
            likedBy: [
                {
                    _id: 'u107',
                    fullname: 'Mike Johnson',
                    imgUrl: 'http://img2-url',
                },
                {
                    _id: 'u108',
                    fullname: 'Sara Lee',
                    imgUrl: 'http://img3-url',
                },
            ],
            tags: ['sunset', 'beach'],
            createdAt: Date.now()
        },
        {
            _id: 's103',
            txt: 'Mountain hike adventure',
            imgUrls: ['http://img4-url'],
            by: {
                _id: 'u103',
                fullname: 'John Doe',
                imgUrl: 'http://img5-url',
            },
            loc: {
                lat: 40.71,
                lng: -74.01,
                name: 'New York',
            },
            comments: [
                {
                    id: 'c1004',
                    by: {
                        _id: 'u109',
                        fullname: 'Alice Brown',
                        imgUrl: 'http://img6-url',
                    },
                    txt: 'Looks amazing!',
                },
            ],
            likedBy: [
                {
                    _id: 'u109',
                    fullname: 'Alice Brown',
                    imgUrl: 'http://img6-url',
                },
                {
                    _id: 'u110',
                    fullname: 'Tom White',
                    imgUrl: 'http://img7-url',
                },
            ],
            tags: ['hiking', 'nature'],
            createdAt: Date.now() - 38925
        },
        {
            _id: 's104',
            txt: 'Delicious homemade pizza',
            imgUrls: ['http://img8-url'],
            by: {
                _id: 'u104',
                fullname: 'Emily Clark',
                imgUrl: 'http://img9-url',
            },
            loc: {
                lat: 48.85,
                lng: 2.35,
                name: 'Paris',
            },
            comments: [
                {
                    id: 'c1005',
                    by: {
                        _id: 'u111',
                        fullname: 'Chris Green',
                        imgUrl: 'http://img10-url',
                    },
                    txt: 'Yummy!',
                    likedBy: [
                        {
                            _id: 'u112',
                            fullname: 'Nina Blue',
                            imgUrl: 'http://img11-url',
                        },
                    ],
                    createdAt: 1752352378,
                },
            ],
            likedBy: [
                {
                    _id: 'u111',
                    fullname: 'Chris Green',
                    imgUrl: 'http://img10-url',
                },
                {
                    _id: 'u112',
                    fullname: 'Nina Blue',
                    imgUrl: 'http://img11-url',
                },
            ],
            tags: ['food', 'pizza'],
            createdAt: Date.now() - 98925
        }
    ]
    saveToStorage(STORAGE_KEY, feeds)
}