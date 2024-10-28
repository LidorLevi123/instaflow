import { feedService } from "../feed"
import { userService } from "../user"
import { makeId } from "../util.service"

export const commentService = {
    save,
    remove,
}

async function save(feedId, comment) {
    try {
        const feed = await feedService.getById(feedId)
        const commentToSave = { ...comment }

        if (comment.id) {
            feed.comments = feed.comments.map(comment => comment.id === commentToSave.id ? commentToSave : comment)
        } else {
            commentToSave.id = makeId()
            commentToSave.by = userService.getLoggedinUser()
            commentToSave.createdAt = Date.now()

            feed.comments.push(commentToSave)
        }

        await feedService.save(feed)

        return {
            comment: commentToSave,
            feed
        }
    } catch (err) {
        console.log('Could not add comment', err)
    }
}

async function remove(feedId, commentId) {
    try {
        const feed = await feedService.getById(feedId)
        feed.comments = feed.comments.filter(comment => comment.id !== commentId)
        return await feedService.save(feed)
    } catch (err) {
        console.log('Could not remove comment', err)
    }
}