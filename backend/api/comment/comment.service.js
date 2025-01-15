import { ObjectId } from 'mongodb'

import { asyncLocalStorage } from '../../services/als.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'
import { feedService } from '../feed/feed.service.js'

export const commentService = { 
    query,
    update, 
    remove, 
    add 
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const sort = _buildSort()

        const collection = await dbService.getCollection('comment')
        const comments = await collection.find(criteria, { sort }).toArray()

        return comments
    } catch (err) {
        logger.error('cannot find comments', err)
        throw err
    }
}

async function remove(feedId, commentId) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        const collection = await dbService.getCollection('comment')
        const criteria = {
            _id: ObjectId.createFromHexString(commentId),
            'by._id': loggedinUser._id
        }

        const { deletedCount } = await collection.deleteOne(criteria)

        const feedCollection = await dbService.getCollection('feed')
        const feed = await feedCollection.findOne(ObjectId.createFromHexString(feedId))

        feed.commentIds = feed.commentIds.filter(_commentId => _commentId !== commentId)
        feed._id = feed._id.toString()

        await feedService.update(feed)

        return deletedCount
    } catch (err) {
        logger.error(`cannot remove comment ${commentId}`, err)
        throw err
    }
}

async function add(comment) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()

        const commentToAdd = {
            by: loggedinUser,
            aboutFeedId: ObjectId.createFromHexString(comment.aboutFeedId),
            txt: comment.txt,
            createdAt: Date.now()
        }

        const collection = await dbService.getCollection('comment')
        await collection.insertOne(commentToAdd)

        const feedCollection = await dbService.getCollection('feed')
        const feed = await feedCollection.findOne(commentToAdd.aboutFeedId)

        if (!feed.commentIds) feed.commentIds = []
        feed.commentIds = [...feed.commentIds, commentToAdd._id.toString()]
        feed._id = feed._id.toString()

        await feedService.update(feed)

        return commentToAdd
    } catch (err) {
        logger.error('cannot add comment', err)
        throw err
    }
}

async function update(comment) {
    const commentToSave = {
        likedBy: comment.likedBy,
    }
    try {
        const criteria = { _id: ObjectId.createFromHexString(comment._id) }

        const collection = await dbService.getCollection('comment')
        await collection.updateOne(criteria, { $set: commentToSave })

        return comment
    } catch (err) {
        logger.error(`cannot update comment ${comment._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.feedId) {
        criteria.aboutFeedId = ObjectId.createFromHexString(filterBy.feedId)
    }
    return criteria
}

function _buildSort() {
	return { _id: -1 }
}