import { httpService } from "../http.service"

export const commentService = {
    save,
}

async function save(feedId, comment) {
    console.log('comment:', comment)
    var savedComment
    if (comment._id) {
        savedComment = await httpService.put(`comment/${comment._id}`, comment)
    } else {
        comment.aboutFeedId = feedId
        savedComment = await httpService.post('comment', comment)
    }
    return savedComment
}