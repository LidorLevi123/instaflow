import { store } from "../store"
import { userService } from '../../services/user'

export async function login(userCred) {
    try {
        const user = await userService.login(userCred)
        store.dispatch({ type: 'SET_LOGGEDIN_USER', user})
        return user
    } catch (err) {
        console.log('userActions: Error in login', err)
        throw err
    }
}

export async function signup(userCred) {
    try {
        const user = await userService.signup(userCred)
        if(!user) return
        store.dispatch({ type: 'SET_LOGGEDIN_USER', user})
        return user
    } catch (err) {
        console.log('userActions: Error in signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: 'SET_LOGGEDIN_USER', user: null})
    } catch (err) {
        console.log('userActions: Error in logout', err)
        throw err
    }
}