const { DEV, VITE_LOCAL } = import.meta.env

import { commentService as local } from './comment.service.local'
import { commentService as remote } from './comment.service.remote'

function getEmptyComment() {
    return {
        txt: '',
        likedBy: []
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const commentService = { ...service, getEmptyComment }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if(DEV) window.commentService = commentService