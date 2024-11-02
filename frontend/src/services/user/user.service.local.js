import { storageService } from '../async-storage.service'
import { feedService } from '../feed'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getUserFeeds,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    delete user.password
    return user
}

async function remove(userId) {
    return await storageService.remove('user', userId)
}

async function update({ _id, postedFeedsId }) {
    const user = await storageService.get('user', _id)
    user.postedFeedsId = [...postedFeedsId]
    await storageService.put('user', user)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function getUserFeeds(userId) {
    const feeds = await feedService.query()
    return feeds
        .filter(feed => feed.by._id === userId)
        .map(feed => ({ _id: feed._id, imgUrls: feed.imgUrls }))
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/dvpkhwyxp/image/upload/v1729242206/instaflow/tzq3es09mdch78lufntr.png'
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username || user.email === userCred.email)

    if (user) throw new Error('Could not signup')
    const newUser = await storageService.post('user', userCred)
    return saveLoggedinUser(newUser)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        imgUrl: user.imgUrl,
        postedFeedsId: user.postedFeedsId
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    console.log(user)
    return user
}

// To quickly create a user, uncomment the next line
// _createUser()
async function _createUser() {
    const userCred = {
        username: 'sason',
        password: '123',
        fullname: 'Meir Sasonesre',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    }

    const newUser = await storageService.post('user', userCred)
    console.log('newUser: ', newUser)
}