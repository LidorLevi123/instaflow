import { storageService } from '../async-storage.service'
import { userService } from '../user'
import { loadFromStorage, saveToStorage } from '../util.service'

const STORAGE_KEY = 'feed_db'

export const feedService = {
    query,
    getById,
    save,
    remove,
    getEmptyFeed,
}

_createFeeds()

async function query(filterBy = { txt: '', price: 0 }) {
    const feeds = await storageService.query(STORAGE_KEY)
    const prms = feeds.map(feed => fetch(feed.imgUrls[0]))
    return Promise.all(prms).then(() => feeds)
}

async function getById(feedId) {
    return storageService.get(STORAGE_KEY, feedId)
}

async function remove(feedId) {
    await storageService.remove(STORAGE_KEY, feedId)
}

async function save(feed) {
    if (feed._id) {
        return await storageService.put(STORAGE_KEY, feed)
    } else {
        feed.by = userService.getLoggedinUser()
        feed.createdAt = Date.now()
        return await storageService.post(STORAGE_KEY, feed)
    }
}

function getEmptyFeed() {
    return {
        txt: '',
        imgUrls: [],
        comments: [],
        likedBy: [],
        tags: []
    }
}

function _createFeeds() {
    var feeds = loadFromStorage(STORAGE_KEY) || []
    if (feeds && feeds.length) return

    feeds = [
        {
            _id: 's102',
            txt: 'Sunset at the beach',
            imgUrls: ['/img/test1.jpg'],
            by: {
                _id: 'u102',
                fullname: 'Anna Smith',
                username: 'annas',
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
                        username: 'mikej',
                        imgUrl: '/img/user3.jpg',
                    },
                    txt: 'Absolutely stunning!',
                    likedBy: [
                        {
                            _id: 'u108',
                            fullname: 'Sara Lee',
                            username: 'saral',
                            imgUrl: '/img/user2.jpg',
                        },
                        {
                            _id: 'u107',
                            fullname: 'Sara Bee',
                            username: 'sarab',
                            imgUrl: '/img/user2.jpg',
                        },
                    ],
                    createdAt: 1652352378,
                },
                {
                    id: 'c1004',
                    by: {
                        _id: 'u102',
                        fullname: 'Shiran Shvartz',
                        username: 'shirans',
                        imgUrl: '/img/user2.jpg',
                    },
                    txt: 'I\'m and actual noob! I have to quit CS as long as possible.',
                    likedBy: [
                        {
                            _id: 'u108',
                            fullname: 'Sara Lee',
                            username: 'saral',
                            imgUrl: '/img/user2.jpg',
                        },
                        {
                            _id: 'u107',
                            fullname: 'Sara Bee',
                            username: 'sarab',
                            imgUrl: '/img/user2.jpg',
                        },
                    ],
                    createdAt: Date.now() - 60000,
                },
            ],
            likedBy: [
                {
                    _id: 'u107',
                    fullname: 'Mike Johnson',
                    username: 'mikej',
                    imgUrl: '/img/user3.jpg',
                },
                {
                    _id: 'u108',
                    fullname: 'Sara Lee',
                    username: 'saral',
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
                username: 'johnd',
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
                        username: 'aliceb',
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
                    username: 'aliceb',
                    imgUrl: '/img/user2.jpg',
                },
                {
                    _id: 'u110',
                    fullname: 'Tom White',
                    username: 'tomw',
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
                username: 'emilyc',
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
                        username: 'chrisg',
                        imgUrl: '/img/user3.jpg',
                    },
                    txt: 'Yummy!',
                    likedBy: [
                        {
                            _id: 'u112',
                            fullname: 'Nina Blue',
                            username: 'ninab',
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
                    username: 'chrisg',
                    imgUrl: '/img/user3.jpg',
                },
                {
                    _id: 'u112',
                    fullname: 'Nina Blue',
                    username: 'ninab',
                    imgUrl: '/img/user1.jpg',
                },
            ],
            tags: ['food', 'pizza'],
            createdAt: Date.now() - 98925
        }
    ]
    saveToStorage(STORAGE_KEY, feeds)
}