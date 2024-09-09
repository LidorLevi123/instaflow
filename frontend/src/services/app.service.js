export const appService = {
    getLinks
}

function getLinks() {
    return [
        {
            name: 'logoTxt',
            txt: '',
            path: '/',
            class: 'logo'
        },
        {
            name: 'home',
            txt: 'Home',
            path: '/',
        },
        {
            name: 'search',
            txt: 'Search',
            path: 'search',
        },
        {
            name: 'explore',
            path: 'explore',
            txt: 'Explore',
        },
        {
            name: 'reels',
            path: 'reels',
            txt: 'Reels',
        },
        {
            name: 'messenger',
            path: 'inbox',
            txt: 'Messages',
        },
        {
            name: 'heart',
            path: 'notifications',
            txt: 'Notifications',
        },
        {
            name: 'addFeed',
            path: 'add',
            txt: 'Create',
        },
        {
            name: 'img',
            path: 'user',
            txt: 'Profile',
            class: 'user-img'
        },
        {
            name: 'threads',
            path: 'https://www.threads.net/?xmt=AQGzXUqqEb9xb-HuqkLyKZMoTtPiJ5GimIdR-VpPWsD2kxA',
            txt: 'Threads',
        },
        {
            name: 'more',
            path: 'more',
            txt: 'More',
        },
    ]
}