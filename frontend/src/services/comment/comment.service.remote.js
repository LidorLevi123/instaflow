import { httpService } from "../http.service"

const BASE_URL = 'comment/'

export const commentService = {
    save,
    remove
}

async function save(feedId, comment) {
    var savedComment
    if (comment._id) {
        savedComment = await httpService.put(BASE_URL + comment._id, comment)
    } else {
        comment.aboutFeedId = feedId
        savedComment = await httpService.post(BASE_URL, comment)
    }
    return savedComment
}

async function remove(feedId, commentId) {
    return httpService.delete(BASE_URL + commentId + `/${feedId}`)
}