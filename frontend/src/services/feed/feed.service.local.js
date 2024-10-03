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
    if(feeds && feeds.length) return

    feeds = [
        {
            _id: 's102',
            txt: 'Sunset at the beach',
            imgUrls: ['/img/test1.jpg'],
            by: {
                _id: 'u102',
                fullname: 'Anna Smith',
                imgUrl: '/img/user1.jpg',
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
                        imgUrl: '/img/user3.jpg',
                    },
                    txt: 'Absolutely stunning!',
                    likedBy: [
                        {
                            _id: 'u108',
                            fullname: 'Sara Lee',
                            imgUrl: '/img/user2.jpg',
                        },
                    ],
                    createdAt: 1652352378,
                },
            ],
            likedBy: [
                {
                    _id: 'u107',
                    fullname: 'Mike Johnson',
                    imgUrl: '/img/user3.jpg',
                },
                {
                    _id: 'u108',
                    fullname: 'Sara Lee',
                    imgUrl: '/img/user2.jpg',
                },
            ],
            tags: ['sunset', 'beach'],
            createdAt: Date.now()
        },
        {
            _id: 's103',
            txt: 'Mountain hike adventure',
            imgUrls: ['/img/test2.jpg'],
            by: {
                _id: 'u103',
                fullname: 'John Doe',
                imgUrl: '/img/user3.jpg',
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
                        imgUrl: '/img/user2.jpg',
                    },
                    txt: 'Looks amazing!',
                    createdAt: 1652352378,
                },
            ],
            likedBy: [
                {
                    _id: 'u109',
                    fullname: 'Alice Brown',
                    imgUrl: '/img/user2.jpg',
                },
                {
                    _id: 'u110',
                    fullname: 'Tom White',
                    imgUrl: '/img/user3.jpg',
                },
            ],
            tags: ['hiking', 'nature'],
            createdAt: Date.now() - 38925
        },
        {
            _id: 's104',
            txt: 'Delicious homemade pizza',
            imgUrls: ['/img/test3.jpg'],
            by: {
                _id: 'u104',
                fullname: 'Emily Clark',
                imgUrl: '/img/user2.jpg',
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
                        imgUrl: '/img/user3.jpg',
                    },
                    txt: 'Yummy!',
                    likedBy: [
                        {
                            _id: 'u112',
                            fullname: 'Nina Blue',
                            imgUrl: '/img/user1.jpg',
                        },
                    ],
                    createdAt: 1752352378,
                },
            ],
            likedBy: [
                {
                    _id: 'u111',
                    fullname: 'Chris Green',
                    imgUrl: '/img/user3.jpg',
                },
                {
                    _id: 'u112',
                    fullname: 'Nina Blue',
                    imgUrl: '/img/user1.jpg',
                },
            ],
            tags: ['food', 'pizza'],
            createdAt: Date.now() - 98925
        }
    ]
    saveToStorage(STORAGE_KEY, feeds)
}