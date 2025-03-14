import { ObjectId } from 'mongodb'

import { asyncLocalStorage } from '../../services/als.service.js'
import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'

export const followService = { 
    query,
    add,
    remove
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)

        const collection = await dbService.getCollection('follow')
        const follows = await collection.find(criteria).toArray()

        return follows
    } catch (err) {
        logger.error('cannot find follows', err)
        throw err
    }
}

async function remove(userId) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        const collection = await dbService.getCollection('follow')
        const criteria = {
            followerId: ObjectId.createFromHexString(loggedinUser._id),
            followingId: ObjectId.createFromHexString(userId)
        }

        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot unfollow ${userId}`, err)
        throw err
    }
}

async function add(follow) {
    try {
        const followToSave = {
            followerId: ObjectId.createFromHexString(follow.followerId),
            followingId: ObjectId.createFromHexString(follow.followingId)
        }
        
		const collection = await dbService.getCollection('follow')
        const isFollowing = await collection.findOne(followToSave)
        
        if(isFollowing) throw 'Cannot follow user'

		await collection.insertOne(followToSave)
        return followToSave
	} catch (err) {
		logger.error('cannot add follow', err)
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

    if (filterBy.followerId) {
        criteria.followerId = ObjectId.createFromHexString(filterBy.followerId)
    }

    if (filterBy.followingId) {
        criteria.followingId = ObjectId.createFromHexString(filterBy.followingId)
    }
    return criteria
}

function _buildSort() {
	return { _id: -1 }
}