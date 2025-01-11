const { VITE_LOCAL } = import.meta.env

import { feedService as local } from './feed.service.local'
import { feedService as remote } from './feed.service.remote'

function getEmptyFeed() {
    return {
        txt: '',
        imgUrls: [],
        likedBy: [],
        tags: []
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const feedService = { getEmptyFeed, getDefaultFilter, ...service }